import { z } from "zod";
import type { Answers, ScorecardResult } from "./scorecard";

export const emailSchema = z.string().trim().email("Enter a valid email address");

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
