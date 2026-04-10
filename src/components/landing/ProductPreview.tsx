import { useEffect, useRef, useState } from "react";

const ProductPreview = () => {
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
    <section ref={sectionRef} id="product" className="py-20 sm:py-28 relative bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-foreground mb-4">
            See the System in Action
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            A sneak peek into how Notivon organizes your workflow, tracks documents, and keeps your clients informed automatically.
          </p>
        </div>

        <div className={`relative max-w-5xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          {/* This is a placeholder for the user's video or screenshot. */}
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl relative bg-card flex items-center justify-center group transform transition-transform hover:scale-[1.01] duration-500">
            
            <iframe 
              src="https://www.loom.com/embed/bf8c944baa184547a39bbe3b268eb6c8?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
              frameBorder="0"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full pt-8 sm:pt-12 z-0"
            ></iframe>

            {/* Browser chrome UI */}
            <div className="absolute top-0 left-0 right-0 h-8 sm:h-12 bg-background/80 backdrop-blur-md border-b border-border flex items-center px-4 gap-2 z-10 w-full">
               <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-destructive/80 shadow-sm" />
               <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-accent/80 shadow-sm" />
               <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-emerald-500/80 shadow-sm" />
               <div className="mx-auto bg-muted/50 rounded-md h-5 sm:h-6 w-1/3 max-w-xs border border-border/50"></div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;
