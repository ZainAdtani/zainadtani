import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

type QuoteCard = {
  id: string;
  label: string; // e.g., "Qur'an 4:59" or "Hadith of Prophet Muhammad"
  title?: string; // optional sublabel like source work
  excerpt: string; // short visible text
  details?: string; // optional longer text revealed on expand
};

const quotes: QuoteCard[] = [
  {
    id: "q459",
    label: "Qur'an 4:59",
    excerpt: "O you who believe! Obey Allah and obey the Messenger and those in divinely granted authority among you.",
  },
  {
    id: "mhi-2025",
    label: "Mawlana Hazar Imam",
    title: "On the occasion of the Takht-Nashini, February 11, 2025",
    excerpt:
      "In coming months, I very much look forward to visiting my Jamat, and to meeting with the leaders of your countries.",
    details:
      "As I endeavor to be physically with my Jamat as much as possible, I would like you to remember that your Imam is with you at all times, and that, even when I am not with you in person, you are always in my heart, in my thoughts and in my prayers. Feel your Imam's presence. He is with you now and for evermore.",
  },
  {
    id: "hadith",
    label: "Hadith of Prophet Muhammad (s.a.s.)",
    excerpt:
      "Truly, Ali is part of me and I of him and he is the wali, the patron and guardian, of all the faithful, of every man and woman after me.",
  },
  {
    id: "q3612",
    label: "Qur'an 36:12",
    excerpt: "...and We have encompassed everything in the manifest Imam.",
  },
  {
    id: "ginan",
    label: "Ginan",
    title: "Ab Teri mohabbat lagi",
    excerpt: "I thirst, O Beloved, for a vision of You.",
    details: "Fulfil, O Beloved, the hope of my heart.",
  },
  {
    id: "nasheed",
    label: "Nasheed",
    title: "Mawla al-Baraya",
    excerpt: "A love-bound murid seeks from the Imam of the Time mercy and forgiveness.",
    details:
      "For this murid, no other Mawla is present. His or her desire is for the Imam's blessed gaze, nazar, for through this noble grace, he may receive victory and upliftment.",
  },
  {
    id: "tusi",
    label: "Nasir al-Din al-Tusi, d. 1274 C.E.",
    excerpt:
      "The greatest expression of divine mercy to mankind is the appearance of the Imam of the Age as a man among others,",
    details: "so that through him man may know Allah in the true sense of knowing Him.",
  },
  {
    id: "qasida",
    label: "Qasida",
    title: "Antum furuudi wa nafli",
    excerpt: "Your beauty is in front of my eyes, I am completely directed towards it.",
    details: "Your secret is inside my heart, and my heart is in a state of enlightenment.",
  },
];

export default function Illuminate() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
      <Helmet>
        <title>Illuminate — Lighting the Path to Mulaqat | Zain Adtani</title>
        <meta
          name="description"
          content="Curated Qur'anic verses, hadith, ginans, and reflections that illuminate the path to Mulaqat."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <a href="/usa-visit-2025">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to USA Visit 2025
            </a>
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 blur-3xl opacity-25 bg-gradient-to-r from-primary/60 via-accent/40 to-transparent" />
            <h1 className="relative text-5xl md:text-6xl font-bold tracking-tight">
              Illuminate
              <span className="block text-2xl md:text-3xl font-normal mt-2 text-muted-foreground">
                Lighting the Path to Mulaqat
              </span>
            </h1>
          </div>

          <p className="text-lg text-muted-foreground">
            Selected passages and teachings presented in calm, readable cards.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-6">Featured Selections</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quotes.map((q) => {
              const isOpen = expanded.has(q.id);
              const hasDetails = Boolean(q.details);
              return (
                <Card
                  key={q.id}
                  className="rounded-xl p-5 shadow-sm border bg-gradient-to-b from-muted/20 to-background transition-all hover:shadow-md hover:border-primary/30"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-semibold text-primary">{q.label}</div>
                        {q.title && <div className="text-xs text-muted-foreground">{q.title}</div>}
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed">{q.excerpt}</p>

                    {hasDetails && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggle(q.id)}
                          className="w-full justify-between hover:bg-accent/50"
                        >
                          {isOpen ? "Hide details" : "View details"}
                          {isOpen ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                        </Button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="pt-3 border-t border-border">
                            <p className="text-sm text-muted-foreground leading-relaxed">{q.details}</p>
                          </div>
                        </div>
                      </>
                    )}
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
