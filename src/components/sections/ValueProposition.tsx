import { Workflow, Clock, AlertTriangle, TrendingDown } from "lucide-react";
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
      icon: Workflow,
      title: "Manual Work, Automated",
      description: "The repetitive tasks eating your team's day — data entry, follow-ups, tracking, reporting — handled automatically by a system built around how you work.",
    },
    {
      icon: AlertTriangle,
      title: "Proactive Alerts",
      description: "Get flagged before something slips — a missed deadline, an expiring record, a stalled deal — instead of finding out when it's already cost you.",
    },
    {
      icon: Clock,
      title: "Hours Saved Every Week",
      description: "Stop chasing updates and manually tracking progress. Automated reminders and live status boards do the follow-up for you.",
    },
    {
      icon: TrendingDown,
      title: "Fewer Costly Mistakes",
      description: "Catch common errors before they cost you — wrong data, missed deadlines, or dropped handoffs between people and tools.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          <div className={`lg:col-span-5 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="text-4xl sm:text-5xl font-display text-foreground mb-6 leading-tight">
              Stop Losing Money to <span className="text-primary italic font-serif">Preventable Errors</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Generic spreadsheets and CRMs aren't built for how your business actually runs. We build purpose-made systems that fit your operations and let your team work without the manual headaches.
            </p>
            <div className="hidden lg:block w-32 h-1.5 bg-gradient-to-r from-primary to-transparent rounded-full opacity-50" />
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 relative">
            <div className="hidden sm:block absolute top-[50%] left-0 right-0 h-[1px] bg-border/60 z-0"></div>
            <div className="hidden sm:block absolute top-0 bottom-0 left-[50%] w-[1px] bg-border/60 z-0"></div>

            {pillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className={`relative group p-8 bg-card/80 backdrop-blur-md rounded-2xl border ${index === 0 ? 'border-primary/30 shadow-xl shadow-primary/5 bg-gradient-to-b from-primary/5 to-transparent' : 'border-border/50'} hover:border-primary/50 hover:bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 z-10 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${index === 0 ? 'bg-primary text-primary-foreground shadow-md' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:-translate-y-1 group-hover:shadow-lg'}`}>
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ValueProposition;