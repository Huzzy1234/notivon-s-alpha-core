import { useEffect } from "react";
import { PHONE_PRIMARY, WHATSAPP_NUMBER } from "@/lib/constants";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Ship,
  FileText,
  MessageCircle,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  Play,
  Clock,
  Users,
  ShieldCheck,
} from "lucide-react";
import { useCursorGlow } from "@/hooks/useAnimations";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const features = [
  {
    icon: Ship,
    title: "Shipment Pipeline Management",
    description:
      "A visual operations board that tracks every shipment through its lifecycle — from documentation to final release.",
    features: [
      "Multi-stage pipeline (Pre-Arrival → Customs → Release)",
      "Drag-and-drop stage progression",
      "Real-time status at a glance",
      "Separate tracking for Customs, Shipping Line & Terminal release",
    ],
  },
  {
    icon: MapPin,
    title: "Field Agent Operations",
    description:
      "Purpose-built for agents who live at the port. Mobile-first interface designed for one-handed operation on the go.",
    features: [
      "Mobile-optimized bento-grid dashboard",
      "Quick-action buttons for common updates",
      "Job detail sheets with full history",
      "Works on any device, any network",
    ],
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Client Updates",
    description:
      "Keep importers and clients informed at every stage with pre-built WhatsApp message templates.",
    features: [
      "One-tap status updates to clients",
      "Pre-formatted professional messages",
      "Message preview before sending",
      "Full communication history log",
    ],
  },
  {
    icon: FileText,
    title: "Document & Duty Tracking",
    description:
      "Track every document, duty payment, and release authorization in one organized system.",
    features: [
      "Bill of Lading & Form M tracking",
      "Duty assessment and payment logs",
      "Pre-Arrival Assessment Report (PAAR) management",
      "Automated document checklist per shipment",
    ],
  },
];

const additionalCapabilities = [
  {
    icon: Clock,
    title: "Real-Time Dashboards",
    description:
      "Live stats on active jobs, pending releases, and pipeline throughput — so you always know where things stand.",
  },
  {
    icon: Users,
    title: "Client Management",
    description:
      "Organized profiles for importers and businesses with full shipment history and contact details.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Ready",
    description:
      "Built around NCS processes with proper stage gates to ensure nothing is missed or submitted out of order.",
  },
];

const ClearVoy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // scroll reveal
    const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("revealed"); }),
      { threshold: 0.1 }
    );
    reveals.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          ClearVoy | Notivon — Systems for Customs Clearing Agents
        </title>
        <meta
          name="description"
          content="ClearVoy is purpose-built for customs clearing agents. Manage shipment pipelines, track releases, update clients via WhatsApp, and operate from the field on mobile."
        />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />

        {/* Hero */}
        <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -ml-40 -mt-40" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none -mr-20 -mb-20" />

          <div className="container mx-auto max-w-6xl relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Notivon
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 text-sm font-medium rounded-full mb-6 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  For Customs Clearing Agents
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-[1.1] text-foreground mb-6">
                  Clear Cargo,
                  <br />
                  Not{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-accent italic">
                    Confusion
                  </span>
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                  ClearVoy is the operations dashboard built for how clearing
                  agents actually work at Nigerian ports. Pipeline management,
                  field updates, and WhatsApp client comms — all from your phone.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white font-semibold text-sm rounded-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 btn-glow"
                  >
                    Get ClearVoy for Your Team
                  </a>
                  <a
                    href="#demo"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-border bg-card text-foreground font-semibold text-sm rounded-xl hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/5 transition-all btn-glow"
                  >
                    <Play className="w-4 h-4" />
                    Watch Demo
                  </a>
                </div>
              </div>

              {/* Hero Visual */}
              <div
                className="relative"
                style={{ animation: "fadeInScale 0.8s 0.2s cubic-bezier(0.16,1,0.3,1) both" }}
              >
                <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-emerald-500/10 glass p-8 transform hover:scale-[1.02] transition-transform duration-700 shimmer">
                  <div className="absolute top-0 left-0 right-0 h-10 bg-background/50 border-b border-white/5 flex items-center px-4 gap-2 backdrop-blur-md z-20">
                    <div className="w-3 h-3 rounded-full bg-destructive/80 shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-accent/80 shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-sm" />
                  </div>
                  <img
                    src="/clearvoy-mockup.png"
                    alt="ClearVoy Dashboard"
                    className="w-full h-auto mt-10 object-cover rounded-md shadow-xl"
                  />
                  <div className="absolute inset-0 mt-10 -z-10 bg-emerald-500/5 opacity-50" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Demo */}
        <section id="demo" className="py-20 sm:py-28 bg-muted/20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display text-foreground mb-4">
                See ClearVoy in Action
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                Watch how ClearVoy manages shipment pipelines and keeps clients
                updated from the field.
              </p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl relative bg-card group transform transition-transform hover:scale-[1.01] duration-500">
                <iframe
                  src="https://kommodo.ai/recordings/H8BiIYDheGNcgztGJ7ei?onlyRecording=1"
                  frameBorder="0"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full pt-8 sm:pt-12 z-0"
                ></iframe>
                <div className="absolute top-0 left-0 right-0 h-8 sm:h-12 bg-background/80 backdrop-blur-md border-b border-border flex items-center px-4 gap-2 z-10 w-full">
                  <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-destructive/80 shadow-sm" />
                  <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-accent/80 shadow-sm" />
                  <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-emerald-500/80 shadow-sm" />
                  <div className="mx-auto bg-muted/50 rounded-md h-5 sm:h-6 w-1/3 max-w-xs border border-border/50"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-20 sm:py-28 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 space-y-24">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 text-sm font-medium rounded-full mb-6">
                Core Capabilities
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
                Built for the{" "}
                <span className="text-emerald-600 italic">Voyage</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Every feature is designed around how clearing agents actually
                operate at Nigerian ports.
              </p>
            </div>

            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`reveal grid md:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  index % 2 !== 0 ? "md:grid-flow-col-dense" : ""
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={index % 2 !== 0 ? "md:col-start-2" : ""}>
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6 shadow-sm border border-emerald-500/20">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-display font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {feature.description}
                  </p>
                  <ul className="space-y-4">
                    {feature.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`relative w-full aspect-square md:aspect-auto md:h-full min-h-[400px] rounded-3xl overflow-hidden glass border border-border/50 shadow-2xl bg-card flex items-center justify-center p-8 group ${
                    index % 2 !== 0 ? "md:col-start-1" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-emerald-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  {/* High Fidelity Mockup instead of abstract blocks */}
                  <div className="w-full h-full relative z-10 rounded-xl overflow-hidden shadow-2xl border border-white/10 transform group-hover:scale-105 transition-transform duration-700 bg-background flex items-center justify-center">
                    <img src="/clearvoy-mockup.png" alt="Feature Interface" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Capabilities */}
        <section className="py-20 sm:py-28 bg-card border-y border-border/50 relative">
          <div className="absolute inset-0 bg-emerald-500/3 opacity-30 pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display text-foreground mb-4">
                Plus Everything Else You Need
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {additionalCapabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="bg-background border border-border/60 rounded-3xl p-8 hover:border-emerald-500/40 hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <cap.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-12 bg-emerald-500/5 border-t border-border">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Streamline Your Clearing Operations?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how ClearVoy can help your team process more
              shipments with less chaos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-emerald-600 text-white text-lg font-semibold uppercase tracking-wider hover:bg-emerald-700 transition-all rounded-xl shadow-xl shadow-emerald-600/20"
              >
                WhatsApp Us
              </a>
              <a
                href={`tel:${PHONE_PRIMARY}`}
                className="px-8 py-4 border border-emerald-600 text-emerald-600 text-lg font-semibold uppercase tracking-wider hover:bg-emerald-500/10 transition-all rounded-xl"
              >
                Call Us
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ClearVoy;
