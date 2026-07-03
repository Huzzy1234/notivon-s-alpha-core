import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Search,
  Map,
  BadgeCheck,
  MessagesSquare,
  ClipboardList,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { fadeUp, stagger, inView } from "@/lib/motion";

const deliverables = [
  {
    icon: Search,
    title: "Workflow deep-dive",
    detail:
      "We sit inside your actual operation — how work arrives, moves, and leaves — and map where time and money leak.",
  },
  {
    icon: ClipboardList,
    title: "Automate / skip verdicts",
    detail:
      "Every candidate process gets a plain verdict: automate now, fix the process first, or leave it alone — with the reasoning.",
  },
  {
    icon: Map,
    title: "A build roadmap you own",
    detail:
      "A written, sequenced roadmap with expected costs and returns. Take it to us, to another builder, or execute it internally — it's yours.",
  },
];

const steps = [
  {
    index: "01",
    title: "Working session",
    detail: "A structured session (remote or on-site) walking through your operations, tools, and data with the people who actually do the work.",
  },
  {
    index: "02",
    title: "Analysis",
    detail: "We pressure-test every automation candidate against cost, data readiness, and real ROI — not hype.",
  },
  {
    index: "03",
    title: "The report",
    detail: "You get the written audit: findings, verdicts, roadmap, and numbers. We walk you through it on a call.",
  },
];

const faqs = [
  {
    q: "Is this just a sales pitch for a build?",
    a: "No — and that's the point. The audit is a standalone paid service, and it regularly concludes \"don't build this\" for specific processes. If a build does make sense, the audit fee is credited toward it, so you never pay twice for the thinking.",
  },
  {
    q: "What does it cost?",
    a: "It's a fixed fee, agreed before we start — no open-ended consulting hours. Take the free Scorecard or book a call and we'll give you the exact number for your size of business.",
  },
  {
    q: "How long does it take?",
    a: "Typically one to two weeks from the working session to the written report in your hands.",
  },
  {
    q: "What if we're not ready for AI at all?",
    a: "Then the audit says exactly that, and tells you what to fix first — which is usually cheaper than what you were about to buy. That answer alone tends to pay for the audit.",
  },
];

const Audit = () => (
  <>
    <Helmet>
      <title>AI Readiness Audit — a paid, honest diagnostic | Notivon</title>
      <meta
        name="description"
        content="A fixed-fee diagnostic of your business: where AI and automation genuinely pay off, where they don't, and a build roadmap you own. Fee credited toward your build if you go ahead."
      />
      <link rel="canonical" href="https://notivon.com/audit" />
    </Helmet>

    <div className="min-h-screen relative grain">
      <Navbar />
      <main className="pt-32 pb-24">
        {/* ── Hero ── */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 max-w-[1400px] mb-24">
          <motion.div variants={stagger(0.05)} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.p variants={fadeUp} className="tech-label mb-6">
              Consulting — AI Readiness Audit
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foreground mb-8"
            >
              Before you spend on AI,
              <br />
              <span className="text-primary">know what it's worth to you.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
              A paid, fixed-fee diagnostic of your operation. We tell you honestly
              where AI and automation help your business, where they don't, and in
              what order to act — in a written roadmap you own either way.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://calendly.com/hussainhussainakan/ai-discovery-meeting-clone"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
              >
                Book the Audit
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/scorecard"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-border text-foreground font-semibold text-sm rounded-md hover:border-primary/50 hover:text-primary transition-colors"
              >
                Not sure? Take the free Scorecard
              </Link>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-8 font-mono text-xs text-muted-foreground">
              Fixed fee · 1–2 weeks · fee credited toward your build
            </motion.p>
          </motion.div>
        </section>

        {/* ── What you get ── */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 max-w-[1400px] mb-24">
          <motion.div variants={stagger()} {...inView}>
            <motion.p variants={fadeUp} className="tech-label mb-4">
              What you get
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-semibold text-3xl sm:text-4xl text-foreground mb-12 max-w-xl">
              Clarity, in writing.
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-5">
              {deliverables.map((d) => (
                <motion.div
                  key={d.title}
                  variants={fadeUp}
                  className="surface-1 border border-border rounded-lg p-8 hover:border-primary/40 transition-colors"
                >
                  <d.icon className="w-6 h-6 text-primary mb-5" strokeWidth={1.5} />
                  <h3 className="font-display font-semibold text-xl text-foreground mb-3">{d.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── The credit deal ── */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 max-w-[1400px] mb-24">
          <motion.div
            variants={fadeUp}
            {...inView}
            className="border border-primary/30 rounded-lg surface-2 p-8 sm:p-12 grid lg:grid-cols-[auto_1fr] gap-8 items-start"
          >
            <BadgeCheck className="w-10 h-10 text-primary" strokeWidth={1.5} />
            <div>
              <h2 className="font-display font-semibold text-2xl sm:text-3xl text-foreground mb-4">
                The audit stands alone. The fee doesn't double up.
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                Plenty of clients take the audit, get their roadmap, and stop
                there — that's a good outcome. But if the audit shows a build is
                worth it and you do it with us, the full audit fee is credited
                toward the build. You pay for the thinking once.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ── Process ── */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 max-w-[1400px] mb-24">
          <motion.div variants={stagger()} {...inView}>
            <motion.p variants={fadeUp} className="tech-label mb-4">
              How it runs
            </motion.p>
            <div className="grid md:grid-cols-3 gap-5 mt-8">
              {steps.map((s) => (
                <motion.div key={s.index} variants={fadeUp} className="border-t border-border pt-6">
                  <span className="font-mono text-[11px] text-primary">{s.index}</span>
                  <h3 className="font-display font-semibold text-xl text-foreground mt-2 mb-3">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── FAQ ── */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 max-w-[1400px] mb-24">
          <motion.div variants={stagger()} {...inView} className="max-w-3xl">
            <motion.p variants={fadeUp} className="tech-label mb-8">
              Straight answers
            </motion.p>
            <div className="space-y-8">
              {faqs.map((f) => (
                <motion.div key={f.q} variants={fadeUp} className="border-b border-border pb-8">
                  <h3 className="text-base font-semibold text-foreground mb-2">{f.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Final CTA ── */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 max-w-[1400px]">
          <motion.div variants={fadeUp} {...inView} className="text-center py-16 border border-border rounded-lg surface-1">
            <MessagesSquare className="w-8 h-8 text-primary mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-foreground mb-4">
              Ready for the honest read?
            </h2>
            <p className="text-muted-foreground mb-10 max-w-md mx-auto">
              Book the audit, or start with the free two-minute Scorecard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <a
                href="https://calendly.com/hussainhussainakan/ai-discovery-meeting-clone"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
              >
                Book the Audit
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/scorecard"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-border text-foreground font-semibold text-sm rounded-md hover:border-primary/50 hover:text-primary transition-colors"
              >
                <FileText className="w-4 h-4" />
                Free Scorecard first
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  </>
);

export default Audit;
