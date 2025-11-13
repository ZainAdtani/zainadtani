import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AI_PROMPTS } from "@/data/ai_prompts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CopyBlock } from "@/components/CopyBlock";

export default function AIPrompts() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return AI_PROMPTS;
    return AI_PROMPTS.filter(p =>
      [p.title, p.category, p.tags.join(" "), p.note, p.prompt].filter(Boolean).join(" ").toLowerCase().includes(t)
    );
  }, [q]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>AI Prompts | Zain Adtani</title></Helmet>
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">AI Prompts ⚡</h1>
        <p className="text-muted-foreground mb-6">Battle-tested prompts. Search, tweak, copy.</p>

        <div className="max-w-xl mb-6">
          <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search prompts…" className="h-11" />
        </div>

        {/* Affirmation Prompts Section */}
        <Card className="p-6 mb-8 rounded-2xl border bg-card">
          <div className="flex items-start gap-4">
            <img 
              src="/icons/bookmark-outline_brown.svg" 
              alt="Bookmark icon" 
              className="w-10 h-10 flex-shrink-0"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3">Affirmation prompts for your AI learning journey</h2>
              <p className="text-muted-foreground mb-6">
                You can use the following prompts in ChatGPT to generate highly personalized affirmations that support you while you learn AI. The prompts below are templates. Change the [input] and (instructions) placeholders so the requests become deeply personal and effective.
              </p>

              <div className="space-y-6">
                {/* Prompt 1 */}
                <div>
                  <h3 className="text-lg font-semibold mb-1">1. The Core Belief Rewriter</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Purpose:</strong> To directly counter a specific negative self talk with a positive, believable affirmation.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap font-mono">
                      "I often find myself thinking the negative thought: [insert your exact negative self-talk]. Act as a cognitive behavioral therapist. Transform this negative thought into 3 powerful, present-tense affirmations. They must be believable and feel authentic to me, not overly grandiose. Base them on my strengths, which include [list 2-3 of your positive qualities]."
                    </p>
                  </div>
                </div>

                {/* Prompt 2 */}
                <div>
                  <h3 className="text-lg font-semibold mb-1">2. The Identity Focused Affirmation</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Purpose:</strong> To build affirmations around who I am becoming, not only what I am doing.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap font-mono">
                      "I am working on becoming a person who is [desired quality, for example confident, disciplined, calm]. Craft 3 'I am' statements that reinforce this identity. Weave in a recent example where I showed a glimmer of this quality, like when [describe a small, recent positive action]. The affirmations should feel like a natural extension of this real evidence."
                    </p>
                  </div>
                </div>

                {/* Prompt 3 */}
                <div>
                  <h3 className="text-lg font-semibold mb-1">3. The Appreciation Amplifier</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Purpose:</strong> To create affirmations based on gratitude and self appreciation.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap font-mono">
                      "Help me build self love through affirmation. Start by asking me: 'What is one small thing about yourself, a skill, a personality trait, or something you have recently endured, that you can appreciate today?' After I answer with [your input], craft 3 affirmations that expand on this point of appreciation, framing me as my own supportive best friend."
                    </p>
                  </div>
                </div>

                {/* Prompt 4 */}
                <div>
                  <h3 className="text-lg font-semibold mb-1">4. The Challenge Specific Anchor</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Purpose:</strong> To generate affirmations for a specific upcoming stressful situation.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap font-mono">
                      "I am facing [upcoming challenging situation] and I want to go into it with a calm and confident mindset. Create 3 short, memorable affirmations I can repeat to myself before and during this situation. They should focus on my ability to handle pressure, my inner strength, and my worth regardless of the outcome. Use strong, active verbs."
                    </p>
                  </div>
                </div>

                {/* Prompt 5 */}
                <div>
                  <h3 className="text-lg font-semibold mb-1">5. The "Already Whole" Affirmation</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Purpose:</strong> To counter conditional self esteem with affirmations of inherent worth.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap font-mono">
                      "I sometimes feel like I am not enough. Craft 3 affirmations that remind me of my inherent worth, which does not depend on my productivity, achievements, or others' opinions. The tone should be unconditional, gentle, and profound. Include the ideas of being enough, whole, and worthy simply by existing."
                    </p>
                  </div>
                </div>
              </div>

              {/* How to use block */}
              <div className="mt-6 p-4 bg-accent/50 rounded-lg">
                <h3 className="text-md font-semibold mb-2">How to use these prompts</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Be specific and honest in your inputs.</li>
                  <li>Iterate and ask the AI to adjust the tone if needed.</li>
                  <li>Tweak the wording so the affirmations sound like your own voice.</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-4">
          {list.map((p) => (
            <Card key={p.id} className="p-5 rounded-2xl border">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary">{p.category}</Badge>
                    {p.tags.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
                  </div>
                  <h2 className="text-lg font-semibold">{p.title}</h2>
                  {p.note && <p className="text-sm text-muted-foreground mt-1">{p.note}</p>}
                  <pre className="mt-3 p-3 rounded-lg bg-muted overflow-x-auto text-sm whitespace-pre-wrap">
{p.prompt}
                  </pre>
                </div>
                <CopyBlock text={p.prompt} />
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
