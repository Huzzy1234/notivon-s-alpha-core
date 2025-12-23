import { ArrowRight, FileText } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--muted-foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--muted-foreground)) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <div className="animate-fade-up">
            <span className="inline-block px-4 py-2 border border-border text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
              AI Transformation Partner
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground mb-8 animate-fade-up-delay-1">
            Proprietary Deal Flow &{" "}
            <span className="text-primary">AI Transformation</span>
            <br />
            for Private Equity
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-12 animate-fade-up-delay-2">
            Bridging the gap between 2025 AI experimentation and 2026 autonomous
            origination. We build the agentic infrastructure mid-market firms
            need to surface off-market alpha.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up-delay-3">
            <a
              href="#audit"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-sm hover:bg-primary/90 transition-all glow-cyan"
            >
              Request AI Maturity Audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#dossier"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-border text-foreground font-semibold uppercase tracking-wider text-sm hover:border-primary hover:text-primary transition-all"
            >
              <FileText className="w-4 h-4" />
              View Sample Dossier
            </a>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-12 right-12 hidden lg:block">
          <div className="w-32 h-32 border border-border relative">
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-primary" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
