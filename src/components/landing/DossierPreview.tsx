import { Target, Zap, TrendingUp, Shield, ArrowRight } from "lucide-react";

const differentiators = [
  {
    icon: Target,
    title: "Precision Targeting",
    description: "Our AI identifies opportunities that match your exact thesis—filtering through thousands of targets to surface the top 1%.",
  },
  {
    icon: Zap,
    title: "Speed Advantage",
    description: "Move faster than traditional sourcing. Our systems surface opportunities weeks before they hit the market.",
  },
  {
    icon: TrendingUp,
    title: "Data-Driven Conviction",
    description: "Make decisions backed by comprehensive market intelligence, not gut instinct alone.",
  },
  {
    icon: Shield,
    title: "Competitive Moat",
    description: "Build proprietary deal flow that competitors can't replicate through manual processes.",
  },
];

const metrics = [
  { value: "10x", label: "Faster Deal Sourcing" },
  { value: "85%", label: "Time Saved on Research" },
  { value: "3x", label: "More Qualified Targets" },
];

const DossierPreview = () => {
  return (
    <section id="why-notivon" className="py-16 sm:py-24 lg:py-36 relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 scroll-reveal">
          <span className="inline-block px-3 sm:px-5 py-2 sm:py-2.5 border border-primary/40 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary mb-6 sm:mb-8">
            The Notivon Advantage
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[-0.02em] text-foreground mb-5 sm:mb-8 leading-tight">
            Why Search Funds{" "}
            <span className="text-primary">Choose Us</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light">
            We combine cutting-edge AI with deep Search Fund expertise to give you 
            an unfair advantage in competitive deal markets.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {metrics.map((metric, index) => (
            <div 
              key={metric.label} 
              className="text-center scroll-reveal"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2 sm:mb-3">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Differentiators Grid */}
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16">
          {differentiators.map((item, index) => (
            <div
              key={item.title}
              className="group bg-card/40 backdrop-blur-sm border border-border/60 p-6 sm:p-8 lg:p-10 hover:border-primary/40 transition-all duration-500 scroll-reveal"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="p-3 sm:p-4 bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300">
                  <item.icon className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center scroll-reveal">
          <a
            href="https://calendly.com/hussainhussainakan/10min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-4 sm:py-5 bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-xs sm:text-sm hover:bg-primary/90 transition-all glow-cyan group"
          >
            Start Your AI Advantage
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DossierPreview;
