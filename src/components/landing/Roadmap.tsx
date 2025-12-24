import { Search, BookOpen, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Maturity Audit",
    description:
      "A comprehensive diagnostic of your current sourcing and due-diligence workflow. Identify gaps between your existing infrastructure and agentic capability.",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Strategic Education",
    description:
      "Training investment teams on agentic frameworks. Build internal competency to evaluate, deploy, and manage AI-driven deal origination systems.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Implementation",
    description:
      "Deploying private, proprietary deal engines. Custom-built reasoning agents trained on your thesis, sector expertise, and historical deal patterns.",
  },
];

const Roadmap = () => {
  return (
    <section id="roadmap" className="py-36 relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Subtle background */}
      <div className="absolute inset-0 bg-card/40 backdrop-blur-sm" />

      <div className="container mx-auto px-6 lg:px-12 xl:px-20 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24">
          <span className="inline-block px-5 py-2.5 border border-primary/40 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-8">
            Engagement Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[-0.02em] text-foreground">
            Transformation{" "}
            <span className="text-primary">Roadmap</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border/50 -translate-y-1/2" />

          <div className="grid lg:grid-cols-3 gap-10 lg:gap-0">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                {/* Card */}
                <div className="bg-background/60 backdrop-blur-sm border border-border/60 p-10 lg:p-12 h-full group hover:border-primary/50 transition-all duration-500">
                  {/* Step number and icon row */}
                  <div className="flex items-center justify-between mb-10">
                    <span className="text-6xl font-display font-bold text-primary">
                      {step.number}
                    </span>
                    <div className="w-16 h-16 border border-border/60 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                      <step.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-sans font-bold text-foreground mb-5 uppercase tracking-wider">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-5 w-10 h-10 bg-background border border-border/60 items-center justify-center -translate-y-1/2 z-10">
                    <div className="w-2.5 h-2.5 border-r-2 border-t-2 border-primary rotate-45" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
