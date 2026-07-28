import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Phone, Plus, Minus } from "lucide-react";
import hussainImage from "@/assets/hussain-founder.jpeg";
import { PHONE_PRIMARY, PHONE_SECONDARY, WHATSAPP_NUMBER } from "@/lib/constants";
import { PAGE, INK, DARK, DARK_MUT, SERIF, MONO, fade } from "@/marketing/theme";
import { Band, Kicker, useTone } from "@/marketing/primitives";
import MarketingNav from "@/marketing/MarketingNav";
import MarketingFooter from "@/marketing/MarketingFooter";
import FlowDiagram from "@/marketing/FlowDiagram";

const STEPS = [
  { n: "01", t: "Diagnose", d: "We map where AI and automation genuinely pay off in your business — and, just as plainly, where they don't." },
  { n: "02", t: "Decide", d: "You get a written roadmap you own outright. If a build makes sense, the audit fee is credited toward it." },
  { n: "03", t: "Build", d: "We build only the systems that earn their keep — right inside the WhatsApp workflow you already run on." },
];

const CAPS = [
  { n: "01", t: "The AI Readiness Audit", d: "A fixed-fee diagnostic: what to build first, what to skip, what it costs, what it returns." },
  { n: "02", t: "Operational systems", d: "Order tracking, document handling, reminders, records — built around how your business already moves." },
  { n: "03", t: "AI automation", d: "The repetitive re-typing, chasing and checking, handled quietly in the background." },
  { n: "04", t: "Sales & data infrastructure", d: "The pipes that make everything measurable, followed-up, and repeatable." },
];

const PRODUCTS = [
  { t: "VisaGuard", tag: "Visa & travel", to: "/products/visaguard", d: "Document collection & expiry tracking, WhatsApp status updates, application pipelines." },
  { t: "ClearVoy", tag: "Customs clearing", to: "/products/clearvoy", d: "Shipment pipelines, field updates over WhatsApp, document tracking end to end." },
];

const FAQ_ITEMS = [
  { q: "What exactly is the AI Readiness Audit?", a: "A paid, fixed-fee diagnostic of your business. We map your workflows, tools, and data, then tell you honestly where AI and automation pay off — and where they don't. You get a written roadmap you own, whether or not you ever build with us. If you do build with us, the audit fee is credited toward it." },
  { q: "How is the free Opportunity Map different from the paid Audit?", a: "The Opportunity Map is a 3-minute self-assessment that gives you a readiness read and three specific ideas — it works from what you tell us. The Audit goes inside your actual operation: real workflows, real numbers, automate-or-skip verdicts, and a sequenced build roadmap with expected ROI." },
  { q: "Do I have to build with Notivon after the audit?", a: "No. The audit is a standalone service and the roadmap is yours — take it to another builder or execute it internally. Plenty of audits also conclude 'don't build this yet', and that answer alone tends to pay for itself." },
  { q: "What kind of businesses do you work with?", a: "Businesses where manual processes, compliance requirements, or operational complexity create bottlenecks. Our systems span visa agencies, customs clearing, logistics, AI lead-gen, and deal-sourcing — but if you have a workflow problem, we want to hear it." },
  { q: "How is a custom build different from a CRM or project tool?", a: "Generic tools force your workflow into their template. We build purpose-made systems — visa-type document checklists, shipment pipelines, import-likelihood scoring, deal-sourcing engines — designed around how your business actually operates." },
  { q: "How long does a build take?", a: "Most businesses are fully operational within 2–4 weeks of scoping. The audit typically takes 1–2 weeks before that, and tells you whether the build is worth doing at all." },
  { q: "What happens after launch?", a: "Ongoing support. Whether you need new features, adjusted compliance rules, or expansion to new services, the system evolves with your business." },
  { q: "Is my data secure?", a: "Yes. All client and business data is encrypted and stored securely. We follow best practices for data protection and can work with your specific compliance requirements." },
];

/* ── Sections (tone-aware via useTone) ── */

const HeroSection = () => {
  const c = useTone();
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-12 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 items-center">
      <motion.div variants={fade} initial="hidden" animate="show" className="lg:col-span-7">
        <Kicker>Consulting &amp; Building — Lagos → Global</Kicker>
        <h1 style={{ fontFamily: SERIF, lineHeight: 1.0 }} className="font-medium tracking-[-0.02em] text-[clamp(2.4rem,8vw,5rem)] mt-5 sm:mt-6">
          We tell you where AI <span style={{ fontStyle: "italic", color: c.accent }}>actually</span> pays off.
          <br className="hidden sm:block" />{" "}
          Then we build it.
        </h1>
        <p className="mt-6 sm:mt-7 text-[16px] sm:text-[18px] leading-[1.6] max-w-[52ch]" style={{ color: c.mut }}>
          An honest, paid diagnostic of where AI and automation help your business — and where they
          don't. If a build makes sense, the fee is credited toward it.
        </p>
        <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <Link to="/scorecard" className="inline-flex items-center justify-center gap-2 text-[15px] font-semibold px-7 py-4 rounded-full transition-transform hover:-translate-y-0.5" style={{ background: c.accent, color: "#FFFFFF" }}>
            Get your free Opportunity Map <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-[13px]" style={{ color: c.mut }}>3 minutes · 3 specific ideas · no call.</span>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-5 rounded-2xl p-5 sm:p-7"
        style={{ background: DARK, boxShadow: "0 24px 60px -30px rgba(11,18,32,0.5)" }}
      >
        <p className="uppercase tracking-[0.16em] text-[10px] sm:text-[11px] mb-5" style={{ fontFamily: MONO, color: DARK_MUT }}>
          How a job flows once it's systemised
        </p>
        <FlowDiagram />
      </motion.div>
    </section>
  );
};

const StanceSection = () => {
  const c = useTone();
  return (
    <section className="py-20 sm:py-28">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        <div className="md:col-span-3"><Kicker>The stance</Kicker></div>
        <motion.p
          variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{ fontFamily: SERIF, lineHeight: 1.16 }}
          className="md:col-span-9 font-light text-[clamp(1.5rem,4.6vw,2.7rem)] tracking-[-0.01em]"
        >
          Most agencies sell you the build. We sell you the truth first — a roadmap you own, whether
          you build with us or not.{" "}
          <span style={{ color: c.accent, fontStyle: "italic" }}>That's the whole difference.</span>
        </motion.p>
      </div>
    </section>
  );
};

const MethodSection = () => {
  const c = useTone();
  return (
    <section className="py-20 sm:py-28">
      <Kicker>The method</Kicker>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10 sm:gap-y-12 mt-8 sm:mt-10">
        {STEPS.map((s, i) => (
          <motion.div key={s.n} variants={fade} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            <span style={{ fontFamily: SERIF, color: c.accent }} className="block text-[3rem] sm:text-[3.4rem] leading-none font-light mb-3 sm:mb-4">{s.n}</span>
            <h3 style={{ fontFamily: SERIF }} className="text-2xl font-medium mb-2 sm:mb-3">{s.t}</h3>
            <p className="text-[15px] sm:text-[16px] leading-[1.6]" style={{ color: c.mut }}>{s.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Capabilities always renders on a dark band — rows invert to blue on hover.
const CapabilitiesSection = () => {
  const c = useTone();
  return (
    <section className="py-20 sm:py-28">
      <Kicker>What we build</Kicker>
      <div className="mt-7 sm:mt-8">
        {CAPS.map((cap, i) => (
          <motion.a
            key={cap.n} href="/audit"
            variants={fade} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            className="group grid grid-cols-12 items-baseline gap-x-3 gap-y-2 py-6 sm:py-7 border-t transition-colors duration-300 -mx-5 sm:-mx-8 lg:-mx-10 px-5 sm:px-8 lg:px-10 hover:bg-[#2E6BFF]"
            style={{ borderColor: c.line }}
          >
            <span className="col-span-2 md:col-span-1 text-[13px] sm:text-[14px] font-semibold pt-1.5 group-hover:!text-[#08111F]" style={{ color: c.accentText }}>{cap.n}</span>
            <h3 style={{ fontFamily: SERIF }} className="col-span-10 md:col-span-5 text-[clamp(1.3rem,5vw,2.1rem)] font-medium tracking-[-0.01em] transition-colors group-hover:text-[#08111F]">{cap.t}</h3>
            <p className="col-span-12 md:col-span-6 text-[15px] sm:text-[16px] leading-[1.55] md:text-right transition-colors" style={{ color: c.mut }}>
              <span className="group-hover:!text-[rgba(8,17,31,0.8)]">{cap.d}</span>
            </p>
          </motion.a>
        ))}
        <div style={{ borderTop: `1px solid ${c.line}` }} />
      </div>
    </section>
  );
};

const ProvenSection = () => {
  const c = useTone();
  return (
    <section className="py-20 sm:py-28">
      <Kicker>Proven builds</Kicker>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-7 sm:mt-8">
        {PRODUCTS.map((p, i) => (
          <motion.div key={p.t} variants={fade} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Link to={p.to} className="block rounded-2xl p-6 sm:p-7 transition-transform hover:-translate-y-1" style={{ background: c.card, border: `1px solid ${c.line}`, boxShadow: c.cardShadow }}>
              <div className="flex items-baseline justify-between mb-3">
                <h3 style={{ fontFamily: SERIF }} className="text-[1.5rem] sm:text-[1.6rem] font-medium">{p.t}</h3>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em]" style={{ color: c.accentText, fontFamily: MONO }}>{p.tag}</span>
              </div>
              <p className="text-[15px] leading-[1.6]" style={{ color: c.mut }}>{p.d}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const QuoteSection = () => {
  const c = useTone();
  return (
    <section className="py-24 sm:py-32 text-center">
      <motion.blockquote
        variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
        style={{ fontFamily: SERIF, fontStyle: "italic", lineHeight: 1.18 }}
        className="mx-auto max-w-[920px] font-light text-[clamp(1.6rem,6vw,3.2rem)] tracking-[-0.01em]"
      >
        “If the honest answer is <span style={{ color: c.accentText }}>don't build anything yet</span>,
        that's exactly what you'll hear.”
      </motion.blockquote>
    </section>
  );
};

const FounderSection = () => {
  const c = useTone();
  return (
    <section className="py-20 sm:py-28">
      <motion.div
        variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6 rounded-2xl p-6 sm:p-8"
        style={{ background: c.card, border: `1px solid ${c.line}`, boxShadow: c.cardShadow }}
      >
        <img src={hussainImage} alt="Hussain, founder of Notivon" className="w-16 h-16 rounded-full object-cover shrink-0" style={{ border: `2px solid ${c.accent}` }} />
        <div>
          <p className="text-[12px] uppercase tracking-[0.14em] mb-3" style={{ color: c.accentText, fontFamily: MONO }}>Who you're working with</p>
          <p style={{ fontFamily: SERIF }} className="text-[1.35rem] sm:text-[1.5rem] leading-snug max-w-[46ch] mb-2">
            A human reads every map. No broadcast lists, no pressure.
          </p>
          <p className="text-[15px]" style={{ color: c.mut }}>
            Hussain — founder, Notivon. If the honest answer is “don't build anything yet”, that's what you'll hear.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

const FaqRow = ({ q, a, i }: { q: string; a: string; i: number }) => {
  const c = useTone();
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fade} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
      className="rounded-xl overflow-hidden" style={{ background: c.card, border: `1px solid ${c.line}` }}
    >
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-5">
        <span className="text-[15px] sm:text-[16px] font-semibold" style={{ color: c.fg }}>{q}</span>
        <span className="shrink-0" style={{ color: c.accentText }}>{open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}</span>
      </button>
      {open && <div className="px-5 sm:px-6 pb-5 text-[14px] sm:text-[15px] leading-[1.6]" style={{ color: c.mut }}>{a}</div>}
    </motion.div>
  );
};

const FaqSection = () => {
  const c = useTone();
  return (
    <section className="py-20 sm:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-4">
          <Kicker>FAQ</Kicker>
          <h2 style={{ fontFamily: SERIF }} className="text-[clamp(1.7rem,4vw,2.4rem)] font-medium tracking-[-0.01em] leading-tight mt-4 mb-5">
            Straight answers, before we ever talk.
          </h2>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[14px] font-semibold px-6 py-3 rounded-full transition-transform hover:-translate-y-0.5" style={{ border: `1px solid ${c.line}`, color: c.fg }}>
            Message us on WhatsApp
          </a>
        </div>
        <div className="lg:col-span-8 space-y-3">
          {FAQ_ITEMS.map((f, i) => <FaqRow key={i} q={f.q} a={f.a} i={i} />)}
        </div>
      </div>
    </section>
  );
};

const CtaSection = () => {
  const c = useTone();
  return (
    <section className="py-24 sm:py-32 text-center">
      <motion.h2
        variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
        style={{ fontFamily: SERIF, lineHeight: 1.04 }}
        className="font-medium tracking-[-0.02em] text-[clamp(1.9rem,6.5vw,3.6rem)]"
      >
        See where your business is <span style={{ fontStyle: "italic", color: c.accentText }}>leaking money.</span>
      </motion.h2>
      <p className="mt-5 text-[15px] sm:text-[16px] mx-auto max-w-[52ch]" style={{ color: c.mut }}>
        Get your free Opportunity Map — three specific ideas in three minutes — or book a call for the full picture.
      </p>
      <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/scorecard" className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-4 rounded-full transition-transform hover:-translate-y-0.5" style={{ background: c.accent, color: "#FFFFFF" }}>
          Get my free Opportunity Map <ArrowRight className="w-4 h-4" />
        </Link>
        <a href="https://calendly.com/hussainhussainakan/ai-discovery-meeting-clone" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-4 rounded-full transition-colors" style={{ border: `1px solid ${c.line}`, color: c.fg }}>
          <Calendar className="w-4 h-4" /> Book a call
        </a>
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[14px]" style={{ color: c.mut }}>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white" style={{ color: c.fg }}>WhatsApp us</a>
        <span className="opacity-40">·</span>
        <a href={`tel:${PHONE_PRIMARY}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-white"><Phone className="w-3.5 h-3.5" /> {PHONE_PRIMARY}</a>
        <span className="opacity-40">·</span>
        <a href={`tel:${PHONE_SECONDARY}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-white"><Phone className="w-3.5 h-3.5" /> {PHONE_SECONDARY}</a>
      </div>
    </section>
  );
};

const Index = () => (
  <div style={{ background: PAGE, color: INK, fontFamily: "'Instrument Sans', sans-serif" }} className="min-h-screen antialiased overflow-x-hidden selection:bg-[#2E6BFF] selection:text-white">
    <Helmet>
      <title>Notivon | We tell you where AI actually pays off — then build it</title>
      <meta name="description" content="Notivon is consulting + building, together. The AI Readiness Audit tells you honestly where AI and automation help your business — and where they don't. Then we build the systems that deliver it." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href="https://notivon.com" />
    </Helmet>

    <MarketingNav />

    <main>
      <Band t="light"><HeroSection /></Band>
      <Band t="dark"><StanceSection /></Band>
      <Band t="light"><MethodSection /></Band>
      <Band t="dark"><CapabilitiesSection /></Band>
      <Band t="light"><ProvenSection /></Band>
      <Band t="dark"><QuoteSection /></Band>
      <Band t="light"><FounderSection /></Band>
      <Band t="light" id="faq"><FaqSection /></Band>
      <Band t="dark" id="contact"><CtaSection /></Band>
    </main>

    <MarketingFooter />
  </div>
);

export default Index;
