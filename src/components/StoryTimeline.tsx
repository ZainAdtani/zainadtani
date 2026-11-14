import { Children, useEffect, useRef, useState, type ReactNode } from "react";

/** Wraps story paragraphs in a vertical timeline. The line draws as you scroll; items fade in as it reaches them. */
export function StoryTimeline({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(1);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const update = () => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const reach = window.innerHeight * 0.75 - r.top;
      setProgress(Math.max(0, Math.min(1, reach / r.height)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  const items = Children.toArray(children);
  return (
    <ol ref={ref} className={`relative pl-8 space-y-6 ${className}`}>
      <span aria-hidden="true" className="absolute left-[9px] top-1 bottom-1 w-0.5 rounded-full bg-border" />
      <span aria-hidden="true" className="absolute left-[9px] top-1 w-0.5 rounded-full bg-[#DD5013]" style={{ height: `calc((100% - 0.5rem) * ${progress})` }} />
      {items.map((child, i) => {
        const reached = progress >= (i + 0.3) / items.length;
        return (
          <li key={i} className={`relative transition-all duration-500 motion-reduce:transition-none ${reached ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            <span aria-hidden="true" className={`absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-[#DD5013] transition-colors ${reached ? "bg-[#DD5013]" : "bg-background"}`} />
            {child}
          </li>
        );
      })}
    </ol>
  );
}
