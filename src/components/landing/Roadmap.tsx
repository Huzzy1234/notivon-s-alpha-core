import { Search, BookOpen, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Maturity Audit",
    description:
      "A 20-minute diagnostic of your current sourcing and due-diligence workflow. Identify gaps between your existing infrastructure and agentic capability.",
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
    <section id="roadmap" className="py-32 bg-card relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 border border-primary text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            Engagement Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground">
            Transformation{" "}
            <span className="text-primary">Roadmap</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-0">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                {/* Card */}
                <div className="bg-background border border-border p-8 lg:p-10 h-full group hover:border-primary transition-colors duration-300">
                  {/* Step number and icon row */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-5xl font-bold text-primary">
                      {step.number}
                    </span>
                    <div className="w-14 h-14 border border-border flex items-center justify-center group-hover:border-primary transition-colors">
                      <step.icon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-4 uppercase tracking-wider">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 w-8 h-8 bg-background border border-border items-center justify-center -translate-y-1/2 z-10">
                    <div className="w-2 h-2 border-r-2 border-t-2 border-primary rotate-45" />
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
