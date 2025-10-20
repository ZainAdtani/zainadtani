import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

type Cycle = "Monthly" | "Yearly";
type Category = "Entertainment" | "General" | "Tools";

type Sub = {
  id: string;
  name: string;
  price: number; // in USD
  cycle: Cycle;
  nextPayment: string; // e.g., "2025-12-10"
  category: Category;
  note?: string;
};

const SUBS: Sub[] = [
  { id: "netflix", name: "Netflix", price: 14.99, cycle: "Monthly", nextPayment: "2025-12-10", category: "Entertainment" },
  { id: "spotify", name: "Spotify Family", price: 23, cycle: "Monthly", nextPayment: "2025-12-14", category: "Entertainment", note: "6 accounts" },
  { id: "1password", name: "1Password", price: 99.99, cycle: "Yearly", nextPayment: "2026-10-14", category: "General" },
  { id: "heygen", name: "HeyGen AI", price: 290, cycle: "Yearly", nextPayment: "2026-09-01", category: "Tools" },
];

function toMonthlyAmount(s: Sub) {
  return s.cycle === "Monthly" ? s.price : s.price / 12;
}
function toDailyAmount(s: Sub) {
  // simple 365-day spread; good enough for overview
  return (s.cycle === "Monthly" ? s.price * 12 : s.price) / 365;
}
function currency(n: number) {
  return `${n.toFixed(2)} US$`;
}

export default function SubscriptionsVault() {
  const monthlyTotal = SUBS.reduce((sum, s) => sum + toMonthlyAmount(s), 0);
  const yearlyTotal  = SUBS.reduce((sum, s) => sum + (s.cycle === "Monthly" ? s.price * 12 : s.price), 0);
  const dailyTotal   = SUBS.reduce((sum, s) => sum + toDailyAmount(s), 0);
  const weeklyTotal  = dailyTotal * 7;

  const byCategory = SUBS.reduce<Record<Category, number>>((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + (s.cycle === "Monthly" ? s.price : s.price / 12);
    return acc;
  }, { Entertainment: 0, General: 0, Tools: 0 });

  const catTotal = Object.values(byCategory).reduce((a, b) => a + b, 0) || 1;
  const catPct = {
    Entertainment: Math.round((byCategory.Entertainment / catTotal) * 100),
    General: Math.round((byCategory.General / catTotal) * 100),
    Tools: Math.round((byCategory.Tools / catTotal) * 100),
  };

  return (
    <section
      className="py-10 px-4"
      aria-label="Subscriptions Overview"
    >
      <div className="mx-auto max-w-6xl rounded-3xl p-6 md:p-10 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 border border-blue-100">
        <h2 className="text-3xl font-bold mb-6">Overview</h2>

        {/* Summary tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Daily",   value: currency(dailyTotal) },
            { label: "Weekly",  value: currency(weeklyTotal) },
            { label: "Monthly", value: currency(monthlyTotal) },
            { label: "Yearly",  value: currency(yearlyTotal) },
          ].map((t) => (
            <Card key={t.label} className="p-4 shadow-sm">
              <div className="text-sm text-muted-foreground">{t.label}</div>
              <div className="text-2xl font-semibold mt-1">{t.value}</div>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {/* Upcoming Payments */}
          <Card className="p-5 md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Upcoming Payments</h3>
              <Button variant="ghost" size="sm" className="gap-2">
                <CalendarDays className="w-4 h-4" /> More
              </Button>
            </div>

            <div className="space-y-3">
              {SUBS
                .slice() // copy
                .sort((a, b) => a.nextPayment.localeCompare(b.nextPayment))
                .map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between rounded-xl border p-3 bg-white/70"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">
                        {s.name[0]}
                      </div>
                      <div>
                        <div className="font-medium">{s.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(s.nextPayment).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold">{currency(s.price)}</div>
                      <div className="text-xs text-muted-foreground">{s.cycle}</div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>

          {/* Categories */}
          <Card className="p-5">
            <h3 className="font-semibold text-lg mb-4">Categories</h3>

            {/* simple stacked bar */}
            <div className="w-full h-4 rounded-full overflow-hidden bg-blue-100 mb-3 flex">
              <div
                className="h-full bg-orange-400/80"
                style={{ width: `${catPct.Entertainment}%` }}
                title={`Entertainment ${catPct.Entertainment}%`}
              />
              <div
                className="h-full bg-purple-400/80"
                style={{ width: `${catPct.General}%` }}
                title={`General ${catPct.General}%`}
              />
              <div
                className="h-full bg-green-400/80"
                style={{ width: `${catPct.Tools}%` }}
                title={`Tools ${catPct.Tools}%`}
              />
            </div>

            <div className="flex gap-3 flex-wrap text-sm">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                Entertainment {catPct.Entertainment}%
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                General {catPct.General}%
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Tools {catPct.Tools}%
              </Badge>
            </div>
          </Card>
        </div>

        {/* All Subscriptions */}
        <div className="mt-8">
          <h3 className="font-semibold text-lg mb-3">All Subscriptions</h3>
          <div className="space-y-3">
            {SUBS.map((s) => (
              <Card key={s.id} className="p-4 flex items-center justify-between bg-white/80">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">
                    {s.name[0]}
                  </div>
                  <div>
                    <div className="font-medium">{s.name}</div>
                    <div className="text-xs text-muted-foreground">
                      From {new Date(s.nextPayment).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                      {s.note ? ` • ${s.note}` : ""}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold">{currency(s.price)}</div>
                  <div className="text-xs text-muted-foreground">{s.cycle}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
