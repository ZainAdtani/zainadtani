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
      setError("Wrong incantation… try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 overflow-x-hidden"
      /* soft sky + baby blue */
      style={{
        background:
          "radial-gradient(60% 60% at 50% 0%, rgba(154,189,255,.35), transparent 60%), linear-gradient(#eaf3ff, #dfefff)",
      }}
    >
      {/* distant castle silhouette */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
        <div
          className="absolute inset-x-0 top-[8%] mx-auto h-40 max-w-5xl"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 35%, rgba(60,80,120,.25)), repeating-linear-gradient(90deg, rgba(80,100,150,.35) 0 10px, rgba(80,100,150,.15) 10px 20px)",
            mask: "radial-gradient(120% 80% at 50% 0%, #000 60%, transparent 61%)",
            borderBottomLeftRadius: 9999,
            borderBottomRightRadius: 9999,
          }}
        />
      </div>

      {/* gate */}
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl ring-1 ring-black/5">
          {/* turrets header */}
          <div
            className="relative h-16 rounded-t-2xl"
            style={{
              background: "repeating-linear-gradient(90deg,#c7d4ee 0 36px,#b8c6e3 36px 72px)",
            }}
          >
            {/* merlons */}
            <div className="absolute -top-3 left-3 right-3 flex gap-3">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="h-6 flex-1 rounded-md bg-[#9fb6e8]" />
              ))}
            </div>
          </div>

          <div className="px-6 pt-5 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <Castle className="w-6 h-6 text-[#3d5a98]" />
              <h1 className="text-2xl font-extrabold text-slate-900">Z’s Secret Vault</h1>
            </div>
            <p className="text-slate-600 mb-5">Enter your PIN to pass the gate.</p>

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
      </div>
    </div>
  );
}
