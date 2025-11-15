import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronDown, ChevronUp, Moon } from "lucide-react";

type TipCard = {
  id: string;
  section: string;
  intro: string;
  bullets: string[];
  variant: "success" | "info";
};

const tips: TipCard[] = [
  {
    id: "exercise-snacks",
    section: "Exercise Snacks",
    intro: "Short bursts of movement, even five minutes, improve heart and lung fitness for busy or sedentary adults.",
    bullets: [
      "Use five minute blocks of brisk walking, stairs, squats, or fast cycling.",
      "Do sessions two or more times a day, total weekly time five to sixty five minutes.",
      "Most gains appear in aerobic fitness and muscular endurance.",
      "Body fat, strength, and cholesterol change less than fitness.",
      "Helpful when long workouts feel hard to fit into the day.",
    ],
    variant: "success",
  },
  {
    id: "gluten-worry",
    section: "Gluten Worry Check",
    intro: "Many people blame gluten, but tests show symptoms often stay the same whether food has gluten or not.",
    bullets: [
      "In blinded tests, cereal bars with and without gluten produced similar IBS symptoms.",
      "Some people react to FODMAP carbs in wheat instead of gluten itself.",
      "True gluten intolerance and celiac disease still need strict avoidance.",
      "Without a diagnosis, most people tolerate normal bread in moderation.",
      "Work with a professional before cutting whole food groups.",
    ],
    variant: "info",
  },
  {
    id: "aging-parents-supplements",
    section: "5 Key Supplements For Aging Parents",
    intro: "Five well studied nutrients support strength, brain function, mood, and sleep for adults over fifty.",
    bullets: [
      "Creatine, around 5 grams daily with light strength work, supports muscle, energy, and daily tasks.",
      "Higher creatine doses in research support brain energy and memory, medical guidance is important here.",
      "Vitamin D3 with K2 supports bones, immunity, and keeps calcium directed toward bones instead of arteries.",
      "Omega 3s from fish oil or algae, around 1 to 2 grams combined EPA and DHA, support brain, heart, and inflammation control.",
      "Magnesium glycinate before bed supports relaxation and sleep, magnesium L-threonate focuses more on mood and memory.",
      "Glycine, around 3 grams in warm water before bed, supports deeper sleep and fresher mornings.",
      "Best results show up when these stack with real food, walking, and a steady sleep routine.",
    ],
    variant: "success",
  },
  {
    id: "fat-loss-day-plan",
    section: "Simple Day Plan For Faster Fat Loss",
    intro:
      "A clear daily rhythm around hydration, protein, movement, and sleep drives steady fat loss without extreme rules.",
    bullets: [
      "Morning, drink water with electrolytes or mineral salt before coffee, add 5 grams of creatine if digestion feels fine.",
      "Delay caffeine sixty to ninety minutes after waking, ideally after the first meal, for steadier energy.",
      "First meal one to two hours after waking, focus on high protein, some fiber, and lower calories.",
      "Lunch built around protein, vegetables, and purposeful carbs, higher carbs on training days, lower on rest days.",
      "Use the raw veggie test for snacks, if raw carrots or celery sound unappealing, it is likely not true hunger.",
      "Lift two to three days per week with full body sessions, use basic squat, hinge, push, pull, and carry patterns.",
      "Move daily with a thirty minute walk or seven to ten thousand steps, walks after meals support blood sugar and cravings.",
      "Finish dinner three to five hours before bed, use a balanced plate with enough protein and a moderate carb serving.",
      "Night routine, cool dark room, light stretch or breathing, limited screens, magnesium and glycine if they fit your plan.",
    ],
    variant: "info",
  },
  {
    id: "anti-aging-exercise",
    section: "7 Exercises To Slow Aging",
    intro: "Seven movements with strong research links to longer life, better fitness, and more independence.",
    bullets: [
      "Fast walking, aim for about seven thousand steps per day and include thirty minutes of brisk pace.",
      "High intensity intervals once or twice per week, short hard efforts with longer easy recovery blocks.",
      "Bar hangs, start with ten second holds to open shoulders, decompress the spine, and build grip strength.",
      "Squats, use body weight or light loads to protect the ability to stand up, climb stairs, and move confidently.",
      "Trap bar deadlifts, focus on hip drive and solid form to build whole body strength and bone density.",
      "Farmer carries, walk while holding weights at your sides to train posture, balance, and real world strength.",
      "Daily mobility, use moves like the World’s Greatest Stretch for a few minutes to keep hips and joints moving freely.",
    ],
    variant: "success",
  },
];

const jpSummary =
  "Adults in Japan often sleep 6 to 6.5 hours. Life expectancy in 2025 is 87.1 for women and 81.1 for men, among the highest in the world. Obesity stays near 4 to 6 percent. The system favors recovery with cooler rooms, warm baths before bed, firm sleep surfaces, less evening light, and short daytime naps.";

const jpHabits: string[] = [
  "Cool the bedroom to about 65°F, 18°C.",
  "Take a warm bath or shower 90 minutes before bed.",
  "Use a firm sleep surface for spinal alignment.",
  "Reduce bright and blue light at night.",
  "Use a 20 to 30 minute nap in early afternoon when needed.",
  "Align meals and walking with daylight hours.",
];

const jpWhyItWorks: string[] = [
  "Thermoregulation helps the body start deep sleep faster.",
  "Short naps restore alertness without hurting night sleep.",
  "Movement and diet support weight and metabolic health.",
  "Norms around brief rest lower stress and support recovery.",
];

export default function Workout() {
  const [collapsedCards, setCollapsedCards] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    setCollapsedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
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
                        isCollapsed ? "max-h-0 opacity-0" : "max-h-[520px] opacity-100"
                      }`}
                    >
                      <p className="text-sm leading-relaxed text-foreground/90">{tip.intro}</p>
                      <ul className="mt-3 space-y-2">
                        {tip.bullets.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-foreground/90">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-foreground/60" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
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
