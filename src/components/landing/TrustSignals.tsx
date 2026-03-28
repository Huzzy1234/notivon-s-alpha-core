import { useEffect, useState, useRef } from "react";
import { ShieldCheck, Zap, HeartHandshake } from "lucide-react";

const signals = [
  {
    icon: ShieldCheck,
    title: "Built for Compliance",
    description: "Every system is designed around actual visa requirements — not generic templates.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Most agencies are up and running within 2–4 weeks of the first conversation.",
  },
  {
    icon: HeartHandshake,
    title: "Ongoing Support",
    description: "We don't just build and disappear. You get continued support as your agency grows.",
  },
];

const TrustSignals = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="trust" className="relative py-20 sm:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-foreground mb-4">
            Why Agencies Trust Us
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            We understand the visa industry because we build exclusively for it.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {signals.map((signal, index) => (
            <div
              key={signal.title}
              className={`bg-card border border-border rounded-xl p-8 text-center group hover:border-primary/30 hover:shadow-lg transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${100 + index * 150}ms` }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 transition-colors">
                <signal.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{signal.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{signal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
