import { FileText, Camera, Bell, Users, BarChart3, Globe, MessageCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const services = [
  {
    icon: FileText,
    title: "Document Management",
    description: "Automated collection, organization, and validation of all visa documents. Per-visa-type checklists ensure nothing is missed.",
    image: "/document-management-ui.png",
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
    icon: MessageCircle,
    title: "WhatsApp Automation",
    description: "Automated WhatsApp messages for appointment reminders, document requests, status updates, and follow-ups — so your clients stay informed without manual effort.",
    image: "/whatsapp-automation-ui.png",
  },
  {
    icon: Globe,
    title: "Multi-Visa Type Support",
    description: "Student visas, work permits, tourist visas, family reunification — each with its own specific checklist and requirements.",
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 sm:py-32 relative bg-card border-y border-border/50">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-primary/3 opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-foreground mb-4">
            Everything Your Agency Needs
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Built from the ground up around how visa agencies actually work day-to-day.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {services.map((item, index) => {
            const isWide = index === 0 || index === 5;
            
            return (
              <div
                key={item.title}
                className={`group bg-background border border-border/60 rounded-3xl p-8 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative overflow-hidden ${
                  isWide ? "lg:col-span-2 md:col-span-2" : "col-span-1"
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {isWide && item.image ? (
                  <div className="absolute top-0 right-0 w-[120%] md:w-3/5 h-[120%] md:h-full opacity-20 md:opacity-100 pointer-events-none transition-transform group-hover:scale-105 duration-1000 z-0 md:rounded-r-3xl overflow-hidden">
                     {/* Desktop fade from left */}
                     <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent hidden md:block z-10 w-full" />
                     {/* Mobile fade from top/left */}
                     <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent md:hidden z-10" />
                     
                     <img src={item.image} alt={item.title} className="w-full h-full object-cover object-left-top md:object-left translate-x-8 md:translate-x-0 group-hover:translate-x-2 transition-transform duration-1000 opacity-90 filter drop-shadow-2xl mix-blend-lighten" />
                  </div>
                ) : isWide ? (
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-[100px] pointer-events-none transition-transform group-hover:scale-110 duration-700 z-0" />
                ) : null}
                
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10 transition-all duration-300 ${isWide ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:-translate-y-1'}`}>
                  <item.icon className="w-6 h-6" />
                </div>

                <h3 className={`font-semibold text-foreground mb-3 relative z-10 ${isWide ? 'text-2xl mt-4' : 'text-lg'}`}>
                  {item.title}
                </h3>

                <p className={`text-muted-foreground leading-relaxed relative z-10 ${isWide ? 'text-base max-w-md' : 'text-sm'}`}>
                  {item.description}
                </p>
                
                {isWide && (
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                    <div className="w-10 h-10 rounded-full border border-primary text-primary flex items-center justify-center bg-background">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MandateGrid;