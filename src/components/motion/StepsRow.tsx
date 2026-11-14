import { useEffect, useRef, useState } from "react";
import { CalendarCheck, MessagesSquare, ClipboardList } from "lucide-react";

const STEPS = [
  { n: 1, label: "Book", Icon: CalendarCheck },
  { n: 2, label: "We talk", Icon: MessagesSquare },
  { n: 3, label: "You get the plan", Icon: ClipboardList },
];

export function WhatHappensNext() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section aria-labelledby="next-steps" className="container mx-auto px-4 py-12 max-w-4xl">
      <h2 id="next-steps" className="font-display text-[28px] md:text-[34px] text-center text-[#0A0F1A]">What happens next</h2>
      <div ref={ref} className={`steps-row mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 ${on ? "is-on" : ""}`}>
        {STEPS.map(({ n, label, Icon }) => (
          <div key={n} className="surface-card flex flex-col items-center gap-3 p-6 text-center" style={{ ["--i" as string]: n - 1 }}>
            <span className="step-icon grid h-14 w-14 place-items-center rounded-full bg-[#E9E4A6] text-[#DD5013]">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0A0F1A]/60">Step {n}</p>
            <h3 className="text-[18px] text-[#0A0F1A]">{label}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
