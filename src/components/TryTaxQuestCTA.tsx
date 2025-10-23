import { ExternalLink, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function TryTaxQuestCTA() {
  return (
    <Card className="relative border-2 border-dashed border-accent/40 p-6 hover:border-accent transition-all bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
            <Gamepad2 className="w-6 h-6 text-accent-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">Try the Tax Quest Game</h3>
            <p className="text-sm text-muted-foreground">
              Turn EA prep into a quick, gamified practice session—no login required (guest mode).
            </p>
          </div>
        </div>
        <Button 
          asChild
          size="lg"
          className="group w-full md:w-auto"
        >
          <a
            href="https://tax-quest-game.lovable.app/"
            target="_blank"
            rel="noreferrer"
          >
            Play Tax Quest (Beta)
            <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </Button>
      </div>
    </Card>
  );
}
