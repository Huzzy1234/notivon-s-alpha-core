import { Settings, Zap, BarChart2, Video } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const capabilities = [
  {
    number: "01",
    icon: Settings,
    title: "Operational systems",
    description:
      "Tracking, intake, verification, and management tools built around your actual workflow — not a generic template.",
  },
  {
    number: "02",
    icon: Zap,
    title: "AI-powered automation",
    description:
      "Lead generation, document processing, customer scoring, and outreach that runs without manual effort.",
  },
  {
    number: "03",
    icon: BarChart2,
    title: "Sales & data infrastructure",
    description:
      "CRMs, lead pipelines, and deal-sourcing engines built to fit how your team actually sells.",
  },
  {
    number: "04",
    icon: Video,
    title: "Content & growth systems",
    description:
      "AI-generated video and content pipelines for businesses scaling their marketing.",
  },
];

const WhatWeBuild = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 border-t border-border/40 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">

        {/* Section label */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
            What We Build
          </p>
          <div className="w-12 h-[2px] bg-primary/50 rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 gap-0 border border-border/60 rounded-2xl overflow-hidden">
          {capabilities.map((cap, index) => {
            const isTop = index < 2;
            const isLeft = index % 2 === 0;
            return (
              <div
                key={cap.number}
                className={`group p-8 sm:p-10 relative transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${!isTop ? "border-t border-border/60" : ""} ${
                  isLeft && index !== 0 ? "" : ""
                } ${index === 1 || index === 3 ? "sm:border-l sm:border-border/60" : ""} hover:bg-muted/30`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-6">
                  <span className="text-[11px] font-bold text-muted-foreground/50 tracking-widest pt-1 shrink-0">
                    {cap.number}
                  </span>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <cap.icon className="w-5 h-5 text-primary shrink-0" />
                      <h3 className="text-lg font-semibold text-foreground capitalize">
                        {cap.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeBuild;
