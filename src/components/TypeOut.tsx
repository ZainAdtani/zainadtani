import { useEffect, useRef, useState } from "react";

/** Types `text` out letter by letter when it scrolls into view. Full text with reduced motion. */
export function TypeOut({ text, speed = 28 }: { text: string; speed?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(text.length);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") return;
    setCount(0);
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let n = 0;
      timer = window.setInterval(() => { n += 1; setCount(n); if (n >= text.length) window.clearInterval(timer); }, speed);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); window.clearInterval(timer); };
  }, [text, speed]);
  return (
    <span ref={ref} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      <span aria-hidden="true" className="invisible">{text.slice(count)}</span>
    </span>
  );
}
