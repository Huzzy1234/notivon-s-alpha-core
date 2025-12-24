import { Lock, FileText } from "lucide-react";

const DossierPreview = () => {
  return (
    <section id="dossier" className="py-36 relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 xl:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-5 py-2.5 border border-primary/40 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-8">
              Sample Output
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[-0.02em] text-foreground mb-8 leading-tight">
              Confidential Deal{" "}
              <span className="text-primary">Dossier</span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-10 font-light">
              Our AI-driven analysis generates comprehensive target profiles—
              combining public data, proprietary signals, and predictive
              modeling to surface opportunities invisible to traditional
              screening.
            </p>
            <ul className="space-y-5 mb-12">
              {[
                "Financial trajectory modeling",
                "Leadership stability analysis",
                "Competitive positioning signals",
                "Timing optimization scoring",
              ].map((item) => (
                <li key={item} className="flex items-center gap-5 text-foreground font-medium">
                  <div className="w-2.5 h-2.5 bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://calendly.com/hussainhussainakan/10min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-sm hover:bg-primary/90 transition-all glow-cyan"
            >
              Request Full Sample
            </a>
          </div>

          {/* Dossier Preview */}
          <div className="relative">
            {/* Blurred document */}
            <div className="bg-card/60 backdrop-blur-sm border border-border/60 p-10 relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between mb-10 pb-8 border-b border-border/60">
                <div className="flex items-center gap-4">
                  <FileText className="w-7 h-7 text-primary" />
                  <span className="font-bold text-foreground uppercase tracking-wider">
                    Target Analysis
                  </span>
                </div>
                <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                  Confidential
                </span>
              </div>

              {/* Blurred content */}
              <div className="space-y-5 blur-[6px] select-none">
                <div className="h-4 bg-muted/50 w-3/4" />
                <div className="h-4 bg-muted/50 w-full" />
                <div className="h-4 bg-muted/50 w-5/6" />
                <div className="h-10" />
                <div className="grid grid-cols-3 gap-5">
                  <div className="h-24 bg-muted/50" />
                  <div className="h-24 bg-muted/50" />
                  <div className="h-24 bg-muted/50" />
                </div>
                <div className="h-10" />
                <div className="h-4 bg-muted/50 w-full" />
                <div className="h-4 bg-muted/50 w-4/5" />
                <div className="h-4 bg-muted/50 w-3/4" />
                <div className="h-10" />
                <div className="h-28 bg-muted/50" />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent flex items-end justify-center pb-14">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Lock className="w-5 h-5" />
                  <span className="text-sm uppercase tracking-wider font-medium">
                    AI-Generated Target Analysis
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute -top-3 -left-3 w-8 h-8 border-l-2 border-t-2 border-primary" />
            <div className="absolute -top-3 -right-3 w-8 h-8 border-r-2 border-t-2 border-primary" />
            <div className="absolute -bottom-3 -left-3 w-8 h-8 border-l-2 border-b-2 border-primary" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-r-2 border-b-2 border-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DossierPreview;
