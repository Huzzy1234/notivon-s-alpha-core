import { Quote, TrendingUp, Users } from "lucide-react";

const TrustSignals = () => {
  const affiliations = [
    "Stanford GSB",
    "Harvard Business School",
    "Wharton",
    "Kellogg",
    "Booth",
  ];

  return (
    <section id="trust" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <span className="inline-block px-3 sm:px-5 py-2 sm:py-2.5 border border-primary/40 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary mb-6 sm:mb-8">
            Trusted By Searchers
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground leading-tight">
            Built for the <span className="text-primary">Search Fund</span> Community
          </h2>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
          <div className="bg-card/40 backdrop-blur-sm border border-border/40 p-6 sm:p-8 text-center group hover:border-primary/40 transition-all duration-300">
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              2,400+
            </div>
            <p className="text-sm sm:text-base text-muted-foreground uppercase tracking-wider">
              Targets Analyzed
            </p>
          </div>

          <div className="bg-card/40 backdrop-blur-sm border border-border/40 p-6 sm:p-8 text-center group hover:border-primary/40 transition-all duration-300">
            <Users className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              15+
            </div>
            <p className="text-sm sm:text-base text-muted-foreground uppercase tracking-wider">
              Searchers Supported
            </p>
          </div>

          <div className="bg-card/40 backdrop-blur-sm border border-border/40 p-6 sm:p-8 text-center group hover:border-primary/40 transition-all duration-300">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <span className="text-primary font-bold text-sm">AI</span>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              3x
            </div>
            <p className="text-sm sm:text-base text-muted-foreground uppercase tracking-wider">
              Faster Sourcing
            </p>
          </div>
        </div>

        {/* Testimonial */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <div className="bg-card/60 backdrop-blur-sm border border-border/60 p-8 sm:p-10 lg:p-12 relative">
            <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-primary/30 absolute top-6 left-6 sm:top-8 sm:left-8" />
            <blockquote className="text-lg sm:text-xl lg:text-2xl text-foreground font-light leading-relaxed mb-6 sm:mb-8 pl-8 sm:pl-12">
              "The AI-powered sourcing completely changed how I approach deal origination. 
              Instead of cold-calling through lists, I'm now having conversations with 
              owners who are actually ready to consider a transition."
            </blockquote>
            <div className="pl-8 sm:pl-12">
              <div className="text-foreground font-semibold">Search Fund Entrepreneur</div>
              <div className="text-muted-foreground text-sm">Stanford GSB '23</div>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute -top-2 sm:-top-3 -left-2 sm:-left-3 w-6 sm:w-8 h-6 sm:h-8 border-l-2 border-t-2 border-primary" />
            <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-6 sm:w-8 h-6 sm:h-8 border-r-2 border-t-2 border-primary" />
            <div className="absolute -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 w-6 sm:w-8 h-6 sm:h-8 border-l-2 border-b-2 border-primary" />
            <div className="absolute -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 w-6 sm:w-8 h-6 sm:h-8 border-r-2 border-b-2 border-primary" />
          </div>
        </div>

        {/* MBA Program Affiliations */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.2em] mb-6 sm:mb-8">
            Searchers from top programs
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 lg:gap-14">
            {affiliations.map((school) => (
              <span
                key={school}
                className="text-base sm:text-lg lg:text-xl font-semibold text-muted-foreground/60 hover:text-primary transition-colors duration-300 tracking-wide"
              >
                {school}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
