import { ArrowDown, Star, CheckCircle, Shield, Ship } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParallax, useMagnetic } from "@/hooks/useAnimations";

const Hero = () => {
  const phrases = ["Automated", "Streamlined", "Simplified"];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Parallax refs for the two floating dashboard images
  const parallaxFast = useParallax<HTMLDivElement>(-0.12);
  const parallaxSlow = useParallax<HTMLDivElement>(-0.07);

  // Magnetic CTA button
  const cta = useMagnetic<HTMLButtonElement>(0.4);

  useEffect(() => {
    // Stagger mount so hero elements animate in
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 40 : 80;
    const pauseTime = 3000;

    if (!isDeleting && displayText === currentPhrase) {
      const t = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(t);
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
  }, [displayText, isDeleting, currentPhraseIndex]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 pb-20 px-4">

      {/* Animated background orbs — capped size to prevent overflow */}
      <div
        className="absolute top-[10%] left-[5%] w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[520px] lg:h-[520px] rounded-full pointer-events-none mix-blend-screen"
        style={{
          background: "radial-gradient(circle, hsl(215 100% 60% / 0.12) 0%, transparent 70%)",
          animation: "orbPulse 7s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[5%] right-[8%] w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] rounded-full pointer-events-none mix-blend-screen"
        style={{
          background: "radial-gradient(circle, hsl(150 100% 45% / 0.10) 0%, transparent 70%)",
          animation: "orbPulse 9s ease-in-out infinite 1.5s",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10 w-full max-w-[1400px]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── Left: Text ── */}
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left z-20">

            {/* Badge */}
            <div
              className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "0ms" }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-8 border border-primary/20 shadow-sm shadow-primary/5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                For Nigerian Trade & Compliance Businesses
              </span>
            </div>

            {/* H1 */}
            <h1
              className={`text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display leading-[1.05] tracking-tight text-foreground mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "100ms" }}
            >
              Your Operations,{" "}
              <br className="hidden lg:block" />
              <span
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, hsl(215 100% 65%), hsl(150 100% 45%), hsl(40 100% 60%))",
                  backgroundSize: "200% 200%",
                  animation: "gradientShift 4s ease infinite",
                }}
              >
                {displayText}
                <span className="text-foreground font-sans font-light opacity-30 ml-0.5 animate-pulse">|</span>
              </span>
            </h1>

            {/* Tagline */}
            <p
              className={`text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "200ms" }}
            >
              We build purpose-made software for visa agencies and customs clearing agents.
              Stop fighting spreadsheets — start running your business.
            </p>

            {/* Social proof */}
            <div
              className={`flex flex-col sm:flex-row items-center gap-4 mb-10 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-background glass bg-card/80 flex items-center justify-center text-primary"><CheckCircle className="w-5 h-5" /></div>
                <div className="w-10 h-10 rounded-full border-2 border-background glass bg-card/80 flex items-center justify-center text-primary"><CheckCircle className="w-5 h-5" /></div>
                <div className="w-10 h-10 rounded-full border-2 border-background glass bg-card/80 flex items-center justify-center text-primary"><CheckCircle className="w-5 h-5" /></div>
                <div className="w-10 h-10 rounded-full border-2 border-background glass bg-primary/20 flex items-center justify-center font-bold text-xs text-primary">+10</div>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <div className="flex gap-1 text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs font-semibold text-muted-foreground mt-1 tracking-wide uppercase">Trusted by leading agencies</p>
              </div>
            </div>

            {/* Scroll prompt with magnetic effect */}
            <div
              className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "500ms" }}
            >
              <button
                ref={cta.ref}
                onMouseMove={cta.onMouseMove}
                onMouseLeave={cta.onMouseLeave}
                onClick={() => {
                  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group mx-auto lg:mx-0 flex flex-col items-center lg:items-start gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Explore Platform</span>
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </button>
            </div>
          </div>

          {/* ── Right: Floating isometric dashboards ── */}
          <div className="relative h-[400px] lg:h-[600px] w-full hidden md:flex items-center justify-center">

            {/* VisaGuard card — top right, floats slower */}
            <div
              ref={parallaxSlow}
              className="absolute top-0 right-0 w-[78%] rounded-2xl overflow-hidden border border-primary/20 shadow-[0_0_60px_hsl(215_100%_60%/0.15)] shimmer"
              style={{
                animation: "heroFloatAlt 9s ease-in-out infinite",
                transformOrigin: "center center",
              }}
            >
              {/* Chrome bar */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-background/70 backdrop-blur border-b border-white/5 flex items-center px-3 gap-1.5 z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <div className="ml-auto flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-primary/60" />
                  <span className="text-[10px] text-primary/60 font-semibold">VisaGuard</span>
                </div>
              </div>
              <img
                src="/visaguard-mockup.png"
                alt="VisaGuard Dashboard"
                className="w-full h-auto mt-8 object-cover block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>

            {/* ClearVoy card — bottom left, floats faster */}
            <div
              ref={parallaxFast}
              className="absolute bottom-0 left-0 w-[72%] rounded-2xl overflow-hidden border border-emerald-500/20 shadow-[0_0_60px_hsl(150_100%_45%/0.15)] shimmer z-20"
              style={{
                animation: "heroFloat 7s ease-in-out infinite",
                transformOrigin: "center center",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-8 bg-background/70 backdrop-blur border-b border-white/5 flex items-center px-3 gap-1.5 z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <div className="ml-auto flex items-center gap-1.5">
                  <Ship className="w-3 h-3 text-emerald-500/60" />
                  <span className="text-[10px] text-emerald-500/60 font-semibold">ClearVoy</span>
                </div>
              </div>
              <img
                src="/clearvoy-mockup.png"
                alt="ClearVoy Dashboard"
                className="w-full h-auto mt-8 object-cover block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>

            {/* Connecting glow line */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(215, 100%, 60%)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="hsl(150, 100%, 45%)" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <line x1="30%" y1="70%" x2="80%" y2="30%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="6 4" />
              </svg>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;