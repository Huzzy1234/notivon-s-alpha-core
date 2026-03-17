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
    description: "Most agencies are up and running within 2–4 weeks of the initial consultation.",
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
    <section ref={sectionRef} id="trust" className="relative py-16 sm:py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-primary text-sm sm:text-base font-medium tracking-widest uppercase mb-4 block">
            Why Agencies Trust Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 font-heading">
            Built to Deliver Results
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            We understand the visa industry because we build exclusively for it.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
          {signals.map((signal, index) => (
            <div
              key={signal.title}
              className={`bg-card/60 backdrop-blur-sm border border-border/40 p-8 sm:p-10 text-center group hover:border-primary/40 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${100 + index * 150}ms` }}
            >
              <signal.icon className="w-10 h-10 text-primary mx-auto mb-5 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-foreground mb-3">{signal.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{signal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
