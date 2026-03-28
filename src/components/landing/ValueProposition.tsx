import { FileCheck, Clock, AlertTriangle, TrendingDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ValueProposition = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const pillars = [
    {
      icon: FileCheck,
      title: "Smart Document Collection",
      description: "Automated checklists that adapt per visa type. Clients upload once, the system organizes and validates everything.",
    },
    {
      icon: AlertTriangle,
      title: "Expiry & Compliance Alerts",
      description: "Passports, medical reports, bank statements — get flagged before a document expires and causes a rejection.",
    },
    {
      icon: Clock,
      title: "Hours Saved Per Application",
      description: "Stop chasing clients for missing documents. Automated reminders and status tracking do the follow-up for you.",
    },
    {
      icon: TrendingDown,
      title: "Fewer Costly Mistakes",
      description: "Catch common errors before submission — wrong photo dimensions, missing signatures, expired records.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-foreground mb-4">
            Stop Losing Money to Preventable Errors
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Purpose-built systems that let visa agencies process more applications with fewer headaches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className={`group p-7 bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${150 + index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <pillar.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
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
