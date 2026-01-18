import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The AI-powered sourcing completely changed how I approach deal origination. Instead of cold-calling through lists, I'm now having conversations with owners who are actually ready to transition.",
    initials: "M.C.",
    title: "Search Fund Entrepreneur",
  },
  {
    quote: "We closed our first acquisition 6 months faster than projected. The proprietary deal flow meant we weren't competing against 15 other searchers for the same targets.",
    initials: "S.W.",
    title: "Traditional Searcher",
  },
  {
    quote: "The target analysis reports are incredibly thorough. What used to take my team 2 weeks of research is now delivered in hours.",
    initials: "D.O.",
    title: "Self-Funded Searcher",
  },
];

const TrustSignals = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section 
      ref={sectionRef}
      id="trust" 
      className="relative py-16 sm:py-20 lg:py-28 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-primary text-sm sm:text-base font-medium tracking-widest uppercase mb-4 block">
            Trusted By Searchers
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 font-heading">
            Built for the Search Fund Community
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Real results from searchers who transformed their deal flow
          </p>
        </div>

        {/* Testimonials Carousel - Now the main focus */}
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
          <div className="relative bg-card/60 backdrop-blur-sm border border-border/40 p-8 sm:p-12 lg:p-16">
            <Quote className="absolute top-6 left-6 sm:top-8 sm:left-8 w-8 h-8 sm:w-12 sm:h-12 text-primary/20" />
            
            <div className="relative min-h-[200px] sm:min-h-[180px] flex items-center justify-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-500 ${
                    index === activeTestimonial 
                      ? 'opacity-100 translate-x-0' 
                      : index < activeTestimonial 
                        ? 'opacity-0 -translate-x-8' 
                        : 'opacity-0 translate-x-8'
                  }`}
                >
                  <p className="text-lg sm:text-xl lg:text-2xl text-foreground/90 leading-relaxed mb-8 italic max-w-3xl">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary font-bold">{testimonial.initials}</span>
                    </div>
                    <p className="text-muted-foreground text-sm uppercase tracking-wider">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 border border-border/40 flex items-center justify-center hover:border-primary/40 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 border border-border/40 flex items-center justify-center hover:border-primary/40 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 transition-all duration-300 ${
                    index === activeTestimonial 
                      ? 'bg-primary w-6' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
