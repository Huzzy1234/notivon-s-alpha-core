import { Workflow, Clock, AlertTriangle, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger, inView } from "@/lib/motion";

const pillars = [
  {
    icon: Workflow,
    title: "Manual work, automated",
    description:
      "The repetitive tasks eating your team's day — data entry, follow-ups, tracking, reporting — handled automatically by a system built around how you work.",
  },
  {
    icon: AlertTriangle,
    title: "Proactive alerts",
    description:
      "Get flagged before something slips — a missed deadline, an expiring record, a stalled deal — instead of finding out when it's already cost you.",
  },
  {
    icon: Clock,
    title: "Hours saved every week",
    description:
      "Stop chasing updates and manually tracking progress. Automated reminders and live status boards do the follow-up for you.",
  },
  {
    icon: TrendingDown,
    title: "Fewer costly mistakes",
    description:
      "Catch common errors before they cost you — wrong data, missed deadlines, or dropped handoffs between people and tools.",
  },
];

const ValueProposition = () => (
  <section className="py-24 sm:py-32 border-t border-border/60">
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 max-w-[1400px]">
      <div className="grid lg:grid-cols-12 gap-14 lg:gap-12 items-start">
        <motion.div variants={stagger()} {...inView} className="lg:col-span-5 lg:sticky lg:top-32">
          <motion.p variants={fadeUp} className="tech-label mb-4">
            Why it matters
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6 leading-tight"
          >
            Stop losing money to <span className="text-primary">preventable errors.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed">
            Generic spreadsheets and CRMs aren't built for how your business
            actually runs. Purpose-made systems fit your operations — and let
            your team work without the manual headaches.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0.1, 0.1)}
          {...inView}
          className="lg:col-span-7 grid sm:grid-cols-2 gap-4"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={fadeUp}
              className="surface-1 border border-border rounded-lg p-8 hover:border-primary/40 transition-colors duration-300"
            >
              <pillar.icon className="w-6 h-6 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="text-lg font-semibold text-foreground mb-3">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default ValueProposition;
