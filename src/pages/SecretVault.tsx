import React, { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, Moon } from "lucide-react";

/** ====== CONFIG ====== */
const VAULT_PIN = import.meta.env.VITE_SECRET_PIN || "2311";
const STORAGE_KEY = "vault_session"; // session-only
const SUBS_KEY = "vault_subscriptions_v1";

/** ====== STARTER DATA (loaded once if none exists) ====== */
const SEED = [
  { name: "Spotify Duo", amount: "$18.39 / month", method: "AMEX ••31034", cadence: "Monthly", category: "Personal" },
  { name: "Spotify Family", amount: "$23 / month", method: "AMEX ••31034", cadence: "Monthly", category: "Personal" }, // NEW
  { name: "Bookmory", amount: "$31 / year", method: "Apple CC ••2708", cadence: "Yearly", category: "Work" },
  { name: "Goodnotes", amount: "$12 / year", method: "Apple CC ••2708", cadence: "Yearly", category: "Work" },
  { name: "iCloud+", amount: "$3 / month", method: "Apple CC ••2708", cadence: "Monthly", category: "Work" },
  { name: "Gym (EFLC)", amount: "$__/ month", method: "AMEX ••31034", cadence: "Monthly", category: "Fitness" },
  {
    name: "Mahek Pilates",
    amount: "$199 / month (2 classes/wk • 3 months)",
    method: "",
    cadence: "Monthly",
    category: "Fitness",
  },
  { name: "ChatGPT", amount: "$20 / month", method: "", cadence: "Monthly", category: "Work" },
  { name: "HeyGen AI", amount: "$290 / year", method: "", cadence: "Yearly", category: "Work" }, // NEW
  { name: "Gamma AI", amount: "—", method: "", cadence: "Unknown", category: "Work" },
  {
    name: "City of Euless Water/Trash",
    amount: "$100–110 / month (avg.)",
    method: "",
    cadence: "Monthly",
    category: "Utilities",
  },
  {
    name: "Atmos Energy (Gas)",
    amount: "$60–70 / month (avg.)",
    method: "",
    cadence: "Monthly",
    category: "Utilities",
  },
];

/** ====== UTILS ====== */
// Turn "$12 / year" or "$60–70 / month" into a monthly number (or null if unknown)
function toMonthly(value: string): number | null {
  if (!value) return null;
  if (value.includes("$__/") || value.includes("—")) return null;

  const range = value.match(/\$([\d.]+)[–-]([\d.]+)/);
  const single = value.match(/\$([\d.]+)/);

  const perYear = /\/\s*year/i.test(value);
  const perMonth = /\/\s*month/i.test(value);

  let amt: number | null = null;

  if (range && (perMonth || perYear)) {
    const a = parseFloat(range[1]);
    const b = parseFloat(range[2]);
    amt = (a + b) / 2;
  } else if (single) {
    amt = parseFloat(single[1]);
  }

  if (amt == null || Number.isNaN(amt)) return null;
  if (perYear) return amt / 12;
  if (perMonth) return amt;
  return null;
}

function currency(n: number): string {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

// Subtle tilt (kept gentle to avoid motion fatigue)
function useTilt(max = 6) {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setStyle({
      transform: `perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(0)`,
    });
  };
  const onLeave = () => setStyle({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)" });
  return { style, onMouseMove: onMove, onMouseLeave: onLeave };
}

/** ====== MAIN ====== */
export default function VaultSubscriptionsOnly() {
  const [pin, setPin] = useState("");
  const [granted, setGranted] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState<"Monthly" | "Yearly">("Monthly");
  const [query, setQuery] = useState("");

  // Load / seed subs
  const [subs, setSubs] = useState(() => {
    const raw = localStorage.getItem(SUBS_KEY);
    if (raw) return JSON.parse(raw);
    localStorage.setItem(SUBS_KEY, JSON.stringify(SEED));
    return SEED;
  });

  // Session gate + auto-lock on leave
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) === "true";
    setGranted(stored);
    const onLeave = () => localStorage.removeItem(STORAGE_KEY);
    window.addEventListener("beforeunload", onLeave);
    const onHide = () => document.hidden && onLeave();
    document.addEventListener("visibilitychange", onHide);
    return () => {
      onLeave();
      window.removeEventListener("beforeunload", onLeave);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, []);

  const unlock = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (pin.trim() === VAULT_PIN) {
      localStorage.setItem(STORAGE_KEY, "true");
      setGranted(true);
      setError("");
    } else {
      setError("Incorrect PIN. Try again.");
    }
  };
  const lock = () => {
    localStorage.removeItem(STORAGE_KEY);
    setGranted(false);
    setPin("");
  };

  // Filter + totals
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return subs;
    return subs.filter((s: any) =>
      [s.name, s.amount, s.method, s.category, s.cadence]
        .filter(Boolean)
        .some((v: string) => v.toLowerCase().includes(q)),
    );
  }, [subs, query]);

  const { mTotal, yTotal } = useMemo(() => {
    const m = filtered
      .map((s: any) => toMonthly(s.amount))
      .filter((n: number | null): n is number => n != null)
      .reduce((a: number, b: number) => a + b, 0);
    return { mTotal: m, yTotal: m * 12 };
  }, [filtered]);

  /** ====== LOCK SCREEN (LIGHT THEME) ====== */
  if (!granted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(180deg,#ECF5FF, #F7FBFF)" }}
      >
        <Card className="max-w-md w-full p-8 border border-[#CFE6FF] bg-white/90 backdrop-blur rounded-2xl shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-[#3B82F6]" />
            <h1 className="text-2xl font-bold text-[#0F172A]">Z's Secret Vault</h1>
          </div>
          <p className="text-sm text-[#334155] mb-4">Enter your PIN to access subscriptions.</p>
          <form onSubmit={unlock} className="space-y-3">
            <Input
              type="password"
              inputMode="numeric"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              aria-label="Vault PIN"
              className="h-12"
            />
            <Button type="submit" className="w-full h-12">
              Unlock
            </Button>
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </form>
        </Card>
      </div>
    );
  }

  /** ====== PAGE (LIGHT BABY-BLUE THEME) ====== */
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(180deg,#ECF5FF 0%, #F7FBFF 60%, #FFFFFF 100%)" }}
    >
      {/* soft baby-blue blobs */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 400px at 15% 0%, rgba(59,130,246,0.10), transparent), radial-gradient(800px 500px at 95% 15%, rgba(16,163,127,0.10), transparent)",
        }}
      />
      <header className="py-8 border-b border-[#D9ECFF]/70 bg-white/60 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-[#3B82F6]" />
            <h1 className="text-2xl font-bold text-[#0F172A]">Subscriptions</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm underline text-[#1E293B]">
              Home
            </a>
            <Button variant="outline" onClick={lock}>
              <Unlock className="w-4 h-4 mr-2" /> Lock
            </Button>
          </div>
        </div>
      </header>

      <main className="py-10">
        <div className="container mx-auto px-4 max-w-6xl space-y-8">
          {/* Summary Bar */}
          <Card className="p-6 md:p-8 bg-white/80 border border-[#CFE6FF] rounded-2xl shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="text-sm text-[#475569]">Total ({view})</div>
                <div className="text-4xl font-extrabold tracking-tight text-[#0F172A]">
                  {view === "Monthly" ? currency(mTotal) : currency(yTotal)}
                </div>
                <div className="text-xs text-[#64748B] mt-1">
                  {filtered.length} subscriptions • {currency(mTotal)} / mo • {currency(yTotal)} / yr
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Search subscriptions…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-56 md:w-72 bg-white"
                />
                <div className="inline-flex rounded-lg overflow-hidden border border-[#CFE6FF] bg-white">
                  <button
                    onClick={() => setView("Monthly")}
                    className={`px-4 py-2 text-sm ${view === "Monthly" ? "bg-[#E6F1FF] text-[#0F172A] font-semibold" : "text-[#334155]"}`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setView("Yearly")}
                    className={`px-4 py-2 text-sm ${view === "Yearly" ? "bg-[#E6F1FF] text-[#0F172A] font-semibold" : "text-[#334155]"}`}
                  >
                    Yearly
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Grid – airy spacing, clearer contrast */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((s: any, i: number) => (
              <SubscriptionCard key={i} sub={s} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

/** ====== CARD (LIGHT 3D) ====== */
function SubscriptionCard({ sub }: { sub: any }) {
  const tilt = useTilt(6);
  const isActive = toMonthly(sub.amount) != null;

  return (
    <div {...tilt} className="relative group rounded-2xl" style={{ willChange: "transform" }}>
      {/* Glow ring on hover */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#BFE0FF]/40 to-[#C7F3E8]/40 blur-xl opacity-0 group-hover:opacity-100 transition" />
      <Card className="relative z-10 rounded-2xl p-6 bg-white border border-[#CFE6FF] shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-lg font-semibold text-[#0F172A]">{sub.name}</div>
            <div className="text-xs mt-1 text-[#667085]">
              {sub.cadence || "Unknown"} • {sub.category || "—"}
            </div>
          </div>
          <span
            className={`text-[11px] px-2 py-1 rounded-full border ${
              isActive ? "border-[#93C5FD] bg-[#E6F1FF] text-[#0F172A]" : "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]"
            }`}
          >
            {isActive ? "Active" : "Unknown"}
          </span>
        </div>

        <div className="mt-4 text-sm text-[#0F172A]">{sub.amount}</div>
        {sub.method && <div className="text-xs text-[#64748B] mt-1">{sub.method}</div>}

        {/* divider + tiny sparkline */}
        <div className="mt-5 border-t border-[#EEF6FF]" />
        <div className="mt-4 h-10 w-full opacity-70 text-[#93C5FD]">
          <svg viewBox="0 0 120 40" className="w-full h-full">
            <polyline
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.6"
              strokeWidth="2"
              points="0,30 15,28 30,34 45,22 60,26 75,18 90,24 105,16 120,20"
            />
          </svg>
        </div>
      </Card>
    </div>
  );
}

/* Notes:
   - Lighter “baby blue” theme with high readability.
   - Wider gaps (gap-8), bigger type, and clear borders for separation.
   - Client-side PIN is for casual privacy only.
   - Seed now includes Spotify Family $23/mo and HeyGen AI $290/year.
*/
