/* Receives scorecard leads and fans them out:
   1. Telegram push to Hussain's phone            (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID)
   2. Notification email via Resend               (RESEND_API_KEY, LEAD_TO_EMAIL)
   3. Row in Airtable                             (AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE)
   Each sink is optional — configure whichever env vars you have; missing
   ones are skipped so the funnel never breaks while you finish setup. */

interface ScorecardLead {
  name: string;
  phone: string;
  email?: string;
  answers: Record<string, string | string[]>;
  answersReadable?: string; // client-built, human-readable labels
  total: number;
  band: string;
  submittedAt: string;
  source: string;
  website?: string; // honeypot — humans leave it empty
}

const isValidLead = (body: unknown): body is ScorecardLead => {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.phone === "string" &&
    /^\d{10,15}$/.test(b.phone) &&
    (b.email === undefined || typeof b.email === "string") &&
    typeof b.total === "number" &&
    typeof b.band === "string"
  );
};

/** A filled honeypot means a bot. Returns 200 so the bot sees success and
    moves on, but nothing is delivered to the notification sinks. */
const isBot = (body: ScorecardLead): boolean =>
  typeof body.website === "string" && body.website.trim().length > 0;

const formatAnswers = (answers: Record<string, string | string[]>): string =>
  Object.entries(answers)
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
    .join("\n");

/** Prefer the client's human-readable summary; fall back to raw slugs. */
const answersBlock = (lead: ScorecardLead): string =>
  lead.answersReadable?.trim() || formatAnswers(lead.answers ?? {});

/** Digits-only local Nigerian numbers (0xxxxxxxxxx) → international for wa.me. */
const toWaNumber = (phone: string): string =>
  phone.length === 11 && phone.startsWith("0") ? `234${phone.slice(1)}` : phone;

async function notifyTelegram(lead: ScorecardLead): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text = [
    `🔔 New Opportunity Map lead`,
    ``,
    `👤 ${lead.name}`,
    `📱 ${lead.phone} → https://wa.me/${toWaNumber(lead.phone)}`,
    lead.email ? `✉️ ${lead.email}` : null,
    `📊 ${lead.total}/100 — ${lead.band}`,
    ``,
    answersBlock(lead),
  ]
    .filter((l) => l !== null)
    .join("\n")
    .slice(0, 4000);

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });
}

async function notifyByEmail(lead: ScorecardLead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  if (!apiKey || !to) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL ?? "Notivon Scorecard <onboarding@resend.dev>",
      to: [to],
      subject: `New scorecard lead: ${lead.name} — ${lead.band} (${lead.total}/100)`,
      text: [
        `Name: ${lead.name}`,
        `WhatsApp: ${lead.phone} (https://wa.me/${toWaNumber(lead.phone)})`,
        `Email: ${lead.email ?? "—"}`,
        `Score: ${lead.total}/100 (${lead.band})`,
        `Submitted: ${lead.submittedAt}`,
        "",
        "Answers:",
        answersBlock(lead),
      ].join("\n"),
    }),
  });
}

async function appendToAirtable(lead: ScorecardLead): Promise<void> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE ?? "Scorecard Leads";
  if (!apiKey || !baseId) return;

  await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      records: [
        {
          fields: {
            Name: lead.name,
            Phone: lead.phone,
            Email: lead.email ?? "",
            Score: lead.total,
            Band: lead.band,
            Answers: answersBlock(lead),
            "Submitted At": lead.submittedAt,
            Source: lead.source,
          },
        },
      ],
    }),
  });
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (!isValidLead(body)) {
    return new Response("Invalid lead payload", { status: 400 });
  }

  if (isBot(body)) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const results = await Promise.allSettled([
    notifyTelegram(body),
    notifyByEmail(body),
    appendToAirtable(body),
  ]);
  results.forEach((r) => {
    if (r.status === "rejected") console.error("Lead sink failed:", r.reason);
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

/* ── Vercel Node.js Adapter ── */
import type { IncomingMessage, ServerResponse } from "http";

module.exports = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const proto = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
    const fullUrl = `${proto}://${host}${req.url || "/"}`;

    let body: string | undefined;
    if (req.method !== "GET" && req.method !== "HEAD") {
      body = await new Promise<string>((resolve, reject) => {
        let data = "";
        req.on("data", (chunk) => (data += chunk));
        req.on("end", () => resolve(data));
        req.on("error", reject);
      });
    }

    const webReq = new Request(fullUrl, {
      method: req.method || "GET",
      headers: req.headers as Record<string, string>,
      body: body || undefined,
    });

    const webRes = await handler(webReq);
    const resBody = await webRes.text();

    res.writeHead(webRes.status, Object.fromEntries(webRes.headers.entries()));
    res.end(resBody);
  } catch (err: any) {
    console.error("Vercel adapter error:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal server error", detail: err.message }));
  }
};
