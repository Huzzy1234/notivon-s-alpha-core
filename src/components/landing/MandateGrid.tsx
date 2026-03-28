import { FileText, Camera, Bell, Users, BarChart3, Globe } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const services = [
  {
    icon: FileText,
    title: "Document Management",
    description: "Automated collection, organization, and validation of all visa documents. Per-visa-type checklists ensure nothing is missed.",
  },
  {
    icon: Bell,
    title: "Expiry Tracking & Alerts",
    description: "Monitor passport expiry dates, medical certificates, and more. Get notified well in advance so you request renewals before delays.",
  },
  {
    icon: Camera,
    title: "Photo & File Compliance",
    description: "Automatic checks for photo dimensions, file sizes, and format requirements. Flag issues before submission.",
  },
  {
    icon: Users,
    title: "Client Portal",
    description: "Give each client a simple portal to upload documents, see what's missing, and track their application status.",
  },
  {
    icon: BarChart3,
    title: "Application Tracking",
    description: "See every application's status at a glance — from intake to submission to decision. Know where each case stands.",
  },
  {
    icon: Globe,
    title: "Multi-Visa Type Support",
    description: "Student visas, work permits, tourist visas, family reunification — each with its own checklist and requirements.",
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
    <section ref={sectionRef} id="services" className="py-20 sm:py-28 relative bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-foreground mb-4">
            What We Build For You
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Everything your agency needs to run smoother, built around how you actually work.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, index) => (
            <div
              key={item.title}
              className={`group bg-card border border-border rounded-xl p-7 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
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
