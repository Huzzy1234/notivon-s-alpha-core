import { Link } from "react-router-dom";
import {
  Shield,
  Ship,
  TrendingUp,
  FileText,
  Bell,
  Users,
  MessageCircle,
  MapPin,
  ArrowRight,
  Play,
  Search,
  Target,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCursorGlow, useMagnetic } from "@/hooks/useAnimations";

const products = [
  {
    id: "visaguard",
    name: "VisaGuard",
    tagline: "For Visa & Travel Agencies",
    description:
      "Automate document collection, track expiring records, manage application pipelines, and keep clients informed via WhatsApp.",
    icon: Shield,
    features: [
      { icon: FileText, label: "Document Management" },
      { icon: Bell, label: "Expiry Tracking" },
      { icon: Users, label: "Client Portals" },
      { icon: MessageCircle, label: "WhatsApp Automation" },
    ],
    link: "/products/visaguard",
    mockupImg: "/visaguard-mockup.png",
    demoEmbed:
      "https://www.loom.com/embed/bf8c944baa184547a39bbe3b268eb6c8?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    status: ["BUILT", "IN ACTIVE SALES"],
    accent: {
      badge: "bg-primary/10 text-primary border-primary/20",
      dot: "bg-primary",
      iconBg:
        "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
      featureIcon: "text-primary",
      border: "hover:border-primary/40",
      cta: "text-primary",
      playRing: "border-primary/30 bg-primary/10",
      playIcon: "text-primary",
      playText: "text-primary",
      shadow: "shadow-primary/10",
      statusBg: "bg-primary/10 text-primary",
    },
  },
  {
    id: "clearvoy",
    name: "ClearVoy",
    tagline: "For Customs Clearing Agents",
    description:
      "Manage shipment pipelines, track releases, update clients from the field via WhatsApp, and operate entirely from mobile.",
    icon: Ship,
    features: [
      { icon: Ship, label: "Shipment Pipeline" },
      { icon: MapPin, label: "Field Operations" },
      { icon: MessageCircle, label: "WhatsApp Updates" },
      { icon: FileText, label: "Document Tracking" },
    ],
    link: "/products/clearvoy",
    mockupImg: "/clearvoy-mockup.png",
    demoEmbed: "https://kommodo.ai/recordings/H8BiIYDheGNcgztGJ7ei?onlyRecording=1",
    status: ["DESIGNED & BUILT"],
    accent: {
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      dot: "bg-emerald-500",
      iconBg:
        "bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white",
      featureIcon: "text-emerald-500",
      border: "hover:border-emerald-500/40",
      cta: "text-emerald-400",
      playRing: "border-emerald-500/30 bg-emerald-500/10",
      playIcon: "text-emerald-400",
      playText: "text-emerald-400",
      shadow: "shadow-emerald-500/10",
      statusBg: "bg-emerald-500/10 text-emerald-400",
    },
  },
];

const MagneticPlay = ({
  product,
  onClick,
}: {
  product: (typeof products)[0];
  onClick: () => void;
}) => {
  const mag = useMagnetic<HTMLButtonElement>(0.45);

  return (
    <button
      ref={mag.ref}
      onMouseMove={mag.onMouseMove}
      onMouseLeave={mag.onMouseLeave}
      onClick={onClick}
      className={`relative z-10 w-20 h-20 rounded-full ${product.accent.playRing} border-2 flex items-center justify-center shadow-2xl backdrop-blur-sm`}
    >
      <Play className={`w-8 h-8 ml-1 ${product.accent.playIcon}`} />
    </button>
  );
};

const ProductCard = ({
  product,
  delay,
  isVisible,
}: {
  product: (typeof products)[0];
  delay: number;
  isVisible: boolean;
}) => {
  const [activeDemo, setActiveDemo] = useState(false);
  const glow = useCursorGlow<HTMLDivElement>();

  return (
    <div
      className={`group relative surface-1 border border-border rounded-lg overflow-hidden transition-all duration-700 ${product.accent.border} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        ref={glow.ref}
        onMouseMove={glow.onMouseMove}
        onMouseLeave={glow.onMouseLeave}
        className="glow-card absolute inset-0 z-0 pointer-events-none"
      />

      <div className="grid lg:grid-cols-2 gap-0 relative z-10">
        {/* Left: Product Info */}
        <div className="relative p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full mb-6 border w-fit ${product.accent.badge}`}
          >
            <span className={`w-2 h-2 rounded-full ${product.accent.dot} animate-pulse`} />
            {product.tagline}
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${product.accent.iconBg}`}
            >
              <product.icon className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                {product.name}
              </h3>
              <div className="flex gap-1.5 mt-1 flex-wrap">
                {product.status.map((s) => (
                  <span
                    key={s}
                    className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${product.accent.statusBg}`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8 text-base max-w-md">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {product.features.map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-2 px-3 py-2 bg-background/80 rounded-lg border border-border/50"
              >
                <feature.icon className={`w-3.5 h-3.5 ${product.accent.featureIcon}`} />
                <span className="text-xs font-semibold text-foreground">{feature.label}</span>
              </div>
            ))}
          </div>

          <Link
            to={product.link}
            className={`inline-flex items-center gap-2 text-sm font-bold ${product.accent.cta} group/link w-fit`}
          >
            Learn More About {product.name}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>

        {/* Right: Demo */}
        <div className="relative lg:border-l border-t lg:border-t-0 border-border/40">
          {activeDemo ? (
            <div className="aspect-video lg:aspect-auto lg:h-full min-h-[300px] relative">
              <iframe
                src={product.demoEmbed}
                frameBorder="0"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ) : (
            <div
              className="w-full aspect-video lg:aspect-auto lg:h-full min-h-[260px] sm:min-h-[300px] relative flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-background via-card to-background cursor-pointer group/play"
              onClick={() => setActiveDemo(true)}
            >
              <div className="absolute inset-0 p-6 md:p-8 flex items-center justify-center overflow-hidden pointer-events-none">
                <img
                  src={product.mockupImg}
                  alt={`${product.name} interface`}
                  className="w-full h-auto object-cover rounded-md shadow-2xl border border-border transition-all duration-500 group-hover/play:opacity-30 group-hover/play:scale-[1.02]"
                />
              </div>

              <MagneticPlay product={product} onClick={() => setActiveDemo(true)} />

              <span className={`relative z-10 text-sm font-bold ${product.accent.playText}`}>
                Watch {product.name} Demo
              </span>
              <span className="relative z-10 text-xs text-muted-foreground uppercase tracking-widest">
                Click to play
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="products" className="py-20 sm:py-28 border-t border-border/40 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">

        {/* Header */}
        <div
          className={`mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="tech-label mb-4">Track record — the build side</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight">
              Systems we've <span className="text-primary">already built.</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-sm sm:text-right">
              Built for real engagements — each one created to solve a specific, diagnosed problem.
            </p>
          </div>
        </div>

        {/* Main products with demo videos */}
        <div className="space-y-10 mb-10">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              delay={200 + index * 200}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Past client engagement — Dealflow */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="group relative surface-1 border border-border rounded-lg overflow-hidden hover:border-amber-500/30 transition-colors duration-500 p-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-amber-500/10 text-amber-500 shrink-0">
                <TrendingUp className="w-7 h-7" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-xl font-display font-bold text-foreground">Dealflow/</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">
                    BUILT
                  </span>
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-3">
                  For US Acquisition Firms
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                  Deal sourcing & outreach system built for search funds and independent sponsors — automated pipeline from target identification to first contact.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    { icon: Search, label: "Deal Sourcing" },
                    { icon: MessageCircle, label: "Outreach Engine" },
                    { icon: TrendingUp, label: "Pipeline Tracking" },
                    { icon: Target, label: "Scoring & Filters" },
                  ].map((f) => (
                    <div
                      key={f.label}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-background/60 rounded-lg border border-border/40"
                    >
                      <f.icon className="w-3 h-3 text-amber-500" />
                      <span className="text-xs font-medium text-foreground">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="shrink-0">
                <span className="text-xs text-muted-foreground/50 font-medium uppercase tracking-widest">
                  Private engagement
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductShowcase;
