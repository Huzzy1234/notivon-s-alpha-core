import { ArrowRight, FileText } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Subtle gradient overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/30 via-transparent to-background/60" />

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 xl:px-20 relative z-10">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <div className="animate-fade-up">
            <span className="inline-block px-5 py-2.5 border border-primary/40 bg-primary/5 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-10 backdrop-blur-sm">
              AI Transformation Partner
            </span>
          </div>

          {/* Bold Headline - Playfair Display */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.05] tracking-[-0.02em] text-foreground mb-10 animate-fade-up-delay-1">
            Unlock Proprietary
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Deal Flow
            </span>
            <br />
            <span className="text-muted-foreground font-medium italic">
              with Agentic AI
            </span>
          </h1>

          {/* Subheadline - Inter */}
          <p className="text-lg md:text-xl lg:text-2xl font-sans font-light text-muted-foreground max-w-2xl leading-relaxed mb-14 animate-fade-up-delay-2">
            The autonomous infrastructure mid-market PE firms need to surface
            off-market alpha—before the competition even knows it exists.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-5 animate-fade-up-delay-3">
            <a
              href="https://calendly.com/hussainhussainakan/10min"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-sm hover:bg-primary/90 transition-all glow-cyan"
            >
              Request AI Maturity Audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#dossier"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-border bg-background/30 backdrop-blur-sm text-foreground font-semibold uppercase tracking-wider text-sm hover:border-primary hover:text-primary transition-all"
            >
              <FileText className="w-4 h-4" />
              View Sample Dossier
            </a>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-16 right-16 hidden lg:block animate-fade-up-delay-4">
          <div className="w-36 h-36 border border-primary/20 relative">
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary animate-pulse" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-accent animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-7 h-12 border-2 border-primary/40 flex items-start justify-center p-2 backdrop-blur-sm">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
