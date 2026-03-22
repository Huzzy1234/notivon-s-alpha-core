import { FileText, Camera, Bell, Users, BarChart3, Globe } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const services = [
  {
    icon: FileText,
    title: "Document Management",
    description:
      "Automated collection, organization, and validation of all visa documents. Per-visa-type checklists ensure nothing is missed. Clients upload everything in one place.",
  },
  {
    icon: Bell,
    title: "Expiry Tracking & Alerts",
    description:
      "Monitor passport expiry dates, medical certificates, bank statements, and more. Get notified well in advance so you request renewals before they cause delays.",
  },
  {
    icon: Camera,
    title: "Photo & File Compliance",
    description:
      "Automatic checks for photo dimensions, file sizes, and format requirements. Flag issues before submission so applications aren't rejected for avoidable reasons.",
  },
  {
    icon: Users,
    title: "Client Portal",
    description:
      "Give each client a simple, branded portal to upload documents, see what's missing, and track their application status — no more chasing via WhatsApp or email.",
  },
  {
    icon: BarChart3,
    title: "Application Tracking",
    description:
      "See every application's status at a glance — from intake to submission to decision. Know exactly where each case stands and what needs attention.",
  },
  {
    icon: Globe,
    title: "Multi-Visa Type Support",
    description:
      "Student visas, work permits, tourist visas, family reunification — each with its own checklist, timeline, and requirements. One system handles them all.",
  },
];

const MandateGrid = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-16 sm:py-24 lg:py-36 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className={`mb-12 sm:mb-16 lg:mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-3 sm:px-5 py-2 sm:py-2.5 border border-primary/40 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary mb-6 sm:mb-8">
            Core Systems
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[-0.02em] text-foreground leading-tight">
            What We
            <br className="hidden sm:block" />
            <span className="text-primary"> Build For You</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-border/60 backdrop-blur-sm bg-card/30">
          {services.map((item, index) => (
            <div
              key={item.title}
              className={`p-6 sm:p-8 lg:p-10 xl:p-14 border-b border-r border-border/60 last:border-r-0 [&:nth-child(3n)]:border-r-0 [&:nth-last-child(-n+3)]:border-b-0 sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-child(3n)]:border-r lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 group hover:bg-card/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms', transitionDuration: '800ms' }}
            >
              <div className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-muted/30 mb-4 sm:mb-6 lg:mb-8 group-hover:text-primary/20 transition-colors duration-500">
                0{index + 1}
              </div>

              <div className="w-12 sm:w-14 h-12 sm:h-14 border border-primary/50 flex items-center justify-center mb-4 sm:mb-6 lg:mb-8 group-hover:bg-primary group-hover:border-primary transition-all duration-300 group-hover:scale-110">
                <item.icon className="w-6 sm:w-7 h-6 sm:h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              <h3 className="text-lg sm:text-xl font-sans font-bold text-foreground mb-3 sm:mb-5 uppercase tracking-wider">
                {item.title}
              </h3>

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