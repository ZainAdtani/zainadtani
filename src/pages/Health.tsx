import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Utensils, Moon, Brain, ArrowDown, Wrench, FileText, List } from "lucide-react";

const healthCards = [
  { title: "Move", subtitle: "Walk. Lift. Stretch.", icon: Heart },
  { title: "Food", subtitle: "Eat simple.", icon: Utensils },
  { title: "Sleep", subtitle: "Protect your bedtime.", icon: Moon },
  { title: "Mind", subtitle: "Calm wins.", icon: Brain },
];

const checklistItems = [
  "Walk 10 minutes",
  "Drink water",
  "Protein with a meal",
  "One veggie",
  "Sunlight",
  "Sleep time set",
  "No screens last 20 minutes",
];

const resourceCards = [
  { title: "My routines", icon: List },
  { title: "My favorite tools", icon: Wrench },
  { title: "My notes", icon: FileText },
];

export default function Health() {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Health | Zain Adtani</title>
        <meta name="description" content="Small steps. Better energy. Simple health habits." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Health</h1>
            <p className="text-xl text-muted-foreground mb-8">Small steps. Better energy.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={() => scrollToSection("checklist")}>
                Start here <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("resources")}>
                Tools I use
              </Button>
            </div>
          </div>
        </section>

        {/* 4-Card Grid */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {healthCards.map((card) => (
                <Card key={card.title} className="text-center hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="mx-auto p-3 rounded-full bg-primary/10 text-primary mb-2">
                      <card.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{card.subtitle}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Checklist Section */}
        <section id="checklist" className="py-12 px-4 scroll-mt-8">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Quick Checklist</h2>
            <Card className="p-6">
              <div className="space-y-4">
                {checklistItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Checkbox
                      id={`item-${index}`}
                      checked={checkedItems.has(index)}
                      onCheckedChange={() => toggleItem(index)}
                    />
                    <label
                      htmlFor={`item-${index}`}
                      className={`text-sm cursor-pointer ${
                        checkedItems.has(index)
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }`}
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                {checkedItems.size} of {checklistItems.length} done today
              </p>
            </Card>
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="py-12 px-4 bg-muted/30 scroll-mt-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Resources</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {resourceCards.map((card) => (
                <Card key={card.title} className="text-center hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="mx-auto p-3 rounded-full bg-muted mb-2">
                      <card.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-base">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">Coming soon</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
