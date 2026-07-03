import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lock,
  TrendingUp,
  AlertTriangle,
  MessageCircle,
  Eye,
  Sparkles,
} from "lucide-react";
import { QUESTIONS, computeResult, type Answers, type ScorecardResult } from "@/lib/scorecard";
import { emailSchema, phoneSchema, normalizePhone, submitScorecardLead } from "@/lib/leads";
import { EASE } from "@/lib/motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const stepTransition = { duration: 0.35, ease: EASE };

/* ────────────────────────── Question step ────────────────────────── */

const QuestionStep = ({
  step,
  answers,
  onAnswer,
  onNext,
}: {
  step: number;
  answers: Answers;
  onAnswer: (value: string | string[]) => void;
  onNext: () => void;
}) => {
  const q = QUESTIONS[step];
  const selected = answers[q.id];
  const selectedArr = Array.isArray(selected) ? selected : [];

  const toggleMulti = (value: string) => {
    onAnswer(
      selectedArr.includes(value)
        ? selectedArr.filter((v) => v !== value)
        : [...selectedArr, value]
    );
  };

  return (
    <motion.div
      key={q.id}
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -32 }}
      transition={stepTransition}
    >
      <p className="tech-label mb-3">
        Question {q.index} / {QUESTIONS.length}
      </p>
      <h2 className="font-display font-semibold text-2xl sm:text-3xl text-foreground mb-2">
        {q.title}
      </h2>
      {q.hint && <p className="text-sm text-muted-foreground mb-6">{q.hint}</p>}

      <div className="grid gap-2.5 mt-6">
        {q.options.map((opt) => {
          const isSelected = q.multi
            ? selectedArr.includes(opt.value)
            : selected === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => {
                if (q.multi) {
                  toggleMulti(opt.value);
                } else {
                  onAnswer(opt.value);
                  setTimeout(onNext, 220);
                }
              }}
              className={`group flex items-center justify-between text-left px-5 py-4 rounded-md border transition-colors duration-200 ${
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border surface-1 hover:border-primary/40"
              }`}
            >
              <span>
                <span className={`block text-sm font-medium ${isSelected ? "text-foreground" : "text-foreground/90"}`}>
                  {opt.label}
                </span>
                {opt.hint && (
                  <span className="block text-xs text-muted-foreground mt-0.5">{opt.hint}</span>
                )}
              </span>
              <span
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-4 transition-colors ${
                  isSelected ? "border-primary bg-primary" : "border-border"
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
              </span>
            </button>
          );
        })}
      </div>

      {q.multi && (
        <button
          onClick={onNext}
          disabled={selectedArr.length === 0}
          className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};

/* ────────────────────────── Score dial ────────────────────────── */

const ScoreDial = ({ score }: { score: number }) => {
  const r = 64;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative w-44 h-44">
      <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
        <circle cx="80" cy="80" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
        <motion.circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - score / 100) }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-semibold text-5xl text-foreground">{score}</span>
        <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mt-1">
          / 100
        </span>
      </div>
    </div>
  );
};

/* ────────────────────────── Result view ────────────────────────── */

const ResultView = ({
  answers,
  result,
}: {
  answers: Answers;
  result: ScorecardResult;
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const whatsappHref = useMemo(() => {
    const msg = `Hi Hussain, I'm ${name || "a business owner"}. I just took the AI Readiness Scorecard and scored ${result.total}/100 (${result.bandLabel}). I want to talk about what this means for my business.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [name, result]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Tell us your name");
      return;
    }
    const parsedPhone = phoneSchema.safeParse(phone);
    if (!parsedPhone.success) {
      setError(parsedPhone.error.issues[0].message);
      return;
    }
    if (email.trim()) {
      const parsedEmail = emailSchema.safeParse(email);
      if (!parsedEmail.success) {
        setError(parsedEmail.error.issues[0].message);
        return;
      }
    }
    setError(null);
    setSubmitting(true);
    await submitScorecardLead(
      name.trim(),
      normalizePhone(phone)!,
      email.trim() || undefined,
      answers,
      result
    );
    setSubmitting(false);
    setUnlocked(true);
  };

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <p className="tech-label mb-6">Your AI readiness snapshot</p>

      {/* Score + band */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-10">
        <ScoreDial score={result.total} />
        <div>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-foreground mb-3">
            {result.bandLabel}
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-md">{result.bandSummary}</p>
        </div>
      </div>

      {/* Dimensions */}
      <div className="grid sm:grid-cols-3 gap-3 mb-10">
        {result.dimensions.map((d, i) => (
          <div key={d.key} className="surface-1 border border-border rounded-md p-5">
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-xs font-semibold text-foreground">{d.label}</span>
              <span className="font-mono text-sm text-primary">{d.score}</span>
            </div>
            <div className="h-1 rounded-full bg-border overflow-hidden mb-3">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${d.score}%` }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.4 + i * 0.15 }}
              />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{d.note}</p>
          </div>
        ))}
      </div>

      {/* The full read — gated behind name + WhatsApp number */}
      <div className="relative">
        <div
          className={`space-y-10 ${unlocked ? "" : "select-none blur-[7px] pointer-events-none max-h-[560px] overflow-hidden"}`}
          aria-hidden={!unlocked}
        >
          {/* The mirror */}
          <div>
            <p className="tech-label mb-4 flex items-center gap-2">
              <Eye className="w-3.5 h-3.5" /> What your business looks like right now
            </p>
            <div className="surface-1 border border-border rounded-md p-6 sm:p-8">
              <p className="text-base sm:text-lg text-foreground leading-relaxed mb-4">
                {result.narrative.mirror}
              </p>
              {result.narrative.hoursCost && (
                <p className="text-sm text-primary leading-relaxed font-medium">
                  {result.narrative.hoursCost}
                </p>
              )}
            </div>
          </div>

          {/* The after-state */}
          {result.narrative.afterState.length > 0 && (
            <div>
              <p className="tech-label mb-4 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> What the same week looks like with a system
              </p>
              <div className="surface-1 border border-border rounded-md p-6 sm:p-8 space-y-4">
                {result.narrative.afterState.map((line, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-[9px] w-1 h-1 rounded-full bg-primary shrink-0" />
                    <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">{line}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Findings */}
          <div>
            <p className="tech-label mb-4">What we found</p>
            <div className="space-y-3">
              {result.findings.map((f, i) => (
                <div
                  key={i}
                  className={`surface-1 border rounded-md p-6 flex gap-4 ${
                    f.kind === "caution" ? "border-primary/30" : "border-border"
                  }`}
                >
                  {f.kind === "leverage" ? (
                    <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {f.kind === "caution" && (
                        <span className="font-mono text-[10px] uppercase tracking-widest text-primary mr-2">
                          Honest take
                        </span>
                      )}
                      {f.title}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The urgency close */}
          {result.narrative.urgency && (
            <blockquote className="border-l-2 border-primary/50 pl-6">
              <p className="text-base sm:text-lg text-foreground leading-relaxed">
                {result.narrative.urgency}
              </p>
            </blockquote>
          )}
        </div>

        {!unlocked && (
          <div className="absolute inset-0 top-10 flex items-start justify-center">
            <form
              onSubmit={handleUnlock}
              className="w-full max-w-md surface-3 border border-border rounded-lg p-6 sm:p-8 shadow-2xl mt-8"
            >
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">Unlock your full breakdown</p>
              </div>
              <p className="text-xs text-muted-foreground mb-5">
                A plain-language read of your operation: what it looks like now, what
                it could look like with a system, and the honest take on what{" "}
                <em>not</em> to automate.
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full mb-2.5 px-4 py-3 rounded-md bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:border-primary outline-none"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="WhatsApp number (e.g. 0901 439 0149)"
                required
                className="w-full mb-2.5 px-4 py-3 rounded-md bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:border-primary outline-none"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (optional)"
                className="w-full mb-2.5 px-4 py-3 rounded-md bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:border-primary outline-none"
              />
              {error && <p className="text-xs text-destructive mb-2">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {submitting ? "Unlocking…" : "Show my full breakdown"}
              </button>
              <p className="text-[11px] text-muted-foreground mt-3 text-center">
                We'll only message you about your results — no spam, no broadcast lists.
              </p>
            </form>
          </div>
        )}
      </div>

      {/* Audit upsell — the gap the scorecard deliberately leaves */}
      {unlocked && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          className="mt-12 border border-primary/30 rounded-lg p-8 sm:p-10 surface-2"
        >
          <p className="tech-label mb-4">The next step</p>
          <h3 className="font-display font-semibold text-2xl sm:text-3xl text-foreground mb-4">
            This is your snapshot. The map costs a conversation.
          </h3>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mb-8">
            You've seen what the week looks like and what it's costing. The AI
            Readiness Audit goes inside your actual workflows and hands you the
            plan: what to automate first, what to skip, what it costs, and what
            it returns. Message Hussain directly — your score is already in the
            message, so the conversation starts where this page ends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Message Hussain on WhatsApp
            </a>
            <Link
              to="/audit"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-border text-foreground font-semibold text-sm rounded-md hover:border-primary/50 hover:text-primary transition-colors"
            >
              See what the Audit covers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

/* ────────────────────────── Flow controller ────────────────────────── */

const ScorecardFlow = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const result = useMemo(() => (done ? computeResult(answers) : null), [done, answers]);
  const progress = done ? 100 : (step / QUESTIONS.length) * 100;

  const q = QUESTIONS[step];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="h-0.5 rounded-full bg-border overflow-hidden mb-12">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: EASE }}
        />
      </div>

      <AnimatePresence mode="wait">
        {done && result ? (
          <ResultView answers={answers} result={result} />
        ) : (
          <QuestionStep
            step={step}
            answers={answers}
            onAnswer={(value) => setAnswers((a) => ({ ...a, [q.id]: value }))}
            onNext={() => {
              if (step < QUESTIONS.length - 1) setStep(step + 1);
              else setDone(true);
            }}
          />
        )}
      </AnimatePresence>

      {!done && step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      )}
    </div>
  );
};

export default ScorecardFlow;
