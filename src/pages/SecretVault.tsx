// src/pages/SecretVault.tsx
import { useEffect, useState } from "react";
import { Lock, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STORAGE_KEY = "vault_session";
const VAULT_PIN = import.meta.env.VITE_SECRET_PIN || "2311";

export default function SecretVault() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") {
      window.location.href = "/vault/subscriptions";
    }
  }, []);

  const handleUnlock = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (pin.trim() === VAULT_PIN) {
      localStorage.setItem(STORAGE_KEY, "true");
      window.location.href = "/vault/subscriptions";
    } else {
      setError("Wrong incantation… try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(10,12,16,0.75), rgba(10,12,16,0.75)),
          repeating-linear-gradient(0deg,#c9d6e4 0px,#c9d6e4 22px,#d7e2ee 22px,#d7e2ee 44px),
          repeating-linear-gradient(90deg,#c9d6e4 0px,#c9d6e4 44px,#d7e2ee 44px,#d7e2ee 88px)
        `,
        backgroundSize: "cover, 100% 44px, 88px 100%",
        backgroundBlendMode: "multiply, normal, normal",
      }}
    >
      <div className="relative w-full max-w-xl">
        <div
          className="mx-auto px-6 pt-10 pb-8 rounded-3xl shadow-2xl border
                     bg-[rgba(255,255,255,0.85)] border-white/70 backdrop-blur-md"
          style={{ clipPath: "path('M20,220 Q220,-20 420,220 L420,380 L20,380 Z')" }}
        >
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <Lock className="w-6 h-6 text-[#3d5a98]" />
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Z’s Secret Vault</h1>
            </div>
            <p className="text-slate-600 mb-6">Whisper your PIN to open the vault.</p>

            <form onSubmit={handleUnlock} className="space-y-4">
              <Input
                inputMode="numeric"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="····"
                className="h-14 text-lg bg-slate-900 text-white border-2 border-[#7aa2ff]
                           focus-visible:ring-0 focus-visible:border-[#4e7aff] rounded-xl"
              />
              {error && <p className="text-sm text-red-600 -mt-2">{error}</p>}
              <Button
                type="submit"
                className="w-full h-12 text-base rounded-xl bg-[#4e7aff] hover:bg-[#3f6ff5] 
                           active:translate-y-[1px] shadow-[0_8px_20px_rgba(78,122,255,.35)]"
              >
                <KeyRound className="w-4 h-4 mr-2" />
                Unlock
              </Button>
            </form>
          </div>
        </div>

        {/* Brass rim */}
        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          <div
            className="w-[520px] h-[520px] rounded-full border-[10px] border-amber-600/80
                          shadow-[0_0_0_8px_rgba(255,255,255,.25)_inset] opacity-70"
          />
        </div>
      </div>
    </div>
  );
}
