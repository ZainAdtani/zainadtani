// src/pages/SecretVault.tsx
import { useEffect, useState } from "react";
import { Lock, KeyRound, Castle, CreditCard, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const STORAGE_KEY = "vault_session"; // session-only
const VAULT_PIN = import.meta.env.VITE_SECRET_PIN || "2311";

export default function SecretVault() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "true") {
      setUnlocked(true);
    }
  }, []);

  const handleUnlock = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (pin.trim() === VAULT_PIN) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setUnlocked(true);
    } else {
      setError("Wrong PIN. Try again.");
    }
  };

  if (unlocked) {
    return (
      <div className="min-h-screen w-full bg-slate-50 dark:bg-[#0b0e19] flex items-center justify-center px-4">
        <div className="w-full max-w-lg">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-white/40 bg-white/80 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
            <Castle className="h-7 w-7 text-indigo-600 dark:text-indigo-300" />
          </div>
          <h1 className="mb-6 text-center text-2xl font-semibold text-slate-900 dark:text-slate-100">Z's Secret Vault</h1>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              to="/vault/subscriptions"
              className="group rounded-2xl border p-6 shadow-sm backdrop-blur bg-white/90 border-white dark:bg-slate-900/70 dark:border-white/10 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <CreditCard className="mb-3 h-8 w-8 text-indigo-600 dark:text-indigo-300" />
              <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">Subscriptions</div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Track recurring costs and renewals.</p>
            </Link>
            <Link
              to="/vault/devices"
              className="group rounded-2xl border p-6 shadow-sm backdrop-blur bg-white/90 border-white dark:bg-slate-900/70 dark:border-white/10 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <Smartphone className="mb-3 h-8 w-8 text-indigo-600 dark:text-indigo-300" />
              <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">Devices</div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your gadgets and gear at a glance.</p>
            </Link>
          </div>
          <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
            Session-only lock (clears when you close the tab).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#0b0e19] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-white/40 bg-white/80 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
          <Castle className="h-7 w-7 text-indigo-600 dark:text-indigo-300" />
        </div>

        <div className="rounded-2xl border p-6 shadow-2xl backdrop-blur bg-white/90 border-white dark:bg-slate-900/70 dark:border-white/10">
          <div className="mb-2 flex items-center gap-2">
            <Lock className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Z's Secret Vault</h1>
          </div>
          <p className="mb-5 text-slate-600 dark:text-slate-300">Enter your PIN to access the vault.</p>

          <form onSubmit={handleUnlock} className="space-y-3">
            <Input
              autoFocus
              inputMode="numeric"
              pattern="[0-9]*"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError("");
              }}
              placeholder="••••"
              aria-label="Vault PIN"
              className="h-12 rounded-xl border-2 bg-slate-900 text-lg text-white placeholder:text-slate-400 focus-visible:ring-0 focus-visible:border-indigo-500 dark:bg-slate-800"
            />
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

            <Button type="submit" className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700">
              <KeyRound className="mr-2 h-4 w-4" />
              Unlock
            </Button>
          </form>

          <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
            Session-only lock (clears when you close the tab).
          </p>
        </div>
      </div>
    </div>
  );
}
