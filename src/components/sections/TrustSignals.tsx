import { Scale, Workflow, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger, inView } from "@/lib/motion";

const signals = [
  {
    icon: Scale,
    title: "Honest, both ways",
    description:
      "The audit tells you when NOT to build. Advice you can trust because it doesn't always end in an invoice.",
  },
  {
    icon: Workflow,
    title: "Built around your workflow",
    description:
      "Every system is designed around how your business actually operates — not forced into a generic template.",
  },
  {
    icon: HeartHandshake,
    title: "There after launch",
    description:
      "We don't build and disappear. Systems get maintained and extended as your business grows.",
  },
];

const TrustSignals = () => (
  <section id="trust" className="py-20 sm:py-28 border-t border-border/60">
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 max-w-[1400px]">
      <motion.div variants={stagger()} {...inView}>
        <motion.div variants={fadeUp} className="mb-14">
          <p className="tech-label mb-4">Why businesses trust us</p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-foreground max-w-2xl leading-tight">
            The incentive is aligned: we get paid for clarity, not just code.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4">
          {signals.map((signal) => (
            <motion.div
              key={signal.title}
              variants={fadeUp}
              className="border-t border-border pt-6"
            >
              <signal.icon className="w-6 h-6 text-primary mb-4" strokeWidth={1.5} />
              <h3 className="text-lg font-semibold text-foreground mb-2">{signal.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {signal.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default TrustSignals;
