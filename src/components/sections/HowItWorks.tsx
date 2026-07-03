import { Compass, Settings, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger, inView } from "@/lib/motion";

const steps = [
  {
    icon: Compass,
    number: "01",
    title: "Diagnose",
    description:
      "The AI Readiness Audit maps your operation and tells you honestly what's worth automating — and what isn't. A roadmap you own, either way.",
  },
  {
    icon: Settings,
    number: "02",
    title: "Build only what pays",
    description:
      "If the audit says build, we scope and build exactly that. No bloated features, no unnecessary cost — and the audit fee is credited.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Hand over & maintain",
    description:
      "You get a working system and a trained team — then we stay on to maintain and extend it as your business grows.",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 sm:py-32 border-t border-border/60">
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 max-w-[1400px]">
      <motion.div variants={stagger()} {...inView}>
        <motion.div variants={fadeUp} className="mb-16">
          <p className="tech-label mb-4">How we work</p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-foreground max-w-xl leading-tight">
            Clarity first. <span className="text-primary">Then the system.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="surface-1 border border-border rounded-lg p-8 sm:p-10 hover:border-primary/40 transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-8">
                <step.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                <span className="font-mono text-[11px] text-primary">{step.number}</span>
              </div>
              <h3 className="font-display font-semibold text-xl sm:text-2xl text-foreground mb-4">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Pull quote */}
        <motion.blockquote
          variants={fadeUp}
          className="mt-16 border-l-2 border-primary/50 pl-8 max-w-3xl"
        >
          <p className="text-xl sm:text-2xl text-foreground leading-relaxed font-display">
            Most agencies sell you the build before they understand the problem.{" "}
            <span className="text-primary">
              We sell you the understanding first — and it's valuable even if you never build.
            </span>
          </p>
        </motion.blockquote>
      </motion.div>
    </div>
  </section>
);

export default HowItWorks;
