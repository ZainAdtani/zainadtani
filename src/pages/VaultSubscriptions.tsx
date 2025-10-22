import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STORAGE_KEY = "vault_session";

type Cadence = "Monthly" | "Yearly";

type Sub = {
  name: string;
  cadence: Cadence;
  amount: number;               // numeric for math; render as $
  note?: string;                // e.g., "••4009"
  payer?: string;               // e.g., "Apple CC 2708"
  bucket?: "Personal" | "Work" | "Business" | "Utilities" | "Family";
  // Set either nextDueISO (YYYY-MM-DD) OR daysUntilDue to drive the progress bar.
  nextDueISO?: string;          // ISO date string for next renewal date
  cycleDays?: number;           // usually 30 for Monthly, 365 for Yearly (defaulted below)
  daysUntilDue?: number;        // convenience override (we’ll convert to nextDueISO at runtime)
};

// Helper: today (no time)
const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};
const fmtMoney = (n: number) =>
  `$${n.toLocaleString(undefined, { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;

const addDays = (d: Date, days: number) => {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + days);
  return copy;
};

// ---- YOUR 7 SUBSCRIPTIONS ----
const SUBS: Sub[] = [
  { name: "OpenAI", cadence: "Monthly", amount: 21.28, note: "••4009", bucket: "Business", daysUntilDue: 20 },
  { name: "iCloud+", cadence: "Monthly", amount: 3, payer: "Apple CC 2708", bucket: "Utilities" },
  { name: "Spotify Family", cadence: "Monthly", amount: 23, bucket: "Personal" },

  { name: "11labs", cadence: "Yearly", amount: 53.3, note: "per year", bucket: "Personal" },
  { name: "Bookmory", cadence: "Yearly", amount: 31, payer: "Apple CC 2708", bucket: "Personal" },
  { name: "Goodnotes", cadence: "Yearly", amount: 12, payer: "Apple CC 2708", bucket: "Work" },
  { name: "HeyGen AI", cadence: "Yearly", amount: 290, bucket: "Work" },
];

// Compute totals
const monthlyTotal = SUBS.filter(s => s.cadence === "Monthly").reduce((a, s) => a + s.amount, 0);
const yearlyTotal  = SUBS.filter(s => s.cadence === "Yearly").reduce((a, s) => a + s.amount, 0);

export default function Subscriptions() {
  // must unlock this tab via the vault page
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) !== "true") {
      window.location.replace("/vault");
    }
  }, []);

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

        {/* Summary tiles */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <StatTile label="Total Monthly" value={fmtMoney(monthlyTotal)} />
          <StatTile label="Total Yearly" value={fmtMoney(yearlyTotal)} />
          <StatTile label="Active Subscriptions" value={`${SUBS.length}`} />
        </div>

        {/* Grids: Monthly and Yearly shown together */}
        <Section title="Monthly">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SUBS.filter(s => s.cadence === "Monthly").map(s => (
              <SubCard key={s.name} sub={normalizeSub(s)} />
            ))}
          </div>
        </Section>

        <Section title="Yearly" className="mt-10">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SUBS.filter(s => s.cadence === "Yearly").map(s => (
              <SubCard key={s.name} sub={normalizeSub(s)} />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

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
  const {
    name, cadence, amount, note, payer, bucket, nextDueISO, cycleDays, daysLeft, percentElapsed
  } = sub;

  const dueText =
    daysLeft > 1 ? `Due in ${daysLeft} days`
    : daysLeft === 1 ? "Due in 1 day"
    : daysLeft === 0 ? "Due today"
    : `Overdue by ${Math.abs(daysLeft)} days`;

  return (
    <Card className="group relative overflow-hidden rounded-2xl border bg-white/90 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[.06]">
      {/* subtle mesh (no motion) */}
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
          {note && <div>{note}</div>}
          {payer && <div>{payer}</div>}
        </div>

        {bucket && (
          <div className="mt-3 inline-flex items-center rounded-full border px-2 py-0.5 text-xs text-slate-600 dark:text-slate-300 dark:border-white/10">
            {bucket}
          </div>
        )}

        {/* Progress to next renewal */}
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
                  background:
                    "linear-gradient(90deg, rgba(99,102,241,.95), rgba(16,185,129,.95))",
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

/* ---------- Data normalization ---------- */

// Convert daysUntilDue to a real date; default cycleDays; compute bar numbers.
function normalizeSub(s: Sub): Required<Sub> & { daysLeft: number; percentElapsed: number } {
  // default cycle length
  const cycleDays = s.cadence === "Monthly" ? (s.cycleDays ?? 30) : (s.cycleDays ?? 365);

  let nextDueISO = s.nextDueISO;
  if (!nextDueISO && typeof s.daysUntilDue === "number") {
    nextDueISO = addDays(today(), s.daysUntilDue).toISOString().slice(0, 10);
  }

  let daysLeft = 0;
  let percentElapsed = 0;

  if (nextDueISO) {
    const due = new Date(nextDueISO + "T00:00:00");
    const diff = Math.round((due.getTime() - today().getTime()) / (1000 * 60 * 60 * 24));
    daysLeft = diff;

    // elapsed = cycleDays - daysLeft (clamped)
    const elapsed = Math.max(0, Math.min(cycleDays, cycleDays - daysLeft));
    percentElapsed = (elapsed / cycleDays) * 100;
  }

  return {
    name: s.name,
    cadence: s.cadence,
    amount: s.amount,
    note: s.note ?? "",
    payer: s.payer ?? "",
    bucket: s.bucket ?? "Personal",
    nextDueISO: nextDueISO ?? "",
    cycleDays,
    daysUntilDue: s.daysUntilDue ?? 0,
    daysLeft,
    percentElapsed,
  };
}
