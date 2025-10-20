import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";
import SubscriptionsVault from "@/components/SubscriptionsVault";

/** ====== CONFIG ====== */
const VAULT_PIN = import.meta.env.VITE_SECRET_PIN || "2311";
const STORAGE_KEY = "vault_session";

/** ====== MAIN ====== */
export default function SecretVault() {
  const [pin, setPin] = useState("");
  const [granted, setGranted] = useState(false);
  const [error, setError] = useState("");

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
            <Lock className="w-5 h-5 text-[#3B82F6]" />
            <h1 className="text-2xl font-bold text-[#0F172A]">Secret Vault</h1>
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

      <main>
        <SubscriptionsVault />
      </main>
    </div>
  );
}
