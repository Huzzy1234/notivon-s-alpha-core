import { Target, Zap, BarChart3, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ValueProposition = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const pillars = [
    {
      icon: Target,
      title: "Precision Targeting",
      description: "AI-powered filters surface owners matching your exact acquisition criteria—industry, size, geography, and succession signals.",
    },
    {
      icon: Zap,
      title: "Speed Advantage",
      description: "Identify opportunities weeks before they hit broker networks. First-mover advantage in competitive markets.",
    },
    {
      icon: BarChart3,
      title: "Data-Driven Conviction",
      description: "Every lead comes with context—financial indicators, ownership tenure, and succession probability scores.",
    },
    {
      icon: Shield,
      title: "Competitive Moat",
      description: "Your proprietary sourcing infrastructure. No shared databases. No recycled broker listings.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-2 border border-primary/30 bg-primary/5 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6">
            Why Notivon
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            10x Faster Deal Sourcing
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Built specifically for search fund entrepreneurs who refuse to rely on recycled broker listings.
          </p>
        </div>

        {/* Four Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className={`group p-6 sm:p-8 border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:bg-card/80 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${150 + index * 100}ms` }}
            >
              <div className="w-12 h-12 border border-primary/30 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 group-hover:rotate-3">
                <pillar.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
