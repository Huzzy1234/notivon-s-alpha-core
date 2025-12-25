import { Lock, FileText } from "lucide-react";

const DossierPreview = () => {
  return (
    <section id="dossier" className="py-16 sm:py-24 lg:py-36 relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-3 sm:px-5 py-2 sm:py-2.5 border border-primary/40 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary mb-6 sm:mb-8">
              Sample Output
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[-0.02em] text-foreground mb-5 sm:mb-8 leading-tight">
              Confidential Deal{" "}
              <span className="text-primary">Dossier</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6 sm:mb-10 font-light">
              Our AI-driven analysis generates comprehensive target profiles—
              combining public data, proprietary signals, and predictive
              modeling to surface opportunities invisible to traditional
              screening.
            </p>
            <ul className="space-y-3 sm:space-y-5 mb-8 sm:mb-12">
              {[
                "Financial trajectory modeling",
                "Leadership stability analysis",
                "Competitive positioning signals",
                "Timing optimization scoring",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 sm:gap-5 text-sm sm:text-base text-foreground font-medium">
                  <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://calendly.com/hussainhussainakan/10min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-4 sm:py-5 bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-xs sm:text-sm hover:bg-primary/90 transition-all glow-cyan"
            >
              Request Full Sample
            </a>
          </div>

          {/* Dossier Preview */}
          <div className="relative mt-8 lg:mt-0">
            {/* Blurred document */}
            <div className="bg-card/60 backdrop-blur-sm border border-border/60 p-6 sm:p-8 lg:p-10 relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 sm:mb-10 pb-4 sm:pb-8 border-b border-border/60">
                <div className="flex items-center gap-3 sm:gap-4">
                  <FileText className="w-5 sm:w-7 h-5 sm:h-7 text-primary" />
                  <span className="font-bold text-sm sm:text-base text-foreground uppercase tracking-wider">
                    Target Analysis
                  </span>
                </div>
                <span className="px-2 sm:px-4 py-1 sm:py-1.5 bg-primary/10 text-primary text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                  Confidential
                </span>
              </div>

              {/* Blurred content */}
              <div className="space-y-3 sm:space-y-5 blur-[6px] select-none">
                <div className="h-3 sm:h-4 bg-muted/50 w-3/4" />
                <div className="h-3 sm:h-4 bg-muted/50 w-full" />
                <div className="h-3 sm:h-4 bg-muted/50 w-5/6" />
                <div className="h-6 sm:h-10" />
                <div className="grid grid-cols-3 gap-3 sm:gap-5">
                  <div className="h-16 sm:h-24 bg-muted/50" />
                  <div className="h-16 sm:h-24 bg-muted/50" />
                  <div className="h-16 sm:h-24 bg-muted/50" />
                </div>
                <div className="h-6 sm:h-10" />
                <div className="h-3 sm:h-4 bg-muted/50 w-full" />
                <div className="h-3 sm:h-4 bg-muted/50 w-4/5" />
                <div className="h-3 sm:h-4 bg-muted/50 w-3/4" />
                <div className="h-6 sm:h-10" />
                <div className="h-20 sm:h-28 bg-muted/50" />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent flex items-end justify-center pb-10 sm:pb-14">
                <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground">
                  <Lock className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="text-xs sm:text-sm uppercase tracking-wider font-medium">
                    AI-Generated Target Analysis
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute -top-2 sm:-top-3 -left-2 sm:-left-3 w-6 sm:w-8 h-6 sm:h-8 border-l-2 border-t-2 border-primary" />
            <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-6 sm:w-8 h-6 sm:h-8 border-r-2 border-t-2 border-primary" />
            <div className="absolute -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 w-6 sm:w-8 h-6 sm:h-8 border-l-2 border-b-2 border-primary" />
            <div className="absolute -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 w-6 sm:w-8 h-6 sm:h-8 border-r-2 border-b-2 border-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DossierPreview;
