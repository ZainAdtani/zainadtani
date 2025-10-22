import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const STORAGE_KEY = "vault_session";

type Cadence = "Monthly" | "Yearly";

type Sub = {
  name: string;
  cadence: Cadence;
  amount: number; // numeric for math; render with $
  note?: string; // e.g., "per year", "••4009 • renews in 20 days"
  bucket?: "Personal" | "Work" | "Business" | "Utilities" | "Family";
  payer?: string; // e.g., "Apple CC 2708"
};

const SUBS: Sub[] = [
  // NEW ones you asked for
  { name: "11labs", cadence: "Yearly", amount: 53.3, note: "per year", bucket: "Personal" },
  { name: "OpenAI", cadence: "Monthly", amount: 21.28, note: "••4009 • renews in 20 days", bucket: "Business" },

  // Existing from your grid
  { name: "Bookmory", cadence: "Yearly", amount: 31, payer: "Apple CC 2708", bucket: "Personal" },
  { name: "Goodnotes", cadence: "Yearly", amount: 12, payer: "Apple CC 2708", bucket: "Work" },
  { name: "HeyGen AI", cadence: "Yearly", amount: 290, bucket: "Work" },
  { name: "iCloud+", cadence: "Monthly", amount: 3, payer: "Apple CC 2708", bucket: "Utilities" },
  { name: "Spotify Family", cadence: "Monthly", amount: 23, bucket: "Personal" },
];

export default function Subscriptions() {
  // Gate: must unlock the vault in this tab
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) !== "true") {
      window.location.replace("/vault");
    }
  }, []);

  const [view, setView] = useState<Cadence>("Monthly");

  const active = SUBS.length;

  const monthlyTotal = useMemo(() => SUBS.filter((s) => s.cadence === "Monthly").reduce((a, s) => a + s.amount, 0), []);
  const yearlyTotal = useMemo(() => SUBS.filter((s) => s.cadence === "Yearly").reduce((a, s) => a + s.amount, 0), []);

  const visible = useMemo(() => SUBS.filter((s) => s.cadence === view), [view]);

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 dark:bg-[#090c15] dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Subscriptions</h1>
          <div className="flex items-center gap-4">
            <Link
              to="/vault"
              className="text-sm text-slate-500 underline hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              Back to Vault
            </Link>
            {/* View toggle (the only control) */}
            <ToggleGroup
              type="single"
              value={view}
              onValueChange={(v) => v && setView(v as Cadence)}
              className="rounded-2xl border bg-white/80 p-1 shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <ToggleGroupItem
                value="Monthly"
                className="rounded-xl data-[state=on]:bg-indigo-600 data-[state=on]:text-white"
              >
                Monthly
              </ToggleGroupItem>
              <ToggleGroupItem
                value="Yearly"
                className="rounded-xl data-[state=on]:bg-indigo-600 data-[state=on]:text-white"
              >
                Yearly
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        {/* Summary tiles */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <GlassTile label="Total Monthly" value={`$${monthlyTotal.toFixed(2)}`} />
          <GlassTile label="Total Yearly" value={`$${yearlyTotal.toFixed(2)}`} />
          <GlassTile label="Active Subscriptions" value={String(active)} />
        </div>

        {/* Cards — clean, futuristic glass; no buttons or filters */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((s) => (
            <Card
              key={`${s.name}-${s.cadence}`}
              className="group relative overflow-hidden rounded-2xl border bg-white/90 shadow-sm backdrop-blur
                         dark:border-white/10 dark:bg-white/[.06]"
            >
              {/* subtle futuristic mesh gradient (no motion) */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[.6] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "radial-gradient(1200px 600px at 10% -10%, rgba(99,102,241,.18), transparent 60%), radial-gradient(1000px 500px at 120% 120%, rgba(16,185,129,.12), transparent 60%)",
                }}
              />
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{s.name}</CardTitle>
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {s.cadence}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-semibold">
                  ${s.amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                </div>
                {s.note && <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.note}</div>}
                {s.payer && <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.payer}</div>}
                {s.bucket && (
                  <div
                    className="mt-3 inline-flex items-center rounded-full border px-2 py-0.5 text-xs
                                  text-slate-600 dark:text-slate-300 dark:border-white/10"
                  >
                    {s.bucket}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Small “glass” stat tile used above */
function GlassTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-white/90 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[.06]">
      <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
      <div className="mt-1 text-3xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}
