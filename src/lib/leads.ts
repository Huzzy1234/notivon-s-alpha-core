import { z } from "zod";
import { QUESTIONS, type Answers, type ScorecardResult } from "./scorecard";

export const emailSchema = z.string().trim().email("Enter a valid email address");

/* ── Human-readable answer summary for the lead notification ──
   So Hussain's Telegram/email/Airtable show real labels ("Business type:
   Retail / e-commerce") instead of raw slugs, plus whatever they typed for
   any "Something else" — enough to open the conversation properly. */

const QUESTION_LABEL: Record<string, string> = {
  industry: "Business type",
  teamSize: "Team size",
  channels: "How customers reach them",
  volume: "Customers/jobs per month",
  timeSinks: "Where the team's time goes",
  waitingOn: "Customers wait on them for",
  afterSale: "After winning a customer",
  tools: "Runs on today",
  dataHome: "Client history lives",
  pain: "Biggest pain",
  tried: "Already tried",
  adminHours: "Weekly hours on admin",
};

const optionLabel = (qid: string, value: string): string =>
  QUESTIONS.find((q) => q.id === qid)?.options.find((o) => o.value === value)?.label ?? value;

export function formatAnswersReadable(answers: Answers): string {
  const record = answers as Record<string, unknown>;
  const lines: string[] = [];
  for (const q of QUESTIONS) {
    const v = answers[q.id];
    if (v == null || (Array.isArray(v) && v.length === 0)) continue;
    let display: string;
    if (Array.isArray(v)) {
      display = v.map((x) => optionLabel(q.id, x)).join(", ");
    } else if (v === "other") {
      const typed = record[`${q.id}Other`];
      display = typed ? `Something else — “${typed}”` : "Something else";
    } else {
      display = optionLabel(q.id, v as string);
    }
    lines.push(`${QUESTION_LABEL[q.id] ?? q.id}: ${display}`);
  }
  const note = answers.businessDescription?.trim();
  if (note) lines.push(`Note (their words): “${note}”`);
  return lines.join("\n");
}

/** Accepts Nigerian formats (0901..., +234901..., 234901...) and general
    international numbers. Returns digits-only (with country code when given). */
export function normalizePhone(raw: string): string | null {
  const cleaned = raw.replace(/[\s\-().]/g, "");
  const match = cleaned.match(/^\+?(\d{10,15})$/);
  if (!match) return null;
  return match[1];
}

export const phoneSchema = z
  .string()
  .trim()
  .refine((v) => normalizePhone(v) !== null, "Enter a valid WhatsApp number");

export interface ScorecardLead {
  name: string;
  phone: string;
  email?: string;
  answers: Answers;
  answersReadable: string;
  total: number;
  band: string;
  submittedAt: string;
  source: string;
}

/** Posts a scorecard lead to the Netlify function. Non-fatal on failure —
    the visitor still gets their result; we just log the miss. */
export async function submitScorecardLead(
  name: string,
  phone: string,
  email: string | undefined,
  answers: Answers,
  result: ScorecardResult
): Promise<boolean> {
  const lead: ScorecardLead = {
    name,
    phone,
    email,
    answers,
    answersReadable: formatAnswersReadable(answers),
    total: result.total,
    band: result.band,
    submittedAt: new Date().toISOString(),
    source: "scorecard",
  };

  try {
    const res = await fetch("/.netlify/functions/scorecard-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    return res.ok;
  } catch {
    return false;
  }
}
