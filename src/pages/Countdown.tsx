import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";

type TimerCfg = {
  title: string;
  emoji: string;
  gradient: string;      // Tailwind from-*/to-* classes
  start: string;         // ISO
  target: string;        // ISO
};

const TIMER_CONFIG: TimerCfg[] = [
  { title: "Feb 4th",  emoji: "🎉", gradient: "from-purple-500 to-pink-500",  start: "2025-01-01T00:00:00", target: "2026-02-04T00:00:00" },
  { title: "Christmas",emoji: "🎄", gradient: "from-emerald-500 to-rose-500", start: "2025-01-01T00:00:00", target: "2025-12-25T00:00:00" },
  { title: "New Year", emoji: "🎆", gradient: "from-indigo-500 to-violet-500",start: "2025-01-01T00:00:00", target: "2026-01-01T00:00:00" },
];

type TL = { days: number; hours: number; minutes: number; seconds: number; done: boolean; };
const clamp = (n:number,min=0,max=100)=>Math.min(max,Math.max(min,n));

function diff(target: Date): TL {
  const ms = +target - +new Date();
  if (ms <= 0) return { days:0,hours:0,minutes:0,seconds:0,done:true };
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return { days, hours, minutes, seconds, done:false };
}

function progressPct(start: Date, target: Date) {
  const total = +target - +start;
  const elapsed = +new Date() - +start;
  return clamp((elapsed / total) * 100);
}

function RingTimer({ title, emoji, startISO, targetISO, gradient }: { title:string; emoji:string; startISO:string; targetISO:string; gradient:string; }) {
  const start = useMemo(()=>new Date(startISO),[startISO]);
  const target= useMemo(()=>new Date(targetISO),[targetISO]);
  const [tl, setTl] = useState<TL>(diff(target));
  const [pct, setPct] = useState(progressPct(start, target));

  useEffect(() => {
    const id = setInterval(() => {
      setTl(diff(target));
      setPct(progressPct(start, target));
    }, 1000);
    return () => clearInterval(id);
  }, [start, target]);

  // SVG ring math
  const r = 80;                      // radius
  const C = 2 * Math.PI * r;         // circumference
  const offset = C * (1 - pct / 100);

  return (
    <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all bg-gradient-to-br ${gradient}`}>
      {/* glass veil */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <CardContent className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-white/90">
            <div className="text-2xl font-bold flex items-center gap-2">
              <span className="text-3xl">{emoji}</span>
              {title}
            </div>
            <div className="text-xs text-white/70">{tl.done ? "Time's up!" : "Counting down…"}</div>
          </div>
          <div className="text-right text-white/80 text-xs tabular-nums">{pct.toFixed(1)}%</div>
        </div>

        <div className="grid gap-6 md:grid-cols-[220px_1fr] items-center">
          {/* Circular ring */}
          <div className="relative mx-auto">
            <svg width="220" height="220" viewBox="0 0 220 220" role="img" aria-label={`${title} ${pct.toFixed(1)} percent complete`}>
              <g transform="translate(110,110)">
                <circle r={r} fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="14" />
                <circle
                  r={r}
                  fill="none"
                  stroke="white"
                  strokeOpacity="0.95"
                  strokeWidth="14"
                  strokeDasharray={C}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  transform="rotate(-90)"
                />
              </g>
            </svg>
            {/* center content */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="text-5xl font-extrabold text-white tabular-nums leading-none">{tl.days}</div>
                <div className="text-white/70 text-xs uppercase tracking-wider">Days</div>
              </div>
            </div>
          </div>

          {/* H / M / S blocks */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Hours", value: tl.hours },
              { label: "Min",   value: tl.minutes },
              { label: "Sec",   value: tl.seconds },
            ].map((b) => (
              <div key={b.label} className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-center p-4">
                <div className="text-3xl font-bold text-white tabular-nums">{b.value}</div>
                <div className="text-[11px] uppercase tracking-widest text-white/80 mt-1">{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Countdown() {
  return (
    <>
      <Helmet>
        <title>Countdown Timers – Zain</title>
        <meta name="description" content="Track important dates with beautiful countdown timers." />
      </Helmet>
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2 text-sky-500/90">Countdown Timers</h1>
          <p className="text-lg text-muted-foreground">Track important dates with style ⏰</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIMER_CONFIG.map((t) => (
            <RingTimer
              key={t.title}
              title={t.title}
              emoji={t.emoji}
              startISO={t.start}
              targetISO={t.target}
              gradient={t.gradient}
            />
          ))}
        </div>
      </div>
    </>
  );
}
