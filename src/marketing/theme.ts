/* ─────────────────────────────────────────────────────────────
   Marketing design language — shared tokens for the light rebuild.
   Predominantly light/white surfaces with the brand navy used as
   deliberate DARK punctuation (hero diagram, quote bands, footer).
   Self-contained (explicit hex + fonts) so marketing pages render
   correctly regardless of the global .dark default, and never fight
   the ops-dashboard tokens.
   ───────────────────────────────────────────────────────────── */

// Light surface (most of the site)
export const PAGE = "#F6F7F9"; // cool off-white
export const INK = "#0B1220"; // near-navy text
export const MUT = "rgba(11,18,32,0.62)";
export const LINE = "rgba(11,18,32,0.12)";
export const CARD = "#FFFFFF";

// Brand blue
export const ACCENT = "#2E6BFF"; // vivid — fills + large display accent words
export const ACCENT_DEEP = "#1E52DB"; // darker — small accent text needs AA on white
export const ACCENT_SOFT = "#7FA9FF"; // light accent — accent text on dark bands

// Dark punctuation (brand navy)
export const DARK = "#0B1220";
export const DARK_CARD = "#131A28";
export const DARK_FG = "#EDEFF3";
export const DARK_MUT = "rgba(237,239,243,0.62)";
export const DARK_LINE = "rgba(237,239,243,0.14)";

// Fonts (loaded globally in index.html)
export const SERIF = "'Fraunces', serif";
export const SANS = "'Instrument Sans', sans-serif";
export const MONO = "'JetBrains Mono', monospace";

// ── Tone system ──
// Each marketing section is a full-bleed band in one of two tones, and
// pages alternate them for a balanced light/dark rhythm. Section markup
// reads its colours from the active tone (via useTone), so the same JSX
// renders correctly on either background.
export type Tone = "light" | "dark";
export const tones = {
  light: {
    name: "light",
    bg: PAGE,
    fg: INK,
    mut: MUT,
    line: LINE,
    card: CARD,
    accent: ACCENT,
    accentText: ACCENT_DEEP, // AA on light
    onCard: MUT,
    cardShadow: "0 18px 40px -28px rgba(11,18,32,0.30)",
    // capability rows invert to navy on light
    rowHoverBg: DARK,
    rowHoverFg: "#FFFFFF",
    rowHoverNum: ACCENT_SOFT,
    rowHoverMut: "rgba(237,239,243,0.75)",
  },
  dark: {
    name: "dark",
    bg: DARK,
    fg: DARK_FG,
    mut: DARK_MUT,
    line: DARK_LINE,
    card: DARK_CARD,
    accent: ACCENT,
    accentText: ACCENT_SOFT, // legible on dark
    onCard: DARK_MUT,
    cardShadow: "0 24px 60px -30px rgba(0,0,0,0.55)",
    // capability rows invert to blue on dark
    rowHoverBg: ACCENT,
    rowHoverFg: "#08111F",
    rowHoverNum: "#08111F",
    rowHoverMut: "rgba(8,17,31,0.8)",
  },
} as const;
export type ToneColors = (typeof tones)[Tone];

// Shared entrance motion — transform/opacity only, respects reduced-motion.
export const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] as const },
  }),
};
