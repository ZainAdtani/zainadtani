import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

type VerseCard = {
  id: string;
  reference: string;
  excerpt: string;
  details: string;
};

const verses: VerseCard[] = [
  {
    id: "1",
    reference: "24:35",
    excerpt: "Allah is the Light of the heavens and the earth...",
    details:
      "The parable of His light is as if there were a niche and within it a lamp: the lamp enclosed in glass: the glass as it were a brilliant star: lit from a blessed tree, an olive, neither of the east nor of the west, whose oil is well-nigh luminous, though fire scarce touched it: Light upon Light!",
  },
  {
    id: "2",
    reference: "2:255",
    excerpt: "His Throne extends over the heavens and the earth...",
    details:
      "Allah! There is no god but He - the Living, The Self-subsisting, Eternal. No slumber can seize Him Nor Sleep. His are all things in the heavens and on earth. Who is there can intercede in His presence except as he permitteth?",
  },
  {
    id: "3",
    reference: "55:19-20",
    excerpt: "He has let free the two seas meeting together...",
    details:
      "He has let free the two bodies of flowing water, meeting together: Between them is a Barrier which they do not transgress. Then which of the favours of your Lord will ye deny?",
  },
  {
    id: "4",
    reference: "17:44",
    excerpt: "The seven heavens and the earth and all therein declare His glory...",
    details:
      "The seven heavens and the earth, and all beings therein, declare His glory: there is not a thing but celebrates His praise; And yet ye understand not how they declare His glory! Verily He is Oft-Forbear, Most Forgiving!",
  },
];

export default function Illuminate() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/5 to-background">
      <Helmet>
        <title>Illuminate - Lighting the Path to Mulaqat | Zain Adtani</title>
        <meta name="description" content="Featured Quranic verses illuminating the path to Mulaqat" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <a href="/waez">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to USA Visit 2025
            </a>
          </Button>
          <div className="relative mb-6">
            <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-primary/50 via-primary/30 to-transparent animate-pulse" />
            <h1 className="relative text-5xl md:text-6xl font-bold text-foreground">
              Illuminate
              <span className="block text-2xl md:text-3xl font-normal mt-2 text-muted-foreground">
                Lighting the Path to Mulaqat
              </span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Explore verses from the Holy Qur'an that illuminate our spiritual journey and guide us toward the divine presence.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-6">Featured Qur'an Verses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {verses.map((verse) => {
              const isExpanded = expandedCards.has(verse.id);
              return (
                <Card
                  key={verse.id}
                  className="rounded-xl p-5 shadow-md transition-all hover:shadow-lg hover:border-primary/30 overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="text-sm font-mono text-primary font-semibold">{verse.reference}</span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{verse.excerpt}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCard(verse.id)}
                      className="w-full justify-between hover:bg-accent/50"
                    >
                      View details
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 ml-2" />
                      ) : (
                        <ChevronDown className="w-4 h-4 ml-2" />
                      )}
                    </Button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pt-3 border-t border-border">
                        <p className="text-sm text-muted-foreground leading-relaxed">{verse.details}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
