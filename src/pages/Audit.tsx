import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Search, Map, ClipboardList, BadgeCheck, FileText } from "lucide-react";
import { PAGE, INK, SERIF, MONO, fade } from "@/marketing/theme";
import { Band, Kicker, useTone } from "@/marketing/primitives";
import MarketingNav from "@/marketing/MarketingNav";
import MarketingFooter from "@/marketing/MarketingFooter";

const CALENDLY = "https://calendly.com/hussainhussainakan/ai-discovery-meeting-clone";

const deliverables = [
  { icon: Search, title: "Workflow deep-dive", detail: "We sit inside your actual operation — how work arrives, moves, and leaves — and map where time and money leak." },
  { icon: ClipboardList, title: "Automate / skip verdicts", detail: "Every candidate process gets a plain verdict: automate now, fix the process first, or leave it alone — with the reasoning." },
  { icon: Map, title: "A build roadmap you own", detail: "A written, sequenced roadmap with expected costs and returns. Take it to us, another builder, or execute it internally — it's yours." },
];

const steps = [
  { index: "01", title: "Working session", detail: "A structured session (remote or on-site) walking through your operations, tools, and data with the people who actually do the work." },
  { index: "02", title: "Analysis", detail: "We pressure-test every automation candidate against cost, data readiness, and real ROI — not hype." },
  { index: "03", title: "The report", detail: "You get the written audit: findings, verdicts, roadmap, and numbers. We walk you through it on a call." },
];

const faqs = [
  { q: "Is this just a sales pitch for a build?", a: "No — and that's the point. The audit is a standalone paid service, and it regularly concludes \"don't build this\" for specific processes. If a build does make sense, the audit fee is credited toward it, so you never pay twice for the thinking." },
  { q: "What does it cost?", a: "It's a fixed fee, agreed before we start — no open-ended consulting hours. Get the free Opportunity Map or book a call and we'll give you the exact number for your size of business." },
  { q: "How long does it take?", a: "Typically one to two weeks from the working session to the written report in your hands." },
  { q: "What if we're not ready for AI at all?", a: "Then the audit says exactly that, and tells you what to fix first — which is usually cheaper than what you were about to buy. That answer alone tends to pay for the audit." },
];

const primaryBtn = "inline-flex items-center justify-center gap-2 text-[15px] font-semibold px-7 py-4 rounded-full transition-transform hover:-translate-y-0.5";
const ghostBtn = "inline-flex items-center justify-center gap-2 text-[15px] font-semibold px-7 py-4 rounded-full transition-colors";

const HeroSection = () => {
  const c = useTone();
  return (
    <section className="pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 max-w-3xl">
      <motion.div variants={fade} initial="hidden" animate="show">
        <Kicker>Consulting — AI Readiness Audit</Kicker>
        <h1 style={{ fontFamily: SERIF, lineHeight: 1.03 }} className="font-medium tracking-[-0.02em] text-[clamp(2.4rem,7vw,4.6rem)] mt-5 mb-7">
          Before you spend on AI, know what it's <span style={{ fontStyle: "italic", color: c.accent }}>worth to you.</span>
        </h1>
        <p className="text-[17px] sm:text-[19px] leading-[1.6] max-w-[54ch]" style={{ color: c.mut }}>
          A paid, fixed-fee diagnostic of your operation. We tell you honestly where AI and automation
          help your business, where they don't, and in what order to act — in a written roadmap you own either way.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-4">
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={primaryBtn} style={{ background: c.accent, color: "#FFFFFF" }}>
            Book the Audit <ArrowRight className="w-4 h-4" />
          </a>
          <Link to="/scorecard" className={ghostBtn} style={{ border: `1px solid ${c.line}`, color: c.fg }}>
            Not sure? Get the free Opportunity Map
          </Link>
        </div>
        <p className="mt-8 text-[13px] uppercase tracking-[0.14em]" style={{ color: c.mut, fontFamily: MONO }}>
          Fixed fee · 1–2 weeks · fee credited toward your build
        </p>
      </motion.div>
    </section>
  );
};

const DeliverablesSection = () => {
  const c = useTone();
  return (
    <section className="py-20 sm:py-28">
      <Kicker>What you get</Kicker>
      <h2 style={{ fontFamily: SERIF }} className="text-[clamp(1.8rem,4.5vw,2.6rem)] font-medium tracking-[-0.01em] mt-4 mb-10">Clarity, in writing.</h2>
      <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
        {deliverables.map((d, i) => (
          <motion.div key={d.title} variants={fade} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-2xl p-7" style={{ background: c.card, border: `1px solid ${c.line}`, boxShadow: c.cardShadow }}>
            <d.icon className="w-6 h-6 mb-5" strokeWidth={1.5} style={{ color: c.accentText }} />
            <h3 style={{ fontFamily: SERIF }} className="text-xl font-medium mb-3">{d.title}</h3>
            <p className="text-[15px] leading-[1.6]" style={{ color: c.mut }}>{d.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const CreditSection = () => {
  const c = useTone();
  return (
    <section className="py-20 sm:py-28">
      <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-2xl p-8 sm:p-12 grid lg:grid-cols-[auto_1fr] gap-8 items-start" style={{ background: c.card, border: `1px solid ${c.accent}33`, boxShadow: c.cardShadow }}>
        <BadgeCheck className="w-10 h-10" strokeWidth={1.5} style={{ color: c.accentText }} />
        <div>
          <h2 style={{ fontFamily: SERIF }} className="text-[clamp(1.5rem,3.5vw,2rem)] font-medium mb-4">The audit stands alone. The fee doesn't double up.</h2>
          <p className="text-[16px] leading-[1.65] max-w-2xl" style={{ color: c.mut }}>
            Plenty of clients take the audit, get their roadmap, and stop there — that's a good outcome.
            But if the audit shows a build is worth it and you do it with us, the full audit fee is
            credited toward the build. You pay for the thinking once.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

const ProcessSection = () => {
  const c = useTone();
  return (
    <section className="py-20 sm:py-28">
      <Kicker>How it runs</Kicker>
      <div className="grid md:grid-cols-3 gap-x-12 gap-y-10 mt-8">
        {steps.map((s, i) => (
          <motion.div key={s.index} variants={fade} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} className="border-t pt-6" style={{ borderColor: c.line }}>
            <span style={{ fontFamily: SERIF, color: c.accent }} className="block text-[2.6rem] leading-none font-light mb-3">{s.index}</span>
            <h3 style={{ fontFamily: SERIF }} className="text-xl font-medium mb-3">{s.title}</h3>
            <p className="text-[15px] leading-[1.6]" style={{ color: c.mut }}>{s.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const FaqSection = () => {
  const c = useTone();
  return (
    <section className="py-20 sm:py-28 max-w-3xl">
      <Kicker>Straight answers</Kicker>
      <div className="mt-8 space-y-8">
        {faqs.map((f, i) => (
          <motion.div key={f.q} variants={fade} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} className="border-b pb-8" style={{ borderColor: c.line }}>
            <h3 className="text-[16px] font-semibold mb-2">{f.q}</h3>
            <p className="text-[15px] leading-[1.65]" style={{ color: c.mut }}>{f.a}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const CtaSection = () => {
  const c = useTone();
  return (
    <section className="py-24 sm:py-32 text-center">
      <h2 style={{ fontFamily: SERIF, lineHeight: 1.05 }} className="font-medium tracking-[-0.02em] text-[clamp(1.9rem,5.5vw,3.2rem)] mb-4">
        Ready for the <span style={{ fontStyle: "italic", color: c.accentText }}>honest read?</span>
      </h2>
      <p className="text-[16px] mb-9 mx-auto max-w-[44ch]" style={{ color: c.mut }}>
        Book the audit, or start with the free Opportunity Map — three specific ideas in three minutes.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={primaryBtn} style={{ background: c.accent, color: "#FFFFFF" }}>
          Book the Audit <ArrowRight className="w-4 h-4" />
        </a>
        <Link to="/scorecard" className={ghostBtn} style={{ border: `1px solid ${c.line}`, color: c.fg }}>
          <FileText className="w-4 h-4" /> Free Opportunity Map first
        </Link>
      </div>
    </section>
  );
};

const Audit = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ background: PAGE, color: INK, fontFamily: "'Instrument Sans', sans-serif" }} className="min-h-screen antialiased overflow-x-hidden selection:bg-[#2E6BFF] selection:text-white">
      <Helmet>
        <title>AI Readiness Audit — a paid, honest diagnostic | Notivon</title>
        <meta name="description" content="A fixed-fee diagnostic of your business: where AI and automation genuinely pay off, where they don't, and a build roadmap you own. Fee credited toward your build if you go ahead." />
        <link rel="canonical" href="https://notivon.com/audit" />
      </Helmet>

      <MarketingNav />

      <main>
        <Band t="light"><HeroSection /></Band>
        <Band t="dark"><DeliverablesSection /></Band>
        <Band t="light"><CreditSection /></Band>
        <Band t="dark"><ProcessSection /></Band>
        <Band t="light"><FaqSection /></Band>
        <Band t="dark"><CtaSection /></Band>
      </main>

      <MarketingFooter />
    </div>
  );
};

export default Audit;
