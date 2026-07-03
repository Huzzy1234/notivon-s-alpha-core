import { ArrowRight, ArrowUpRight } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { useMagnetic } from "@/hooks/useAnimations";

const SystemScene = lazy(() => import("@/components/three/SystemScene"));

/** Static constellation for mobile / reduced-motion — no WebGL cost.
    Deterministic pseudo-random layout echoing the live scene. */
const FALLBACK_POINTS = Array.from({ length: 42 }, (_, i) => {
  const a = i * 2.399963; // golden angle
  const r = 24 + 168 * Math.sqrt(((i * 9301 + 49297) % 233) / 233);
  return {
    x: 200 + Math.cos(a) * r * 0.98,
    y: 200 + Math.sin(a) * r * 0.92,
    brass: i % 7 === 0,
  };
});

const SceneFallback = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full" aria-hidden>
    <g stroke="hsl(224 18% 30%)" strokeWidth="0.6" opacity="0.45">
      {FALLBACK_POINTS.map((p, i) => {
        const q = FALLBACK_POINTS[(i * 5 + 3) % FALLBACK_POINTS.length];
        const dist = Math.hypot(p.x - q.x, p.y - q.y);
        return dist < 150 ? <line key={i} x1={p.x} y1={p.y} x2={q.x} y2={q.y} /> : null;
      })}
    </g>
    {FALLBACK_POINTS.map((p, i) => (
      <rect
        key={i}
        x={p.x - (p.brass ? 3.4 : 2.6)}
        y={p.y - (p.brass ? 3.4 : 2.6)}
        width={p.brass ? 6.8 : 5.2}
        height={p.brass ? 6.8 : 5.2}
        transform={`rotate(45 ${p.x} ${p.y})`}
        fill={p.brass ? "hsl(215 100% 60%)" : "hsl(220 20% 62%)"}
        opacity={p.brass ? 1 : 0.85}
      />
    ))}
  </svg>
);

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

const Hero = () => {
  const cta = useMagnetic<HTMLAnchorElement>(0.4);
  const reducedMotion = usePrefersReducedMotion();
  const [canWebGL, setCanWebGL] = useState(false);

  useEffect(() => {
    // Only mount the WebGL scene on desktop-class pointers
    setCanWebGL(window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 max-w-[1400px] w-full">
        <div className="grid lg:grid-cols-12 gap-10 items-center">

          {/* ── Left: the argument ── */}
          <motion.div
            className="lg:col-span-7 max-w-2xl"
            variants={stagger(0.1)}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={fadeUp} className="tech-label mb-8">
              Notivon — Consulting + Building
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-display font-semibold text-[2.6rem] sm:text-6xl lg:text-[4.4rem] leading-[1.02] tracking-tight text-foreground mb-8"
            >
              We tell you where AI actually pays off.
              <br />
              <span className="text-primary">Then we build it.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl"
            >
              An honest, paid diagnostic of where AI and automation help your
              business — and where they don't. If a build makes sense, the
              audit fee is credited toward it.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                ref={cta.ref}
                onMouseMove={cta.onMouseMove}
                onMouseLeave={cta.onMouseLeave}
                to="/scorecard"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
              >
                Get your free AI Opportunity Map
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-border text-foreground font-semibold text-sm rounded-md hover:border-primary/50 hover:text-primary transition-colors"
              >
                See what we build
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-8 font-mono text-xs text-muted-foreground">
              3 minutes · 3 specific ideas for your business · no call required
            </motion.p>
          </motion.div>

          {/* ── Right: the system ── */}
          <motion.div
            className="lg:col-span-5 relative h-[320px] sm:h-[420px] lg:h-[560px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            aria-hidden
          >
            {canWebGL && !reducedMotion ? (
              <Suspense fallback={<SceneFallback />}>
                <SystemScene />
              </Suspense>
            ) : (
              <SceneFallback />
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Bottom index strip ── */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 max-w-[1400px] w-full mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <div className="border-t border-border/70 pt-6 grid grid-cols-3 gap-4">
          {[
            ["01", "Diagnose", "Where AI helps — and where it doesn't"],
            ["02", "Decide", "A roadmap you own, either way"],
            ["03", "Build", "Only what earns its keep"],
          ].map(([n, title, desc]) => (
            <div key={n} className="flex flex-col gap-1">
              <span className="font-mono text-[11px] text-primary">{n}</span>
              <span className="text-sm font-semibold text-foreground">{title}</span>
              <span className="text-xs text-muted-foreground hidden sm:block">{desc}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
