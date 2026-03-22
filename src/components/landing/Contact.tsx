import { ArrowRight, Mail, Calendar, MessageSquare, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Contact = () => {
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
    <section ref={sectionRef} id="contact" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-3 sm:px-5 py-2 sm:py-2.5 border border-primary/40 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary mb-6 sm:mb-8">
            Get Started
          </span>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-5 sm:mb-8 leading-tight">
            Ready to Streamline Your{" "}
            <span className="text-primary">Agency</span>?
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-10 sm:mb-14 font-light max-w-2xl mx-auto">
            Book a free consultation to see how a custom system can save your team hours every week and reduce application errors.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className={`bg-card/40 backdrop-blur-sm border border-border/40 p-6 sm:p-8 group hover:border-primary/40 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
              <Calendar className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-foreground font-semibold mb-2">Book a Call</h3>
              <p className="text-sm text-muted-foreground">Free 15-min consultation</p>
            </div>

            <div className={`bg-card/40 backdrop-blur-sm border border-border/40 p-6 sm:p-8 group hover:border-primary/40 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
              <MessageSquare className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-foreground font-semibold mb-2">Get a Plan</h3>
              <p className="text-sm text-muted-foreground">Custom system proposal for your agency</p>
            </div>

            <div className={`bg-card/40 backdrop-blur-sm border border-border/40 p-6 sm:p-8 group hover:border-primary/40 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
              <Mail className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-foreground font-semibold mb-2">Go Live</h3>
              <p className="text-sm text-muted-foreground">Launch within 2–4 weeks</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href="https://calendly.com/hussainhussainakan/10min"
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-xs sm:text-sm hover:bg-primary/90 transition-all glow-cyan ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '400ms' }}
            >
              Book Your Free Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://wa.me/2349014390149"
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 border-2 border-border bg-background/30 backdrop-blur-sm text-foreground font-semibold uppercase tracking-wider text-xs sm:text-sm hover:border-primary hover:text-primary transition-all ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '500ms' }}
            >
              <Phone className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          <p className={`mt-6 text-sm text-muted-foreground transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '600ms' }}>
            Or call directly: <a href="tel:09014390149" className="text-primary hover:text-primary/80 font-medium transition-colors">09014390149</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;