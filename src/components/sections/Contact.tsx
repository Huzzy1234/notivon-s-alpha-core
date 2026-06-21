import { ArrowRight, MessageSquare, Phone, Calendar, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PHONE_PRIMARY, PHONE_SECONDARY, WHATSAPP_NUMBER } from "@/lib/constants";

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
    <section ref={sectionRef} id="contact" className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center bg-card border border-border/60 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Limited Spots Available
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-foreground mb-6 leading-tight">
                Have a bottleneck worth fixing?<br/>
                <span className="text-primary">Start a conversation.</span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-md">
                Book a free discovery call and we'll find the real problem — then tell you exactly what it would take to fix it.
              </p>

              <div className="space-y-5 mb-12">
                <div className="flex items-start gap-4">
                   <div className="mt-0.5 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Clock className="w-4 h-4" /></div>
                   <div>
                     <p className="text-base font-semibold text-foreground">Launch within 2–4 weeks</p>
                     <p className="text-sm text-muted-foreground">Get your team operating faster, sooner.</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="mt-0.5 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary"><MessageSquare className="w-4 h-4" /></div>
                   <div>
                     <p className="text-base font-semibold text-foreground">Custom proposal inside 48 hrs</p>
                     <p className="text-sm text-muted-foreground">Clear scope, timelines, and deliverables.</p>
                   </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://calendly.com/hussainhussainakan/ai-discovery-meeting-clone" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20">
                  <Calendar className="w-4 h-4" />
                  Book a Free Demo
                </a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary/20 bg-background text-foreground font-semibold text-sm rounded-xl hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Chat With Us
                  <ArrowRight className="w-4 h-4 text-primary" />
                </a>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 text-sm text-muted-foreground font-medium">
                <a href={`tel:${PHONE_PRIMARY}`} className="text-primary hover:text-primary/80 transition-colors hover:underline font-bold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> {PHONE_PRIMARY}
                </a>
                <span className="hidden sm:inline text-muted-foreground/30">·</span>
                <a href={`tel:${PHONE_SECONDARY}`} className="text-primary hover:text-primary/80 transition-colors hover:underline font-bold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> {PHONE_SECONDARY}
                </a>
              </div>
            </div>

            <div className="relative z-10 hidden lg:block h-full">
               <div className="w-full h-full min-h-[400px] relative flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl scale-90 opacity-60 animate-float" />
                 <div className="absolute glass w-80 rounded-3xl border border-white/20 shadow-2xl flex flex-col justify-center items-center p-12 bg-card/60 backdrop-blur-xl text-center transform hover:scale-105 transition-transform duration-700 animate-float-slow">
                    <Calendar className="w-24 h-24 text-primary mb-8 drop-shadow-xl opacity-90" />
                    <p className="text-2xl font-display font-semibold mb-3 text-foreground tracking-tight">Discovery Call</p>
                    <p className="text-muted-foreground mb-8">30 Min Strategy Session</p>
                    <div className="px-6 py-2.5 bg-primary/10 border border-primary/20 text-primary font-bold rounded-full text-xs uppercase tracking-widest shadow-sm">
                       Free Value Included
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
