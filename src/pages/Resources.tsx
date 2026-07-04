import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyBlock } from "@/components/CopyBlock";
import { AI_PROMPTS } from "@/data/ai_prompts";
import { Search, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

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

type SiteGroup = "Learn & Play" | "Money & Business" | "Guides & Library" | "About & Contact";
interface SiteEntry {
  title: string;
  desc: string;
  route: string;
  group: SiteGroup;
}

// Titles and descriptions pulled directly from each page's Helmet meta tags
// (or, where no meta description exists, the page's own visible subhead).
const SITE_MAP: SiteEntry[] = [
  // Learn & Play
  { group: "Learn & Play", route: "/roth-ira-game", title: "The Roth IRA Game", desc: "Learn how a Roth IRA works and meet 7 ETFs. Free cheat sheet at the end." },
  { group: "Learn & Play", route: "/harry-potter", title: "Harry Potter World", desc: "Seven books, one journey, plus chapter songs you can play." },
  { group: "Learn & Play", route: "/pokedex", title: "Pokédex", desc: "All 151 original Pokémon, built in Notion." },
  { group: "Learn & Play", route: "/projects/ai-songs", title: "AI Songs", desc: "Fun study music made with AI to help you remember tricky topics." },

  // Money & Business
  { group: "Money & Business", route: "/investing", title: "Investing — Simple Long-Term Money Philosophy", desc: "Zain Adtani's plain-English investing philosophy — simple, steady steps to grow your money over decades without the noise, hype, or stock tips." },
  { group: "Money & Business", route: "/money", title: "The Money Page", desc: "For people who actually want to understand how money works. No ads. No pitch. Just the stuff nobody teaches you." },
  { group: "Money & Business", route: "/family-protection-gap", title: "The Family Protection Gap", desc: "A plain-language guide to help families understand the gap between job benefits, savings, retirement accounts, and real protection. Free PDF." },
  { group: "Money & Business", route: "/digital-products", title: "Digital Product HQ", desc: "Browse courses, guides, templates, and tools to help small businesses use AI and everyday people publish their first book." },
  { group: "Money & Business", route: "/services", title: "Services — AI Consulting & Book Coaching", desc: "AI websites, book publishing help, and AI workflow consulting — practical services for small businesses and first-time authors in DFW Texas." },

  // Guides & Library
  { group: "Guides & Library", route: "/resources/label-iq", title: "Label IQ Cheat Sheet", desc: "Food brands hide junk behind fancy words. Learn the one rule, the serving size trick, and the 4 villains. Free cheat sheet." },
  { group: "Guides & Library", route: "/books", title: "Book Portal — Reading List & Recommendations", desc: "Full reading list — books I've read, am reading, and want to read, with notes, ratings, and picks across business, tech, and personal growth." },
  { group: "Guides & Library", route: "/ai-prompts", title: "AI Prompt Library", desc: "Curated library of AI prompts for ChatGPT, Claude, and Gemini — searchable, tagged, and built for real work across writing, business, and learning." },
  { group: "Guides & Library", route: "/prompts", title: "AI Starter Prompts", desc: "10 free AI starter prompts you can steal and use today. No signup required." },
  { group: "Guides & Library", route: "/tools", title: "Tools — Software I Use Every Day", desc: "A categorized list of the software, AI tools, and apps I use every day for building, writing, designing, automating, and running a small business." },
  { group: "Guides & Library", route: "/life-notes", title: "Life Notes", desc: "Short, searchable life notes — bite-sized ideas, lessons, and reminders on work, money, parenting, and personal growth, easy to copy and re-use." },
  { group: "Guides & Library", route: "/archive", title: "Archive", desc: "Old pages kept for reference." },

  // About & Contact
  { group: "About & Contact", route: "/", title: "Home", desc: "AI Consultant, Author, and Financial Educator based in DFW Texas. I help small businesses run on AI, help creators publish books, and help families protect what they build." },
  { group: "About & Contact", route: "/about", title: "About Zain Adtani", desc: "Get to know Zain — an AI consultant, author, and systems builder in DFW helping small businesses use AI and helping everyday people publish books." },
  { group: "About & Contact", route: "/connect", title: "Connect", desc: "Talk to Zain about a second income opportunity in financial education or about protecting your family with life insurance, wills, and trusts." },
  { group: "About & Contact", route: "/projects", title: "Fun Projects", desc: "A collection of fun side projects — a Notion Pokédex, a Harry Potter timeline, AI songs, and other creative experiments." },
  { group: "About & Contact", route: "/lab", title: "The Lab", desc: "Pokémon, Harry Potter, and other side projects built for fun in Notion." },
];

const GROUP_ORDER: SiteGroup[] = ["Learn & Play", "Money & Business", "Guides & Library", "About & Contact"];

const groupTagColor: Record<SiteGroup, string> = {
  "Learn & Play": "bg-[#DD5013]/15 text-[#E9E4A6] border border-[#DD5013]/30",
  "Money & Business": "bg-emerald-400/10 text-emerald-300 border border-emerald-400/30",
  "Guides & Library": "bg-[#447BBE]/15 text-[#447BBE] border border-[#447BBE]/30",
  "About & Contact": "bg-white/5 text-[#94A3B8] border border-white/10",
};

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

const CATEGORIES = ["All", "Coaching", "Productivity", "Learning", "Email", "Delegation", "Automation"] as const;

const categoryColor: Record<string, string> = {
  Coaching: "bg-[#447BBE]/15 text-[#447BBE] border border-[#447BBE]/30",
  Productivity: "bg-[#447BBE]/15 text-[#447BBE] border border-[#447BBE]/30",
  Learning: "bg-emerald-400/15 text-emerald-300 border border-emerald-400/30",
  Email: "bg-[#447BBE]/15 text-[#447BBE] border border-[#447BBE]/30",
  Delegation: "bg-[#447BBE]/10 text-[#447BBE] border border-[#447BBE]/20",
  Automation: "bg-[#447BBE]/15 text-[#447BBE] border border-[#447BBE]/30",
};

function SiteCard({ entry }: { entry: SiteEntry }) {
  const isExternal = entry.route.startsWith("http");
  const inner = (
    <>
      <span className={`self-start rounded-full px-2.5 py-0.5 text-[10px] font-medium tracking-wide ${groupTagColor[entry.group]}`}>
        {entry.group}
      </span>
      <h3 className="mt-3 font-display font-bold text-[17px] text-[#F1F5F9] leading-snug">{entry.title}</h3>
      <p className="mt-2 font-sans text-[13.5px] text-[#94A3B8] leading-relaxed">{entry.desc}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-[#DD5013] opacity-0 group-hover:opacity-100 transition-opacity">
        Open {isExternal ? <ExternalLink className="w-3 h-3" /> : "→"}
      </span>
    </>
  );
  const className =
    "group flex flex-col rounded-2xl bg-[#0A0F1A] border border-[#2C4A73] p-5 transition-all duration-200 hover:border-[#DD5013] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(221,80,19,0.12)]";
  return isExternal ? (
    <a href={entry.route} target="_blank" rel="noopener noreferrer" className={className}>{inner}</a>
  ) : (
    <Link to={entry.route} className={className}>{inner}</Link>
  );
}

export default function Resources() {
  const [q, setQ] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expanded, setExpanded] = useState<number[]>([]);
  const [toolCat, setToolCat] = useState<typeof TOOL_CATEGORIES[number]>("All");

  const filteredTools = useMemo(
    () => (toolCat === "All" ? TOOLS : TOOLS.filter((t) => t.category === toolCat)),
    [toolCat]
  );

  const t = q.trim().toLowerCase();

  const filteredSite = useMemo(() => {
    if (!t) return SITE_MAP;
    return SITE_MAP.filter((s) =>
      [s.title, s.desc, s.group].join(" ").toLowerCase().includes(t)
    );
  }, [t]);

  const groupedSite = useMemo(() => {
    return GROUP_ORDER.map((g) => ({
      group: g,
      items: filteredSite.filter((s) => s.group === g),
    })).filter((g) => g.items.length > 0);
  }, [filteredSite]);

  const filteredPrompts = useMemo(() => {
    return AI_PROMPTS.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (!t) return true;
      return [p.title, p.prompt, p.tags.join(" "), p.category, p.note]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(t);
    });
  }, [t, selectedCategory]);

  const toggleExpand = (id: number) =>
    setExpanded((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

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
      </header>

      {/* Global search (site map + prompt library) */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search pages and prompts…"
            className="h-12 pl-10"
          />
        </div>
        {t && (
          <p className="mt-2 text-center font-sans text-[13px] text-[#94A3B8]">
            {filteredSite.length} page{filteredSite.length !== 1 ? "s" : ""} · {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Explore the Site */}
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-4">
        <div className="text-center mb-8">
          <h2 className="font-display font-extrabold text-[28px] md:text-[32px] text-foreground">Explore the Site</h2>
          <p className="mt-2 font-sans text-[15px] text-[#94A3B8]">Every real page, in one place.</p>
        </div>

        {groupedSite.length === 0 ? (
          <p className="text-center font-sans text-[14px] text-[#94A3B8]">No pages match “{q}”.</p>
        ) : (
          <div className="space-y-10">
            {groupedSite.map(({ group, items }) => (
              <div key={group}>
                <h3 className="font-display font-bold text-[18px] text-[#E9E4A6] mb-4">{group}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {items.map((entry) => (
                    <SiteCard key={entry.route} entry={entry} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Train My AI Assistant */}
      <section className="container mx-auto px-4 max-w-6xl pt-16">
        <div className="bg-gradient-to-br from-[#0A0F1A] to-[#0A0F1A] border border-[#447BBE]/30 rounded-3xl p-8 md:p-10">
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
          <div className="bg-[#0A0F1A] border border-[#2C4A73] rounded-2xl p-5 max-h-64 overflow-y-auto font-mono text-[13px] text-[#94A3B8] leading-relaxed whitespace-pre-wrap">
            {TRAIN_MY_AI_PROMPT}
          </div>
        </div>
      </section>

      {/* Prompt Library */}
      <section className="container mx-auto px-4 max-w-6xl pt-16">
        <div className="text-center mb-8">
          <h2 className="font-display font-extrabold text-[28px] md:text-[32px] text-foreground">Prompt Library</h2>
          <p className="mt-2 font-sans text-[15px] text-[#94A3B8]">Ready-to-use prompts, organized by category.</p>
        </div>

        {/* Custom Instructions */}
        <div className="bg-[#0A0F1A] border border-[#2C4A73] rounded-2xl p-6 mb-8">
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

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`text-[13px] px-3 py-1.5 rounded-full transition-colors ${
                selectedCategory === c
                  ? "bg-[#447BBE] text-[#0A0F1A] font-semibold"
                  : "bg-[#0A0F1A] text-[#94A3B8] border border-[#2C4A73] hover:border-[#447BBE]/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? "s" : ""} found
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPrompts.map((p) => {
            const isExpanded = expanded.includes(p.id);
            return (
              <div key={p.id} className="bg-[#0A0F1A] border border-[#2C4A73] rounded-2xl p-6 flex flex-col gap-3">
                <span className={`self-start rounded-full px-3 py-1 text-[11px] font-medium ${categoryColor[p.category] || "bg-[#2C4A73] text-[#94A3B8]"}`}>
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

        {/* Bonus prompts */}
        <div className="mt-16">
          <h3 className="font-display font-bold text-[20px] text-[#E9E4A6] mb-6 text-center">Bonus Business Prompts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROMPTS.map((p, i) => (
              <Card key={i} className="group hover:border-primary/50 hover:shadow-[0_0_24px_rgba(68,123,190,0.18)]">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                      {i + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                  </div>
                  <pre className="font-mono text-sm bg-[#0A0F1A] text-foreground/90 border border-primary/40 rounded-md p-4 whitespace-pre-wrap break-words overflow-x-auto">
                    <code>{p.text}</code>
                  </pre>
                  <div>
                    <CopyBlock text={p.text} label="Copy" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <section className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-base text-muted-foreground mb-4">
            Want me to build these into your workflow?
          </p>
          <Button asChild size="lg">
            <Link to="/services">→ Work With Me on AI</Link>
          </Button>
        </section>
      </section>

      {/* Tools I Use */}
      <section id="tools" className="max-w-6xl mx-auto px-6 pt-20 pb-16 scroll-mt-24">
        <h2 className="font-display font-extrabold text-[28px] md:text-[32px] text-foreground text-center mb-2">
          Tools I Use
        </h2>
        <p className="font-sans text-[15px] text-[#94A3B8] text-center mb-8">
          Everything in my stack. No fluff. No sponsorships.
        </p>

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

      <div className="max-w-6xl mx-auto px-6 pb-16 text-center">
        <p className="font-sans text-[14px] text-[#94A3B8]">
          More tools coming soon. Have a prompt to share?
          <a href="mailto:zkadtani@gmail.com" className="text-[#447BBE] ml-1 hover:underline">
            Send it over.
          </a>
        </p>
      </div>
    </div>
  );
}
