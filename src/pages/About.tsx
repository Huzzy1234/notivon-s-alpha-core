import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, MapPin, Users, Zap, ArrowRight } from "lucide-react";
import { PHONE_PRIMARY, WHATSAPP_NUMBER, EMAIL } from "@/lib/constants";
import hussainImage from "@/assets/hussain-founder.jpeg";
import { PAGE, INK, SERIF, MONO, fade } from "@/marketing/theme";
import { Band, Kicker, useTone } from "@/marketing/primitives";
import MarketingNav from "@/marketing/MarketingNav";
import MarketingFooter from "@/marketing/MarketingFooter";

const HeroSection = () => {
  const c = useTone();
  return (
    <section className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-24">
      <motion.div variants={fade} initial="hidden" animate="show" className="lg:col-span-5 order-1">
        <div className="relative w-60 sm:w-72 mx-auto lg:mx-0">
          <img src={hussainImage} alt="Hussain — Founder of Notivon" className="w-full aspect-[3/4] object-cover rounded-2xl" style={{ border: `1px solid ${c.line}` }} />
          <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl -z-10" style={{ border: `1px solid ${c.accent}` }} />
        </div>
      </motion.div>
      <motion.div variants={fade} custom={1} initial="hidden" animate="show" className="lg:col-span-7 order-2">
        <Kicker>Founder</Kicker>
        <h1 style={{ fontFamily: SERIF, lineHeight: 1.02 }} className="font-medium tracking-[-0.02em] text-[clamp(2.4rem,7vw,4.4rem)] mt-5 mb-6">
          I'm <span style={{ fontStyle: "italic", color: c.accent }}>Hussain</span>.
        </h1>
        <p className="text-[18px] sm:text-[20px] leading-[1.6] max-w-[46ch]" style={{ color: c.mut }}>
          I built Notivon around one idea: find what's actually costing a business money or time —{" "}
          <span style={{ color: c.fg, fontWeight: 500 }}>then build the custom system that fixes it.</span>
        </p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[15px]">
          <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 transition-opacity hover:opacity-70" style={{ color: c.mut }}>
            <Mail className="w-4 h-4" style={{ color: c.accentText }} /> {EMAIL}
          </a>
          <span className="inline-flex items-center gap-2" style={{ color: c.mut }}>
            <MapPin className="w-4 h-4" style={{ color: c.accentText }} /> Nigeria → Global
          </span>
        </div>
      </motion.div>
    </section>
  );
};

const ProseSection = ({ kicker, paras }: { kicker: string; paras: React.ReactNode[] }) => {
  const c = useTone();
  return (
    <section className="py-20 sm:py-28">
      <div className="grid md:grid-cols-12 gap-6 md:gap-10">
        <div className="md:col-span-4"><Kicker>{kicker}</Kicker></div>
        <div className="md:col-span-8 space-y-5 text-[16px] sm:text-[17px] leading-[1.7] max-w-[68ch]" style={{ color: c.mut }}>
          {paras.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </section>
  );
};

const DifferenceSection = () => {
  const c = useTone();
  return (
    <section className="py-20 sm:py-28">
      <Kicker>What makes this different</Kicker>
      <p style={{ fontFamily: SERIF, lineHeight: 1.2 }} className="font-light text-[clamp(1.5rem,4vw,2.4rem)] tracking-[-0.01em] mt-5 mb-10 max-w-[60ch]">
        Most businesses force generic CRMs onto workflows they were never built for.{" "}
        <span style={{ color: c.accentText }}>Notivon builds systems designed for how your business actually works.</span>
      </p>
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        {[
          { icon: Users, t: "Direct access", d: "You work directly with me. No junior associates, no handoffs. I'm accountable for results." },
          { icon: Zap, t: "Fast delivery", d: "Most businesses are live within 2–4 weeks. You start seeing results immediately." },
        ].map((card, i) => (
          <motion.div key={card.t} variants={fade} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-2xl p-7" style={{ background: c.card, border: `1px solid ${c.line}`, boxShadow: c.cardShadow }}>
            <card.icon className="w-7 h-7 mb-4" strokeWidth={1.5} style={{ color: c.accentText }} />
            <h3 style={{ fontFamily: SERIF }} className="text-xl font-medium mb-2">{card.t}</h3>
            <p className="text-[15px] leading-[1.6]" style={{ color: c.mut }}>{card.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const WhySection = () => {
  const c = useTone();
  return (
    <section className="py-20 sm:py-28">
      <Kicker>Why I do this</Kicker>
      <blockquote style={{ fontFamily: SERIF, lineHeight: 1.2 }} className="font-light text-[clamp(1.5rem,4.4vw,2.7rem)] tracking-[-0.01em] max-w-[24ch] mt-6">
        Find the real bottleneck in how you work, scope only what solves it, and build a system that
        makes your team <span style={{ fontStyle: "italic", color: c.accentText }}>faster and more profitable.</span>
      </blockquote>
      <p className="mt-8 text-[15px] leading-[1.7] max-w-[60ch]" style={{ color: c.mut }}>
        Most businesses are doing great work but held back by tools that weren't built for them.
        My mission is simple — and it starts with an honest read, not a sales pitch.
      </p>
    </section>
  );
};

const CtaSection = () => {
  const c = useTone();
  return (
    <section className="py-24 sm:py-32 text-center">
      <h2 style={{ fontFamily: SERIF, lineHeight: 1.05 }} className="font-medium tracking-[-0.02em] text-[clamp(1.9rem,5.5vw,3.2rem)] mb-5">
        Ready to streamline your operations?
      </h2>
      <p className="text-[16px] mb-9 mx-auto max-w-[46ch]" style={{ color: c.mut }}>
        Let's find the one system that saves your team hours every week — or start with the free map.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/scorecard" className="inline-flex items-center justify-center gap-2 text-[15px] font-semibold px-8 py-4 rounded-full transition-transform hover:-translate-y-0.5" style={{ background: c.accent, color: "#FFFFFF" }}>
          Get your free Opportunity Map <ArrowRight className="w-4 h-4" />
        </Link>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-[15px] font-semibold px-8 py-4 rounded-full transition-colors" style={{ border: `1px solid ${c.line}`, color: c.fg }}>
          WhatsApp us
        </a>
      </div>
      <p className="mt-6 text-[14px]" style={{ color: c.mut }}>
        Or call <a href={`tel:${PHONE_PRIMARY}`} className="underline-offset-4 hover:underline" style={{ color: c.accentText }}>{PHONE_PRIMARY}</a>
      </p>
    </section>
  );
};

const About = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ background: PAGE, color: INK, fontFamily: "'Instrument Sans', sans-serif" }} className="min-h-screen antialiased overflow-x-hidden selection:bg-[#2E6BFF] selection:text-white">
      <Helmet>
        <title>About Hussain | Notivon — Custom Systems Builder</title>
        <meta name="description" content="Meet Hussain, founder of Notivon. He finds what's actually costing a business money or time, then builds the custom system that fixes it." />
      </Helmet>

      <MarketingNav />

      <main>
        <Band t="light"><HeroSection /></Band>
        <Band t="dark">
          <ProseSection kicker="The problem I saw" paras={[
            <>A visa agency chasing clients for documents and catching an expired passport two weeks before submission. A clearing agent tracking shipments across WhatsApp groups and losing hours to paperwork. A sales team copy-pasting leads between spreadsheets. <span style={{ color: "#EDEFF3" }}>Different industries, same pattern: manual processes, costly errors, and wasted time.</span></>,
            <>I kept seeing businesses doing incredible work but held back by tools that weren't built for them. Generic CRMs, spreadsheets, and WhatsApp groups patched together — none of it designed for how they actually operate. That's where Notivon comes in.</>,
          ]} />
        </Band>
        <Band t="light">
          <ProseSection kicker="My background" paras={[
            <>I've spent years in the automation space — building systems, workflows, and AI-powered tools for businesses across the US, Australia, Dubai, and Nigeria. From automated outreach (Saydieko) to deal-sourcing engines (Dealflow) to operations management, I've helped companies eliminate manual bottlenecks and scale without adding headcount.</>,
            <>In 2025, I launched Notivon with a focus on Nigerian trade and compliance businesses — visa agencies and customs clearing agents. VisaGuard and ClearVoy are the first systems built under that banner. But the mandate is broader: any business where the right custom system would change how they operate.</>,
          ]} />
        </Band>
        <Band t="dark"><DifferenceSection /></Band>
        <Band t="light"><WhySection /></Band>
        <Band t="dark"><CtaSection /></Band>
      </main>

      <MarketingFooter />
    </div>
  );
};

export default About;
