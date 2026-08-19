import type { Answers } from "./scorecard";

/* Client for the opportunity-map function: streams the generated map and
   parses it into renderable sections as it arrives. */

/** For opportunity cards: the `**Label:**` lines pulled into fields so the UI
    can render verdict/worth as chips instead of a wall of bold text. Any field
    may be missing while the section is still streaming in. */
export interface OpportunityFields {
  whatItDoes?: string;
  whatItReplaces?: string;
  worth?: string;
  effort?: string;
  verdict?: string;
}

export interface MapSection {
  kind: "opportunity" | "holdoff" | "cost";
  title: string;
  body: string;
  fields?: OpportunityFields; // only on opportunity sections
}

const FIELD_PATTERNS: [keyof OpportunityFields, RegExp][] = [
  ["whatItDoes", /\*\*\s*What it does\s*:\*\*/i],
  ["whatItReplaces", /\*\*\s*What it replaces\s*:\*\*/i],
  ["worth", /\*\*\s*Worth roughly\s*:\*\*/i],
  ["effort", /\*\*\s*Effort\s*:\*\*/i],
  ["verdict", /\*\*\s*Verdict\s*:\*\*/i],
];

/** Splits an opportunity body's `**Label:** value` lines into fields. Returns
    empty fields (caller falls back to raw body) if nothing matched yet. */
function parseOpportunityFields(body: string): OpportunityFields {
  const fields: OpportunityFields = {};
  for (const line of body.split(/\n+/)) {
    for (const [key, re] of FIELD_PATTERNS) {
      if (re.test(line)) {
        fields[key] = line.replace(re, "").trim();
        break;
      }
    }
  }
  return fields;
}

/** Parses the streamed text (sections delimited by lines starting "## ")
    into cards. Safe to call repeatedly on a growing buffer. */
export function parseMap(text: string): MapSection[] {
  const sections: MapSection[] = [];
  const parts = text.split(/^## +/m).filter((p) => p.trim().length > 0);
  for (const part of parts) {
    const newline = part.indexOf("\n");
    const heading = (newline === -1 ? part : part.slice(0, newline)).trim();
    const body = newline === -1 ? "" : part.slice(newline + 1).trim();
    if (/^OPPORTUNITY\s*:/i.test(heading)) {
      sections.push({
        kind: "opportunity",
        title: heading.replace(/^OPPORTUNITY\s*:\s*/i, ""),
        body,
        fields: parseOpportunityFields(body),
      });
    } else if (/^HOLD OFF\s*:?/i.test(heading)) {
      sections.push({ kind: "holdoff", title: heading.replace(/^HOLD OFF\s*:\s*/i, ""), body });
    } else if (/^THE COST OF WAITING/i.test(heading)) {
      // Legacy: older responses may still emit this; we simply don't render it.
      sections.push({ kind: "cost", title: "The cost of waiting", body });
    }
  }
  return sections;
}

/** First opportunity name, for the WhatsApp prefill. */
export function firstOpportunityName(text: string): string | null {
  const m = text.match(/^## +OPPORTUNITY\s*:\s*(.+)$/m);
  return m ? m[1].trim() : null;
}

// (cost-of-waiting text is no longer surfaced — the result page shows its own
// deterministic money figure instead, so there's no second, divergent number.)

/** Streams the map; calls onChunk with the full accumulated text each time.
    Resolves with the final text, or throws if generation failed/unavailable. */
export async function streamOpportunityMap(
  name: string,
  phone: string,
  answers: Answers,
  freeText: string,
  onChunk: (fullText: string) => void,
  calibration: { band: string; caution?: string },
  signal?: AbortSignal
): Promise<string> {
  const res = await fetch("/api/opportunity-map", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      phone,
      answers,
      freeText,
      band: calibration.band,
      caution: calibration.caution,
    }),
    signal,
  });
  if (!res.ok || !res.body) throw new Error(`map generation unavailable (${res.status})`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let full = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    full += decoder.decode(value, { stream: true });
    onChunk(full);
  }
  if (full.trim().length < 100) throw new Error("map generation returned empty");
  return full;
}
