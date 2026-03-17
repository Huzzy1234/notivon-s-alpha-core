import { MessageSquare, Settings, Rocket, ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const steps = [
  {
    icon: MessageSquare,
    title: "Discovery Call",
    description: "We learn how your agency operates — your visa types, pain points, team size, and current workflow. No fluff, just understanding what's slowing you down.",
  },
  {
    icon: Settings,
    title: "Custom Build",
    description: "We design and build a system tailored to your agency. Document checklists, expiry alerts, client portals, photo validation — whatever you actually need.",
  },
  {
    icon: Rocket,
    title: "Launch & Support",
    description: "We deploy the system, train your team, and stay on for support. You start processing applications faster from week one.",
  },
];

const HowItWorks = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          steps.forEach((_, index) => {
            setTimeout(() => {
              setVisibleSteps((prev) => [...prev, index]);
            }, index * 200);
          });
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
        <div className="absolute top-2/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <span className="inline-block px-3 sm:px-5 py-2 sm:py-2.5 border border-primary/40 bg-primary/5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary mb-6 sm:mb-8 backdrop-blur-sm">
            The Process
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground leading-tight">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            From initial conversation to a running system in weeks, not months
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 -translate-y-1/2">
            <div className="h-full bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent w-1/3 animate-flow" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`relative transition-all duration-700 ${
                  visibleSteps.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="group relative bg-card/60 backdrop-blur-sm border border-border/50 p-6 sm:p-8 lg:p-10 h-full hover:border-primary/50 hover:bg-card/80 transition-all duration-500">
                  <div className="absolute -top-4 left-6 sm:left-8 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-primary/60 hidden lg:block" />
                    )}
                  </div>

                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 mt-4">
                    <div className="absolute inset-0 border border-primary/30 rotate-45 group-hover:rotate-[135deg] transition-transform duration-700" />
                    <div className="absolute inset-2 border border-primary/20 rotate-45 group-hover:rotate-[90deg] transition-transform duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <step.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4 text-center uppercase tracking-wider">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light text-center">
                    {step.description}
                  </p>

                  <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-primary/30 group-hover:border-primary/60 transition-colors" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-primary/30 group-hover:border-primary/60 transition-colors" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-primary/30 group-hover:border-primary/60 transition-colors" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary/30 group-hover:border-primary/60 transition-colors" />
                </div>

                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className="w-8 h-8 border border-border/60 flex items-center justify-center rotate-90">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
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

export default HowItWorks;
