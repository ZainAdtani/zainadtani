import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { LINKS } from "@/config/links";

export default function TryTaxQuestCTA() {
  return (
    <Card className="p-8 md:p-10 border-2 shadow-lg bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
          New • Free to try
        </p>
        <h3 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3">
          Turn EA Prep into a Game—Beat the Bosses, Level Up, Pass Faster
        </h3>
        <p className="text-lg text-muted-foreground mb-6">
          Micro-levels. Instant feedback. No account required. Jump in, clear a
          stage in minutes, and stack daily wins—Tony-style momentum with Dean-style simplicity.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="px-6">
            <a href={LINKS.TAX_QUEST} target="_blank" rel="noopener noreferrer">
              Play Tax Quest Now <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
          <div className="text-sm text-muted-foreground self-center">
            No login. Mobile friendly.
          </div>
        </div>
      </div>
    </Card>
  );
}
