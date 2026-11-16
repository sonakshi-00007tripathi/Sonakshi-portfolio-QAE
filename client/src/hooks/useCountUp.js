import { useEffect, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const easeOutCubic = (t) => 1 - (1 - t) ** 3;

/**
 * Animates a number from `from` to `to` once `start` becomes true.
 * Returns the current value (a number).
 */
export function useCountUp({ from = 0, to, duration = 1400, start }) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!start) return undefined;
    if (prefersReducedMotion()) { setValue(to); return undefined; }

    let raf = 0;
    const t0 = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / duration);
      setValue(from + (to - from) * easeOutCubic(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, from, to, duration]);

  return value;
}
