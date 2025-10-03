import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Moon, ArrowLeft } from "lucide-react";

const STORAGE_KEY = "vault_session"; // must match SecretVault

const rows = [
  ["Spotify Duo", "$18.39 / month", "AMEX ••31034"],
  ["Bookmory", "$31 / year", "Apple CC ••2708"],
  ["Goodnotes", "$12 / year", "Apple CC ••2708"],
  ["iCloud+", "$3 / month", "Apple CC ••2708"],
  ["Gym (EFLC)", "$__/ month", "AMEX ••31034"],
  ["Mahek Pilates", "$199 / month (2 classes/wk • 3 months)", ""],
  ["ChatGPT", "$20 / month", ""],
  ["Gamma AI", "—", ""],
  ["City of Euless Water/Trash", "$100–110 / month (avg.)", ""],
  ["Atmos Energy (Gas)", "$60–70 / month (avg.)", ""],
];

export default function VaultSubscriptions() {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem(STORAGE_KEY) === "true";
    setAuthorized(isAuth);
    if (!isAuth) {
      window.location.href = "/vault";
    }
  }, []);

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#E6EAF2]">
      <header className="py-8 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-5xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-[#8AB4F8]" />
            <h1 className="text-2xl font-bold">Subscriptions</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/vault" className="text-sm underline flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to Vault
            </a>
            <a href="/" className="text-sm underline">Home</a>
          </div>
        </div>
      </header>

      <main className="py-10">
        <div className="container mx-auto px-4 max-w-5xl space-y-6">
          <Card className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 text-sm font-semibold text-white/80 pb-3 border-b border-white/10">
              <div>Name</div>
              <div>Amount</div>
              <div>Payment Method / Notes</div>
            </div>
            <div className="divide-y divide-white/10">
              {rows.map((r, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-3 text-sm py-3">
                  <div className="font-medium">{r[0]}</div>
                  <div className="text-white/80">{r[1]}</div>
                  <div className="text-white/60">{r[2]}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <h2 className="font-semibold mb-2">Notes</h2>
            <p className="text-white/70 text-sm">Update EFLC amount when billed; confirm GammaAI plan.</p>
          </Card>
        </div>
      </main>
    </div>
  );
}
