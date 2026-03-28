import { ArrowRight, MessageSquare, Phone, Send } from "lucide-react";
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
    <section ref={sectionRef} id="contact" className="py-20 sm:py-28 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className={`max-w-3xl mx-auto text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-foreground mb-5">
            Ready to Streamline Your Agency?
          </h2>
          
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            Send us a message on WhatsApp and let's discuss how a custom system can save your team hours every week.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            <div className={`bg-card border border-border rounded-xl p-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
              <Send className="w-7 h-7 text-primary mx-auto mb-3" />
              <h3 className="text-foreground font-semibold mb-1">Send a Message</h3>
              <p className="text-sm text-muted-foreground">Reach us on WhatsApp</p>
            </div>

            <div className={`bg-card border border-border rounded-xl p-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
              <MessageSquare className="w-7 h-7 text-primary mx-auto mb-3" />
              <h3 className="text-foreground font-semibold mb-1">Get a Plan</h3>
              <p className="text-sm text-muted-foreground">Custom proposal for your agency</p>
            </div>

            <div className={`bg-card border border-border rounded-xl p-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
              <Phone className="w-7 h-7 text-primary mx-auto mb-3" />
              <h3 className="text-foreground font-semibold mb-1">Go Live</h3>
              <p className="text-sm text-muted-foreground">Launch within 2–4 weeks</p>
            </div>
          </div>

          <a
            href="https://wa.me/2349014390149"
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '400ms' }}
          >
            Chat With Us on WhatsApp
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <p className={`mt-5 text-sm text-muted-foreground transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '600ms' }}>
            Or call directly: <a href="tel:09014390149" className="text-primary hover:text-primary/80 font-medium transition-colors">09014390149</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
