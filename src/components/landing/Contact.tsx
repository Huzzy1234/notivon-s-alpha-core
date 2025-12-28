import { ArrowRight, Mail, Calendar, MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-3 sm:px-5 py-2 sm:py-2.5 border border-primary/40 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary mb-6 sm:mb-8">
            Get Started
          </span>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-5 sm:mb-8 leading-tight">
            Ready to Transform Your{" "}
            <span className="text-primary">Deal Sourcing</span>?
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-10 sm:mb-14 font-light max-w-2xl mx-auto">
            Schedule a complimentary AI Maturity Audit to discover how agentic infrastructure 
            can accelerate your search and surface proprietary opportunities.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className={`bg-card/40 backdrop-blur-sm border border-border/40 p-6 sm:p-8 group hover:border-primary/40 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
              <Calendar className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-foreground font-semibold mb-2">Book a Call</h3>
              <p className="text-sm text-muted-foreground">Schedule a 15-min strategy session</p>
            </div>

            <div className={`bg-card/40 backdrop-blur-sm border border-border/40 p-6 sm:p-8 group hover:border-primary/40 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
              <MessageSquare className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-foreground font-semibold mb-2">Get Your Audit</h3>
              <p className="text-sm text-muted-foreground">Receive personalized AI recommendations</p>
            </div>

            <div className={`bg-card/40 backdrop-blur-sm border border-border/40 p-6 sm:p-8 group hover:border-primary/40 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
              <Mail className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-foreground font-semibold mb-2">Start Sourcing</h3>
              <p className="text-sm text-muted-foreground">Launch your AI-powered pipeline</p>
            </div>
          </div>

          <a
            href="https://calendly.com/hussainhussainakan/10min"
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-xs sm:text-sm hover:bg-primary/90 transition-all glow-cyan ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '400ms' }}
          >
            Schedule Your Free Audit
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
