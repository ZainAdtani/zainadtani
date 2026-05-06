import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyBlock } from "@/components/CopyBlock";
import { AI_PROMPTS } from "@/data/ai_prompts";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import LifeNotes from "./LifeNotes";

interface Prompt {
  title: string;
  text: string;
}

const PROMPTS: Prompt[] = [
  { title: "Remove Bottlenecks", text: "I run a [type of business]. What are 3 things I could delegate or automate with AI right now that would give me back the most time? Be specific, not generic." },
  { title: "Reclaim Your Week", text: "I want to use AI to save time on [specific task]. Walk me through one system to set it up step by step. Ask me any clarifying questions first." },
  { title: "Stay Visible Without Burnout", text: "Create a 4-week content plan for [platform] in my niche of [topic]. I can only post 3 times per week. Keep it simple and repeatable." },
  { title: "Personal Focus Coach", text: "I struggle with staying focused on [main goal]. What 3 AI tools or workflows can help me prioritize better, reduce distractions, and manage my time? Give me the actual setup." },
  { title: "Mindset Reset for Confidence", text: "What 3 beliefs might be holding me back from using AI consistently? And what's one thing I can do today to feel more confident and in control?" },
  { title: "Elevate Customer Experience", text: "Give me 3 ways to improve the experience for my clients or customers using free or low-cost AI tools. Propose both free and affordable options." },
  { title: "Content That Converts", text: "I want to improve conversions for [specific offer]. Give me 3 ways to improve the clarity, urgency, or trust in my current messaging. Be specific." },
  { title: "Make Smarter Business Decisions", text: "Based on my current business goals of [goal], what is one decision I could use AI to help me make smarter or faster this week? Give me a real example." },
  { title: "Streamline Repetitive Tasks", text: "What are 3 repetitive tasks I do each week that I could hand off to AI? Suggest the right tools. Give me step-by-step follow-up actions for each." },
  { title: "Future-Proof Your Skills", text: "As a [role or career], what are the top 3 AI skills I should learn to become irreplaceable in my field? Give me a 30-day learning path." },
  { title: "Train Your AI Assistant (Bonus)", text: "I want you to act as my personal AI assistant. Here is everything you need to know about me: [paste your role, goals, biggest challenge, tools you use, preferred communication style, and one thing you want AI to help with most]. Remember all of this and use it to give me better answers from now on." },
];

const CUSTOM_INSTRUCTIONS = `Talk to me like I am thirteen. Use simple words. Use short sentences. Keep it fun and clear. Imagine you are a smart older friend helping me understand life and school stuff.

Do not use any dashes in your replies. If you feel like using a dash, use a comma, a period, or a line break instead.

Use the eighty twenty rule. Focus on the few ideas that give most of the value. Start with the point that helps me the most. Remove filler.

Explain step by step. Tell me the big idea in one or two sentences. Break it into clear steps. Give one short example from normal life, school, money, health, or work. End with one simple action I can take next.

Use light emojis where it fits. One or two per short section. Do not spam them.

Add light humor. Small jokes. Things that make me smile without making the answer hard to read.

Never waste time. If a thought feels long, shorten it. Keep answers tight but kind. Fast but thoughtful.

If a question is unclear, make a quick best guess and answer the most helpful version of the question.

Avoid long intros. Avoid long wrap up lines. Get to the point, explain it, give an example, give a next step, then stop.`;

type TabKey = "business" | "library" | "notes";

const CATEGORIES = ["All", "Coaching", "Productivity", "Learning", "Email", "Delegation", "Automation"] as const;

const categoryColor: Record<string, string> = {
  Coaching: "bg-[#00D4AA]/15 text-[#00D4AA] border border-[#00D4AA]/30",
  Productivity: "bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30",
  Learning: "bg-emerald-400/15 text-emerald-300 border border-emerald-400/30",
  Email: "bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30",
  Delegation: "bg-[#00D4AA]/10 text-[#00D4AA] border border-[#00D4AA]/20",
  Automation: "bg-[#00D4AA]/15 text-[#00D4AA] border border-[#00D4AA]/30",
};

export default function Resources() {
  const [tab, setTab] = useState<TabKey>("business");
  const [q, setQ] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expanded, setExpanded] = useState<number[]>([]);

  const filteredPrompts = useMemo(() => {
    const t = q.trim().toLowerCase();
    return AI_PROMPTS.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (!t) return true;
      return [p.title, p.prompt, p.tags.join(" "), p.category, p.note]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(t);
    });
  }, [q, selectedCategory]);

  const toggleExpand = (id: number) =>
    setExpanded((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  const pillBase = "px-5 py-2.5 rounded-full text-[14px] font-sans cursor-pointer transition-colors";
  const active = "bg-[#00D4AA] text-[#0A0F1A] font-semibold";
  const inactive = "bg-[#0F2340] text-[#94A3B8] border border-[#1E3A5F] hover:border-[#00D4AA]/40";

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>Resources | Zain Adtani</title></Helmet>

      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 pt-20 pb-10 text-center">
        <h1 className="font-display font-extrabold text-[40px] text-foreground">Resources</h1>
        <p className="mt-3 font-sans text-[16px] text-[#94A3B8] max-w-2xl mx-auto">
          Free tools, prompts, and ideas to help you work smarter and think clearer.
        </p>
      </header>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-3">
        <button onClick={() => setTab("business")} className={`${pillBase} ${tab === "business" ? active : inactive}`}>
          For Business
        </button>
        <button onClick={() => setTab("library")} className={`${pillBase} ${tab === "library" ? active : inactive}`}>
          Prompt Library
        </button>
        <button onClick={() => setTab("notes")} className={`${pillBase} ${tab === "notes" ? active : inactive}`}>
          Life Notes
        </button>
      </div>

      <div className="mt-10">
        {tab === "business" && (
          <div className="container mx-auto px-4 max-w-6xl pb-10">
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

            <section className="mt-16 text-center max-w-2xl mx-auto">
              <p className="text-base text-muted-foreground mb-4">
                Want me to build these into your workflow?
              </p>
              <Button asChild size="lg">
                <Link to="/services">→ Work With Me on AI</Link>
              </Button>
            </section>
          </div>
        )}

        {tab === "library" && (
          <div className="container mx-auto px-4 max-w-6xl pb-10">
            {/* Custom Instructions */}
            <div className="bg-[#0F2340] border border-[#1E3A5F] rounded-2xl p-6 mb-8">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-display font-bold text-[18px] text-white">Custom Instructions</h3>
                <CopyBlock text={CUSTOM_INSTRUCTIONS} label="Copy" />
              </div>
              <p className="font-sans text-[13px] text-[#94A3B8] mb-4">
                Copy into your AI settings for a clearer, friendlier helper.
              </p>
              <pre className="max-h-48 overflow-y-auto font-mono text-[13px] text-[#94A3B8] bg-[#0A0F1A] rounded-xl p-4 whitespace-pre-wrap">
                {CUSTOM_INSTRUCTIONS}
              </pre>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search prompts..."
                className="h-11 pl-10"
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`text-[13px] px-3 py-1.5 rounded-full transition-colors ${
                    selectedCategory === c
                      ? "bg-[#00D4AA] text-[#0A0F1A] font-semibold"
                      : "bg-[#0F2340] text-[#94A3B8] border border-[#1E3A5F] hover:border-[#00D4AA]/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? "s" : ""} found
            </p>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPrompts.map((p) => {
                const isExpanded = expanded.includes(p.id);
                return (
                  <div key={p.id} className="bg-[#0F2340] border border-[#1E3A5F] rounded-2xl p-6 flex flex-col gap-3">
                    <span className={`self-start rounded-full px-3 py-1 text-[11px] font-medium ${categoryColor[p.category] || "bg-[#1E3A5F] text-[#94A3B8]"}`}>
                      {p.category}
                    </span>
                    <h3 className="font-display font-bold text-[17px] text-[#F1F5F9]">{p.title}</h3>
                    {p.note && (
                      <p className="italic font-sans text-[13px] text-[#6B7280]">{p.note}</p>
                    )}
                    <pre className={`font-mono text-[13px] text-[#94A3B8] bg-[#0A0F1A] rounded-xl p-4 whitespace-pre-wrap overflow-hidden ${isExpanded ? "" : "max-h-32"}`}>
                      {p.prompt}
                    </pre>
                    <button
                      onClick={() => toggleExpand(p.id)}
                      className="self-start text-[13px] text-[#00D4AA] hover:underline flex items-center gap-1"
                    >
                      {isExpanded ? (<>Collapse <ChevronUp className="w-3 h-3" /></>) : (<>Expand <ChevronDown className="w-3 h-3" /></>)}
                    </button>
                    <div>
                      <CopyBlock text={p.prompt} label="Copy" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "notes" && <LifeNotes />}
      </div>

      {/* Page footer */}
      <div className="max-w-6xl mx-auto px-6 pb-16 text-center">
        <p className="font-sans text-[14px] text-[#94A3B8]">
          More tools coming soon. Have a prompt to share?
          <a
            href="mailto:zkadtani@gmail.com"
            className="text-[#00D4AA] ml-1 hover:underline"
          >
            Send it over.
          </a>
        </p>
      </div>
    </div>
  );
}
