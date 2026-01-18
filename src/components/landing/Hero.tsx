import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const phrases = ["Deal Flow", "Opportunities", "Acquisitions"];
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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-20 px-4">
      {/* Subtle gradient overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/30 via-transparent to-background/60" />

      {/* Content */}
      <div className="container mx-auto px-2 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <div className="animate-fade-up">
            <span className="inline-block px-3 sm:px-5 py-2 sm:py-2.5 border border-primary/40 bg-primary/5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary mb-6 sm:mb-10 backdrop-blur-sm">
              AI Transformation Partner
            </span>
          </div>

          {/* Bold Headline - Playfair Display with Typewriter */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] sm:leading-[1.05] tracking-[-0.02em] text-foreground mb-6 sm:mb-10 animate-fade-up-delay-1">
            Unlock Proprietary
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
            <br />
            <span className="text-muted-foreground font-medium italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              with Agentic AI
            </span>
          </h1>

          {/* Subheadline - Inter */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-sans font-light text-muted-foreground max-w-2xl leading-relaxed mb-6 sm:mb-8 animate-fade-up-delay-2">
            The autonomous infrastructure Search Fund entrepreneurs need to surface
            off-market opportunities—before the competition even knows they exist.
          </p>

          {/* Specific Outcome Statement */}
          <div className="animate-fade-up-delay-2 mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-3 border border-primary/30 bg-primary/5 backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_2px_rgba(59,130,246,0.6)]" />
              <span className="text-sm sm:text-base text-foreground font-medium">
                <span className="text-primary font-bold">5–8 warm leads</span>
                <span className="text-muted-foreground"> — business owners interested in your offer, based on your criteria</span>
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 animate-fade-up-delay-3">
            <div className="flex flex-col items-center sm:items-start gap-2">
              <a
                href="https://calendly.com/hussainhussainakan/10min"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-4 sm:py-5 bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-xs sm:text-sm hover:bg-primary/90 transition-all glow-cyan overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Request AI Maturity Audit</span>
                <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              {/* Exclusivity Indicator */}
              <span className="text-xs text-muted-foreground">
                <span className="text-primary font-semibold">Limited availability</span> — accepting 3 new clients this quarter
              </span>
            </div>
            <a
              href="#how-it-works"
              className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-4 sm:py-5 border-2 border-border bg-background/30 backdrop-blur-sm text-foreground font-semibold uppercase tracking-wider text-xs sm:text-sm hover:border-primary hover:text-primary transition-all h-fit"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-16 right-8 lg:right-16 hidden lg:block animate-fade-up-delay-4">
          <div className="w-24 lg:w-36 h-24 lg:h-36 border border-primary/20 relative">
            <div className="absolute -top-2 -left-2 w-3 lg:w-4 h-3 lg:h-4 bg-primary animate-pulse" />
            <div className="absolute -bottom-2 -right-2 w-3 lg:w-4 h-3 lg:h-4 bg-accent animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 sm:w-7 h-10 sm:h-12 border-2 border-primary/40 flex items-start justify-center p-1.5 sm:p-2 backdrop-blur-sm">
          <div className="w-1 sm:w-1.5 h-2 sm:h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
