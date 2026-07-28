import { createContext, useContext } from "react";
import { INK, MUT, LINE, DARK_MUT, DARK_LINE, MONO, tones, type Tone, type ToneColors } from "./theme";

/* Shared layout primitives for the marketing pages. */

// ── Tone context ──
const ToneCtx = createContext<ToneColors>(tones.light);
export const useTone = () => useContext(ToneCtx);

// A full-bleed coloured band. Provides its tone to descendant sections
// and lays their content inside the standard width shell.
export const Band = ({
  t = "light",
  id,
  className = "",
  children,
}: {
  t?: Tone;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) => {
  const c = tones[t];
  return (
    <div id={id} className={id ? "scroll-mt-24" : undefined} style={{ background: c.bg, color: c.fg }}>
      <ToneCtx.Provider value={c}>
        <Shell className={className}>{children}</Shell>
      </ToneCtx.Provider>
    </div>
  );
};

// Inner width shell — full-bleed dark bands break out by wrapping the
// coloured <div> around their own <Shell>.
export const Shell = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>
);

// Hairline divider — follows the active tone, or force with `dark`.
export const Rule = ({ dark }: { dark?: boolean }) => {
  const c = useTone();
  const line = dark === undefined ? c.line : dark ? DARK_LINE : LINE;
  return <div style={{ borderTop: `1px solid ${line}` }} />;
};

// Mono uppercase eyebrow label — follows the active tone, or force with `dark`.
export const Kicker = ({
  children,
  dark,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) => {
  const c = useTone();
  const color = dark === undefined ? c.mut : dark ? DARK_MUT : MUT;
  return (
    <p className="uppercase tracking-[0.2em] text-[11px] sm:text-[12px]" style={{ color, fontFamily: MONO }}>
      {children}
    </p>
  );
};

// Non-exported helper re-export so pages needn't import INK directly for text.
export { INK };
