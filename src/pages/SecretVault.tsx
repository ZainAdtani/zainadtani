import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";

// Set the PIN via env var if available; fallback to a default you can change.
const VAULT_PIN = import.meta.env.VITE_SECRET_PIN || "2311";
const STORAGE_KEY = "vault_session"; // session-only

export default function SecretVault() {
  const [pin, setPin] = useState("");
  const [granted, setGranted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Auto-lock when leaving page
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

  if (!granted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8 border-2">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold">Z's Secret Vault</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Enter your PIN to access the vault.
          </p>
          <form onSubmit={unlock} className="space-y-3">
            <Input
              type="password"
              inputMode="numeric"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              aria-label="Secret vault PIN"
              className="h-12"
            />
            <Button type="submit" className="w-full h-12">Unlock</Button>
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </form>
        </Card>
      </div>
    );
  }

  // CONTENT VISIBLE *ONLY* AFTER PIN IS CORRECT
  return (
    <div className="min-h-screen bg-background">
      <header className="py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Unlock className="w-5 h-5 text-primary" />
              <h1 className="text-3xl font-bold">Z's Secret Vault</h1>
            </div>
            <div className="flex items-center gap-2">
              <a href="/" className="text-sm underline" aria-label="Back to home">← Home</a>
              <Button variant="outline" onClick={lock}>Lock</Button>
            </div>
          </div>
          <p className="text-muted-foreground mt-2">
            Private notes, WIP links, prototype drops — your eyes only.
          </p>
        </div>
      </header>

      <main className="pb-24">
        <div className="container mx-auto px-4 max-w-4xl space-y-6">
          <Card className="p-6 border-2">
            <h2 className="font-semibold text-xl mb-2">Quick Links</h2>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Draft sales pages</li>
              <li>Alpha product files</li>
              <li>Private notes</li>
            </ul>
          </Card>

          <Card className="p-6 border-2">
            <h2 className="font-semibold text-xl mb-2">Notes</h2>
            <p className="text-sm text-muted-foreground">
              Drop anything here — roadmaps, pricing experiments, etc.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}

/* Note: This is client-side gating. It hides content from casual users,
but it's not true security. For real protection, use a server check. */
