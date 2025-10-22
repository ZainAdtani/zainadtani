// src/pages/vault/Subscriptions.tsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "vault_session";

type Sub = {
  name: string;
  cadence: "Monthly" | "Yearly";
  amount: string; // display-ready, e.g. "$53.30"
  note?: string; // e.g. "••4009 • renews in 20 days"
  bucket?: "Personal" | "Work" | "Family" | "Business";
};

const subs: Sub[] = [
  // === Your new ones ===
  { name: "11labs", cadence: "Yearly", amount: "$53.30", note: "per year", bucket: "Personal" },
  { name: "OpenAI", cadence: "Monthly", amount: "$21.28", note: "••4009 • renews in 20 days", bucket: "Business" },

  // Optional (uncomment if you want them visible now)
  // { name: "Spotify Family", cadence: "Monthly", amount: "$23.00", bucket: "Family" },
  // { name: "HeyGen AI", cadence: "Yearly", amount: "$290.00", bucket: "Business" },
];

export default function Subscriptions() {
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) !== "true") {
      window.location.replace("/vault");
    }
  }, []);

  const monthlyTotal = subs
    .filter((s) => s.cadence === "Monthly")
    .map((s) => Number(s.amount.replace(/[^0-9.]/g, "")))
    .reduce((a, b) => a + b, 0);

  const yearlyTotal = subs
    .filter((s) => s.cadence === "Yearly")
    .map((s) => Number(s.amount.replace(/[^0-9.]/g, "")))
    .reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#090c15] text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Subscriptions</h1>
          <div className="flex items-center gap-3 text-sm">
            <Link
              to="/vault"
              className="underline text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              Back to Vault
            </Link>
            <Link
              to="/"
              className="underline text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              Home
            </Link>
          </div>
        </div>

        {/* Summary bar (static, no animation) */}
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-white/90 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/60">
            <div className="text-sm text-slate-500 dark:text-slate-400">Total Monthly (shown)</div>
            <div className="mt-1 text-3xl font-semibold">${monthlyTotal.toFixed(2)}</div>
          </div>
          <div className="rounded-2xl border bg-white/90 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/60">
            <div className="text-sm text-slate-500 dark:text-slate-400">Total Yearly</div>
            <div className="mt-1 text-3xl font-semibold">${yearlyTotal.toFixed(2)}</div>
          </div>
          <div className="rounded-2xl border bg-white/90 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/60">
            <div className="text-sm text-slate-500 dark:text-slate-400">Active Subscriptions</div>
            <div className="mt-1 text-3xl font-semibold">{subs.length}</div>
          </div>
        </div>

        {/* Filters row (non-interactive placeholders to keep the look simple) */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <input
            placeholder="Search subscriptions…"
            className="h-10 w-full max-w-xs rounded-xl border bg-white/80 px-3 text-sm shadow-sm focus:outline-none dark:border-white/10 dark:bg-slate-900/60"
          />
          <Button variant="secondary" className="rounded-xl">
            + Add Subscription
          </Button>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subs.map((s) => (
            <Card
              key={s.name}
              className="rounded-2xl border bg-white/90 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/60"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{s.name}</CardTitle>
                  <Badge variant="secondary" className="rounded-full">
                    {s.cadence}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">{s.amount}</div>
                {s.note && <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.note}</div>}
                {s.bucket && (
                  <div className="mt-3 inline-flex items-center text-xs text-slate-600 dark:text-slate-300">
                    {s.bucket}
                  </div>
                )}

                <div className="mt-4 flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                  <button className="underline">Edit</button>
                  <button className="underline">Pause</button>
                  <button className="underline text-red-500">Delete</button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
