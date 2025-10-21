// src/pages/SecretVault.tsx
import { useEffect, useState } from "react";
import { Lock, KeyRound, Castle } from "lucide-react";
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
      setError("Wrong PIN. Try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        // soft baby-blue with subtle “bricks”
        backgroundImage: `
          linear-gradient(0deg, rgba(240,246,255,0.9), rgba(240,246,255,0.9)),
          repeating-linear-gradient(0deg, #dfeaf7 0px, #dfeaf7 22px, #e9f1fb 22px, #e9f1fb 44px),
          repeating-linear-gradient(90deg, #dfeaf7 0px, #dfeaf7 44px, #e9f1fb 44px, #e9f1fb 88px)
        `,
        backgroundSize: "cover, 100% 44px, 88px 100%",
      }}
    >
      <div className="w-full max-w-md">
        {/* Tiny castle topper */}
        <div className="mx-auto mb-3 w-14 h-14 rounded-2xl bg-white/80 border border-white shadow-sm grid place-items-center">
          <Castle className="w-7 h-7 text-blue-600" />
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white p-6">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-900">Z’s Secret Vault</h1>
          </div>
          <p className="text-slate-600 mb-5">Enter your PIN to access subscriptions.</p>

          <form onSubmit={handleUnlock} className="space-y-3">
            <Input
              inputMode="numeric"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••"
              className="h-12 text-lg bg-slate-900 text-white border-2 border-blue-300 focus-visible:ring-0 focus-visible:border-blue-500 rounded-xl"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full h-11 rounded-xl bg-blue-500 hover:bg-blue-600">
              <KeyRound className="w-4 h-4 mr-2" />
              Unlock
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
