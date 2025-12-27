import { useEffect, useState, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What is Agentic AI and how does it differ from traditional automation?",
    answer:
      "Agentic AI refers to autonomous AI systems that can reason, plan, and take actions independently to achieve goals. Unlike traditional automation that follows predefined rules, agentic AI can adapt to new situations, learn from outcomes, and make intelligent decisions—identifying acquisition signals that would be invisible to conventional sourcing methods.",
  },
  {
    question: "How does the AI identify acquisition-ready businesses?",
    answer:
      "Our AI agents continuously monitor thousands of data signals including owner demographics, succession planning indicators, market dynamics, competitive positioning, and financial patterns. We analyze 'silent' signals—retirement-age owners, family transition events, industry consolidation trends—to identify businesses likely to consider a sale before they publicly come to market.",
  },
  {
    question: "What does the AI Maturity Audit include?",
    answer:
      "The Maturity Audit is a comprehensive diagnostic of your current search infrastructure. We evaluate your sourcing workflow, outreach systems, deal tracking, and investor communication processes. You'll receive a detailed gap analysis showing where agentic AI can accelerate your search, along with an implementation roadmap prioritized by impact.",
  },
  {
    question: "How long does implementation typically take?",
    answer:
      "Most searchers see initial results within 2-3 weeks. The full implementation—including custom training on your investment thesis, industry focus, and target criteria—typically completes in 4-6 weeks. We prioritize quick wins early so you can demonstrate value to investors while building out the complete system.",
  },
  {
    question: "Is my deal flow data kept confidential?",
    answer:
      "Absolutely. All data is isolated in your private instance. Your acquisition criteria, target lists, and outreach intelligence are never shared or used to train models for other clients. We maintain enterprise-grade security and can provide SOC 2 documentation upon request.",
  },
  {
    question: "How does this complement my existing search process?",
    answer:
      "Our AI infrastructure works alongside your current methods—it doesn't replace relationship-driven outreach. Think of it as a force multiplier: while you focus on high-value conversations and due diligence, our agents continuously surface new opportunities, qualify targets, and prepare outreach intelligence. Most searchers report 3x more qualified conversations with the same time investment.",
  },
];

const FAQ = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-16 sm:py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-3 sm:px-5 py-2 sm:py-2.5 border border-primary/40 bg-primary/5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary mb-6 sm:mb-8 backdrop-blur-sm">
            Questions Answered
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground leading-tight">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Everything you need to know about AI-powered deal sourcing
          </p>
        </div>

        {/* Accordion */}
        <div
          className={`max-w-3xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
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

        {/* CTA after FAQ */}
        <div
          className={`text-center mt-12 sm:mt-16 lg:mt-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "900ms" }}
        >
          <p className="text-muted-foreground mb-6">
            Still have questions? Let's talk.
          </p>
          <a
            href="https://calendly.com/hussainhussainakan/10min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-primary/60 text-primary font-semibold uppercase tracking-wider text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Schedule a Call
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
