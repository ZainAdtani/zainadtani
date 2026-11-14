import { useTweenedNumber } from "@/hooks/useTweenedNumber";

/** Half-circle dial that sweeps to `score` (0–100). Higher = better, green; lower = red. */
export function ScoreGauge({ score }: { score: number }) {
  const v = useTweenedNumber(score, 900);
  const angle = -90 + (v / 100) * 180;
  const hue = Math.round((v / 100) * 120); // 0 red → 120 green
  const arc = "M 10 60 A 50 50 0 0 1 110 60";
  return (
    <svg viewBox="0 0 120 70" className="w-full max-w-[220px]" role="img" aria-label={`Score ${score} out of 100`}>
      <defs>
        <linearGradient id="gauge-grad" x1="0" x2="1">
          <stop offset="0%" stopColor="hsl(0 75% 50%)" />
          <stop offset="50%" stopColor="hsl(45 90% 50%)" />
          <stop offset="100%" stopColor="hsl(130 60% 42%)" />
        </linearGradient>
      </defs>
      <path d={arc} fill="none" stroke="hsl(0 0% 100% / 0.12)" strokeWidth="10" strokeLinecap="round" />
      <path d={arc} fill="none" stroke="url(#gauge-grad)" strokeWidth="10" strokeLinecap="round" pathLength={100} strokeDasharray={`${v} 100`} />
      <g transform={`rotate(${angle} 60 60)`}>
        <line x1="60" y1="60" x2="60" y2="18" stroke={`hsl(${hue} 70% 55%)`} strokeWidth="3" strokeLinecap="round" />
      </g>
      <circle cx="60" cy="60" r="5" fill="#E9E4A6" />
    </svg>
  );
}
