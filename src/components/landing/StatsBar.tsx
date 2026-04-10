import { useEffect, useState, useRef } from "react";

const stats = [
  { label: "Agencies Served", value: 10, suffix: "+" },
  { label: "Applications Processed", value: 500, suffix: "+" },
  { label: "Client Satisfaction", value: 98, suffix: "%" },
  { label: "Weeks Setup Time", value: 3, suffix: "" },
];

const StatsBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 bg-card border-y border-border relative z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-border/50">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center justify-center text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-2">
                {isVisible ? <CountUp end={stat.value} duration={2} /> : "0"}
                <span className="text-primary">{stat.suffix}</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Simple CountUp component
const CountUp = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      // Use easeOutQuart ease function
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return <>{count}</>;
};

export default StatsBar;
