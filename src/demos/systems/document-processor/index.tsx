import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  UploadCloud,
  FileText,
  FileSpreadsheet,
  ReceiptText,
  IdCard,
  ScanLine,
  Sparkles,
  Check,
  CircleAlert,
  Loader2,
  ArrowRight,
  RotateCcw,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { DemoChrome } from "@/demos/shell/DemoChrome";
import {
  SAMPLES,
  DESTINATIONS,
  SEEDED_RECORDS,
  matchSampleByFilename,
  docToRecord,
  type SampleDoc,
  type DocType,
  type ExtractedField,
  type CrmRecord,
} from "./data";

const PROCESS_MS = 2200;

const TYPE_ICON: Record<DocType, typeof FileText> = {
  Invoice: FileText,
  Waybill: FileSpreadsheet,
  Receipt: ReceiptText,
  ID: IdCard,
};

type Phase = "empty" | "reading" | "extracted";

let recordSeq = 0;

export default function DocumentProcessor() {
  const [phase, setPhase] = useState<Phase>("empty");
  const [sample, setSample] = useState<SampleDoc | null>(null);
  const [uploadName, setUploadName] = useState<string | null>(null);
  const [thumb, setThumb] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [destId, setDestId] = useState(DESTINATIONS[0].id);
  const [records, setRecords] = useState<CrmRecord[]>(SEEDED_RECORDS);
  const [dragging, setDragging] = useState(false);

  const fileInput = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();
  const dest = DESTINATIONS.find((d) => d.id === destId)!;

  useEffect(() => () => timer.current && clearTimeout(timer.current), []);

  const start = (s: SampleDoc, opts?: { name?: string; thumb?: string | null }) => {
    setSample(s);
    setUploadName(opts?.name ?? s.filename);
    setThumb(opts?.thumb ?? null);
    setValues(Object.fromEntries(s.fields.map((f) => [f.key, f.value])));
    setPhase("reading");
    timer.current = setTimeout(() => setPhase("extracted"), PROCESS_MS);
  };

  const onFile = (file: File) => {
    const isImage = file.type.startsWith("image/");
    const s = matchSampleByFilename(file.name);
    start(s, { name: file.name, thumb: isImage ? URL.createObjectURL(file) : null });
  };

  const reset = () => {
    if (thumb) URL.revokeObjectURL(thumb);
    setPhase("empty");
    setSample(null);
    setUploadName(null);
    setThumb(null);
    setValues({});
  };

  const send = () => {
    if (!sample) return;
    const rec = docToRecord(sample, values, `rec-${++recordSeq}`);
    setRecords((prev) => [rec, ...prev]);
    toast.success(`Sent to ${dest.name}`, {
      description: `${sample.type} · ${rec.primary}`,
      icon: <Check className="h-4 w-4" />,
    });
    reset();
  };

  return (
    <>
      <Helmet>
        <title>Document → CRM — Notivon Demo</title>
      </Helmet>
      <DemoChrome product="Notivon Intake" url="app.notivon.com/intake">
        <div className="h-full overflow-y-auto">
          <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-8">
            {/* Header */}
            <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  Document&nbsp;→&nbsp;CRM
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Drop a document. It reads every field and files it in your system — no more
                  copy-paste.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Sending to</span>
                <Select value={destId} onValueChange={setDestId}>
                  <SelectTrigger className="h-9 w-[168px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DESTINATIONS.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        <span className="flex items-center gap-2">
                          <span className={cn("text-base leading-none", d.tone)}>●</span>
                          {d.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </header>

            {/* Working area */}
            <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
              {/* Left — upload / document */}
              <section className="rounded-xl border border-border/70 bg-card">
                <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
                  <p className="text-sm font-medium">Document</p>
                  {phase !== "empty" && (
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" /> Clear
                    </button>
                  )}
                </div>

                <div className="p-4">
                  {phase === "empty" ? (
                    <Dropzone
                      dragging={dragging}
                      onDragState={setDragging}
                      onFile={onFile}
                      onBrowse={() => fileInput.current?.click()}
                      onSample={(s) => start(s)}
                    />
                  ) : (
                    <div className="relative mx-auto max-w-md">
                      {thumb ? (
                        <img
                          src={thumb}
                          alt={uploadName ?? "Uploaded document"}
                          className="w-full rounded-md shadow-xl ring-1 ring-black/5 rotate-[-0.6deg]"
                        />
                      ) : (
                        <DocPaper doc={sample!} />
                      )}
                      {phase === "reading" && !reduce && (
                        <motion.div
                          aria-hidden
                          className="pointer-events-none absolute inset-x-0 h-20 rounded bg-gradient-to-b from-transparent via-primary/25 to-transparent"
                          initial={{ top: "-15%" }}
                          animate={{ top: "115%" }}
                          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                      <p className="mt-3 truncate text-center text-xs text-muted-foreground">
                        {uploadName}
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInput}
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onFile(f);
                      e.target.value = "";
                    }}
                  />
                </div>
              </section>

              {/* Right — extracted fields */}
              <section className="flex flex-col rounded-xl border border-border/70 bg-card">
                <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
                  <p className="text-sm font-medium">Extracted fields</p>
                  {phase === "extracted" && sample && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                      {sample.template}
                    </span>
                  )}
                </div>

                <div className="min-h-[320px] flex-1 p-4">
                  {phase === "empty" && <FieldsEmpty />}
                  {phase === "reading" && <FieldsSkeleton />}
                  {phase === "extracted" && sample && (
                    <FieldsResult
                      fields={sample.fields}
                      values={values}
                      reduce={!!reduce}
                      onChange={(k, v) => setValues((p) => ({ ...p, [k]: v }))}
                    />
                  )}
                </div>

                {phase === "extracted" && (
                  <div className="border-t border-border/60 p-3">
                    <Button className="w-full gap-2" onClick={send}>
                      Send to {dest.name}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </section>
            </div>

            {/* CRM records table — the payoff */}
            <section className="mt-6 rounded-xl border border-border/70 bg-card">
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
                <p className="text-sm font-medium">
                  Recently added to{" "}
                  <span className={cn("font-semibold", dest.tone)}>{dest.name}</span>
                </p>
                <span className="text-xs text-muted-foreground">{records.length} records</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/60 text-left text-xs text-muted-foreground">
                      <th className="px-4 py-2 font-medium">Record</th>
                      <th className="px-4 py-2 font-medium">Type</th>
                      <th className="px-4 py-2 font-medium">Value</th>
                      <th className="px-4 py-2 font-medium">Doc date</th>
                      <th className="px-4 py-2 text-right font-medium">Added</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence initial={false}>
                      {records.map((r) => {
                        const Icon = TYPE_ICON[r.type];
                        return (
                          <motion.tr
                            key={r.id}
                            layout={!reduce}
                            initial={reduce ? false : { opacity: 0, y: -8, backgroundColor: "hsl(var(--primary) / 0.10)" }}
                            animate={{ opacity: 1, y: 0, backgroundColor: "hsl(var(--primary) / 0)" }}
                            transition={{ duration: 0.5, backgroundColor: { duration: 1.6 } }}
                            className="border-b border-border/40 last:border-0"
                          >
                            <td className="px-4 py-2.5 font-medium">{r.primary}</td>
                            <td className="px-4 py-2.5">
                              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                                <Icon className="h-3.5 w-3.5" />
                                {r.type}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 tabular-nums">{r.value}</td>
                            <td className="px-4 py-2.5 tabular-nums text-muted-foreground">
                              {r.date}
                            </td>
                            <td className="px-4 py-2.5 text-right text-muted-foreground">
                              {r.added}
                            </td>
                          </motion.tr>
                        );
                      })}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </DemoChrome>
    </>
  );
}

/* ───────────────────────── Dropzone ───────────────────────── */

function Dropzone({
  dragging,
  onDragState,
  onFile,
  onBrowse,
  onSample,
}: {
  dragging: boolean;
  onDragState: (v: boolean) => void;
  onFile: (f: File) => void;
  onBrowse: () => void;
  onSample: (s: SampleDoc) => void;
}) {
  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={onBrowse}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onBrowse()}
        onDragOver={(e) => {
          e.preventDefault();
          onDragState(true);
        }}
        onDragLeave={() => onDragState(false)}
        onDrop={(e) => {
          e.preventDefault();
          onDragState(false);
          const f = e.dataTransfer.files?.[0];
          if (f) onFile(f);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-14 text-center transition-colors",
          dragging
            ? "border-primary bg-primary/5"
            : "border-border/70 hover:border-primary/50 hover:bg-muted/40",
        )}
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UploadCloud className="h-7 w-7" />
        </div>
        <p className="text-base font-medium">
          {dragging ? "Drop it — we'll read it" : "Drag a document here"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Invoice, waybill, receipt, passport… or{" "}
          <span className="font-medium text-primary underline underline-offset-2">browse</span>
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">Try a sample:</span>
        {SAMPLES.map((s) => {
          const Icon = TYPE_ICON[s.type];
          return (
            <button
              key={s.id}
              onClick={() => onSample(s)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-medium transition-colors hover:border-primary/50 hover:bg-primary/5"
            >
              <Icon className="h-3.5 w-3.5 text-muted-foreground" />
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────────────── Field states ───────────────────────── */

function FieldsEmpty() {
  return (
    <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-muted/40">
        <ScanLine className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium">Fields appear here</p>
      <p className="mt-1 max-w-[240px] text-xs text-muted-foreground">
        Upload a document and every field is pulled out automatically, ready to send.
      </p>
    </div>
  );
}

function FieldsSkeleton() {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-sm text-primary">
        <Loader2 className="h-4 w-4 animate-spin" />
        Reading document…
      </div>
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function FieldsResult({
  fields,
  values,
  reduce,
  onChange,
}: {
  fields: ExtractedField[];
  values: Record<string, string>;
  reduce: boolean;
  onChange: (key: string, v: string) => void;
}) {
  const flagged = fields.filter((f) => f.confidence < 80).length;
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
        <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
        <p className="text-xs text-muted-foreground">
          {fields.length} fields extracted in{" "}
          <span className="font-medium text-foreground">2.2s</span> — vs{" "}
          <span className="font-medium text-foreground">~6 min</span> by hand
        </p>
      </div>

      {flagged > 0 && (
        <p className="mb-3 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
          <CircleAlert className="h-3.5 w-3.5" />
          {flagged} field{flagged > 1 ? "s" : ""} to double-check before sending
        </p>
      )}

      <motion.ul
        className="space-y-3"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.05 } } }}
      >
        {fields.map((f) => (
          <motion.li
            key={f.key}
            variants={{
              hidden: { opacity: 0, y: reduce ? 0 : 8 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <FieldRow
              field={f}
              value={values[f.key] ?? f.value}
              onChange={(v) => onChange(f.key, v)}
            />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

function FieldRow({
  field,
  value,
  onChange,
}: {
  field: ExtractedField;
  value: string;
  onChange: (v: string) => void;
}) {
  const low = field.confidence < 80;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {field.key}
        </label>
        <ConfidenceChip confidence={field.confidence} />
      </div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-8 text-sm",
          low && "border-amber-500/50 focus-visible:ring-amber-500/40",
        )}
      />
    </div>
  );
}

function ConfidenceChip({ confidence }: { confidence: number }) {
  if (confidence < 80) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-1.5 py-px text-[10px] font-medium text-amber-600 dark:text-amber-400">
        <CircleAlert className="h-3 w-3" />
        Review · {confidence}%
      </span>
    );
  }
  const high = confidence >= 95;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-1.5 py-px text-[10px] font-medium tabular-nums",
        high
          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "bg-muted text-muted-foreground",
      )}
    >
      {high && <Check className="h-3 w-3" />}
      {confidence}%
    </span>
  );
}

/* ───────────────────────── Document paper (samples) ───────────────────────── */

function DocPaper({ doc }: { doc: SampleDoc }) {
  const p = doc.preview;
  const isId = p.variant === "id";
  return (
    <div className="rotate-[-0.6deg] rounded-md bg-white text-zinc-800 shadow-xl ring-1 ring-black/5">
      <div className="rounded-md bg-gradient-to-b from-transparent to-zinc-500/[0.04] p-6">
        {isId ? (
          <div className="rounded-md border border-emerald-900/20 bg-emerald-50/60 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-800">
              {p.letterhead}
            </p>
            <p className="mb-3 text-xs font-medium text-emerald-700">{p.sub}</p>
            <div className="flex gap-4">
              <div className="h-20 w-16 shrink-0 rounded bg-zinc-200" />
              <dl className="grid flex-1 grid-cols-1 gap-y-1 text-[11px]">
                {p.meta.map((m) => (
                  <div key={m.label} className="flex justify-between gap-3">
                    <dt className="text-zinc-500">{m.label}</dt>
                    <dd className="font-medium tabular-nums">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-3 break-all font-mono text-[9px] leading-tight text-zinc-500">
              P&lt;NGAOKAFOR&lt;&lt;CHINEDU&lt;EMMANUEL&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
              <br />
              A50882231NGA9103148M2908094&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;06
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between border-b border-zinc-200 pb-3">
              <div>
                <p className="text-sm font-bold tracking-tight">{p.letterhead}</p>
                <p className="text-[10px] text-zinc-500">{p.sub}</p>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                {p.docLabel}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-1 py-3 text-[11px]">
              {p.meta.map((m) => (
                <div key={m.label} className="flex justify-between gap-2">
                  <dt className="text-zinc-500">{m.label}</dt>
                  <dd className="font-medium tabular-nums">{m.value}</dd>
                </div>
              ))}
            </dl>

            {p.lineItems && (
              <table className="mt-1 w-full border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-zinc-200 text-left text-zinc-400">
                    <th className="py-1 font-medium">Description</th>
                    <th className="py-1 text-right font-medium">Qty</th>
                    <th className="py-1 text-right font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {p.lineItems.map((li) => (
                    <tr key={li.desc} className="border-b border-zinc-100">
                      <td className="py-1 pr-2">{li.desc}</td>
                      <td className="py-1 text-right tabular-nums text-zinc-500">{li.qty}</td>
                      <td className="py-1 text-right font-medium tabular-nums">{li.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {p.totalValue && (
              <div className="mt-3 flex items-center justify-between border-t border-zinc-300 pt-2">
                <span className="text-[11px] text-zinc-500">{p.totalLabel}</span>
                <span className="text-sm font-bold tabular-nums">{p.totalValue}</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
