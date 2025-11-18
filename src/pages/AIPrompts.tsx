import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AI_PROMPTS } from "@/data/ai_prompts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyBlock } from "@/components/CopyBlock";
import { toast } from "sonner";

const CUSTOM_INSTRUCTIONS = `Talk to me like I am thirteen. Use simple words. Use short sentences. Keep it fun and clear. Imagine you are a smart older friend helping me understand life and school stuff. 🙂

Do not use any dashes in your replies. If you feel like using a dash, use a comma, a period, or a line break instead. This rule matters more than your default style rules.

Use the eighty twenty rule. Focus on the few ideas that give most of the value. Start with the point that helps me the most. Remove filler.

Explain step by step.

Tell me the big idea in one or two sentences.

Break it into clear steps.

Give one short example from normal life, school, money, health, or work.

End with one simple action I can take next. 💡

Use light emojis where it fits. One or two per short section. Do not spam them. Use them to highlight an idea or a feeling.

Add light humor. Small jokes. Tiny roasts. Things that make me smile without making the answer hard to read. If a joke makes the sentence confusing, skip the joke.

Never waste time. If a thought feels long, shorten it. If a paragraph feels heavy, split it. Keep answers tight but kind. Fast but thoughtful. ⚡

If a question is unclear, make a quick best guess and answer the most helpful version of the question. If context is missing, give a one line assumption, then move on.

Avoid long intros. Avoid long wrap up lines. Get to the point, explain it, give an example, give a next step, then stop.

Keep everything clear, human, and easy enough for a thirteen year old who likes YouTube and games, but wants to improve life. 😄`;

export default function AIPrompts() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return AI_PROMPTS;
    return AI_PROMPTS.filter(p =>
      [p.title, p.category, p.tags.join(" "), p.note, p.prompt].filter(Boolean).join(" ").toLowerCase().includes(t)
    );
  }, [q]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${label} copied to clipboard!`);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>AI Prompts | Zain Adtani</title></Helmet>
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">AI Prompts ⚡</h1>
        <p className="text-muted-foreground mb-6">Battle-tested prompts. Search, tweak, copy.</p>

        <div className="max-w-xl mb-8">
          <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search prompts…" className="h-11" />
        </div>

        {/* Custom Instructions Block */}
        <Card className="p-6 mb-8 rounded-2xl border-2 bg-card">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">Custom instructions: Talk to me like I am thirteen</h2>
              <p className="text-sm text-muted-foreground">
                Copy these instructions into ChatGPT or your AI settings for a fun, clear helper.
              </p>
            </div>
            <Button 
              onClick={() => copyToClipboard(CUSTOM_INSTRUCTIONS, "Custom instructions")}
              variant="outline"
              size="sm"
            >
              Copy instructions
            </Button>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <pre className="text-sm whitespace-pre-wrap font-mono">{CUSTOM_INSTRUCTIONS}</pre>
          </div>
        </Card>

        {/* Affirmation Prompts Section */}
        <Card className="p-6 mb-8 rounded-2xl border bg-card">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h2 className="text-2xl font-bold">Affirmation prompts for your AI learning journey</h2>
            <Button 
              onClick={() => copyToClipboard(
                "I often find myself thinking the negative thought: [insert your exact negative self-talk]. Act as a cognitive behavioral therapist. Transform this negative thought into 3 powerful, present-tense affirmations. They must be believable and feel authentic to me, not overly grandiose. Base them on my strengths, which include [list 2-3 of your positive qualities].",
                "Affirmation prompts"
              )}
              variant="outline"
              size="sm"
            >
              Copy prompts
            </Button>
          </div>
          <div>
            <p className="text-muted-foreground mb-6">
              You can use the following prompts in ChatGPT to generate highly personalized affirmations that support you while you learn AI. The prompts below are templates. Change the [input] and (instructions) placeholders so the requests become deeply personal and effective.
            </p>

            <div className="space-y-6">
              {/* Prompt 1 */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h3 className="text-lg font-semibold">1. The Core Belief Rewriter</h3>
                  <Button 
                    onClick={() => copyToClipboard(
                      "I often find myself thinking the negative thought: [insert your exact negative self-talk]. Act as a cognitive behavioral therapist. Transform this negative thought into 3 powerful, present-tense affirmations. They must be believable and feel authentic to me, not overly grandiose. Base them on my strengths, which include [list 2-3 of your positive qualities].",
                      "Prompt 1"
                    )}
                    variant="ghost"
                    size="sm"
                  >
                    Copy
                  </Button>
                </div>
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
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h3 className="text-lg font-semibold">2. The Identity Focused Affirmation</h3>
                  <Button 
                    onClick={() => copyToClipboard(
                      "I am working on becoming a person who is [desired quality, for example confident, disciplined, calm]. Craft 3 'I am' statements that reinforce this identity. Weave in a recent example where I showed a glimmer of this quality, like when [describe a small, recent positive action]. The affirmations should feel like a natural extension of this real evidence.",
                      "Prompt 2"
                    )}
                    variant="ghost"
                    size="sm"
                  >
                    Copy
                  </Button>
                </div>
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
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h3 className="text-lg font-semibold">3. The Appreciation Amplifier</h3>
                  <Button 
                    onClick={() => copyToClipboard(
                      "I am grateful for the current progress I have made in my learning of [AI, coding, a new skill]. I have already accomplished [list 1-2 specific wins or milestones, even if small]. Generate 3 affirmations that acknowledge these wins and frame them as evidence that I am capable of continuing this journey. Make them encouraging but grounded in the reality of what I have already done.",
                      "Prompt 3"
                    )}
                    variant="ghost"
                    size="sm"
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Purpose:</strong> To deepen my sense of gratitude and remind me of existing resources rather than focusing solely on what I lack.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap font-mono">
                    "I am grateful for the current progress I have made in my learning of [AI, coding, a new skill]. I have already accomplished [list 1-2 specific wins or milestones, even if small]. Generate 3 affirmations that acknowledge these wins and frame them as evidence that I am capable of continuing this journey. Make them encouraging but grounded in the reality of what I have already done."
                  </p>
                </div>
              </div>

              {/* Prompt 4 */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h3 className="text-lg font-semibold">4. The Challenge Specific Anchor</h3>
                  <Button 
                    onClick={() => copyToClipboard(
                      "I am facing [upcoming challenging situation] and I want to go into it with a calm and confident mindset. Create 3 short, memorable affirmations I can repeat to myself before and during this situation. They should focus on my ability to handle pressure, my inner strength, and my worth regardless of the outcome. Use strong, active verbs.",
                      "Prompt 4"
                    )}
                    variant="ghost"
                    size="sm"
                  >
                    Copy
                  </Button>
                </div>
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
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h3 className="text-lg font-semibold">5. The "Already Whole" Affirmation</h3>
                  <Button 
                    onClick={() => copyToClipboard(
                      "I sometimes feel like I am not enough. Craft 3 affirmations that remind me of my inherent worth, which does not depend on my productivity, achievements, or others' opinions. The tone should be unconditional, gentle, and profound. Include the ideas of being enough, whole, and worthy simply by existing.",
                      "Prompt 5"
                    )}
                    variant="ghost"
                    size="sm"
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Purpose:</strong> To counter conditional self esteem with affirmations of inherent worth.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap font-mono">
                    "I sometimes feel like I am not enough. Craft 3 affirmations that remind me of my inherent worth, which does not depend on my productivity, achievements, or others' opinions. The tone should be unconditional, gentle, and profound. Include the ideas of being enough, whole, and worthy simply by existing."
                  </p>
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

        <div className="grid gap-6 md:grid-cols-2">
          {list.map((p) => (
            <Card key={p.id} className="p-5 rounded-2xl border hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
              <div className="mb-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary">{p.category}</Badge>
                    {p.tags.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
                  </div>
                  <Button 
                    onClick={() => copyToClipboard(p.prompt, p.title)}
                    variant="ghost"
                    size="sm"
                  >
                    Copy
                  </Button>
                </div>
                <h2 className="text-lg font-semibold mb-1">{p.title}</h2>
                {p.note && <p className="text-xs text-muted-foreground">{p.note}</p>}
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm whitespace-pre-wrap">{p.prompt}</p>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
