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
  website?: string; // honeypot — always empty for real submits
}

async function postLead(lead: ScorecardLead): Promise<boolean> {
  try {
    const res = await fetch("/api/scorecard-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Guards against the same browser firing duplicate lead notifications for one
    phone in a short window (double-click, back-and-resubmit). Bots are handled
    by the honeypot, not this; server-side dedupe needs a persistent store. */
const DEDUPE_KEY = "notivon:lastLeadPhone";
const DEDUPE_WINDOW_MS = 10 * 60 * 1000;
function isDuplicateSubmit(phone: string): boolean {
  try {
    const raw = localStorage.getItem(DEDUPE_KEY);
    if (raw) {
      const { phone: last, at } = JSON.parse(raw) as { phone: string; at: number };
      if (last === phone && Date.now() - at < DEDUPE_WINDOW_MS) return true;
    }
    localStorage.setItem(DEDUPE_KEY, JSON.stringify({ phone, at: Date.now() }));
  } catch {
    /* private mode / storage disabled — just let it through */
  }
  return false;
}

/** Posts a scorecard lead to the Netlify function. Non-fatal on failure —
    the visitor still gets their result; the caller queues a retry so the lead
    is never silently dropped. */
export async function submitScorecardLead(
  name: string,
  phone: string,
  email: string | undefined,
  answers: Answers,
  result: ScorecardResult,
  website?: string
): Promise<boolean> {
  if (isDuplicateSubmit(phone)) return true; // already delivered moments ago

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
    website: website || undefined,
  };

  return postLead(lead);
}

/* ── Failed-lead retry queue ──
   A dropped lead is lost revenue, so failures are parked in localStorage and
   flushed on the next page load or successful submit, rather than vanishing. */

const QUEUE_KEY = "notivon:leadQueue";

function readQueue(): ScorecardLead[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) ?? "[]") as ScorecardLead[];
  } catch {
    return [];
  }
}

function writeQueue(queue: ScorecardLead[]): void {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue.slice(-20)));
  } catch {
    /* storage unavailable — nothing we can do */
  }
}

export function queueFailedLead(
  name: string,
  phone: string,
  email: string | undefined,
  answers: Answers,
  result: ScorecardResult
): void {
  const queue = readQueue();
  queue.push({
    name,
    phone,
    email,
    answers,
    answersReadable: formatAnswersReadable(answers),
    total: result.total,
    band: result.band,
    submittedAt: new Date().toISOString(),
    source: "scorecard-retry",
  });
  writeQueue(queue);
}

/** Re-posts any parked leads. Call on page load and after a successful submit. */
export async function flushQueuedLeads(): Promise<void> {
  const queue = readQueue();
  if (queue.length === 0) return;
  const stillFailing: ScorecardLead[] = [];
  for (const lead of queue) {
    const ok = await postLead(lead);
    if (!ok) stillFailing.push(lead);
  }
  writeQueue(stillFailing);
}
