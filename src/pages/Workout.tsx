import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronDown, ChevronUp, Moon } from "lucide-react";

type TipCard = {
  id: string;
  section: string;
  content: string;
  variant: "success" | "info";
};

const tips: TipCard[] = [
  {
    id: "exercise-snacks",
    section: "Exercise Snacks",
    content:
      "A large review found that short bursts of exercise, five minutes or less, done two or more times a day, raised VO2 max by five to seventeen percent. Total weekly time ranged from five to sixty five minutes. Most gains were in aerobic fitness and muscular endurance for middle aged and older adults who were sedentary. Body fat, strength, and cholesterol did not change. Use five minute blocks of brisk walking, stairs, squats, or fast cycles to improve heart and lung health if time is tight.",
    variant: "success",
  },
  {
    id: "gluten-worry",
    section: "Gluten Worry Check",
    content:
      "People who thought gluten triggered their IBS symptoms tried cereal bars in a blinded test. Some bars had gluten and some did not. Symptoms did not change between bars. True gluten intolerance exists, and some react to FODMAP carbs in wheat, but most do not need to avoid gluten. Unless you have celiac disease or a confirmed intolerance, bread is usually fine.",
    variant: "info",
  },
];

/* NEW CONTENT: Japanese Sleep Playbook */
const jpSummary =
  "Adults in Japan often sleep 6 to 6.5 hours. Life expectancy in 2025 is 87.1 for women and 81.1 for men, the highest in the world. Obesity is near 4 to 6 percent. The system favors recovery with cooler rooms, warm baths before bed, firm sleep surfaces, less evening light, and short daytime naps.";

const jpHabits: string[] = [
  "Cool the bedroom to about 65°F, 18°C",
  "Take a warm bath or shower 90 minutes before bed",
  "Use a firm sleep surface for spinal alignment",
  "Reduce bright and blue light at night",
  "Use a 20 to 30 minute nap in early afternoon when needed",
  "Align meals and walking with daylight hours",
];

const jpWhyItWorks: string[] = [
  "Thermoregulation helps the body start deep sleep faster",
  "Short naps restore alertness without hurting night sleep",
  "Movement and diet drive weight and metabolic health",
  "Culture supports brief rest without stigma",
];

export default function Workout() {
  const [collapsedCards, setCollapsedCards] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    setCollapsedCards((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/5 to-background">
      <Helmet>
        <title>Workout | Zain Adtani</title>
        <meta name="description" content="Daily tips and quick wins for energy and health" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <header className="mb-8">
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">Workout</h1>
            <div className="h-1 bg-primary rounded-full mt-2" />
          </div>
          <p className="text-lg text-muted-foreground mt-4">Daily tips and quick wins for energy and health</p>
        </header>

        {/* NEW SECTION: Japanese Sleep Playbook */}
        <section className="mb-8">
          <Card className="rounded-xl p-6 border bg-card/60">
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-lg bg-primary/10 p-2">
                <Moon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">Japanese Sleep Playbook</h2>
                <p className="mt-2 text-sm text-foreground/90">{jpSummary}</p>

                <div className="mt-5 grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground/80">How to apply it</h3>
                    <ul className="mt-2 space-y-2">
                      {jpHabits.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground/80">Why it works</h3>
                    <ul className="mt-2 space-y-2">
                      {jpWhyItWorks.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-5 text-xs text-muted-foreground">
                  Goal is quality, not more hours. Build an environment that restores you faster.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* EXISTING TIPS */}
        <div className="space-y-6">
          {tips.map((tip) => {
            const isCollapsed = collapsedCards.has(tip.id);
            const bgClass =
              tip.variant === "success"
                ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-800/30"
                : "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-800/30";

            return (
              <Card key={tip.id} className={`rounded-xl p-6 ${bgClass}`}>
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className={`w-5 h-5 mt-0.5 ${tip.variant === "success" ? "text-emerald-600" : "text-blue-600"}`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">{tip.section}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCard(tip.id)}
                        aria-label={isCollapsed ? "Expand" : "Collapse"}
                        aria-expanded={!isCollapsed}
                        aria-controls={`tip-${tip.id}`}
                      >
                        {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                      </Button>
                    </div>

                    <div
                      id={`tip-${tip.id}`}
                      className={`mt-3 overflow-hidden transition-all duration-300 ${
                        isCollapsed ? "max-h-0 opacity-0" : "max-h-96 opacity-100"
                      }`}
                    >
                      <p className="text-sm leading-relaxed text-foreground/90">{tip.content}</p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
