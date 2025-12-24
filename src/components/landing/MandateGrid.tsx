import { Bot, Users, TrendingUp } from "lucide-react";

const mandateItems = [
  {
    icon: Bot,
    title: "Agentic Origination",
    description:
      "Moving beyond static scrapers to reasoning agents that identify 'silent' market triggers—founder life events, regulatory shifts, and competitive pressures invisible to traditional sourcing.",
  },
  {
    icon: Users,
    title: "LP Expectation Management",
    description:
      "Meeting the rising demand from Limited Partners for a visible AI-driven value creation roadmap. Demonstrate technological sophistication in your investment thesis.",
  },
  {
    icon: TrendingUp,
    title: "Operational Alpha",
    description:
      "Driving exit multiples by embedding self-optimizing agents into portfolio companies. Automate revenue operations, customer success, and back-office functions at scale.",
  },
];

const MandateGrid = () => {
  return (
    <section id="mandate" className="py-36 relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 xl:px-20 relative z-10">
        {/* Section Header */}
        <div className="mb-24">
          <span className="inline-block px-5 py-2.5 border border-primary/40 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-8">
            Strategic Framework
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[-0.02em] text-foreground leading-tight">
            The 2026 Private Equity
            <br />
            <span className="text-primary">AI Mandate</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-0 border border-border/60 backdrop-blur-sm bg-card/30">
          {mandateItems.map((item, index) => (
            <div
              key={item.title}
              className={`p-10 lg:p-14 ${
                index < mandateItems.length - 1 ? "md:border-r border-b md:border-b-0 border-border/60" : ""
              } group hover:bg-card/50 transition-colors duration-500`}
            >
              {/* Number */}
              <div className="text-7xl font-display font-bold text-muted/30 mb-8">
                0{index + 1}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 border border-primary/50 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                <item.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-sans font-bold text-foreground mb-5 uppercase tracking-wider">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MandateGrid;
