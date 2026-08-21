/*
   Scout CRM Backend — Reads and writes saved leads from/to Google Sheets.
   Uses the GOOGLE_SHEET_WEBAPP_URL environment variable.
*/

import dns from "dns";
import https from "https";
import url from "url";


// Falls back to this when a caller sends no board, matching the Apps Script.
const DEFAULT_BOARD = "spa-bridge";

interface CRMLead {
  id?: string;
  board?: string;
  name: string;
  phone: string;
  address: string;
  category: string;
  website: string;
  rating: number;
  reviewCount: number;
  niche: string;
  location: string;
  status: string; // 'New' | 'Contacted' | 'Responded' | 'Won' | 'Lost'
  notes?: string;
  scoutedAt?: string;
  contactedAt?: string;
  whatsappLink?: string;
}

// Basic security check helper
const checkAuth = (headers: Headers): boolean => {
  const opsAuth = headers.get("X-Ops-Auth");
  return opsAuth === "notivon-internal-2026";
};

// Force IPv4 lookup for HTTPS requests
const ipv4Lookup = (hostname: string, options: any, callback: any) => {
  return dns.lookup(hostname, { ...options, family: 4 }, callback);
};

const keepAliveAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 50,
  keepAliveMsecs: 1000
});

/* ── Custom Fetch using Native Node.js HTTPS (Immune to undici DNS/IPv6 timeouts) ── */
function customFetch(targetUrl: string, options: any = {}, redirectCount = 0): Promise<any> {
  if (redirectCount > 5) {
    return Promise.reject(new Error("Too many redirects"));
  }

  return new Promise((resolve, reject) => {
    const parsedUrl = url.parse(targetUrl);
    const requestOptions: https.RequestOptions = {
      method: options.method || "GET",
      hostname: parsedUrl.hostname,
      path: parsedUrl.path,
      headers: options.headers || {},
      // Apps Script writes routinely take 15s+ on a cold start. Giving up early
      // is worse than waiting: Google still commits the row, so the caller sees
      // a false failure and retrying duplicates the lead.
      timeout: options.timeoutMs || 24000,
      lookup: ipv4Lookup,
      agent: keepAliveAgent,
    };

    const req = https.request(requestOptions, (res) => {
      // Follow Redirects (HTTP 301, 302, 307)
      // Google Apps Script processes POST body server-side, then 302-redirects
      // to a URL containing the response. We ALWAYS follow as GET.
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrlStr = res.headers.location;
        if (!redirectUrlStr.startsWith("http")) {
          redirectUrlStr = url.resolve(targetUrl, redirectUrlStr);
        }
        
        // Drain response body to free the socket before following redirect
        res.resume();
        
        // Follow redirect as GET with no body (response data is at the redirect URL)
        resolve(customFetch(redirectUrlStr, { method: "GET", headers: {} }, redirectCount + 1));
        return;
      }

      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        resolve({
          ok: res.statusCode ? res.statusCode >= 200 && res.statusCode < 300 : false,
          status: res.statusCode,
          text: () => Promise.resolve(body),
          json: () => {
            try {
              return Promise.resolve(JSON.parse(body));
            } catch (e) {
              return Promise.reject(new Error(`Invalid JSON: ${body}`));
            }
          }
        });
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request timeout"));
    });

    if (options.body && (options.method === "POST" || options.method === "PATCH")) {
      req.write(typeof options.body === "string" ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

/**
 * Apps Script answers a burst of requests with an HTML interstitial instead of
 * JSON — a throttle, not a real error, and it clears on a retry.
 *
 * Only reads are retried. A POST that returned an interstitial may well have
 * already written the row, so retrying it duplicates leads and makes deletes
 * report "not found" on the second pass. Writes get exactly one attempt.
 */
async function fetchJson(targetUrl: string, options: any = {}): Promise<any> {
  const isRead = (options.method || "GET").toUpperCase() === "GET";
  const attempts = isRead ? 3 : 1;
  let lastErr: Error | null = null;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await customFetch(targetUrl, options);
      const text = await response.text();

      if (!text.trim().startsWith("{")) {
        lastErr = new Error(`Non-JSON response (status ${response.status})`);
      } else {
        const data = JSON.parse(text);
        if (data.error) throw new Error(data.error);
        return data;
      }
    } catch (err: any) {
      // A rejection from the script itself is real; stop retrying.
      if (err && err.message && !err.message.includes("Non-JSON")) {
        if (attempt === attempts) throw err;
        lastErr = err;
      } else {
        lastErr = err;
      }
    }

    if (attempt < attempts) {
      await new Promise((r) => setTimeout(r, 400 * attempt));
    }
  }

  throw lastErr || new Error("Google Sheets request failed");
}

/* ── Board (sheet tab) helpers ── */

// Boards become sheet tab names; mirror the Apps Script's sanitising so the
// frontend, this function, and the sheet always agree on the same key.
const normalizeBoard = (raw: unknown): string => {
  const name = String(raw ?? "").trim().toLowerCase();
  if (!name) return DEFAULT_BOARD;
  const clean = name.replace(/[^a-z0-9\-_ ]/g, "").replace(/\s+/g, "-").slice(0, 40);
  return clean || DEFAULT_BOARD;
};

const withBoard = (webAppUrl: string, params: Record<string, string>): string => {
  const sep = webAppUrl.includes("?") ? "&" : "?";
  return `${webAppUrl}${sep}${new URLSearchParams(params).toString()}`;
};

/* ── List Available Boards ── */
async function getBoards(webAppUrl: string): Promise<{ name: string; count: number }[]> {
  const data = await fetchJson(withBoard(webAppUrl, { action: "boards" }), { method: "GET" });

  return (data.boards || []).map((b: any) => ({
    name: String(b.name || ""),
    count: Number(b.count) || 0,
  }));
}

/* ── Save Many Leads in One Request ── */
async function saveLeads(webAppUrl: string, board: string, leads: CRMLead[]): Promise<any> {
  const data = await fetchJson(webAppUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // A batch of 20+ rows is a single append in Apps Script, but still a cold
    // start plus a lock wait, so allow the full function budget.
    timeoutMs: 26000,
    body: JSON.stringify({
      action: "saveMany",
      board,
      leads: leads.map((lead) => ({
        ...lead,
        reviews: Number((lead as any).reviewCount ?? (lead as any).reviews) || 0,
      })),
    }),
  });

  return {
    board,
    leads: (data.leads || []).map((l: any) => ({ ...l, reviewCount: Number(l.reviews) || 0 })),
    inserted: Number(data.inserted) || 0,
    updated: Number(data.updated) || 0,
    skipped: Number(data.skipped) || 0,
  };
}

/* ── Create an Empty Board ── */
async function createBoard(webAppUrl: string, board: string): Promise<{ name: string; count: number }[]> {
  const data = await fetchJson(webAppUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "createBoard", board }),
  });

  return (data.boards || []).map((b: any) => ({
    name: String(b.name || ""),
    count: Number(b.count) || 0,
  }));
}

/* ── Fetch Saved Leads from Google Sheet ── */
async function getLeads(webAppUrl: string, board: string): Promise<CRMLead[]> {
  const data = await fetchJson(withBoard(webAppUrl, { board }), { method: "GET" });

  return (data.leads || []).map((lead: any) => ({
    id: String(lead.id || ""),
    board,
    name: String(lead.name || ""),
    phone: String(lead.phone || ""),
    address: String(lead.address || ""),
    category: String(lead.category || ""),
    website: String(lead.website || ""),
    rating: Number(lead.rating) || 0,
    reviewCount: Number(lead.reviews) || 0, // Map 'reviews' from Apps Script to 'reviewCount'
    niche: String(lead.niche || ""),
    location: String(lead.location || ""),
    status: String(lead.status || "New"),
    notes: String(lead.notes || ""),
    scoutedAt: String(lead.scoutedAt || ""),
    contactedAt: String(lead.contactedAt || ""),
    whatsappLink: String(lead.whatsappLink || ""),
  }));
}

/* ── Save or Update Lead in Google Sheet ── */
async function saveLead(webAppUrl: string, board: string, lead: CRMLead): Promise<CRMLead> {
  const payload = {
    action: "save",
    board,
    lead: {
      id: lead.id,
      name: lead.name,
      phone: lead.phone,
      address: lead.address,
      category: lead.category,
      website: lead.website,
      rating: Number(lead.rating) || 0,
      reviews: Number(lead.reviewCount) || 0, // Map 'reviewCount' to 'reviews' for Apps Script
      niche: lead.niche,
      location: lead.location,
      status: lead.status || "New",
      notes: lead.notes || "",
      scoutedAt: lead.scoutedAt,
      contactedAt: lead.contactedAt,
      whatsappLink: lead.whatsappLink || "",
    }
  };

  const data = await fetchJson(webAppUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const saved = data.lead;
  return {
    id: String(saved.id),
    board,
    name: String(saved.name || ""),
    phone: String(saved.phone || ""),
    address: String(saved.address || ""),
    category: String(saved.category || ""),
    website: String(saved.website || ""),
    rating: Number(saved.rating) || 0,
    reviewCount: Number(saved.reviews) || 0,
    niche: String(saved.niche || ""),
    location: String(saved.location || ""),
    status: String(saved.status || "New"),
    notes: String(saved.notes || ""),
    scoutedAt: String(saved.scoutedAt || ""),
    contactedAt: String(saved.contactedAt || ""),
    whatsappLink: String(saved.whatsappLink || ""),
  };
}

/* ── Delete Lead from Google Sheet ── */
async function deleteLead(webAppUrl: string, board: string, id: string): Promise<void> {
  // A lead that is already gone is the outcome the caller wanted; treat the
  // script's "not found" as success so deleting twice is not an error.
  try {
    await fetchJson(webAppUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "delete", board, id }),
    });
  } catch (err: any) {
    const message = String(err?.message || "");
    if (message.toLowerCase().includes("not found")) return;
    throw err;
  }
}

/* ── Main Handler ── */
const handler = async (req: Request): Promise<Response> => {
  if (!checkAuth(req.headers)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const webAppUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;

  if (!webAppUrl) {
    return new Response(
      JSON.stringify({ error: "Google Sheets Web App URL configuration missing on backend (GOOGLE_SHEET_WEBAPP_URL)" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const method = req.method;

  try {
    const requestUrl = new URL(req.url);

    if (method === "GET") {
      // ?action=boards powers the board switcher in Scout and Pipeline.
      if (requestUrl.searchParams.get("action") === "boards") {
        const boards = await getBoards(webAppUrl);
        return new Response(JSON.stringify({ boards }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      const board = normalizeBoard(requestUrl.searchParams.get("board"));
      const leads = await getLeads(webAppUrl, board);
      return new Response(JSON.stringify({ board, leads }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (method === "POST" || method === "PATCH") {
      let body: any;
      try {
        body = await req.json();
      } catch {
        return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Board may ride on the body or the query string; body wins.
      const board = normalizeBoard(body.board ?? requestUrl.searchParams.get("board"));

      if (body.action === "saveMany" || Array.isArray(body.leads)) {
        const result = await saveLeads(webAppUrl, board, body.leads || []);
        return new Response(JSON.stringify(result), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      if (body.action === "createBoard") {
        const boards = await createBoard(webAppUrl, board);
        return new Response(JSON.stringify({ board, boards }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      const saved = await saveLead(webAppUrl, board, body.lead ?? body);
      return new Response(JSON.stringify({ lead: saved, board }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (method === "DELETE") {
      const id = requestUrl.searchParams.get("id");
      if (!id) {
        return new Response(JSON.stringify({ error: "Missing lead id" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      const board = normalizeBoard(requestUrl.searchParams.get("board"));
      await deleteLead(webAppUrl, board, id);
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("CRM Handler Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed operation",
        detail: error.message || "Google Sheets Web App integration error.",
      }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
};

/* ── Vercel Serverless Adapter ── */
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function vercelHandler(req: VercelRequest, res: VercelResponse) {
  try {
    const proto = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
    const fullUrl = `${proto}://${host}${req.url || "/"}`;

    const webReq = new Request(fullUrl, {
      method: req.method || "GET",
      headers: req.headers as Record<string, string>,
      body: req.method !== "GET" && req.method !== "HEAD" ? JSON.stringify(req.body) : undefined,
    });

    const webRes = await handler(webReq);
    const resBody = await webRes.text();

    res.status(webRes.status);
    webRes.headers.forEach((v, k) => res.setHeader(k, v));
    res.send(resBody);
  } catch (err: any) {
    console.error("Vercel adapter error:", err);
    res.status(500).json({ error: "Internal server error", detail: err.message });
  }
}
