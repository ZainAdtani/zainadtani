import { useRef, useState } from "react";

/** Book cover that tilts toward the cursor, lifts on tap, and flips open to show existing text. */
export function BookCover3D({ src, alt, inside }: { src: string; alt: string; inside: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty("--rx", `${-y * 18}deg`);
    ref.current.style.setProperty("--ry", `${x * 22}deg`);
  };
  const reset = () => { ref.current?.style.setProperty("--rx", "0deg"); ref.current?.style.setProperty("--ry", "0deg"); };
  return (
    <div className="shrink-0 flex flex-col items-center gap-2 w-24">
      <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className="book3d w-24 aspect-[2/3]" style={{ perspective: "700px" }}>
        <div className={`book3d-inner relative h-full w-full ${open ? "is-open" : ""}`}>
          <img src={src} alt={alt} width={96} height={144} loading="lazy" className="book3d-face absolute inset-0 h-full w-full object-contain" />
          <div className="book3d-back absolute inset-0 overflow-auto rounded-md border border-border bg-[hsl(45,82%,94%)] p-2 font-sans text-[10.5px] leading-snug text-foreground">
            {inside}
          </div>
        </div>
      </div>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-pressed={open}
        className="rounded-full border border-[#447BBE]/40 px-2.5 py-1 font-sans text-[11px] font-semibold text-[#2F5C90] hover:bg-[#447BBE]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        Peek inside
      </button>
    </div>
  );
}
