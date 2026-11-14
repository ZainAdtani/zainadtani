import { useRef, type HTMLAttributes, type MouseEvent } from "react";

/** Leans slightly toward the cursor on desktop. Does nothing on touch or with reduced motion. */
export function TiltCard({ className = "", children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const ok = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !ok()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-4px)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`tilt-card tilt-smooth ${className}`} {...rest}>
      {children}
    </div>
  );
}
