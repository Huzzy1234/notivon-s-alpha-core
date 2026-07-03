import { Settings, Zap, BarChart2, Video } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger, inView } from "@/lib/motion";

const capabilities = [
  {
    number: "01",
    icon: Settings,
    title: "Operational systems",
    description:
      "Tracking, intake, verification, and management tools built around your actual workflow — not a generic template.",
  },
  {
    number: "02",
    icon: Zap,
    title: "AI-powered automation",
    description:
      "Lead generation, document processing, customer scoring, and outreach that runs without manual effort.",
  },
  {
    number: "03",
    icon: BarChart2,
    title: "Sales & data infrastructure",
    description:
      "CRMs, lead pipelines, and deal-sourcing engines built to fit how your team actually sells.",
  },
  {
    number: "04",
    icon: Video,
    title: "Content & growth systems",
    description:
      "AI-generated video and content pipelines for businesses scaling their marketing.",
  },
];

const WhatWeBuild = () => (
  <section className="py-20 sm:py-28 border-t border-border/60">
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 max-w-[1400px]">
      <motion.div variants={stagger()} {...inView}>
        <motion.div variants={fadeUp} className="mb-12">
          <p className="tech-label mb-4">The build track</p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-foreground max-w-xl leading-tight">
            What we build, when the audit says build.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 border border-border rounded-lg overflow-hidden">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.number}
              variants={fadeUp}
              className={`group p-8 sm:p-10 hover:bg-muted/40 transition-colors duration-300 ${
                index >= 2 ? "border-t border-border" : ""
              } ${index % 2 === 1 ? "sm:border-l sm:border-border" : ""} ${
                index === 1 ? "border-t sm:border-t-0 border-border" : ""
              }`}
            >
              <div className="flex items-start gap-6">
                <span className="font-mono text-[11px] text-primary pt-1 shrink-0">
                  {cap.number}
                </span>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <cap.icon className="w-5 h-5 text-primary shrink-0" strokeWidth={1.5} />
                    <h3 className="text-lg font-semibold text-foreground">{cap.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default WhatWeBuild;
