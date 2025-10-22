// src/pages/SecretVault.tsx
import { useEffect, useState } from "react";
import { Lock, KeyRound, Castle, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STORAGE_KEY = "vault_session";
const VAULT_PIN = import.meta.env.VITE_SECRET_PIN || "2311";

export default function SecretVault() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") {
      window.location.href = "/vault/subscriptions";
    }
  }, []);

  const handleUnlock = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (pin.trim() === VAULT_PIN) {
      setError("");
      setUnlocking(true);
      setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, "true");
        window.location.href = "/vault/subscriptions";
      }, 1000); // let the dial spin for a sec
    } else {
      setError("Wrong PIN. Try again.");
      setUnlocking(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Sky gradient that adapts to theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-slate-100 to-indigo-50 dark:from-[#0b1020] dark:via-[#0b0e19] dark:to-[#0a0a16]" />

      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_40%_at_50%_40%,rgba(0,0,0,0.06),transparent_70%)] dark:[background:radial-gradient(60%_40%_at_50%_40%,rgba(0,0,0,0.4),transparent_70%)]" />

      {/* Tiny twinkling stars (Harry Potter night sky vibe) */}
      <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen">
        <div className="absolute inset-0 animate-[twinkle_6s_linear_infinite] [background-image:radial-gradient(2px_2px_at_20%_30%,rgba(255,255,255,0.8),transparent),radial-gradient(1px_1px_at_70%_60%,rgba(255,255,255,0.7),transparent),radial-gradient(2px_2px_at_40%_80%,rgba(255,255,255,0.6),transparent)]" />
      </div>

      {/* Floating sparkles */}
      <Sparkles className="pointer-events-none absolute left-6 top-6 h-5 w-5 text-indigo-400 opacity-60 animate-[float_6s_ease-in-out_infinite]" />
      <Wand2 className="pointer-events-none absolute right-8 bottom-8 h-6 w-6 text-amber-400 opacity-60 animate-[float_7s_ease-in-out_infinite]" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Castle topper coin */}
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl border border-white/30 bg-white/70 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
            <Castle className="h-8 w-8 text-indigo-600 dark:text-indigo-300" />
          </div>

          {/* Vault card */}
          <div
            className={[
              "rounded-2xl border p-6 shadow-2xl backdrop-blur",
              "bg-white/85 border-white/50 dark:bg-slate-900/60 dark:border-white/10",
              error ? "animate-[shake_240ms_ease-in-out]" : "",
            ].join(" ")}
          >
            <div className="mb-2 flex items-center gap-2">
              <Lock className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Z’s Enchanted Vault</h1>
            </div>
            <p className="mb-5 text-slate-600 dark:text-slate-300">Whisper your PIN to open the runic lock.</p>

            {/* Vault dial */}
            <div className="mx-auto mb-5 grid h-28 w-28 place-items-center rounded-full border border-white/50 bg-white/60 shadow-md backdrop-blur dark:border-white/10 dark:bg-slate-800/70">
              <div
                className={[
                  "relative grid h-20 w-20 place-items-center rounded-full",
                  "bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800",
                  "border border-slate-300/50 dark:border-slate-600/50",
                  unlocking ? "animate-[rotateDial_1s_ease-in-out]" : "animate-none",
                ].join(" ")}
              >
                {/* dial markers */}
                {[...Array(12)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute h-2 w-[2px] bg-slate-500/70 dark:bg-slate-300/70"
                    style={{ transform: `rotate(${i * 30}deg) translateY(-34px)` }}
                  />
                ))}
                <span className="absolute -top-2 h-3 w-[2px] rounded bg-amber-500 shadow-[0_0_12px_rgba(245,197,24,0.8)]" />
              </div>
            </div>

            <form onSubmit={handleUnlock} className="space-y-3">
              <Input
                inputMode="numeric"
                pattern="[0-9]*"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                aria-label="Vault PIN"
                className="h-12 rounded-xl border-2 bg-slate-900 text-lg text-white placeholder:text-slate-400 focus-visible:ring-0 focus-visible:border-indigo-500 dark:bg-slate-800"
                onFocus={() => setError("")}
              />
              {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

              <Button
                type="submit"
                className="group relative w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-0"
              >
                <KeyRound className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                {unlocking ? "Opening..." : "Unlock"}
                <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur transition-opacity group-hover:opacity-100 [box-shadow:0_0_24px_6px_rgba(99,102,241,0.45)]" />
              </Button>
            </form>

            <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
              Tip: PIN is stored locally; this is a friendly lock, not bank-grade security.
            </p>
          </div>
        </div>
      </div>

      {/* Page-specific animations */}
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0) }
          50% { transform: translateY(-6px) }
        }
        @keyframes twinkle {
          0% { opacity: .4 }
          50% { opacity: .9 }
          100% { opacity: .4 }
        }
        @keyframes rotateDial {
          0%   { transform: rotate(0deg) }
          30%  { transform: rotate(90deg) }
          60%  { transform: rotate(-40deg) }
          100% { transform: rotate(0deg) }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0) }
          20% { transform: translateX(-6px) }
          40% { transform: translateX(6px) }
          60% { transform: translateX(-4px) }
          80% { transform: translateX(4px) }
        }
      `}</style>
    </div>
  );
}
