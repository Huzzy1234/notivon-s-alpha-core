/* Generates the AI Opportunity Map — the personalized analysis a visitor
   gets after the readiness questions. Provider-agnostic (OpenAI-compatible
   chat completions), streamed straight through to the browser.

   Provider chain: Gemini (free tier) → Groq (free tier). If both fail the
   client falls back to the static narrative, so the funnel never breaks.

   After the stream completes, the full map is pushed to Hussain's Telegram
   so he sees exactly what the lead saw. */

interface MapRequest {
  name: string;
  phone: string;
  answers: Record<string, string | string[]>;
  freeText?: string; // optional extra colour; the map is built from `answers`
  band?: string; // readiness band from the deterministic score — calibrates verdicts
  caution?: string; // the honest-take finding shown above the map — must not be contradicted
  website?: string; // honeypot — bots fill it, humans never see it
}

interface Provider {
  label: string;
  key: string | undefined;
  model: string;
  /** Native Gemini and OpenAI-compatible providers stream differently; each
      knows how to build its request and pull a text delta from an SSE line. */
  kind: "gemini" | "openai";
  buildRequest: (p: Provider, system: string, user: string) => { url: string; init: RequestInit };
  extractDelta: (json: unknown) => string | undefined;
}

const providers = (): Provider[] => [
  {
    // Gemini's own endpoint + ?key= auth is reliable with any AI Studio key
    // (the OpenAI-compat Bearer path is flaky with short-lived tokens).
    label: "gemini",
    kind: "gemini",
    key: process.env.GEMINI_API_KEY,
    model: process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
    buildRequest: (p, system, user) => ({
      url: `https://generativelanguage.googleapis.com/v1beta/models/${p.model}:streamGenerateContent?alt=sse&key=${p.key}`,
      init: {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: system }] },
          contents: [{ role: "user", parts: [{ text: user }] }],
          generationConfig: {
            maxOutputTokens: 2048,
            temperature: 0.5,
            // 2.5-flash spends output budget on hidden "thinking" by default,
            // which truncates the map. We don't need chain-of-thought here.
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      },
    }),
    extractDelta: (json) =>
      (json as { candidates?: { content?: { parts?: { text?: string }[] } }[] })
        ?.candidates?.[0]?.content?.parts?.[0]?.text,
  },
  {
    label: "groq",
    kind: "openai",
    key: process.env.GROQ_API_KEY,
    model: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
    buildRequest: (p, system, user) => ({
      url: "https://api.groq.com/openai/v1/chat/completions",
      init: {
        method: "POST",
        headers: { Authorization: `Bearer ${p.key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: p.model,
          stream: true,
          max_tokens: 1600,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
      },
    }),
    extractDelta: (json) =>
      (json as { choices?: { delta?: { content?: string } }[] })?.choices?.[0]?.delta?.content,
  },
];

/* ── The moat: Hussain's expertise, encoded ── */

const SYSTEM_PROMPT = `You are the analysis engine behind Notivon's AI Opportunity Map. Notivon is a Nigerian consulting-and-building firm run by Hussain. It diagnoses where AI and automation genuinely pay off for small and medium businesses — and says plainly where they don't. Its credibility comes from honesty: it regularly tells businesses NOT to automate things.

You receive a business owner's questionnaire answers and their own free-text description of how work moves through their business. You write their Opportunity Map.

VOICE
- Plain English a busy Nigerian business owner instantly understands. No jargon; if a technical idea is needed, explain it in one clause.
- Direct, warm, specific. Quote their own words back where possible ("you said clients call three times a day for updates...").
- Write flawless, professional prose. Never use emoji. Never oversell.
- Naira and hours, not dollars. When estimating money, use conservative ranges and say "roughly". Assume a junior admin hour costs ₦1,500–₦3,000 and a skilled hour ₦3,000–₦8,000.

WHAT YOU'RE GIVEN
- The structured questionnaire answers are your PRIMARY signal — build the whole map from them. They tell you the business type, how customers arrive, monthly volume, where time goes, what customers wait on, what happens after a sale, current tools, where data lives, the main pain, and hours lost to admin.
- A free-text description MAY be present. If it is, use it to sharpen and quote them. If it is absent, do not mention that it's missing — just work from the answers.

WHAT YOU KNOW (Notivon's field patterns)
- Visa/travel agencies: document collection & expiry tracking, WhatsApp status updates, application pipelines. Proven wins.
- Customs clearing/logistics: shipment pipelines, field updates over WhatsApp, document tracking.
- Professional services: client intake, follow-up sequences, reporting.
- Retail/commerce: order tracking, customer follow-up, inventory alerts.
- Real estate: lead follow-up, viewing scheduling, document handling.
- Beauty & personal care (salon, barber, spa): self-service booking + a shared calendar, automated appointment reminders that cut no-shows, client history & preferences (what they usually get), rebooking and loyalty nudges over WhatsApp.
- Health & wellness (clinic, pharmacy): appointment scheduling & reminders, patient/customer records, prescription-refill reminders, results/status updates. Never anything clinical (no diagnosis, no treatment decisions).
- Food & hospitality (restaurant, catering, hotel): order & reservation capture, WhatsApp ordering, prep/delivery coordination, repeat-customer offers, review requests.
- Education & training: enrolment/registration, class schedules & reminders, fee reminders, attendance/progress updates to parents.
- Logistics & delivery: dispatch & tracking, automatic status updates to customers, proof-of-delivery capture, rider coordination.
- Universal truths: WhatsApp is where Nigerian business happens — automations that live inside WhatsApp win. Scattered data must be fixed BEFORE clever AI. Off-the-shelf tools fail when the workflow doesn't fit the template. The highest-payback builds replace re-typing, chasing, and checking.

RULES
- Use ONLY facts they gave you. Never invent details about their business. If their description is thin, say what you'd need to look at — do not fabricate.
- Every opportunity must trace to something they actually said or selected. Ground it in their specifics — the channels they use, what customers wait on them for, what eats time after a sale, their volume and their pain — even when they wrote no free text. Name those specifics in the card (e.g. "you take bookings on Instagram and WhatsApp and clients no-show"), never generic filler.
- CRITICAL — automate the admin AROUND the work, never the craft or physical service itself. Booking, reminders, records, follow-up, intake, status updates, payments — yes. Doing the actual service — no. A salon automates booking, reminders, no-show follow-up and client history — NOT "a system to style hair". A restaurant automates orders, reservations and repeat-customer offers — NOT cooking. A clinic automates appointments, records and refill reminders — NOT diagnosis. If a suggestion is the service itself rather than the paperwork or communication around it, drop it and pick another.
- Exactly one section must be an honest "hold off" — something they might expect to automate but shouldn't yet, with the reason.
- CALIBRATE TO THEIR READINESS BAND. The page already shows the visitor a readiness band and an honest-take warning ABOVE your map; your verdicts must not contradict them. Follow this by band:
  - "early": their foundations aren't ready. AT MOST ONE opportunity may be "Build now", and only if it is genuinely groundwork-independent; the rest MUST be "Wait — ..." naming the foundation to fix first. Never tell an early-stage business to build three things now.
  - "emerging": a mix. Roughly one "Build now", the others "Wait — ..." with the blocker named.
  - "ready" / "prime": their fundamentals hold up. Two or three "Build now" is appropriate where the payback is real.
  If an honest-take warning is provided, your HOLD OFF section must be consistent with it — reinforce it, never undercut it.
- Never give implementation detail (which tools, architecture, steps to build). Name WHAT the system does and what it replaces, not HOW to build it. The how is Notivon's paid AI Readiness Audit.
- Never promise results. Estimates are "roughly" and ranges.
- Verdicts: "Build now" (clear payback), "Wait" (fix something first — say what), "Skip" (not worth it — say why).

OUTPUT FORMAT — follow exactly, no preamble, no closing remarks:

## OPPORTUNITY: <short memorable name>
**What it does:** <2-3 sentences, plain language, tied to their words>
**What it replaces:** <the manual work it removes, quoting them where possible>
**Worth roughly:** <hours/week and naira/month range, conservative>
**Effort:** <Simple | Moderate | Serious build> — <one clause why>
**Verdict:** <Build now | Wait — ... | Skip — ...>

(repeat for exactly 3 opportunities, most valuable first)

## HOLD OFF: <name of the thing not to automate yet>
<2-3 sentences: what they might be tempted to automate and the honest reason to wait. If a fix would unblock it, name the fix.>

Stop after the HOLD OFF section. Do not add a cost summary, a closing paragraph, or any remarks — the page shows its own cost figure.`;

const ANSWER_LABELS: Record<string, string> = {
  industry: "Business type",
  industryOther: "Business type (their words)",
  teamSize: "Team size",
  painOther: "Biggest pain (their words)",
  channels: "How customers reach them",
  volume: "Customers/jobs per month",
  timeSinks: "Where the team's time goes",
  waitingOn: "What customers wait on them for",
  afterSale: "What eats time after winning a customer",
  tools: "Current tools",
  dataHome: "Where business data lives",
  pain: "Biggest pain",
  tried: "Already tried",
  adminHours: "Weekly hours on repetitive admin",
};

const BAND_LABEL: Record<string, string> = {
  early: "Early stage — foundations not ready; bias verdicts toward Wait",
  emerging: "Emerging — a mix; roughly one Build now, the rest Wait",
  ready: "Ready — fundamentals hold up; Build now is appropriate where payback is real",
  prime: "Prime candidate — strong fundamentals; two or three Build now is appropriate",
};

function buildUserPrompt(req: MapRequest): string {
  const lines = Object.entries(req.answers)
    // Drop the raw "other" marker — the `*Other` field carries their real words.
    .filter(([k, v]) => k !== "businessDescription" && v != null && v !== "other" && String(v).length > 0)
    .map(([k, v]) => `${ANSWER_LABELS[k] ?? k}: ${Array.isArray(v) ? v.join(", ") : v}`)
    .join("\n");
  const freeText = req.freeText?.trim() ?? "";
  const ownWords = freeText
    ? `\n\nIn their own words, how work moves through the business:\n"""${freeText.slice(0, 2000)}"""`
    : "";

  const band = req.band?.trim().slice(0, 40);
  const bandLine = band
    ? `\n\nReadiness band (from their score — calibrate your verdicts to this): ${BAND_LABEL[band] ?? band}`
    : "";
  const caution = req.caution?.trim();
  const cautionLine = caution
    ? `\n\nThe honest-take warning already shown ABOVE your map (do not contradict it; your HOLD OFF must be consistent with it):\n"""${caution.slice(0, 600)}"""`
    : "";

  return `Questionnaire answers:\n${lines}${ownWords}${bandLine}${cautionLine}\n\nWrite their Opportunity Map now.`;
}

const isValid = (body: unknown): body is MapRequest => {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  const freeTextOk =
    b.freeText === undefined ||
    (typeof b.freeText === "string" && b.freeText.length <= 3000);
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.phone === "string" &&
    typeof b.answers === "object" &&
    b.answers !== null &&
    Object.keys(b.answers as object).length > 0 &&
    freeTextOk &&
    !b.website // honeypot must be empty
  );
};

async function notifyTelegramMap(req: MapRequest, mapText: string, provider: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  const text = `🗺 Opportunity Map (via ${provider}) for ${req.name} (${req.phone}):\n\n${mapText}`.slice(0, 4000);
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  }).catch(() => undefined);
}

interface Upstream {
  body: ReadableStream<Uint8Array>;
  label: string;
  extractDelta: (json: unknown) => string | undefined;
}

/** Opens a streaming completion with the first working provider. */
async function openStream(userPrompt: string): Promise<Upstream | null> {
  for (const p of providers()) {
    if (!p.key) continue;
    try {
      const { url, init } = p.buildRequest(p, SYSTEM_PROMPT, userPrompt);
      const res = await fetch(url, init);
      if (res.ok && res.body) return { body: res.body, label: p.label, extractDelta: p.extractDelta };
      console.error(`provider ${p.label} responded ${res.status}: ${(await res.text()).slice(0, 200)}`);
    } catch (err) {
      console.error(`provider ${p.label} failed:`, err);
    }
  }
  return null;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }
  if (!isValid(body)) return new Response("Invalid request", { status: 400 });
  const mapReq = body;

  const upstream = await openStream(buildUserPrompt(mapReq));
  if (!upstream) return new Response("No provider available", { status: 503 });

  // Re-emit upstream SSE as a plain text stream of content deltas.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let full = "";
  let buffer = "";

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (payload === "[DONE]") continue;
            try {
              const delta = upstream.extractDelta(JSON.parse(payload));
              if (typeof delta === "string" && delta.length > 0) {
                full += delta;
                controller.enqueue(encoder.encode(delta));
              }
            } catch {
              /* partial JSON across chunks — skip */
            }
          }
        }
      } catch (err) {
        console.error("stream error:", err);
      } finally {
        controller.close();
        if (full.trim().length > 100) {
          await notifyTelegramMap(mapReq, full, upstream.label).catch(() => undefined);
        }
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Provider": upstream.label,
    },
  });
};

/* ── Vercel Node.js Adapter (with streaming support) ── */
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

    // Build plain headers object
    const headers: Record<string, string> = {};
    webRes.headers.forEach((v, k) => { headers[k] = v; });

    // If the response body is a stream, pipe it
    if (webRes.body) {
      res.writeHead(webRes.status, headers);
      const reader = webRes.body.getReader();
      const pump = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(value);
        }
        res.end();
      };
      await pump();
    } else {
      const resBody = await webRes.text();
      res.writeHead(webRes.status, headers);
      res.end(resBody);
    }
  } catch (err: any) {
    console.error("Vercel adapter error:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal server error", detail: err.message }));
  }
};
