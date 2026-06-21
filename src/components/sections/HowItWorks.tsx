import { MessageSquare, Settings, Rocket } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const steps = [
  {
    icon: MessageSquare,
    number: "1",
    title: "Find the real bottleneck",
    description: "We sit with your business and find the real bottleneck — not whatever you assumed needed fixing.",
  },
  {
    icon: Settings,
    number: "2",
    title: "Scope & build only that",
    description: "We scope and build only what solves that problem. No bloated features, no unnecessary cost.",
  },
  {
    icon: Rocket,
    number: "3",
    title: "Hand over & maintain",
    description: "We hand over a working system — then stay on to maintain and extend it as your business grows.",
  },
];

const HowItWorks = () => {
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

  return (
    <section ref={sectionRef} id="how-it-works" className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className={`mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
            How We Work
          </p>
          <div className="w-12 h-[2px] bg-primary/50 rounded-full mb-8" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-foreground mb-6 max-w-xl">
            From Conversation to{" "}
            <span className="text-primary italic">Live System</span>
          </h2>
        </div>

        <div className="relative mt-8">
          <div className="hidden lg:block absolute top-[4.5rem] left-[15%] right-[15%] h-0.5 bg-border/50 z-0 overflow-hidden rounded-full">
            <div className={`h-full bg-gradient-to-r from-primary/50 via-primary to-accent transition-all duration-[2s] ease-in-out ${isVisible ? 'w-full' : 'w-0'}`} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`relative text-center transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                <div className="w-36 h-36 mx-auto bg-card border-2 border-border/50 rounded-full flex flex-col items-center justify-center mb-8 relative group hover:border-primary/80 transition-colors duration-500 shadow-xl shadow-primary/5 glass hover:-translate-y-2 transform">
                  <span className="text-[5rem] font-display font-bold text-muted-foreground/10 absolute leading-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:text-primary/10 transition-colors duration-500">
                    {step.number}
                  </span>
                  <step.icon className="w-10 h-10 text-primary relative z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-sm" />
                </div>

                <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pull quote */}
        <div className={`mt-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "900ms" }}>
          <blockquote className="border-l-2 border-primary/40 pl-8 max-w-3xl">
            <p className="text-xl sm:text-2xl text-foreground leading-relaxed font-display">
              Most software agencies sell you a template and call it custom.{" "}
              <span className="text-primary font-semibold">
                We diagnose the actual problem first — then build only what solves it.
              </span>
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;