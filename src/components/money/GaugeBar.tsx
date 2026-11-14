/** Simple fill bar that grows with the value relative to `max`. */
export function GaugeBar({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = Math.max(0, Math.min(100, max > 0 ? (value / max) * 100 : 0));
  return (
    <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-white/10" role="img" aria-label={label}>
      <div className="h-full rounded-full bg-gradient-to-r from-[#E9E4A6] to-[#DD5013] transition-[width] duration-500 ease-out motion-reduce:transition-none" style={{ width: `${pct}%` }} />
    </div>
  );
}
