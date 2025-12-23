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
    <section id="mandate" className="py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <span className="inline-block px-4 py-2 border border-primary text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            Strategic Framework
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground">
            The 2026 Private Equity
            <br />
            <span className="text-primary">AI Mandate</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-0 border border-border">
          {mandateItems.map((item, index) => (
            <div
              key={item.title}
              className={`p-8 lg:p-12 ${
                index < mandateItems.length - 1 ? "md:border-r border-b md:border-b-0 border-border" : ""
              } group hover:bg-card transition-colors duration-300`}
            >
              {/* Number */}
              <div className="text-6xl font-bold text-muted/50 mb-6">
                0{index + 1}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 border border-primary flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-4 uppercase tracking-wider">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
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
