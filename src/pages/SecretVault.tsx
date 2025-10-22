// src/pages/SecretVault.tsx
import { useEffect, useState } from "react";
import { Lock, KeyRound, Castle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STORAGE_KEY = "vault_session"; // session-only
const VAULT_PIN = import.meta.env.VITE_SECRET_PIN || "2311";

export default function SecretVault() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  // If already unlocked this browser session, go straight in.
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "true") {
      window.location.replace("/vault/subscriptions");
    }
  }, []);

  const handleUnlock = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (pin.trim() === VAULT_PIN) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      window.location.replace("/vault/subscriptions");
    } else {
      setError("Wrong PIN. Try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#0b0e19] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* small topper */}
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-white/40 bg-white/80 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
          <Castle className="h-7 w-7 text-indigo-600 dark:text-indigo-300" />
        </div>

        <div className="rounded-2xl border p-6 shadow-2xl backdrop-blur bg-white/90 border-white dark:bg-slate-900/70 dark:border-white/10">
          <div className="mb-2 flex items-center gap-2">
            <Lock className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Z’s Secret Vault</h1>
          </div>
          <p className="mb-5 text-slate-600 dark:text-slate-300">Enter your PIN to access subscriptions.</p>

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
