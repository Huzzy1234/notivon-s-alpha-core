import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play, CheckCircle2, type LucideIcon } from "lucide-react";
import { PHONE_PRIMARY, WHATSAPP_NUMBER } from "@/lib/constants";
import { PAGE, INK, SERIF, fade } from "./theme";
import { Band, Kicker, useTone } from "./primitives";
import MarketingNav from "./MarketingNav";
import MarketingFooter from "./MarketingFooter";

export type ProductFeature = { icon: LucideIcon; title: string; description: string; points: string[] };
export type ProductCap = { icon: LucideIcon; title: string; description: string };

export type ProductPageProps = {
  metaTitle: string;
  metaDescription: string;
  badge: string;
  identity: string; // vivid product accent
  identityDeep: string; // accent text on white (AA)
  identitySoft: string; // faint tinted background
  headPre: string;
  headAccent: string;
  sub: string;
  heroImage: string;
  demoSrc: string;
  demoHeading: string;
  demoSub: string;
  featuresAccent: string;
  featuresSub: string;
  features: ProductFeature[];
  caps: ProductCap[];
  ctaHeading: string;
  ctaSub: string;
};

const Chrome = () => (
  <span className="flex items-center gap-1.5">
    <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ec5f57" }} />
    <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f0be4f" }} />
    <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#61c454" }} />
  </span>
);

// accent that stays legible on the active band
const useIdAccent = (p: ProductPageProps) => {
  const c = useTone();
  return c.name === "dark" ? p.identity : p.identityDeep;
};

const HeroSection = (p: ProductPageProps) => {
  const c = useTone();
  const idAccent = useIdAccent(p);
  return (
    <section className="pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-24">
      <Link to="/" className="inline-flex items-center gap-2 text-[13px] mb-8 transition-opacity hover:opacity-70 group" style={{ color: c.mut }}>
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Notivon
      </Link>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div variants={fade} initial="hidden" animate="show">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[12px] font-medium rounded-full mb-6" style={{ background: p.identitySoft, color: idAccent, border: `1px solid ${p.identity}33` }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: p.identity }} /> {p.badge}
          </span>
          <h1 style={{ fontFamily: SERIF, lineHeight: 1.04 }} className="font-medium tracking-[-0.02em] text-[clamp(2.2rem,6.5vw,4.4rem)] mb-6">
            {p.headPre} <span style={{ fontStyle: "italic", color: p.identity }}>{p.headAccent}</span>
          </h1>
          <p className="text-[17px] sm:text-[18px] leading-[1.6] max-w-[48ch]" style={{ color: c.mut }}>{p.sub}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-[15px] font-semibold px-7 py-4 rounded-full transition-transform hover:-translate-y-0.5" style={{ background: p.identity, color: "#FFFFFF" }}>
              Get {p.metaTitle.split(" ")[0]} for your team
            </a>
            <a href="#demo" className="inline-flex items-center justify-center gap-2 text-[15px] font-semibold px-7 py-4 rounded-full transition-colors" style={{ border: `1px solid ${c.line}`, color: c.fg }}>
              <Play className="w-4 h-4" /> Watch demo
            </a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="rounded-2xl overflow-hidden" style={{ background: c.card, border: `1px solid ${c.line}`, boxShadow: c.cardShadow }}>
          <div className="flex items-center px-4 h-10 border-b" style={{ borderColor: c.line }}><Chrome /></div>
          <img src={p.heroImage} alt={`${p.headAccent} dashboard`} className="w-full h-auto object-cover" />
        </motion.div>
      </div>
    </section>
  );
};

const DemoSection = (p: ProductPageProps) => {
  const c = useTone();
  return (
    <section id="demo" className="py-20 sm:py-28 scroll-mt-24">
      <div className="text-center mb-10 sm:mb-14">
        <Kicker>Watch it work</Kicker>
        <h2 style={{ fontFamily: SERIF }} className="text-[clamp(1.8rem,4.5vw,2.8rem)] font-medium tracking-[-0.01em] mt-4 mb-3">{p.demoHeading}</h2>
        <p className="text-[16px] leading-[1.6] max-w-2xl mx-auto" style={{ color: c.mut }}>{p.demoSub}</p>
      </div>
      <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden" style={{ background: c.card, border: `1px solid ${c.line}`, boxShadow: c.cardShadow }}>
        <div className="flex items-center px-4 h-10 border-b" style={{ borderColor: c.line }}><Chrome /></div>
        <div className="aspect-[16/9] w-full relative bg-black">
          <iframe src={p.demoSrc} frameBorder="0" allowFullScreen className="absolute inset-0 w-full h-full" title={p.demoHeading} />
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = (p: ProductPageProps) => {
  const c = useTone();
  const idAccent = useIdAccent(p);
  return (
    <section className="py-20 sm:py-28">
      <div className="text-center mb-12 sm:mb-16">
        <Kicker>Core capabilities</Kicker>
        <h2 style={{ fontFamily: SERIF }} className="text-[clamp(1.9rem,5vw,3rem)] font-medium tracking-[-0.01em] mt-4 mb-3">
          Built for the <span style={{ fontStyle: "italic", color: p.identity }}>{p.featuresAccent}</span>
        </h2>
        <p className="text-[16px] leading-[1.6] max-w-2xl mx-auto" style={{ color: c.mut }}>{p.featuresSub}</p>
      </div>
      <div className="space-y-16 sm:space-y-24">
        {p.features.map((f, index) => (
          <motion.div key={f.title} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className={`grid md:grid-cols-2 gap-8 lg:gap-16 items-center ${index % 2 !== 0 ? "md:grid-flow-col-dense" : ""}`}>
            <div className={index % 2 !== 0 ? "md:col-start-2" : ""}>
              <span className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: p.identitySoft, color: idAccent, border: `1px solid ${p.identity}22` }}>
                <f.icon className="w-7 h-7" strokeWidth={1.6} />
              </span>
              <h3 style={{ fontFamily: SERIF }} className="text-[clamp(1.5rem,3.5vw,2rem)] font-medium tracking-[-0.01em] mb-4">{f.title}</h3>
              <p className="text-[16px] leading-[1.65] mb-7 max-w-[48ch]" style={{ color: c.mut }}>{f.description}</p>
              <ul className="space-y-3">
                {f.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px]">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: p.identity }} />
                    <span style={{ color: c.fg }}>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`rounded-2xl overflow-hidden ${index % 2 !== 0 ? "md:col-start-1" : ""}`} style={{ background: c.card, border: `1px solid ${c.line}`, boxShadow: c.cardShadow }}>
              <div className="flex items-center px-4 h-9 border-b" style={{ borderColor: c.line }}><Chrome /></div>
              <img src={p.heroImage} alt={`${f.title} interface`} className="w-full h-auto object-cover" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const CapsSection = (p: ProductPageProps) => {
  const c = useTone();
  return (
    <section className="py-20 sm:py-28">
      <div className="text-center mb-12">
        <Kicker>And everything else</Kicker>
        <h2 style={{ fontFamily: SERIF }} className="text-[clamp(1.8rem,4.5vw,2.8rem)] font-medium tracking-[-0.01em] mt-4">Plus everything else you need</h2>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto">
        {p.caps.map((cap, i) => (
          <motion.div key={cap.title} variants={fade} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-2xl p-7" style={{ background: c.card, border: `1px solid ${c.line}`, boxShadow: c.cardShadow }}>
            <span className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: p.identitySoft, color: p.identity }}>
              <cap.icon className="w-6 h-6" />
            </span>
            <h3 className="text-[17px] font-semibold mb-2" style={{ color: c.fg }}>{cap.title}</h3>
            <p className="text-[14px] leading-[1.6]" style={{ color: c.mut }}>{cap.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const CtaSection = (p: ProductPageProps) => {
  const c = useTone();
  return (
    <section className="py-24 sm:py-32 text-center">
      <h2 style={{ fontFamily: SERIF, lineHeight: 1.05 }} className="font-medium tracking-[-0.02em] text-[clamp(1.9rem,5.5vw,3.2rem)] mb-5">{p.ctaHeading}</h2>
      <p className="text-[16px] mb-9 mx-auto max-w-[48ch]" style={{ color: c.mut }}>{p.ctaSub}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-[15px] font-semibold px-8 py-4 rounded-full transition-transform hover:-translate-y-0.5" style={{ background: p.identity, color: "#FFFFFF" }}>
          WhatsApp us
        </a>
        <a href={`tel:${PHONE_PRIMARY}`} className="inline-flex items-center justify-center gap-2 text-[15px] font-semibold px-8 py-4 rounded-full transition-colors" style={{ border: `1px solid ${c.line}`, color: c.fg }}>
          Call {PHONE_PRIMARY}
        </a>
      </div>
    </section>
  );
};

const ProductPage = (p: ProductPageProps) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ background: PAGE, color: INK, fontFamily: "'Instrument Sans', sans-serif" }} className="min-h-screen antialiased overflow-x-hidden selection:bg-[#2E6BFF] selection:text-white">
      <Helmet>
        <title>{p.metaTitle}</title>
        <meta name="description" content={p.metaDescription} />
      </Helmet>

      <MarketingNav />

      <main>
        <Band t="light"><HeroSection {...p} /></Band>
        <Band t="dark"><DemoSection {...p} /></Band>
        <Band t="light"><FeaturesSection {...p} /></Band>
        <Band t="dark"><CapsSection {...p} /></Band>
        <Band t="light"><CtaSection {...p} /></Band>
      </main>

      <MarketingFooter />
    </div>
  );
};

export default ProductPage;
