/*
   Scout CRM Backend — Reads and writes saved leads from/to Google Sheets.
   Uses the GOOGLE_SHEET_WEBAPP_URL environment variable.
*/

import dns from "dns";
import https from "https";
import url from "url";


interface CRMLead {
  id?: string;
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
      timeout: 15000, // 15 seconds
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

/* ── Fetch Saved Leads from Google Sheet ── */
async function getLeads(webAppUrl: string): Promise<CRMLead[]> {
  const response = await customFetch(webAppUrl, { method: "GET" });

  if (!response.ok) {
    const text = await response.text();
    console.error("Google Sheets GET Error:", response.status, text);
    throw new Error(`Google Sheets GET returned ${response.status}`);
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }

  return (data.leads || []).map((lead: any) => ({
    id: String(lead.id || ""),
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
async function saveLead(webAppUrl: string, lead: CRMLead): Promise<CRMLead> {
  const payload = {
    action: "save",
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

  const response = await customFetch(webAppUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Google Sheets Write Error:", response.status, text);
    throw new Error(`Google Sheets Write returned ${response.status}`);
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }

  const saved = data.lead;
  return {
    id: String(saved.id),
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
async function deleteLead(webAppUrl: string, id: string): Promise<void> {
  const response = await customFetch(webAppUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "delete", id }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Google Sheets Delete Error:", response.status, text);
    throw new Error(`Google Sheets Delete returned ${response.status}`);
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
}

/* ── Main Handler ── */
const webHandler = async (req: Request): Promise<Response> => {
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
    if (method === "GET") {
      const leads = await getLeads(webAppUrl);
      return new Response(JSON.stringify({ leads }), {
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

      const saved = await saveLead(webAppUrl, body);
      return new Response(JSON.stringify({ lead: saved }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (method === "DELETE") {
      const url = new URL(req.url);
      const id = url.searchParams.get("id");
      if (!id) {
        return new Response(JSON.stringify({ error: "Missing lead id" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      await deleteLead(webAppUrl, id);
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

export default async function handler(req: any, res: any) {
  try {
    const host = req.headers.host || "localhost";
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const webUrl = `${protocol}://${host}${req.url}`;
    
    const webReq = {
      method: req.method,
      headers: {
        get: (name: string) => {
          const val = req.headers[name.toLowerCase()];
          return Array.isArray(val) ? val.join(", ") : val || null;
        }
      } as unknown as Headers,
      url: webUrl,
      json: async () => req.body,
    } as unknown as Request;

    const webRes = await webHandler(webReq);
    
    webRes.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    
    const status = webRes.status;
    const bodyText = await webRes.text();
    
    res.status(status).send(bodyText);
  } catch (err: any) {
    console.error("Vercel adapter error:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
}
