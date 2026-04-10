import { ArrowRight, Calendar, Star, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const phrases = ["Save Time", "Reduce Errors", "Scale Faster"];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    // Slower typing speed when typing, faster when deleting
    const typingSpeed = isDeleting ? 40 : 80;
    const pauseTime = 3000;

    if (!isDeleting && displayText === currentPhrase) {
      setTimeout(() => setIsDeleting(true), pauseTime);
      return;
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentPhrase.substring(0, displayText.length - 1)
          : currentPhrase.substring(0, displayText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhraseIndex, phrases]);

  return (
    <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden pt-28 pb-16 px-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10 w-full max-w-[1400px]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-8 border border-primary/20 shadow-sm shadow-primary/5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                For Visa & Travel Agencies
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display leading-[1.15] text-foreground mb-6 animate-fade-up-delay-1">
              Help Your Agency{" "}
              <span className="gradient-text whitespace-nowrap">
                {displayText}
                <span className="animate-pulse text-primary font-sans font-light opacity-60">|</span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 animate-fade-up-delay-2 max-w-xl mx-auto lg:mx-0">
              Custom-built systems that streamline document collection, flag expiring records, and eliminate costly mistakes — so you can process more applications with less effort.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up-delay-3 mb-12">
              <a
                href="https://wa.me/2349014390149"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20 border border-primary/20"
              >
                Chat With Us on WhatsApp
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://calendly.com/hussainhussainakan/ai-discovery-meeting-clone"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-border bg-card text-foreground font-semibold text-sm rounded-lg hover:border-primary hover:text-primary hover:bg-primary/5 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                Book a Free Demo
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-fade-up-delay-4">
              <div className="flex -space-x-3">
                 <div className="w-10 h-10 rounded-full border-2 border-background glass bg-card/80 flex items-center justify-center text-primary"><CheckCircle className="w-5 h-5" /></div>
                 <div className="w-10 h-10 rounded-full border-2 border-background glass bg-card/80 flex items-center justify-center text-primary"><CheckCircle className="w-5 h-5" /></div>
                 <div className="w-10 h-10 rounded-full border-2 border-background glass bg-card/80 flex items-center justify-center text-primary"><CheckCircle className="w-5 h-5" /></div>
                 <div className="w-10 h-10 rounded-full border-2 border-background glass bg-primary/20 flex items-center justify-center font-bold text-xs text-primary">+10</div>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <div className="flex gap-1 text-accent">
                   <Star className="w-4 h-4 fill-current" />
                   <Star className="w-4 h-4 fill-current" />
                   <Star className="w-4 h-4 fill-current" />
                   <Star className="w-4 h-4 fill-current" />
                   <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-xs font-medium text-muted-foreground mt-1 tracking-wide">Trusted by leading agencies</p>
              </div>
            </div>

          </div>

          <div className="relative animate-fade-up-delay-2 mt-12 lg:mt-0 w-full">
            <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/10 glass w-full mx-auto transform hover:scale-[1.02] transition-transform duration-700">
              <div className="absolute top-0 left-0 right-0 h-10 bg-background/50 border-b border-white/5 flex items-center px-4 gap-2 backdrop-blur-md z-20">
                <div className="w-3 h-3 rounded-full bg-destructive/80 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-accent/80 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-sm" />
              </div>
              <img src="/hero-mockup.png" alt="Notivon System Dashboard" className="w-full h-auto mt-10 object-cover" />
              
              {/* Fallback pattern if image is missing */}
              <div className="absolute inset-0 mt-10 -z-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-primary/5 opacity-50" />
            </div>
            
            {/* Floating Badges */}
            <div className="absolute -left-4 xl:-left-12 top-[30%] glass px-5 py-3.5 rounded-2xl flex items-center gap-3 animate-float border border-white/10 shadow-xl hidden sm:flex bg-card/60 backdrop-blur-xl">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-inner">
                 <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-base font-bold text-foreground">98%</p>
                <p className="text-sm text-muted-foreground font-medium">On-Time Approvals</p>
              </div>
            </div>
            
            <div className="absolute -right-4 xl:-right-12 bottom-[20%] glass px-5 py-3.5 rounded-2xl flex items-center gap-3 animate-float-slow border border-white/10 shadow-xl hidden sm:flex bg-card/60 backdrop-blur-xl">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent shadow-inner">
                 <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-base font-bold text-foreground">4 hrs/week</p>
                <p className="text-sm text-muted-foreground font-medium">Saved Per Agent</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;