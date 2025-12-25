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
    <section id="mandate" className="py-16 sm:py-24 lg:py-36 relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 lg:mb-24">
          <span className="inline-block px-3 sm:px-5 py-2 sm:py-2.5 border border-primary/40 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary mb-6 sm:mb-8">
            Strategic Framework
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[-0.02em] text-foreground leading-tight">
            The 2026 Private Equity
            <br className="hidden sm:block" />
            <span className="text-primary"> AI Mandate</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-0 border border-border/60 backdrop-blur-sm bg-card/30">
          {mandateItems.map((item, index) => (
            <div
              key={item.title}
              className={`p-6 sm:p-8 lg:p-10 xl:p-14 ${
                index < mandateItems.length - 1 ? "border-b sm:border-b md:border-b-0 md:border-r border-border/60" : ""
              } ${index === 1 ? "sm:border-r-0 md:border-r" : ""} group hover:bg-card/50 transition-colors duration-500`}
            >
              {/* Number */}
              <div className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-muted/30 mb-4 sm:mb-6 lg:mb-8">
                0{index + 1}
              </div>

              {/* Icon */}
              <div className="w-12 sm:w-14 h-12 sm:h-14 border border-primary/50 flex items-center justify-center mb-4 sm:mb-6 lg:mb-8 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                <item.icon className="w-6 sm:w-7 h-6 sm:h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-sans font-bold text-foreground mb-3 sm:mb-5 uppercase tracking-wider">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
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
