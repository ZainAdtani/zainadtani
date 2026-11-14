import { useEffect, useRef, useState } from "react";

/** Smoothly eases a displayed number toward `target`. Jumps instantly with reduced motion. */
export function useTweenedNumber(target: number, duration = 500): number {
  const [shown, setShown] = useState(target);
  const fromRef = useRef(target);
  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { fromRef.current = target; setShown(target); return; }
    const from = fromRef.current;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const v = from + (target - from) * (1 - Math.pow(1 - p, 3));
      fromRef.current = v;
      setShown(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return shown;
}
