import { Lightbulb, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { parseMap, type MapSection, type OpportunityFields } from "@/lib/opportunity-map";

/* Renders the streamed Opportunity Map as cards. Re-parses on every chunk,
   so cards materialise one by one while the model is still writing. The
   cost-of-waiting section is handled by the result page's CTA, not here. */

/** Minimal markdown: **bold** + line breaks. Used only as a fallback while a
    card's structured fields haven't finished streaming. */
const renderBody = (body: string) =>
  body.split(/\n+/).map((para, i) => (
    <p key={i} className="text-sm text-muted-foreground leading-relaxed [&>strong]:text-foreground">
      {para.split(/(\*\*[^*]+\*\*)/g).map((piece, j) =>
        piece.startsWith("**") && piece.endsWith("**") ? (
          <strong key={j} className="font-semibold">{piece.slice(2, -2)}</strong>
        ) : (
          piece
        )
      )}
    </p>
  ));

/* ── Verdict pill ── */

type VerdictTone = "build" | "wait" | "skip";

const toneOf = (head: string): VerdictTone => {
  const h = head.toLowerCase();
  if (h.startsWith("build")) return "build";
  if (h.startsWith("wait")) return "wait";
  return "skip";
};

const TONE_CLASS: Record<VerdictTone, string> = {
  build: "text-primary bg-primary/10 border-primary/30",
  wait: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  skip: "text-muted-foreground bg-muted/40 border-border",
};

const VerdictPill = ({ verdict }: { verdict: string }) => {
  const [head] = verdict.split(/\s*[—–-]\s*/);
  const tone = toneOf(head);
  return (
    <span
      className={`shrink-0 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border ${TONE_CLASS[tone]}`}
    >
      {head.trim()}
    </span>
  );
};

/* ── Opportunity card ── */

const OpportunityCard = ({
  title,
  index,
  fields,
  body,
}: {
  title: string;
  index: number;
  fields: OpportunityFields;
  body: string;
}) => {
  const structured = Boolean(fields.whatItDoes || fields.worth || fields.verdict);
  const reason = fields.verdict ? fields.verdict.split(/\s*[—–-]\s*/).slice(1).join(" — ").trim() : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="surface-1 border border-border rounded-md p-6 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <Lightbulb className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
          <span className="tech-label">Opportunity {String(index + 1).padStart(2, "0")}</span>
        </div>
        {fields.verdict && <VerdictPill verdict={fields.verdict} />}
      </div>

      <h4 className="font-display font-semibold text-lg sm:text-xl text-foreground mb-3">{title}</h4>

      {structured ? (
        <>
          {fields.whatItDoes && (
            <p className="text-sm text-muted-foreground leading-relaxed">{fields.whatItDoes}</p>
          )}
          {fields.whatItReplaces && (
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              <span className="text-foreground/80 font-medium">Replaces:</span> {fields.whatItReplaces}
            </p>
          )}
          {reason && (
            <p className="text-sm text-foreground/70 leading-relaxed mt-2 italic">{reason}</p>
          )}
          {(fields.worth || fields.effort) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {fields.worth && (
                <span className="text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-md px-3 py-1.5">
                  Worth {fields.worth}
                </span>
              )}
              {fields.effort && (
                <span className="text-xs text-muted-foreground bg-muted/40 border border-border rounded-md px-3 py-1.5">
                  {fields.effort}
                </span>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-2.5">{renderBody(body)}</div>
      )}
    </motion.div>
  );
};

/* ── Hold-off card ── */

const HoldOffCard = ({ title, body }: { title: string; body: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="surface-1 border border-primary/30 rounded-md p-6 sm:p-8"
  >
    <div className="flex items-center gap-2 mb-3">
      <AlertTriangle className="w-4 h-4 text-primary" strokeWidth={1.5} />
      <span className="tech-label">Honest take — hold off</span>
    </div>
    <h4 className="font-display font-semibold text-lg sm:text-xl text-foreground mb-3">{title}</h4>
    <div className="space-y-2.5">{renderBody(body)}</div>
  </motion.div>
);

const OpportunityMap = ({ text, streaming }: { text: string; streaming: boolean }) => {
  const sections = parseMap(text).filter((s) => s.kind !== "cost");
  let oppIndex = -1;

  return (
    <div className="space-y-3">
      {sections.map((section: MapSection, i) => {
        if (section.kind === "opportunity") {
          oppIndex += 1;
          return (
            <OpportunityCard
              key={i}
              title={section.title}
              index={oppIndex}
              fields={section.fields ?? {}}
              body={section.body}
            />
          );
        }
        return <HoldOffCard key={i} title={section.title} body={section.body} />;
      })}
      {streaming && (
        <p className="font-mono text-xs text-muted-foreground flex items-center gap-2 pt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Writing your map…
        </p>
      )}
    </div>
  );
};

export default OpportunityMap;
