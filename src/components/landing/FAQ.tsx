import { useEffect, useState, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What kind of visa agencies do you work with?",
    answer:
      "We work with agencies of all sizes — from solo consultants processing student visas to large firms handling work permits, family visas, and tourist applications. The systems we build are tailored to your specific visa types and workflow.",
  },
  {
    question: "How is this different from generic CRM or project management tools?",
    answer:
      "Generic tools aren't built for the visa industry. Our systems include visa-type-specific document checklists, automatic expiry tracking for passports and certificates, photo/file compliance checks, and client portals designed for document collection. It's purpose-built, not adapted.",
  },
  {
    question: "How long does it take to get set up?",
    answer:
      "Most agencies are fully operational within 2–4 weeks. We start with a discovery call to understand your workflow, then build and deploy the system with training for your team.",
  },
  {
    question: "Do my clients interact with the system?",
    answer:
      "Yes — clients get a simple portal where they can upload documents, see what's missing, and track their application status. This drastically reduces back-and-forth communication.",
  },
  {
    question: "What happens if I need changes after launch?",
    answer:
      "We provide ongoing support. Whether you need to add a new visa type, adjust compliance rules, or add features, we're here to help your system evolve with your business.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. All client data is encrypted and stored securely. We follow best practices for data protection and can work with your specific compliance requirements.",
  },
];

const FAQ = () => {
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
    <section ref={sectionRef} id="faq" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-3 sm:px-5 py-2 sm:py-2.5 border border-primary/40 bg-primary/5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary mb-6 sm:mb-8 backdrop-blur-sm">
            Questions Answered
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground leading-tight">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Everything you need to know about our systems for visa agencies
          </p>
        </div>

        <div
          className={`max-w-3xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          style={{ transitionDelay: "200ms" }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={`bg-card/50 backdrop-blur-sm border border-border/50 px-6 sm:px-8 transition-all duration-500 hover:border-primary/30 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-foreground hover:text-primary hover:no-underline py-5 sm:py-6 gap-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div
          className={`text-center mt-12 sm:mt-16 lg:mt-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "900ms" }}
        >
          <p className="text-muted-foreground mb-6">
            Still have questions? Let's talk.
          </p>
          <a
            href="https://wa.me/2349014390149"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-primary/60 text-primary font-semibold uppercase tracking-wider text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Message Us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
