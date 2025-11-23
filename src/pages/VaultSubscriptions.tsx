import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STORAGE_KEY = "vault_session";

type Cadence = "Monthly" | "Yearly";

type Sub = {
  name: string;
  cadence: Cadence; // REAL billing cadence for this sub
  amount: number; // numeric for math; render as $
  note?: string; // small notes (supports • or \n)
  payer?: string; // e.g., "Apple CC 2708"
  bucket?: "Personal" | "Work" | "Business" | "Utilities" | "Family";
  nextDueISO?: string; // ISO date for next renewal (YYYY-MM-DD)
  cycleDays?: number; // 30 for Monthly, 365 for Yearly (defaulted)
  daysUntilDue?: number; // convenience override -> we convert to date
};

// ---------- helpers ----------
const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const fmtMoney = (n: number) =>
  `$${n.toLocaleString(undefined, {
    minimumFractionDigits: n % 1 ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;

const addDays = (d: Date, days: number) => {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + days);
  return copy;
};

const convertAmount = (amount: number, from: Cadence, to: Cadence) => {
  if (from === to) return amount;
  return from === "Monthly" ? amount * 12 : amount / 12;
};

// ---------- YOUR SUBSCRIPTIONS ----------
const SUBS: Sub[] = [
  // Monthly
  { name: "OpenAI", cadence: "Monthly", amount: 21.28, note: "••4009", bucket: "Business", daysUntilDue: 20 },
  { name: "iCloud+", cadence: "Monthly", amount: 3, payer: "Apple CC 2708", bucket: "Utilities", daysUntilDue: 12 },
  { name: "Spotify Family", cadence: "Monthly", amount: 23, bucket: "Personal", daysUntilDue: 25 },

  // Yearly
  {
    name: "ElevenLabs",
    cadence: "Yearly",
    amount: 53.3,
    payer: "Apple CC 2708",
    note: "Starter plan • Credits 8,655 / 40,000 • Billing period: Yearly • Usage-based billing: Enabled • Plan cost: $5 • Next payment 10/21/2026",
    nextDueISO: "2026-10-21",
    bucket: "Personal",
  },
  { name: "Bookmory", cadence: "Yearly", amount: 31, payer: "Apple CC 2708", bucket: "Personal", daysUntilDue: 200 },
  { name: "Goodnotes", cadence: "Yearly", amount: 12, payer: "Apple CC 2708", bucket: "Work", daysUntilDue: 120 },

  // HeyGen from Apple receipt (payer label standardized)
  {
    name: "HeyGen AI",
    cadence: "Yearly",
    amount: 279,
    payer: "Apple CC 2708",
    note: "Creator Annual • Renews 10/23/2026",
    nextDueISO: "2026-10-23",
    bucket: "Work",
  },
  {
    name: "Gamma (Plus)",
    cadence: "Yearly",
    amount: 96,
    payer: "American Express •••• 1034",
    note: "Plus Annual • Current subscription: Plus • Next billing date: 05/28/2026",
    nextDueISO: "2026-05-28",
    bucket: "Work",
  },
  {
    name: "Canva Pro",
    cadence: "Yearly",
    amount: 120,
    payer: "MasterCard ••5913",
    note: "Yearly at $120/year",
    nextDueISO: "2025-12-19",
    bucket: "Work",
  },
  {
    name: "Suno Pro",
    cadence: "Yearly",
    amount: 96,
    payer: "Blue Business Plus ••1034",
    note: "Yearly at $96/year",
    nextDueISO: "2026-11-23",
    bucket: "Business",
  },
];

// ---------- component ----------
export default function Subscriptions() {
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) !== "true") {
      window.location.replace("/vault");
    }
  }, []);

  // Toggle: how we want to SEE prices
  const [viewCadence, setViewCadence] = useState<Cadence>("Monthly");

  // Totals in both units
  const totals = useMemo(() => {
    const totalAsMonthly = SUBS.reduce((sum, s) => sum + convertAmount(s.amount, s.cadence, "Monthly"), 0);
    const totalAsYearly = SUBS.reduce((sum, s) => sum + convertAmount(s.amount, s.cadence, "Yearly"), 0);
    return { totalAsMonthly, totalAsYearly };
  }, []);

  // Build view with converted amount BUT preserve real cycle length for progress bar
  const viewSubs = useMemo(
    () =>
      SUBS.map((s) => {
        const convertedAmount = convertAmount(s.amount, s.cadence, viewCadence);
        const realCycleDays = s.cadence === "Monthly" ? 30 : 365;
        return normalizeSub({
          ...s,
          amount: convertedAmount,
          cadence: viewCadence, // badge shows how we’re viewing it
          cycleDays: realCycleDays, // keep bar correct for the real billing cycle
        });
      }),
    [viewCadence],
  );

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 dark:bg-[#0a0e17] dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Subscriptions</h1>
          <Link
            to="/vault"
            className="text-sm text-slate-500 underline hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            Back to Vault
          </Link>
        </div>

        {/* Toggle */}
        <div className="mb-6 inline-flex overflow-hidden rounded-xl border dark:border-white/10">
          <button
            className={`px-4 py-2 text-sm ${viewCadence === "Monthly" ? "bg-white dark:bg-white/10 font-semibold" : "bg-transparent"}`}
            onClick={() => setViewCadence("Monthly")}
          >
            View as Monthly
          </button>
          <button
            className={`px-4 py-2 text-sm ${viewCadence === "Yearly" ? "bg-white dark:bg-white/10 font-semibold" : "bg-transparent"}`}
            onClick={() => setViewCadence("Yearly")}
          >
            View as Yearly
          </button>
        </div>

        {/* Summary tiles */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <StatTile label="Total (as Monthly)" value={fmtMoney(totals.totalAsMonthly)} />
          <StatTile label="Total (as Yearly)" value={fmtMoney(totals.totalAsYearly)} />
          <StatTile label="Active Subscriptions" value={`${SUBS.length}`} />
        </div>

        {/* One grid, all prices converted to the selected view */}
        <Section title={`All — showing prices as ${viewCadence}`}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {viewSubs.map((s) => (
              <SubCard key={`${s.name}-${viewCadence}`} sub={s} />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

/* ---------- UI bits ---------- */

function Section({ title, className = "", children }: any) {
  return (
    <section className={className}>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {title}
      </h2>
      {children}
    </section>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-white/90 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[.06]">
      <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
      <div className="mt-1 text-3xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}

function SubCard({ sub }: { sub: Required<Sub> & { daysLeft: number; percentElapsed: number } }) {
  const { name, cadence, amount, note, payer, bucket, nextDueISO, cycleDays, daysLeft, percentElapsed } = sub;

  const dueText =
    daysLeft > 1
      ? `Due in ${daysLeft} days`
      : daysLeft === 1
        ? "Due in 1 day"
        : daysLeft === 0
          ? "Due today"
          : `Overdue by ${Math.abs(daysLeft)} days`;

  const noteLines = note?.includes("\n") ? note.split("\n") : note ? [note] : [];

  return (
    <Card className="group relative overflow-hidden rounded-2xl border bg-white/90 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[.06]">
      {/* subtle mesh */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[.6] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(1200px 600px at 10% -10%, rgba(99,102,241,.18), transparent 60%), radial-gradient(1000px 500px at 120% 120%, rgba(16,185,129,.12), transparent 60%)",
        }}
      />
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge className="rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {cadence}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="text-3xl font-semibold">{fmtMoney(amount)}</div>

        {/* meta lines */}
        <div className="mt-1 space-y-1 text-sm text-slate-500 dark:text-slate-400">
          {payer && <div>{payer}</div>}
          {noteLines.map((ln, i) => (
            <div key={i}>{ln}</div>
          ))}
        </div>

        {bucket && (
          <div className="mt-3 inline-flex items-center rounded-full border px-2 py-0.5 text-xs text-slate-600 dark:text-slate-300 dark:border-white/10">
            {bucket}
          </div>
        )}

        {/* Progress to next renewal (consistent for all) */}
        {nextDueISO && (
          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>{dueText}</span>
              <span>{new Date(nextDueISO).toLocaleDateString()}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-800">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(100, Math.max(0, percentElapsed))}%`,
                  background: "linear-gradient(90deg, rgba(99,102,241,.95), rgba(16,185,129,.95))",
                }}
                aria-hidden
              />
            </div>
            <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Cycle {cycleDays}d • {Math.round(percentElapsed)}% elapsed
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* ---------- normalization ---------- */

function normalizeSub(s: Sub): Required<Sub> & { daysLeft: number; percentElapsed: number } {
  const cycleDays = s.cycleDays ?? (s.cadence === "Monthly" ? 30 : 365);

  let nextDueISO = s.nextDueISO;
  if (!nextDueISO && typeof s.daysUntilDue === "number") {
    nextDueISO = addDays(today(), s.daysUntilDue).toISOString().slice(0, 10);
  }
  if (!nextDueISO) {
    nextDueISO = addDays(today(), cycleDays).toISOString().slice(0, 10);
  }

  const due = new Date(nextDueISO + "T00:00:00");
  const diff = Math.round((due.getTime() - today().getTime()) / (1000 * 60 * 60 * 24));
  const daysLeft = diff;
  const elapsed = Math.max(0, Math.min(cycleDays, cycleDays - daysLeft));
  const percentElapsed = (elapsed / cycleDays) * 100;

  return {
    name: s.name,
    cadence: s.cadence,
    amount: s.amount,
    note: s.note ?? "",
    payer: s.payer ?? "",
    bucket: s.bucket ?? "Personal",
    nextDueISO,
    cycleDays,
    daysUntilDue: s.daysUntilDue ?? 0,
    daysLeft,
    percentElapsed,
  };
}
