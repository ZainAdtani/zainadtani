import { useId, useState } from "react";
import { useTweenedNumber } from "@/hooks/useTweenedNumber";

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const COVER_OPTIONS = [
  { label: "None", mult: 0 },
  { label: "1x pay", mult: 1 },
  { label: "2x pay", mult: 2 },
];

/** Simple estimate: a family needs about 10 years of pay in cover. */
export function gapEstimate(pay: number, savings: number, coverMult: number) {
  const need = pay * 10;
  const have = Math.min(need, savings + pay * coverMult);
  return { need, have, gap: Math.max(0, need - have) };
}

export function GapMeter() {
  const [pay, setPay] = useState(60000);
  const [savings, setSavings] = useState(10000);
  const [mult, setMult] = useState(1);
  const id = useId();
  const { need, have, gap } = gapEstimate(pay, savings, mult);
  const shownGap = useTweenedNumber(gap);
  const havePct = need > 0 ? (have / need) * 100 : 100;

  return (
    <section className="container mx-auto px-4 pb-16 max-w-4xl" aria-labelledby={`${id}-t`}>
      <div className="surface-card rounded-3xl p-6 md:p-8">
        <h2 id={`${id}-t`} className="text-2xl md:text-3xl">Gap Meter</h2>
        <p className="mt-1 text-sm text-muted-foreground">A simple estimate. Education only.</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="flex justify-between text-sm font-bold"><span>Yearly pay</span><span className="tabular-nums">{money(pay)}</span></span>
            <input type="range" min={0} max={300000} step={5000} value={pay} onChange={e => setPay(+e.target.value)} className="mt-2 w-full accent-[#DD5013]" />
          </label>
          <label className="block">
            <span className="flex justify-between text-sm font-bold"><span>Current savings</span><span className="tabular-nums">{money(savings)}</span></span>
            <input type="range" min={0} max={500000} step={5000} value={savings} onChange={e => setSavings(+e.target.value)} className="mt-2 w-full accent-[#DD5013]" />
          </label>
        </div>

        <fieldset className="mt-6">
          <legend className="text-sm font-bold">Job life insurance</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {COVER_OPTIONS.map(o => (
              <button key={o.label} type="button" aria-pressed={mult === o.mult} onClick={() => setMult(o.mult)}
                className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${mult === o.mult ? "border-[#DD5013] bg-[#DD5013] text-[#0A0F1A]" : "border-border bg-background hover:border-[#DD5013]"}`}>
                {o.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-8">
          <div className="flex h-6 w-full overflow-hidden rounded-full bg-red-600/85" role="img"
            aria-label={`Family already has ${money(have)} of about ${money(need)} needed. Gap ${money(gap)}.`}>
            <div className="h-full bg-green-600 transition-[width] duration-500 ease-out motion-reduce:transition-none" style={{ width: `${havePct}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-xs font-bold">
            <span className="text-green-700">Already has {money(have)}</span>
            <span className="text-red-700">Gap</span>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">Estimated gap</p>
        <p className="text-5xl md:text-6xl leading-none text-red-700 tabular-nums" style={{ fontFamily: "'Luckiest Guy', cursive" }} aria-live="polite">
          {money(shownGap)}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">Uses a simple rule: a family needs about 10 years of pay in cover. Your real need may be different.</p>
      </div>
    </section>
  );
}
