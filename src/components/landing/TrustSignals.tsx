import { Quote, TrendingUp, Users, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const useCountUp = (end: number, duration: number = 2000, suffix: string = "") => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return { count, ref, suffix };
};

const testimonials = [
  {
    quote: "The AI-powered sourcing completely changed how I approach deal origination. Instead of cold-calling through lists, I'm now having conversations with owners who are actually ready to consider a transition.",
    name: "Marcus Chen",
    title: "Search Fund Entrepreneur",
    school: "Stanford GSB '23",
    metric: "47 qualified leads in 3 months"
  },
  {
    quote: "We closed our first acquisition 6 months faster than projected. The proprietary deal flow meant we weren't competing against 15 other searchers for the same targets.",
    name: "Sarah Williams",
    title: "Traditional Searcher",
    school: "HBS '22",
    metric: "Closed first deal in 14 months"
  },
  {
    quote: "The target analysis reports are incredibly thorough. What used to take my team 2 weeks of research is now delivered in hours, with insights we would have missed entirely.",
    name: "David Okonkwo",
    title: "Self-Funded Searcher",
    school: "Wharton '21",
    metric: "80% reduction in research time"
  },
  {
    quote: "As a first-time searcher, the AI maturity audit gave me a clear roadmap. I knew exactly which technologies to prioritize for my specific investment thesis.",
    name: "Jennifer Park",
    title: "Search Fund Principal",
    school: "Booth '23",
    metric: "3x increase in owner conversations"
  },
  {
    quote: "The timing signals are what set Notivon apart. We identified a manufacturing company right as the owner was starting to think about retirement—no other searchers knew about it.",
    name: "Michael Torres",
    title: "Funded Searcher",
    school: "Kellogg '22",
    metric: "Exclusive access to off-market deal"
  }
];

const TrustSignals = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const affiliations = [
    "Stanford GSB",
    "Harvard Business School",
    "Wharton",
    "Kellogg",
    "Booth",
  ];

  const targets = useCountUp(2400, 2000);
  const searchers = useCountUp(15, 1500);

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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={sectionRef} id="trust" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-3 sm:px-5 py-2 sm:py-2.5 border border-primary/40 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary mb-6 sm:mb-8">
            Trusted By Searchers
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground leading-tight">
            Built for the <span className="text-primary">Search Fund</span> Community
          </h2>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
          <div 
            ref={targets.ref} 
            className={`bg-card/40 backdrop-blur-sm border border-border/40 p-6 sm:p-8 text-center group hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              {targets.count.toLocaleString()}+
            </div>
            <p className="text-sm sm:text-base text-muted-foreground uppercase tracking-wider">
              Targets Analyzed
            </p>
          </div>

          <div 
            ref={searchers.ref} 
            className={`bg-card/40 backdrop-blur-sm border border-border/40 p-6 sm:p-8 text-center group hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <Users className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              {searchers.count}+
            </div>
            <p className="text-sm sm:text-base text-muted-foreground uppercase tracking-wider">
              Searchers Supported
            </p>
          </div>

          <div 
            className={`bg-card/40 backdrop-blur-sm border border-border/40 p-6 sm:p-8 text-center group hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform group-hover:bg-primary/30">
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

        {/* Testimonial Carousel */}
        <div className={`max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '400ms' }}>
          <div className="bg-card/60 backdrop-blur-sm border border-border/60 p-8 sm:p-10 lg:p-12 relative group hover:border-primary/30 transition-all duration-500">
            <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-primary/30 absolute top-6 left-6 sm:top-8 sm:left-8 group-hover:text-primary/50 transition-colors" />
            
            {/* Stars */}
            <div className="flex gap-1 pl-8 sm:pl-12 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>

            <div className="relative overflow-hidden min-h-[200px] sm:min-h-[180px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    index === activeTestimonial 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 absolute inset-0 translate-x-8'
                  }`}
                >
                  <blockquote className="text-lg sm:text-xl lg:text-2xl text-foreground font-light leading-relaxed mb-6 sm:mb-8 pl-8 sm:pl-12">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="pl-8 sm:pl-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="text-foreground font-semibold">{testimonial.name}</div>
                      <div className="text-muted-foreground text-sm">{testimonial.title} • {testimonial.school}</div>
                    </div>
                    <div className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                      {testimonial.metric}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pl-8 sm:pl-12">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeTestimonial ? 'bg-primary w-6' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prevTestimonial}
                  className="p-2 border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute -top-2 sm:-top-3 -left-2 sm:-left-3 w-6 sm:w-8 h-6 sm:h-8 border-l-2 border-t-2 border-primary/40 group-hover:border-primary transition-colors" />
            <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-6 sm:w-8 h-6 sm:h-8 border-r-2 border-t-2 border-primary/40 group-hover:border-primary transition-colors" />
            <div className="absolute -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 w-6 sm:w-8 h-6 sm:h-8 border-l-2 border-b-2 border-primary/40 group-hover:border-primary transition-colors" />
            <div className="absolute -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 w-6 sm:w-8 h-6 sm:h-8 border-r-2 border-b-2 border-primary/40 group-hover:border-primary transition-colors" />
          </div>
        </div>

        {/* MBA Program Affiliations */}
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '500ms' }}>
          <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.2em] mb-6 sm:mb-8">
            Searchers from top programs
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 lg:gap-14">
            {affiliations.map((school, index) => (
              <span
                key={school}
                className={`text-base sm:text-lg lg:text-xl font-semibold text-muted-foreground/60 hover:text-primary transition-all duration-300 tracking-wide cursor-default ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
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
