import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronDown, ChevronUp, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
      "A large review found that short bursts of exercise, five minutes or less, done two or more times a day, raised VO2 max by five to seventeen percent. Total weekly time ranged from five to sixty-five minutes. Most gains were in aerobic fitness and muscular endurance for middle-aged and older adults who were sedentary. Body fat, strength, and cholesterol did not change. Use five-minute blocks of brisk walking, stairs, squats, or fast cycles to improve heart and lung health if time is tight.",
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

// COPY TEXT PAYLOADS
const FIVE_MIN_PLAN = "5 min walk. 30 squats. 30 sec plank. 20 pushups. Log water.";
const DAILY_TARGETS = "Protein: bodyweight x 0.7 g. Water: 2 to 3 L. Steps: 7000 to 10000.";
const JP_SLEEP_CHECKLIST = `Japanese Sleep Playbook
- Set bedroom to 65°F, 18°C
- Warm bath or shower 90 minutes before bed
- Firm sleep surface for alignment
- Dim screens and bright lights after sunset
- Nap 20 to 30 minutes early afternoon
- Align meals and steps with daylight`;

export default function Workout() {
  const [collapsedCards, setCollapsedCards] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    setCollapsedCards((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: `${label} is ready to paste.` });
    } catch {
      toast({ title: "Copy failed", description: "Select and copy manually." });
    }
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

          {/* CLEAN COPY BUTTONS */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              onClick={() => handleCopy(FIVE_MIN_PLAN, "5 Minute Plan")}
              className="gap-2"
              aria-label="Copy 5 Minute Plan"
            >
              <Copy className="w-4 h-4" />
              Copy 5 Minute Plan
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleCopy(DAILY_TARGETS, "Daily Targets")}
              className="gap-2"
              aria-label="Copy Daily Targets"
            >
              <Copy className="w-4 h-4" />
              Copy Daily Targets
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleCopy(JP_SLEEP_CHECKLIST, "Japanese Sleep Checklist")}
              className="gap-2"
              aria-label="Copy Japanese Sleep Checklist"
            >
              <Copy className="w-4 h-4" />
              Copy Japanese Sleep Checklist
            </Button>
          </div>
        </header>

        <div className="space-y-6">
          {tips.map((tip) => {
            const isCollapsed = collapsedCards.has(tip.id);
            const bgClass =
              tip.variant === "success"
                ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-800/30"
                : "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-800/30";

            return (
              <Card key={tip.id} className={`rounded-xl p-6 shadow-md ${bgClass}`}>
                <div className="flex items-start gap-3 mb-0">
                  <CheckCircle2
                    className={`w-5 h-5 shrink-0 mt-0.5 ${
                      tip.variant === "success"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-blue-600 dark:text-blue-400"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-foreground mb-0">{tip.section}</h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCard(tip.id)}
                        className="shrink-0"
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
