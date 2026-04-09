import { ArrowRight, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const phrases = ["Save Time", "Reduce Errors", "Scale Faster"];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

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
    <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden pt-20 px-4">
      <div className="container mx-auto px-2 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-up">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-8 border border-primary/20">
              For Visa & Travel Agencies
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-[1.15] text-foreground mb-6 animate-fade-up-delay-1">
            Help Your Agency{" "}
            <span className="gradient-text">
              {displayText}
              <span className="animate-pulse text-primary">|</span>
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-up-delay-2">
            Custom-built systems that streamline document collection, flag expiring records, and eliminate costly mistakes — so you can process more applications with less effort.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-delay-3">
            <a
              href="https://wa.me/2349014390149"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
            >
              Chat With Us on WhatsApp
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://calendly.com/hussainhussainakan/ai-discovery-meeting-clone"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border bg-card text-foreground font-semibold text-sm rounded-lg hover:border-primary/50 hover:text-primary hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Calendar className="w-4 h-4" />
              Book a Free Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;