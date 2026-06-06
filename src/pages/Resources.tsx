import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyBlock } from "@/components/CopyBlock";
import { AI_PROMPTS } from "@/data/ai_prompts";
import { Search, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import LifeNotes from "./LifeNotes";

type ToolCategory = "AI & Agents" | "Productivity" | "Images & Design" | "Apps" | "Courses I Recommend";
interface Tool { name: string; url: string; desc: string; category: ToolCategory; }

const TOOLS: Tool[] = [
  { name: "Claude", url: "https://claude.ai", desc: "The AI that runs my business", category: "AI & Agents" },
  { name: "ElevenLabs", url: "https://elevenlabs.io", desc: "Voice cloning and realistic text-to-speech", category: "AI & Agents" },
  { name: "Gemini", url: "https://gemini.google.com", desc: "Google AI for planning and writing", category: "AI & Agents" },
  { name: "Google AI Studio", url: "https://aistudio.google.com", desc: "Build and test prompts with Google models", category: "AI & Agents" },
  { name: "Hedra", url: "https://www.hedra.com", desc: "AI talking character video creation", category: "AI & Agents" },
  { name: "NotebookLM", url: "https://notebooklm.google", desc: "AI research and note-taking assistant", category: "AI & Agents" },
  { name: "Perplexity", url: "https://www.perplexity.ai", desc: "AI search with cited results", category: "AI & Agents" },
  { name: "Fathom", url: "https://www.fathom.ai", desc: "AI meeting recorder and summarizer", category: "Productivity" },
  { name: "Gamma", url: "https://gamma.app", desc: "AI-powered presentations and decks", category: "Productivity" },
  { name: "Otter.ai", url: "https://otter.ai", desc: "Meeting transcription and notes", category: "Productivity" },
  { name: "Figma", url: "https://www.figma.com", desc: "Design and prototyping platform", category: "Productivity" },
  { name: "Canva", url: "https://www.canva.com", desc: "Brand graphics, thumbnails, social posts", category: "Images & Design" },
  { name: "Ideogram", url: "https://ideogram.ai", desc: "AI images with strong typography", category: "Images & Design" },
  { name: "upscale.media", url: "https://www.upscale.media", desc: "Sharpen and enlarge images automatically", category: "Images & Design" },
  { name: "HeyGen", url: "https://www.heygen.com", desc: "AI avatar video creator", category: "Apps" },
  { name: "Suno", url: "https://suno.com", desc: "Create AI-generated music in minutes", category: "Apps" },
  { name: "ElevenReader", url: "https://apps.apple.com/us/app/elevenreader-voice-reader/id6479373050", desc: "AI reader for PDFs and web pages", category: "Apps" },
  { name: "NLP Practitioner + Master", url: "https://www.udemy.com/course/nlp-practitioner-master-practitioner-certification-course/", desc: "Full NLP certification on Udemy", category: "Courses I Recommend" },
];

const TOOL_CATEGORIES = ["All", "AI & Agents", "Productivity", "Images & Design", "Apps", "Courses I Recommend"] as const;


interface Prompt {
  title: string;
  text: string;
}

const TRAIN_MY_AI_PROMPT = `I want you to act as my personal AI assistant starting today. Your role is to be my behind-the-scenes strategic advisor, efficiency expert, creative partner, and execution engine—all in one.

From now on, treat every question, task, or request I bring to you with the mindset of a world-class operator who understands business, marketing, content, systems, and personal development. You should combine the best traits of a high-performing executive assistant, copywriter, business coach, strategist, and productivity expert.

You are clear, direct, thoughtful, and deeply practical. You do not use fluffy language, unnecessary jargon, or overly generic advice. Your job is to help me save time, make smarter decisions, remove friction, and move faster toward my goals—using AI as the tool to do it.

Before we begin, I'm going to tell you everything you need to know about me, my goals, and how I want to use AI. Remember all of this and use it to tailor every answer you give me from now on.

Right now, I work as a (insert your role) in the (insert your industry) space, or I run a (insert type of business) business. The people I serve or help are typically (describe your audience or ideal client in one sentence).

Over the next 6 to 12 months, I have a few big goals I want to accomplish. First, I want to (insert goal #1). I'd also love to (insert goal #2) and ideally (insert goal #3 if applicable).

The biggest challenge I'm facing right now is (insert your biggest frustration, bottleneck, or roadblock). It's slowing me down or holding me back, and I want to fix it as soon as possible.

When it comes to using AI, I'm looking for help with (insert the ways you'd like AI to support you). I don't need hype. I just want AI to help me work smarter and get real results. Right now, the tools I use most often are (list tools). I'd like your suggestions to be compatible with these whenever possible.

I tend to prefer a (insert your preferred tone) communication style. I usually create things like (list the content types you're involved in) and I want your help making that process easier, faster, and more effective.

If it helps, I also work within a few systems or routines like (insert systems).

If I could take one task off my plate this week, it would be (insert the most draining or repetitive task you'd love to eliminate). And if AI could solve just one thing for me right now, I'd want it to (insert dream solution).

Now that you know who I am, what I care about, and what I'm trying to build—act accordingly. Be smart. Be strategic. Be fast. Help me move like the most optimized version of myself.`;

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
  Coaching: "bg-[#447BBE]/15 text-[#447BBE] border border-[#447BBE]/30",
  Productivity: "bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30",
  Learning: "bg-emerald-400/15 text-emerald-300 border border-emerald-400/30",
  Email: "bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30",
  Delegation: "bg-[#447BBE]/10 text-[#447BBE] border border-[#447BBE]/20",
  Automation: "bg-[#447BBE]/15 text-[#447BBE] border border-[#447BBE]/30",
};

export default function Resources() {
  const [tab, setTab] = useState<TabKey>("business");
  const [q, setQ] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expanded, setExpanded] = useState<number[]>([]);
  const [toolCat, setToolCat] = useState<typeof TOOL_CATEGORIES[number]>("All");
  const filteredTools = useMemo(
    () => (toolCat === "All" ? TOOLS : TOOLS.filter((t) => t.category === toolCat)),
    [toolCat]
  );

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
  const active = "bg-[#447BBE] text-[#0A0F1A] font-semibold";
  const inactive = "bg-[#0F2340] text-[#94A3B8] border border-[#1E3A5F] hover:border-[#447BBE]/40";

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Resources — Tools, Books & Links I Recommend | Zain Adtani</title>
        <meta name="description" content="A curated library of tools, books, articles, and links Zain Adtani recommends for AI, building small businesses, writing, and personal growth." />
        <meta property="og:title" content="Resources — Zain Adtani's Recommended Tools & Reading" />
        <meta property="og:description" content="Curated tools, books, articles, and links for AI, small business, writing, and personal growth." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://zainadtani.com/resources" />
      </Helmet>

      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 pt-20 pb-6 text-center">
        <h1 className="font-display font-extrabold text-[40px] text-foreground">Resources</h1>
        <p className="mt-3 font-sans text-[16px] text-[#94A3B8] max-w-2xl mx-auto">
          Free tools, prompts, and ideas to help you work smarter and think clearer.
        </p>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              const el = document.getElementById("tools");
              if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }}
            className="animate-jump-bounce font-sans font-bold text-white rounded-full transition-transform duration-200 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #DD5013, #D97706)",
              padding: "14px 28px",
              boxShadow: "0 0 20px rgba(221, 80, 19, 0.4)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 35px rgba(221, 80, 19, 0.6)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 20px rgba(221, 80, 19, 0.4)")}
          >
            ⚡ Jump to Tools I Use
          </button>
        </div>
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
            {/* Featured: Train My AI Assistant */}
            <div className="mb-12 bg-gradient-to-br from-[#0F2340] to-[#0A0F1A] border border-[#447BBE]/30 rounded-3xl p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <span className="inline-block text-[11px] font-medium tracking-widest uppercase text-[#447BBE] bg-[#447BBE]/10 border border-[#447BBE]/20 rounded-full px-3 py-1 mb-3">
                    ⭐ START HERE
                  </span>
                  <h3 className="font-display font-extrabold text-[26px] md:text-[32px] text-[#F1F5F9] leading-tight">
                    "Train My AI Assistant"
                  </h3>
                  <p className="font-sans text-[15px] text-[#94A3B8] mt-2 max-w-xl">
                    The one prompt that changes everything. Paste this into Claude, ChatGPT, or any AI tool and it learns who you are, what you need, and how to help you — from the very first message.
                  </p>
                </div>
                <div className="shrink-0">
                  <CopyBlock text={TRAIN_MY_AI_PROMPT} label="Copy Full Prompt" />
                </div>
              </div>
              <div className="bg-[#070C14] border border-[#1E3A5F] rounded-2xl p-5 max-h-64 overflow-y-auto font-mono text-[13px] text-[#94A3B8] leading-relaxed whitespace-pre-wrap">
                {TRAIN_MY_AI_PROMPT}
              </div>
            </div>

            {/* Label IQ */}
            <div className="mb-8 rounded-2xl border border-[#1E3A5F] bg-[#0F2340] p-6 md:p-8 hover:border-[#DD5013]/40 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-[#E9E4A6] text-[20px] md:text-[22px] font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    📄 Free: Label IQ Cheat Sheet
                  </h3>
                  <p className="mt-1 font-sans text-[15px] text-[#94A3B8]">
                    Read any food label in 10 seconds.
                  </p>
                </div>
                <Link
                  to="/label-iq"
                  className="shrink-0 inline-flex items-center justify-center font-sans font-semibold text-[14px] px-5 py-2.5 rounded-full border-2 transition-colors hover:scale-105 duration-200"
                  style={{ borderColor: "#DD5013", color: "#E9E4A6" }}
                >
                  Get it free →
                </Link>
              </div>
            </div>

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
                      ? "bg-[#447BBE] text-[#0A0F1A] font-semibold"
                      : "bg-[#0F2340] text-[#94A3B8] border border-[#1E3A5F] hover:border-[#447BBE]/40"
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
                      className="self-start text-[13px] text-[#447BBE] hover:underline flex items-center gap-1"
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

      {/* Tools I Use */}
      <section id="tools" className="max-w-6xl mx-auto px-6 pt-16 pb-16 scroll-mt-24">
        <h2 className="font-display font-extrabold text-[28px] md:text-[32px] text-foreground text-center mb-2">
          Tools I Use
        </h2>
        <p className="font-sans text-[15px] text-[#94A3B8] text-center mb-8">
          Everything in my stack. No fluff. No sponsorships.
        </p>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {TOOL_CATEGORIES.map((c) => {
            const isActive = toolCat === c;
            return (
              <button
                key={c}
                onClick={() => setToolCat(c)}
                className="text-[13px] px-4 py-1.5 rounded-full transition-opacity duration-150"
                style={{
                  border: "1px solid #447BBE",
                  background: isActive ? "#447BBE" : "transparent",
                  color: isActive ? "#FFFFFF" : "#447BBE",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = "rgba(68, 123, 190, 0.15)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = "transparent";
                }}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div key={toolCat} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 animate-fade-in">
          {filteredTools.map((t) => (
            <a
              key={t.name}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl p-5 transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(68, 123, 190, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#447BBE";
                e.currentTarget.style.background = "rgba(68,123,190,0.08)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(68,123,190,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(68, 123, 190, 0.2)";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <h3 className="font-sans font-bold text-[16px] text-white">{t.name}</h3>
              <p className="font-sans text-[13px] text-[#E9E4A6] mt-2">{t.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#DD5013] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Open Tool <ExternalLink className="w-3 h-3" />
              </span>
            </a>
          ))}
        </div>
      </section>


      {/* Page footer */}
      <div className="max-w-6xl mx-auto px-6 pb-16 text-center">
        <p className="font-sans text-[14px] text-[#94A3B8]">
          More tools coming soon. Have a prompt to share?
          <a
            href="mailto:zkadtani@gmail.com"
            className="text-[#447BBE] ml-1 hover:underline"
          >
            Send it over.
          </a>
        </p>
      </div>
    </div>
  );
}
