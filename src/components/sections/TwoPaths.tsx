import { ArrowRight, Compass, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, stagger, inView } from "@/lib/motion";

/* The core positioning section: consulting and building as two co-equal
   ways in — the audit is a real offer, not a funnel step. */

const paths = [
  {
    index: "01",
    kicker: "Consult",
    icon: Compass,
    title: "AI Readiness Audit",
    description:
      "A paid diagnostic of your operations. We map where AI and automation genuinely help your business — and tell you plainly where they don't. You get a written roadmap you own, whether or not you ever build with us.",
    points: [
      "Honest read on your workflows, tools, and data",
      "What to automate, what to skip, and the expected ROI",
      "Fee credited toward your build if you go ahead",
    ],
    cta: { label: "Start with the Audit", to: "/audit" },
    footnote: "Not sure yet? The free Scorecard takes 2 minutes.",
    footnoteLink: { label: "Take the Scorecard", to: "/scorecard" },
  },
  {
    index: "02",
    kicker: "Build",
    icon: Wrench,
    title: "Custom Systems",
    description:
      "Operational systems built around how your business actually runs — not a template. VisaGuard, ClearVoy, and custom AI-powered builds for whatever the bottleneck is.",
    points: [
      "Scoped to the one problem that's costing you",
      "Live in 2–4 weeks, with your team trained",
      "Maintained and extended as you grow",
    ],
    cta: { label: "See the work", to: "#products" },
    footnote: "Already know what you need?",
    footnoteLink: { label: "Talk to us", to: "#contact" },
  },
];

const PathCard = ({ path }: { path: (typeof paths)[number] }) => {
  const isAnchor = path.cta.to.startsWith("#");
  const CtaTag = isAnchor ? "a" : Link;

  return (
    <motion.article
      variants={fadeUp}
      className="group relative flex flex-col surface-1 border border-border rounded-lg p-8 sm:p-10 hover:border-primary/40 transition-colors duration-300"
    >
      <div className="flex items-center justify-between mb-10">
        <span className="tech-label">{path.kicker}</span>
        <span className="font-mono text-[11px] text-primary">{path.index}</span>
      </div>

      <path.icon className="w-6 h-6 text-primary mb-6" strokeWidth={1.5} />

      <h3 className="font-display font-semibold text-2xl sm:text-3xl text-foreground mb-4">
        {path.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed mb-8">{path.description}</p>

      <ul className="space-y-3 mb-10">
        {path.points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-sm text-foreground/90">
            <span className="mt-[7px] w-1 h-1 rounded-full bg-primary shrink-0" />
            {point}
          </li>
        ))}
      </ul>

      <div className="mt-auto space-y-4">
        <CtaTag
          {...(isAnchor ? { href: path.cta.to } : { to: path.cta.to })}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary group/cta"
        >
          {path.cta.label}
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
        </CtaTag>
        <p className="text-xs text-muted-foreground">
          {path.footnote}{" "}
          {path.footnoteLink.to.startsWith("#") ? (
            <a href={path.footnoteLink.to} className="text-foreground underline underline-offset-4 hover:text-primary">
              {path.footnoteLink.label}
            </a>
          ) : (
            <Link to={path.footnoteLink.to} className="text-foreground underline underline-offset-4 hover:text-primary">
              {path.footnoteLink.label}
            </Link>
          )}
        </p>
      </div>
    </motion.article>
  );
};

const TwoPaths = () => (
  <section id="two-paths" className="py-20 sm:py-28 border-t border-border/60">
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 max-w-[1400px]">
      <motion.div variants={stagger()} {...inView} className="mb-14">
        <motion.p variants={fadeUp} className="tech-label mb-4">
          Two ways in
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-foreground max-w-2xl leading-tight"
        >
          Clarity first. Building second.
          <span className="text-muted-foreground"> Each stands on its own.</span>
        </motion.h2>
      </motion.div>

      <motion.div variants={stagger(0.1, 0.12)} {...inView} className="grid md:grid-cols-2 gap-5">
        {paths.map((path) => (
          <PathCard key={path.index} path={path} />
        ))}
      </motion.div>
    </div>
  </section>
);

export default TwoPaths;
