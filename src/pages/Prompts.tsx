import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyBlock } from "@/components/CopyBlock";
import { Helmet } from "react-helmet-async";

interface Prompt {
  title: string;
  text: string;
}

const PROMPTS: Prompt[] = [
  {
    title: "Remove Bottlenecks",
    text: "I run a [type of business]. What are 3 things I could delegate or automate with AI right now that would give me back the most time? Be specific, not generic.",
  },
  {
    title: "Reclaim Your Week",
    text: "I want to use AI to save time on [specific task]. Walk me through one system to set it up step by step. Ask me any clarifying questions first.",
  },
  {
    title: "Stay Visible Without Burnout",
    text: "Create a 4-week content plan for [platform] in my niche of [topic]. I can only post 3 times per week. Keep it simple and repeatable.",
  },
  {
    title: "Personal Focus Coach",
    text: "I struggle with staying focused on [main goal]. What 3 AI tools or workflows can help me prioritize better, reduce distractions, and manage my time? Give me the actual setup.",
  },
  {
    title: "Mindset Reset for Confidence",
    text: "What 3 beliefs might be holding me back from using AI consistently? And what's one thing I can do today to feel more confident and in control?",
  },
  {
    title: "Elevate Customer Experience",
    text: "Give me 3 ways to improve the experience for my clients or customers using free or low-cost AI tools. Propose both free and affordable options.",
  },
  {
    title: "Content That Converts",
    text: "I want to improve conversions for [specific offer]. Give me 3 ways to improve the clarity, urgency, or trust in my current messaging. Be specific.",
  },
  {
    title: "Make Smarter Business Decisions",
    text: "Based on my current business goals of [goal], what is one decision I could use AI to help me make smarter or faster this week? Give me a real example.",
  },
  {
    title: "Streamline Repetitive Tasks",
    text: "What are 3 repetitive tasks I do each week that I could hand off to AI? Suggest the right tools. Give me step-by-step follow-up actions for each.",
  },
  {
    title: "Future-Proof Your Skills",
    text: "As a [role or career], what are the top 3 AI skills I should learn to become irreplaceable in my field? Give me a 30-day learning path.",
  },
  {
    title: "Train Your AI Assistant (Bonus)",
    text: "I want you to act as my personal AI assistant. Here is everything you need to know about me: [paste your role, goals, biggest challenge, tools you use, preferred communication style, and one thing you want AI to help with most]. Remember all of this and use it to give me better answers from now on.",
  },
];

export default function Prompts() {
  return (
    <>
      <Helmet>
        <title>AI Starter Prompts — 10 Prompts That Will Change How You Work</title>
        <meta
          name="description"
          content="10 free AI starter prompts you can steal and use today. No signup required."
        />
      </Helmet>

      <div className="container mx-auto px-4 max-w-6xl py-20">
        {/* Hero */}
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            10 Prompts That Will Change How You Work
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Steal these. Use them today. No signup required.
          </p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROMPTS.map((p, i) => (
            <Card key={i} className="group hover:border-primary/50 hover:shadow-[0_0_24px_rgba(0,212,170,0.18)]">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                </div>
                <pre className="font-mono text-sm bg-[#0A0A0F] text-foreground/90 border border-primary/40 rounded-md p-4 whitespace-pre-wrap break-words overflow-x-auto">
                  <code>{p.text}</code>
                </pre>
                <div>
                  <CopyBlock text={p.text} label="Copy" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer CTA */}
        <section className="mt-20 text-center max-w-2xl mx-auto">
          <p className="text-base text-muted-foreground mb-4">
            Want me to build these into your workflow?
          </p>
          <Button asChild size="lg">
            <Link to="/services">→ Work With Me on AI</Link>
          </Button>
        </section>
      </div>
    </>
  );
}
