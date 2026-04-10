import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Notivon completely transformed how we handle visa applications. We used to spend hours chasing missing documents. Now, the system does it for us.",
    author: "Jane Doe",
    role: "Director, Global Visas Ltd",
    image: "https://i.pravatar.cc/150?u=1",
    metric: "Processing time reduced by 60%"
  },
  {
    quote: "The automated expiry alerts for passports and medical certificates have saved us from countless rejections. It's the system we didn't know we needed.",
    author: "John Smith",
    role: "Operations Manager, TravelPlus",
    image: "https://i.pravatar.cc/150?u=2",
    metric: "Zero compliance rejections"
  },
  {
    quote: "The client portal is a game changer. Our clients love being able to see exactly where their application stands without having to call us every day.",
    author: "Sarah Johnson",
    role: "Founder, StudyAbroad Agency",
    image: "https://i.pravatar.cc/150?u=3",
    metric: "Client calls dropped by 80%"
  }
];

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} id="testimonials" className="py-20 sm:py-28 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-foreground mb-4">
            Trusted by Agencies Worldwide
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here is what leading visa and travel agencies have to say about Notivon.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-card/50 backdrop-blur-sm border border-border p-8 rounded-2xl flex flex-col transition-all duration-700 hover:border-primary/30 hover:bg-card hover:shadow-xl hover:shadow-primary/5 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              
              <blockquote className="text-foreground text-base leading-relaxed mb-8 flex-grow">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="mb-6 pb-6 border-b border-border/50">
                <p className="text-sm font-semibold text-primary capitalize tracking-wide">{testimonial.metric}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover border border-primary/20"
                />
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{testimonial.author}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
