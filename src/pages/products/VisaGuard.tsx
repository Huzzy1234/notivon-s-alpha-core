import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  FileText,
  Bell,
  Users,
  MessageCircle,
  Camera,
  BarChart3,
  Globe,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Play,
} from "lucide-react";
import { useCursorGlow } from "@/hooks/useAnimations";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const features = [
  {
    icon: FileText,
    title: "Intelligent Document Management",
    description:
      "Automated collection, organization, and validation of all client visa documents in one organized pipeline.",
    features: [
      "Per-visa-type requirements checklists",
      "Automated missing document chasing",
      "Centralized, searchable file storage",
      "Secure, encrypted cloud architecture",
    ],
  },
  {
    icon: Bell,
    title: "Automated Expiry Tracking",
    description:
      "Monitor passport expiry dates, medical certificates, and police clearances with zero manual spreadsheet work.",
    features: [
      "Proactive 30/60/90 day warnings",
      "Compliance-blocking prevention",
      "Automated client renewal nudges",
      "Global team dashboard views",
    ],
  },
  {
    icon: Users,
    title: "Branded Client Portals",
    description:
      "Give every single client a professional, white-labeled portal to upload documents and track their application.",
    features: [
      "No-login magic link access",
      "Live status progress bars",
      "Mobile-first responsive upload experience",
      "Direct-to-agent secure messaging",
    ],
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Automation",
    description:
      "Tap into the most popular messaging app to keep your clients informed automatically.",
    features: [
      "Automated status update broadcasts",
      "Interview reminder drop sequences",
      "Missing document gentle nudges",
      "Two-way conversational history log",
    ],
  },
];

const additionalCapabilities = [
  {
    icon: Camera,
    title: "Photo & File Compliance",
    description:
      "Automatic checks for photo dimensions, file sizes, and format requirements before submission.",
  },
  {
    icon: BarChart3,
    title: "Application Pipeline",
    description:
      "Visual board tracking every application from intake through to decision. Know where each case stands instantly.",
  },
  {
    icon: Globe,
    title: "Multi-Visa Type Support",
    description:
      "Student visas, work permits, tourist visas, family reunification — each with its own checklist and workflow.",
  },
];

const VisaGuard = () => {
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
        <title>VisaGuard | Notivon — Systems for Visa & Travel Agencies</title>
        <meta
          name="description"
          content="VisaGuard is purpose-built for visa and travel agencies. Automate document collection, track expiring records, manage pipelines, and keep clients informed via WhatsApp."
        />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />

        {/* Hero */}
        <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6 border border-primary/20">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  For Visa & Travel Agencies
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-[1.1] text-foreground mb-6">
                  Stop Losing
                  <br />
                  Applications to{" "}
                  <span className="gradient-text italic">Chaos</span>
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                  VisaGuard is purpose-built for how visa agencies actually work.
                  Automated document collection, expiry tracking, compliance checks,
                  and client portals — all in one system.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/2349014390149"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 btn-glow"
                  >
                    Get VisaGuard for Your Agency
                  </a>
                  <a
                    href="#demo"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-border bg-card text-foreground font-semibold text-sm rounded-xl hover:border-primary hover:text-primary hover:bg-primary/5 transition-all btn-glow"
                  >
                    <Play className="w-4 h-4" />
                    Watch Demo
                  </a>
                </div>
              </div>

              {/* Hero Visual — hidden on small phones to keep hero clean */}
              <div
                className="relative mt-8 lg:mt-0 reveal-right revealed"
                style={{ animation: "fadeInScale 0.8s 0.2s cubic-bezier(0.16,1,0.3,1) both" }}
              >
                <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/10 glass transform hover:scale-[1.02] transition-transform duration-700 shimmer">
                  <div className="absolute top-0 left-0 right-0 h-10 bg-background/50 border-b border-white/5 flex items-center px-4 gap-2 backdrop-blur-md z-20">
                    <div className="w-3 h-3 rounded-full bg-destructive/80 shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-accent/80 shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-sm" />
                  </div>
                  <img
                    src="/visaguard-mockup.png"
                    alt="VisaGuard Dashboard"
                    className="w-full h-auto mt-10 object-cover"
                  />
                  <div className="absolute inset-0 mt-10 -z-10 bg-primary/5 opacity-50" />
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
                See VisaGuard in Action
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                Watch how VisaGuard organizes your workflow, tracks documents, and
                keeps your clients informed automatically.
              </p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl relative bg-card group transform transition-transform hover:scale-[1.01] duration-500">
                <iframe
                  src="https://www.loom.com/embed/bf8c944baa184547a39bbe3b268eb6c8?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
                Core Capabilities
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
                Built for <span className="text-primary italic">Precision</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Every feature is designed around how visa agencies actually operate
                day-to-day.
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
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-sm border border-primary/20">
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
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
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
                  <div className="absolute inset-0 bg-primary/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  {/* High Fidelity Mockup instead of abstract blocks */}
                  <div className="w-full h-full relative z-10 rounded-xl overflow-hidden shadow-2xl border border-white/10 transform group-hover:scale-105 transition-transform duration-700 bg-background flex items-center justify-center">
                    <img src="/visaguard-mockup.png" alt="Feature Interface" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Capabilities */}
        <section className="py-20 sm:py-28 bg-card border-y border-border/50 relative">
          <div className="absolute inset-0 bg-primary/3 opacity-30 pointer-events-none" />
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
                  className="bg-background border border-border/60 rounded-3xl p-8 hover:border-primary/40 hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
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
        <section className="py-20 px-4 sm:px-6 lg:px-12 bg-primary/5 border-t border-border">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Streamline Your Agency?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how VisaGuard can save your team hours every week and
              eliminate costly errors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/2349014390149"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary text-primary-foreground text-lg font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all rounded-xl shadow-xl shadow-primary/20"
              >
                WhatsApp Us
              </a>
              <a
                href="tel:09014390149"
                className="px-8 py-4 border border-primary text-primary text-lg font-semibold uppercase tracking-wider hover:bg-primary/10 transition-all rounded-xl"
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

export default VisaGuard;
