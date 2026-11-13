import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Btn = { label: string; to: string; external?: boolean };
type Star = {
  id: string; label: string; sub: string; color: string; size: number;
  x: number; y: number; title: string; sentence: string; primary: Btn; secondary?: Btn;
};

const STARS: Star[] = [
  { id: "protect", label: "Protect", sub: "Family and a call", color: "#D97706", size: 30, x: 16, y: 68,
    title: "Protect your family.", sentence: "I can help you understand life insurance and family protection, in plain words. You decide what is next.",
    primary: { label: "Learn about family protection", to: "/family-protection-gap" },
    secondary: { label: "Book a call", to: "https://calendly.com/zkadtani", external: true } },
  { id: "build", label: "Build", sub: "AI tools", color: "#447BBE", size: 22, x: 40, y: 26,
    title: "Save time with simple tools.", sentence: "Start with a free tool that shows you where time or visibility is leaking.",
    primary: { label: "Free AI Checkup", to: "/ai-checkup" },
    secondary: { label: "Missed Call Calculator", to: "/missed-call-calculator" } },
  { id: "read", label: "Read", sub: "Books on Amazon", color: "#C7BE6A", size: 22, x: 64, y: 62,
    title: "Start with a book.", sentence: "Three books, all live on Amazon. Pick the one that fits where you are.",
    primary: { label: "See my books", to: "#books" } },
  { id: "play", label: "Play", sub: "iPhone apps", color: "#DD5013", size: 22, x: 86, y: 22,
    title: "Try an iPhone app.", sentence: "A few of my iPhone apps are on the App Store now. Others are on the way.",
    primary: { label: "See the apps", to: "#apps" } },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function CardButton({ b, primary }: { b: Btn; primary: boolean }) {
  const cls = `${primary ? "btn-cta" : "btn-secondary-outline"} w-full sm:w-auto`;
  if (b.external) return <a href={b.to} target="_blank" rel="noopener noreferrer" className={cls}>{b.label}</a>;
  if (b.to.startsWith("#")) return <a href={b.to} className={cls}>{b.label}</a>;
  return <Link to={b.to} className={cls}>{b.label}</Link>;
}

export function StarMap() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const star = STARS.find((s) => s.id === active);
  // SVG uses a 100 x 100 box stretched to the container, matching the % star positions.
  const points = STARS.map((s) => `${s.x},${s.y}`).join(" ");
  const pathD = "M" + STARS.map((s) => `${s.x} ${s.y}`).join(" L");

  return (
    <section id="start" aria-labelledby="start-heading" className="hero-warm section-y scroll-mt-20">
      <div className="container mx-auto px-5 sm:px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">A simple map</p>
          <h2 id="start-heading" className="font-display text-[30px] md:text-[40px] leading-[1.15] text-[#0A0F1A] mt-2">
            Where do you want to start?
          </h2>
          <p className="font-sans text-[16px] leading-relaxed text-[#0A0F1A]/70 mt-3">
            Pick a star. Each one takes you to a real next step on this site.
          </p>
        </div>

        <div className={`starmap mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${reduced ? "starmap-still" : ""}`}>
          <div className="relative w-full aspect-[4/3] max-w-xl mx-auto">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
              <polyline points={points} fill="none" stroke="#0A0F1A" strokeOpacity="0.45" strokeWidth="0.5"
                vectorEffect="non-scaling-stroke" pathLength={1} className="starmap-line" />
              {!reduced && (
                <circle r="1.4" fill="#E9E4A6" stroke="#D97706" strokeWidth="0.4" className="starmap-light">
                  <animateMotion dur="6s" begin="2.4s" repeatCount="indefinite" path={pathD} keyPoints="0;1;1" keyTimes="0;0.5;1" calcMode="linear" />
                </circle>
              )}
            </svg>
            {STARS.map((s, i) => {
              const on = active === s.id;
              return (
                <div key={s.id} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                  style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                  <button
                    type="button"
                    aria-label={`${s.label}: ${s.sub}`}
                    aria-pressed={on}
                    aria-controls="starmap-card"
                    onMouseEnter={() => setActive(s.id)}
                    onFocus={() => setActive(s.id)}
                    onClick={() => setActive(s.id)}
                    className="starmap-star rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0F1A] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(45,82%,94%)]"
                    style={{ ["--i" as string]: i, ["--c" as string]: s.color, width: s.size + 14, height: s.size + 14 }}
                  >
                    <svg viewBox="0 0 24 24" className={`w-full h-full transition-transform ${on ? "scale-125" : ""}`} aria-hidden="true">
                      <path d="M12 1.5l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 8.7l7.1-.6z"
                        fill={s.color} stroke={on ? "#0A0F1A" : "none"} strokeWidth="1.2" />
                    </svg>
                  </button>
                  <span className="mt-1 text-center pointer-events-none whitespace-nowrap">
                    <span className="block font-sans font-bold text-[14px] text-[#0A0F1A]">{s.label}</span>
                    <span className="block font-sans text-[12px] text-[#0A0F1A]/70">{s.sub}</span>
                  </span>
                </div>
              );
            })}
          </div>

          <div id="starmap-card" aria-live="polite" className="surface-card bg-white p-7 min-h-[220px] flex flex-col justify-center">
            {star ? (
              <>
                <p className="eyebrow" style={{ color: star.id === "read" ? "#7A6F1E" : undefined }}>{star.label}</p>
                <h3 className="font-display text-[22px] text-[#0A0F1A] mt-2">{star.title}</h3>
                <p className="font-sans text-[16px] leading-relaxed text-[#0A0F1A]/75 mt-2">{star.sentence}</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <CardButton b={star.primary} primary />
                  {star.secondary && <CardButton b={star.secondary} primary={false} />}
                </div>
              </>
            ) : (
              <p className="font-sans text-[16px] text-center text-[#0A0F1A]/70">Hover or tap a star to see where it goes.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
