/* AI Readiness Scorecard — question config + scoring engine.
   Scoring is deliberately honest both ways: it surfaces high-leverage
   automation candidates AND tells people when NOT to automate yet.
   That honesty is the brand promise, and it's what makes the paid
   audit feel credible rather than a sales trick. */

export type QuestionId =
  | "industry"
  | "teamSize"
  | "channels"
  | "volume"
  | "timeSinks"
  | "waitingOn"
  | "afterSale"
  | "tools"
  | "dataHome"
  | "pain"
  | "tried"
  | "adminHours";

export interface Option {
  value: string;
  label: string;
  hint?: string;
}

export interface Question {
  id: QuestionId;
  index: number;
  title: string;
  hint?: string;
  multi?: boolean;
  options: Option[];
}

export type Answers = Partial<Record<QuestionId, string | string[]>> & {
  /** When they pick "Something else" on a single-select question, what they
      typed. Keyed as `${questionId}Other`. */
  industryOther?: string;
  painOther?: string;
  /** Their own free-text description of how work moves through the business —
      optional extra colour for the AI-generated Opportunity Map. */
  businessDescription?: string;
};

export const QUESTIONS: Question[] = [
  {
    id: "industry",
    index: 1,
    title: "What kind of business do you run?",
    options: [
      { value: "commerce", label: "Retail / e-commerce" },
      { value: "professional-services", label: "Professional services", hint: "Law, accounting, consulting, agencies" },
      { value: "hospitality", label: "Food & hospitality", hint: "Restaurant, catering, hotel" },
      { value: "health", label: "Health & wellness", hint: "Clinic, pharmacy, spa" },
      { value: "beauty", label: "Beauty & personal care", hint: "Salon, barber, cosmetics" },
      { value: "real-estate", label: "Real estate / property" },
      { value: "education", label: "Education / training" },
      { value: "logistics", label: "Logistics / delivery" },
      { value: "visa-travel", label: "Visa / travel agency" },
      { value: "customs", label: "Customs clearing" },
      { value: "other", label: "Something else", hint: "Tell us in a few words" },
    ],
  },
  {
    id: "teamSize",
    index: 2,
    title: "How many people work in the business?",
    options: [
      { value: "solo", label: "Just me, or up to 5" },
      { value: "small", label: "6 – 20" },
      { value: "mid", label: "21 – 50" },
      { value: "large", label: "50+" },
    ],
  },
  {
    id: "channels",
    index: 3,
    title: "How do customers usually reach you?",
    hint: "Pick every way they come in.",
    multi: true,
    options: [
      { value: "whatsapp", label: "WhatsApp" },
      { value: "calls", label: "Phone calls" },
      { value: "social", label: "Instagram / social DMs" },
      { value: "walk-in", label: "Walk-in / in person" },
      { value: "website", label: "Website / online form" },
      { value: "referrals", label: "Referrals / word of mouth" },
    ],
  },
  {
    id: "volume",
    index: 4,
    title: "Roughly how many customers or jobs do you handle a month?",
    options: [
      { value: "tiny", label: "Under 20" },
      { value: "small", label: "20 – 100" },
      { value: "medium", label: "100 – 500" },
      { value: "large", label: "500+" },
    ],
  },
  {
    id: "timeSinks",
    index: 5,
    title: "Where does your team's time actually go?",
    hint: "Pick everything that eats real hours.",
    multi: true,
    options: [
      { value: "data-entry", label: "Manual data entry & re-typing" },
      { value: "status-chasing", label: "Chasing clients / status updates" },
      { value: "documents", label: "Collecting & checking documents" },
      { value: "reporting", label: "Building reports by hand" },
      { value: "lead-followup", label: "Following up leads" },
      { value: "scheduling", label: "Scheduling & coordination" },
    ],
  },
  {
    id: "waitingOn",
    index: 6,
    title: "What do your customers most often wait on you for?",
    hint: "The things they message and call about.",
    multi: true,
    options: [
      { value: "updates", label: "Status updates" },
      { value: "documents", label: "Documents / paperwork" },
      { value: "quotes", label: "Quotes / pricing" },
      { value: "appointments", label: "Appointments / scheduling" },
      { value: "delivery", label: "Delivery / fulfilment" },
      { value: "repeat-questions", label: "Answers to the same questions" },
    ],
  },
  {
    id: "afterSale",
    index: 7,
    title: "Once you've won a customer, what eats the most time?",
    hint: "The work that happens after they say yes.",
    multi: true,
    options: [
      { value: "onboarding", label: "Onboarding / collecting their info" },
      { value: "fulfilment", label: "Doing the actual work" },
      { value: "invoicing", label: "Invoicing / chasing payment" },
      { value: "followup", label: "Follow-up / repeat business" },
      { value: "handovers", label: "Handovers between the team" },
    ],
  },
  {
    id: "tools",
    index: 8,
    title: "What runs the business today?",
    options: [
      { value: "chat-paper", label: "WhatsApp, calls & paper", hint: "It works, until it doesn't" },
      { value: "spreadsheets", label: "Spreadsheets everywhere" },
      { value: "generic-saas", label: "A CRM or project tool", hint: "Off-the-shelf, partly fits" },
      { value: "custom", label: "Some custom software already" },
    ],
  },
  {
    id: "dataHome",
    index: 9,
    title: "If you needed a client's full history right now, where is it?",
    options: [
      { value: "scattered", label: "Scattered — chats, paper, memory" },
      { value: "spreadsheets", label: "In spreadsheets, mostly findable" },
      { value: "one-tool", label: "In one main tool" },
      { value: "structured", label: "In organised databases" },
    ],
  },
  {
    id: "pain",
    index: 10,
    title: "What's the pain that made you take this?",
    options: [
      { value: "losing-leads", label: "Leads slip through the cracks" },
      { value: "errors-deadlines", label: "Errors & missed deadlines" },
      { value: "cant-scale", label: "Can't grow without hiring more" },
      { value: "no-visibility", label: "No visibility on what's happening" },
      { value: "other", label: "Something else", hint: "Tell us in your own words" },
    ],
  },
  {
    id: "tried",
    index: 11,
    title: "What have you already tried?",
    options: [
      { value: "nothing", label: "Nothing yet — this is the start" },
      { value: "saas-didnt-fit", label: "Off-the-shelf tools that didn't fit" },
      { value: "freelancers", label: "Developers / freelancers" },
      { value: "internal", label: "Built our own spreadsheets & hacks" },
    ],
  },
  {
    id: "adminHours",
    index: 12,
    title: "Roughly how many hours a week does the team lose to repetitive admin?",
    options: [
      { value: "low", label: "Under 5 hours" },
      { value: "medium", label: "5 – 15 hours" },
      { value: "high", label: "15 – 40 hours" },
      { value: "extreme", label: "40+ hours", hint: "That's a full-time salary" },
    ],
  },
];

export interface Finding {
  kind: "leverage" | "caution";
  title: string;
  detail: string;
}

/** The personalised story told back to them — the part that makes the
    result feel like we already know their business. */
export interface Narrative {
  mirror: string; // their current week, reflected back from their answers
  hoursCost: string; // the repetitive-admin cost, annualised
  afterState: string[]; // before→after lines for the time sinks they picked
  urgency: string; // pain-specific close
}

export interface Dimension {
  key: "automation" | "data" | "process";
  label: string;
  score: number; // 0–100
  note: string;
}

export interface ScorecardResult {
  total: number; // 0–100
  band: "early" | "emerging" | "ready" | "prime";
  bandLabel: string;
  bandSummary: string;
  dimensions: Dimension[];
  findings: Finding[];
  narrative: Narrative;
}

const clamp = (n: number) => Math.max(4, Math.min(97, Math.round(n)));

/* ── Deterministic "money leaking" figure ──
   Powers the hero stat and the CTA line, so a real number always shows even
   when the AI map fails. Built on the same assumption the system prompt uses:
   a junior admin hour costs ₦1,500–₦3,000. Representative weekly hours per
   band × 4.33 weeks × the rate range, nudged mildly by monthly volume. */

export interface MonthlyLoss {
  low: number;
  high: number;
  display: string; // e.g. "₦175,000 – ₦350,000"
}

const WEEKLY_HOURS: Record<string, number> = { low: 3, medium: 10, high: 27, extreme: 50 };
const VOLUME_MULT: Record<string, number> = { tiny: 0.9, small: 1, medium: 1.15, large: 1.3 };
const round1k = (n: number) => Math.round(n / 1000) * 1000;
const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

export function estimatedMonthlyLoss(answers: Answers): MonthlyLoss {
  const hours = WEEKLY_HOURS[answers.adminHours as string] ?? WEEKLY_HOURS.medium;
  const mult = VOLUME_MULT[answers.volume as string] ?? 1;
  const monthly = hours * 4.33 * mult;
  const low = round1k(monthly * 1500);
  const high = round1k(monthly * 3000);
  return { low, high, display: `${naira(low)} – ${naira(high)}` };
}

const TIME_SINK_LEVERAGE: Record<string, { title: string; detail: string }> = {
  "data-entry": {
    title: "Manual data entry is your clearest automation win",
    detail: "Re-typing the same information between chats, forms, and records is exactly what AI-powered intake removes — it's usually the fastest payback of anything on this list.",
  },
  "status-chasing": {
    title: "Status updates shouldn't need a human",
    detail: "Automated client updates (e.g. over WhatsApp) turn hours of \"any news?\" messages into zero. This is a proven pattern in businesses like yours.",
  },
  documents: {
    title: "Document collection & checking is high-leverage",
    detail: "Checklist-driven intake with automatic verification catches missing or expiring documents before they cost you — a strong candidate for an early build.",
  },
  reporting: {
    title: "Hand-built reports are automatable today",
    detail: "If the data exists anywhere structured, live dashboards replace report-building entirely. Low effort, immediate visibility.",
  },
  "lead-followup": {
    title: "Lead follow-up is where revenue is leaking",
    detail: "Automated, well-timed follow-up recovers the leads that currently go quiet. This is usually measurable in revenue within weeks.",
  },
  scheduling: {
    title: "Coordination overhead can be systemised",
    detail: "Shared pipelines and automatic reminders remove most back-and-forth. Worth doing, though usually after the bigger wins above.",
  },
};

/* ── Narrative fragments, keyed by answers ── */

const INDUSTRY_LABEL: Record<string, string> = {
  commerce: "retail / e-commerce business",
  "professional-services": "professional services firm",
  hospitality: "food & hospitality business",
  health: "health & wellness business",
  beauty: "beauty & personal care business",
  "real-estate": "real estate business",
  education: "education / training business",
  logistics: "logistics / delivery business",
  "visa-travel": "visa & travel agency",
  customs: "customs clearing business",
  other: "business",
};

const TEAM_LABEL: Record<string, string> = {
  solo: "a lean operation of five people or fewer",
  small: "a team of 6–20 people",
  mid: "a team of 21–50 people",
  large: "a team of over 50 people",
};

const TOOLS_LABEL: Record<string, string> = {
  "chat-paper": "held together by WhatsApp, phone calls and paper",
  spreadsheets: "run on spreadsheets",
  "generic-saas": "run on an off-the-shelf tool that only partly fits",
  custom: "already running some custom software",
};

const DATA_LABEL: Record<string, string> = {
  scattered:
    "when someone needs a client's full history, it lives across chats, paper and people's memories",
  spreadsheets:
    "when someone needs a client's full history, it's in spreadsheets — usually findable, sometimes not",
  "one-tool": "client history at least lives in one main tool",
  structured: "client records are properly organised",
};

const SINK_MIRROR: Record<string, string> = {
  "data-entry": "re-typing the same information between chats, forms and records",
  "status-chasing": "answering “any update?” messages one by one",
  documents: "collecting and checking documents by hand",
  reporting: "building reports manually",
  "lead-followup": "chasing leads that go quiet",
  scheduling: "coordinating who does what over back-and-forth messages",
};

const SINK_AFTER: Record<string, string> = {
  "data-entry":
    "Information gets typed once — at intake — and flows everywhere it's needed. Nobody re-types anything.",
  "status-chasing":
    "Clients get an automatic WhatsApp update the moment their status changes. The “any news?” messages simply stop.",
  documents:
    "Every job carries a live checklist that flags what's missing or about to expire — before it becomes the client's angry phone call.",
  reporting:
    "A live dashboard shows the numbers at any moment. Report day stops existing.",
  "lead-followup":
    "Every lead gets followed up on time, automatically, until they answer or say no. None go quiet by accident.",
  scheduling:
    "Reminders and a shared pipeline coordinate the team. The coordination messages mostly disappear.",
};

const HOURS_COST: Record<string, string> = {
  low: "That's still 200+ hours a year of skilled people doing robot work.",
  medium:
    "Annualised, that's roughly 250–780 hours a year — weeks of full-time work spent on tasks a system would do silently in the background.",
  high:
    "Annualised, that's roughly 800–2,000 hours a year. At the top of that range you are paying an entire full-time salary for work a system does without being asked.",
  extreme:
    "Annualised, that's over 2,000 hours a year — more than one full-time employee doing nothing but repetitive admin. You are already paying for the system; you're just paying it in salaries.",
};

const PAIN_URGENCY: Record<string, string> = {
  "losing-leads":
    "And here's the part that stings: every week this stays manual, leads you already worked (or paid) to attract are quietly going to whoever replies first. The cost isn't the admin hours — it's the deals you never saw slip.",
  "errors-deadlines":
    "And at this volume of manual handling, the next missed deadline or wrong entry isn't a maybe — it's a when. The question is only whether it lands on a small client or your biggest one.",
  "cant-scale":
    "Right now, the only way you grow is hiring more people to do more manual work — which means your costs grow exactly as fast as your revenue. The businesses that break that ceiling are the ones that systemise first, then scale.",
  "no-visibility":
    "Right now you find out about problems after they've cost you — because nothing is watching the operation while you're not. Visibility isn't a luxury; it's the difference between fixing things and paying for them.",
};

function buildNarrative(answers: Answers, timeSinks: string[]): Narrative {
  const industry =
    answers.industry === "other" && answers.industryOther?.trim()
      ? answers.industryOther.trim()
      : INDUSTRY_LABEL[answers.industry as string] ?? "business";
  const team = TEAM_LABEL[answers.teamSize as string] ?? "a team";
  const tools = TOOLS_LABEL[answers.tools as string] ?? "";
  const data = DATA_LABEL[answers.dataHome as string] ?? "";

  const sinkPhrases = timeSinks.map((s) => SINK_MIRROR[s]).filter(Boolean);
  const sinkSentence =
    sinkPhrases.length > 0
      ? sinkPhrases.length === 1
        ? sinkPhrases[0]
        : sinkPhrases.slice(0, -1).join(", ") + " and " + sinkPhrases[sinkPhrases.length - 1]
      : "repetitive admin";

  const hoursLabel: Record<string, string> = {
    low: "a few hours",
    medium: "5–15 hours",
    high: "15–40 hours",
    extreme: "40+ hours",
  };
  const hours = hoursLabel[answers.adminHours as string] ?? "hours";

  const mirror =
    `Here's your operation from the outside: a ${industry}, ${team}, ${tools}. ` +
    `Every week, ${hours} of your team's time goes into ${sinkSentence}. ` +
    `And ${data}.`;

  return {
    mirror,
    hoursCost: HOURS_COST[answers.adminHours as string] ?? "",
    afterState: timeSinks.map((s) => SINK_AFTER[s]).filter(Boolean),
    urgency: PAIN_URGENCY[answers.pain as string] ?? "",
  };
}

export function computeResult(answers: Answers): ScorecardResult {
  const timeSinks = (answers.timeSinks as string[]) ?? [];
  const tools = answers.tools as string;
  const dataHome = answers.dataHome as string;
  const adminHours = answers.adminHours as string;
  const tried = answers.tried as string;
  const teamSize = answers.teamSize as string;
  const pain = answers.pain as string;

  // ── Automation potential: how much automatable work exists ──
  const hoursScore = { low: 25, medium: 55, high: 80, extreme: 95 }[adminHours] ?? 50;
  const sinkScore = Math.min(100, timeSinks.length * 18);
  const automation = clamp(hoursScore * 0.6 + sinkScore * 0.4);

  // ── Data readiness: can systems actually plug in ──
  const dataScore = { scattered: 22, spreadsheets: 48, "one-tool": 70, structured: 90 }[dataHome] ?? 40;
  const toolScore = { "chat-paper": 25, spreadsheets: 45, "generic-saas": 65, custom: 85 }[tools] ?? 40;
  const data = clamp(dataScore * 0.65 + toolScore * 0.35);

  // ── Process maturity: is there a repeatable process to systemise ──
  const triedScore = { nothing: 35, "saas-didnt-fit": 60, freelancers: 65, internal: 75 }[tried] ?? 45;
  const sizeScore = { solo: 45, small: 65, mid: 75, large: 80 }[teamSize] ?? 50;
  const process = clamp(triedScore * 0.55 + sizeScore * 0.45);

  const total = clamp(automation * 0.45 + data * 0.3 + process * 0.25);

  const band =
    total < 40 ? "early" : total < 60 ? "emerging" : total < 80 ? "ready" : "prime";

  const bandMeta = {
    early: {
      label: "Early stage",
      summary:
        "There's real potential here, but jumping straight into AI would likely waste money. The groundwork comes first — and it's cheaper than you think.",
    },
    emerging: {
      label: "Emerging",
      summary:
        "Parts of your operation are ready for automation today; others need their foundations fixed first. Sequencing is everything at this stage.",
    },
    ready: {
      label: "Ready",
      summary:
        "Your operation has clear, high-return automation candidates right now. The question isn't whether AI helps — it's which build pays back first.",
    },
    prime: {
      label: "Prime candidate",
      summary:
        "You're leaving significant money on the table every week. Businesses at this level typically see automation pay for itself within the first quarter.",
    },
  }[band];

  // ── Findings: honest both ways ──
  const findings: Finding[] = [];

  // Top 2 leverage findings from selected time sinks (config order = priority)
  const ordered = ["data-entry", "lead-followup", "documents", "status-chasing", "reporting", "scheduling"];
  ordered
    .filter((s) => timeSinks.includes(s))
    .slice(0, 2)
    .forEach((s) => findings.push({ kind: "leverage", ...TIME_SINK_LEVERAGE[s] }));

  // Cautions — where NOT to automate yet
  if (dataHome === "scattered") {
    findings.push({
      kind: "caution",
      title: "Don't buy AI tools yet — your data isn't ready for them",
      detail: "With records scattered across chats and paper, most AI tools will underdeliver. The first move is a system that captures information once, in one place. Automation comes right after — and works far better for it.",
    });
  } else if (adminHours === "low") {
    findings.push({
      kind: "caution",
      title: "Be selective — your repetitive workload is still light",
      detail: "Under 5 hours a week of admin means broad automation won't pay back fast. One narrow, well-chosen fix beats a platform. Don't let anyone sell you more than that.",
    });
  } else if (tools === "generic-saas" && pain === "cant-scale") {
    findings.push({
      kind: "caution",
      title: "Another off-the-shelf tool won't fix this",
      detail: "You've hit the ceiling of generic software — the bottleneck is that your process doesn't fit the template. The fix is shaping the system around the process, not adding another subscription.",
    });
  } else if (tried === "saas-didnt-fit") {
    findings.push({
      kind: "caution",
      title: "The tools weren't the problem — the fit was",
      detail: "Off-the-shelf software failing you doesn't mean automation doesn't work for your business. It means your workflow needs a system shaped around it, not the other way round.",
    });
  } else {
    findings.push({
      kind: "caution",
      title: "Not everything on your list should be automated",
      detail: "At least one of the areas you flagged is likely cheaper to fix with process than with software. Knowing which one is exactly what a proper audit separates.",
    });
  }

  return {
    total,
    band,
    bandLabel: bandMeta.label,
    bandSummary: bandMeta.summary,
    dimensions: [
      {
        key: "automation",
        label: "Automation potential",
        score: automation,
        note:
          automation >= 60
            ? "Significant repetitive work that systems can absorb."
            : "Moderate automatable workload — pick targets carefully.",
      },
      {
        key: "data",
        label: "Data readiness",
        score: data,
        note:
          data >= 60
            ? "Your information is structured enough to build on."
            : "Where your data lives is the first thing to fix.",
      },
      {
        key: "process",
        label: "Process maturity",
        score: process,
        note:
          process >= 60
            ? "Repeatable processes exist — they can be systemised."
            : "Processes live in people's heads more than on paper.",
      },
    ],
    findings,
    narrative: buildNarrative(answers, timeSinks),
  };
}
