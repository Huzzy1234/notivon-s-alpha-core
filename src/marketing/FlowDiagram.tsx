import { motion } from "framer-motion";
import { ACCENT, ACCENT_SOFT, DARK_CARD, DARK_FG, fade, MONO, SANS } from "./theme";

/* Signature: a coherent, top-to-bottom job-flow diagram.
   Designed to sit inside a DARK navy card (light-on-dark). */

const NODE_W = 320;

const FlowDiagram = () => {
  const node = (y: number, label: string, sub: string, accent: boolean, i: number) => (
    <motion.g variants={fade} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <rect
        x={20} y={y} width={NODE_W} height="54" rx="12"
        fill={accent ? ACCENT : DARK_CARD}
        stroke={accent ? ACCENT : "rgba(237,239,243,0.22)"}
        strokeWidth="1.5"
      />
      <text x={38} y={y + 22} fontFamily={MONO} fontSize="9" letterSpacing="1.4" fill={accent ? "#08111F" : ACCENT_SOFT} opacity={accent ? 0.85 : 1}>
        {sub}
      </text>
      <text x={38} y={y + 40} fontFamily={SANS} fontSize="15" fontWeight="600" fill={accent ? "#08111F" : DARK_FG}>
        {label}
      </text>
    </motion.g>
  );
  const arrow = (y1: number, y2: number, i: number) => (
    <motion.line
      x1={180} y1={y1} x2={180} y2={y2}
      stroke="rgba(237,239,243,0.4)" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#uah)"
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
    />
  );
  return (
    <svg viewBox="0 0 360 300" className="w-full h-auto">
      <defs>
        <marker id="uah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke="rgba(237,239,243,0.5)" strokeWidth="1.5" />
        </marker>
      </defs>
      {node(6, "A customer reaches out", "STEP 01 · THE TRIGGER", false, 0)}
      {arrow(60, 76, 0)}
      {node(78, "Your system captures it", "THE BUILD", true, 1)}
      {arrow(132, 148, 1)}
      {node(150, "Reminders send themselves", "AUTOMATIC", false, 2)}
      {arrow(204, 220, 2)}
      {node(222, "Nothing slips — you get paid", "THE RESULT", false, 3)}
    </svg>
  );
};

export default FlowDiagram;
