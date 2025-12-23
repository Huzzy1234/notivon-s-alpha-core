import { Lock, FileText } from "lucide-react";

const DossierPreview = () => {
  return (
    <section id="dossier" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-2 border border-primary text-xs font-semibold uppercase tracking-widest text-primary mb-6">
              Sample Output
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-6">
              Confidential Deal{" "}
              <span className="text-primary">Dossier</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Our AI-driven analysis generates comprehensive target profiles—
              combining public data, proprietary signals, and predictive
              modeling to surface opportunities invisible to traditional
              screening.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Financial trajectory modeling",
                "Leadership stability analysis",
                "Competitive positioning signals",
                "Timing optimization scoring",
              ].map((item) => (
                <li key={item} className="flex items-center gap-4 text-foreground">
                  <div className="w-2 h-2 bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#audit"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-sm hover:bg-primary/90 transition-all glow-cyan"
            >
              Request Full Sample
            </a>
          </div>

          {/* Dossier Preview */}
          <div className="relative">
            {/* Blurred document */}
            <div className="bg-card border border-border p-8 relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-primary" />
                  <span className="font-bold text-foreground uppercase tracking-wider">
                    Target Analysis
                  </span>
                </div>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase">
                  Confidential
                </span>
              </div>

              {/* Blurred content */}
              <div className="space-y-4 blur-[6px] select-none">
                <div className="h-4 bg-muted w-3/4" />
                <div className="h-4 bg-muted w-full" />
                <div className="h-4 bg-muted w-5/6" />
                <div className="h-8" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-20 bg-muted" />
                  <div className="h-20 bg-muted" />
                  <div className="h-20 bg-muted" />
                </div>
                <div className="h-8" />
                <div className="h-4 bg-muted w-full" />
                <div className="h-4 bg-muted w-4/5" />
                <div className="h-4 bg-muted w-3/4" />
                <div className="h-8" />
                <div className="h-24 bg-muted" />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent flex items-end justify-center pb-12">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm uppercase tracking-wider">
                    AI-Generated Target Analysis: Sample Confidential Case
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-primary" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-primary" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-primary" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DossierPreview;
