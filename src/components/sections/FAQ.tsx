import { motion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { fadeUp, stagger, inView } from "@/lib/motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What exactly is the AI Readiness Audit?",
    answer:
      "A paid, fixed-fee diagnostic of your business. We map your workflows, tools, and data, then tell you honestly where AI and automation pay off — and where they don't. You get a written roadmap you own, whether or not you ever build with us. If you do build with us, the audit fee is credited toward it.",
  },
  {
    question: "How is the free Scorecard different from the paid Audit?",
    answer:
      "The Scorecard is a 2-minute self-assessment that gives you a readiness score and a first honest read — it works from what you tell us. The Audit goes inside your actual operation: real workflows, real numbers, automate-or-skip verdicts, and a sequenced build roadmap with expected ROI.",
  },
  {
    question: "Do I have to build with Notivon after the audit?",
    answer:
      "No. The audit is a standalone service and the roadmap is yours — take it to another builder or execute it internally. Plenty of audits also conclude 'don't build this yet', and that answer alone tends to pay for itself.",
  },
  {
    question: "What kind of businesses do you work with?",
    answer:
      "Businesses where manual processes, compliance requirements, or operational complexity create bottlenecks. Our systems span visa agencies, customs clearing, logistics, AI lead-gen, and deal-sourcing — but if you have a workflow problem, we want to hear it.",
  },
  {
    question: "How is a custom build different from a CRM or project tool?",
    answer:
      "Generic tools force your workflow into their template. We build purpose-made systems — visa-type document checklists, shipment pipelines, import-likelihood scoring, deal-sourcing engines — designed around how your business actually operates.",
  },
  {
    question: "How long does a build take?",
    answer:
      "Most businesses are fully operational within 2–4 weeks of scoping. The audit typically takes 1–2 weeks before that, and tells you whether the build is worth doing at all.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Ongoing support. Whether you need new features, adjusted compliance rules, or expansion to new services, the system evolves with your business.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. All client and business data is encrypted and stored securely. We follow best practices for data protection and can work with your specific compliance requirements.",
  },
];

const FAQ = () => (
  <section id="faq" className="py-20 sm:py-28 border-t border-border/60">
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 max-w-[1400px]">
      <motion.div variants={stagger()} {...inView} className="grid lg:grid-cols-12 gap-12">
        <motion.div variants={fadeUp} className="lg:col-span-4">
          <p className="tech-label mb-4">FAQ</p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-foreground leading-tight mb-6">
            Straight answers, before we ever talk.
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Still have questions after this?
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-semibold text-sm rounded-md hover:border-primary/50 hover:text-primary transition-colors"
          >
            Message us on WhatsApp
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="lg:col-span-8">
          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="surface-1 border border-border rounded-md px-6 transition-colors duration-300 hover:border-primary/30 data-[state=open]:border-primary/40"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-primary hover:no-underline py-5 gap-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default FAQ;
