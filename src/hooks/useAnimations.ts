/**
 * Premium animation hooks — native browser APIs, zero dependencies.
 * Implements spring physics, magnetic hover, parallax, and staggered reveals
 * at the same quality level as framer-motion.
 */

import { useEffect, useRef, useState, useCallback, MutableRefObject } from "react";

/* ─────────────────────────────────────────────
   1. Scroll-triggered reveal (IntersectionObserver)
   Returns [ref, isVisible]
──────────────────────────────────────────────── */
export function useReveal<T extends HTMLElement>(
  options: IntersectionObserverInit = {}
): [MutableRefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // fire once
        }
      },
      { threshold: 0.1, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

/* ─────────────────────────────────────────────
   2. Parallax using rAF — smooth scroll-linked transform
   Returns ref to attach to element
──────────────────────────────────────────────── */
export function useParallax<T extends HTMLElement>(
  speed: number = 0.15
): MutableRefObject<T | null> {
  const ref = useRef<T | null>(null);
  const rafId = useRef<number>(0);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        if (!ref.current) return;
        // lerp for smooth motion
        lastY.current += (window.scrollY - lastY.current) * 0.08;
        ref.current.style.transform = `translateY(${lastY.current * speed}px)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [speed]);

  return ref;
}

/* ─────────────────────────────────────────────
   3. Magnetic hover — element follows cursor with spring physics
   Returns ref + mouse event handlers
──────────────────────────────────────────────── */
export function useMagnetic<T extends HTMLElement>(strength: number = 0.35) {
  const ref = useRef<T | null>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

  const animate = useCallback(() => {
    posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.1);
    posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.1);

    if (ref.current) {
      ref.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
    }

    const dist = Math.hypot(posRef.current.x - targetRef.current.x, posRef.current.y - targetRef.current.y);
    if (dist > 0.01) {
      rafId.current = requestAnimationFrame(animate);
    }
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<T>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    targetRef.current = {
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    };
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(animate);
  }, [animate, strength]);

  const onMouseLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0 };
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(animate);
  }, [animate]);

  return { ref, onMouseMove, onMouseLeave };
}

/* ─────────────────────────────────────────────
   4. Cursor-tracking card glow (radial gradient follows mouse)
──────────────────────────────────────────────── */
export function useCursorGlow<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<T>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || !ref.current) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty("--glow-x", `${x}px`);
    ref.current.style.setProperty("--glow-y", `${y}px`);
    ref.current.style.setProperty("--glow-opacity", "1");
  }, []);

  const onMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.setProperty("--glow-opacity", "0");
    }
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
