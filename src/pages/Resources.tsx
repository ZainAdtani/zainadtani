import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MinimalHeader } from "@/components/home/MinimalHome";

interface ResourcePost {
  category: string;
  title: string;
  text: string;
  link: { label: string; to: string; external?: boolean };
}

const POSTS: ResourcePost[] = [
  {
    category: "Free tool",
    title: "Free Missed Call Calculator",
    text: "See what missed calls cost your business each month. Free, and it takes two minutes.",
    link: { label: "Open the calculator", to: "/missed-call-calculator" },
  },
  {
    category: "Quiz",
    title: "The Owner Stress Test",
    text: "A short test that shows where your business is leaking time and money.",
    link: { label: "Take the test", to: "/owner-stress-test" },
  },
  {
    category: "Free guide",
    title: "The AI Checkup",
    text: "A plain English checkup of where AI can save your business time first.",
    link: { label: "Start the checkup", to: "/ai-checkup" },
  },
  {
    category: "Prompt library",
    title: "My Prompt Library",
    text: "The prompts I actually use in my work, free to copy.",
    link: { label: "Browse the prompts", to: "/ai-prompts" },
  },
  {
    category: "Quiz",
    title: "Term Life vs Whole Life",
    text: "Not sure which life insurance fits you? This short quiz shows the difference in plain words.",
    link: { label: "Take the quiz", to: "/resources/term-vs-whole-life-quiz" },
  },
  {
    category: "Newsletter",
    title: "The Z Letter",
    text: "My short daily note on AI, money, and building. Two minutes, no fluff.",
    link: { label: "Read The Z Letter", to: "/the-z-letter" },
  },
  {
    category: "Free courses",
    title: "Claude Academy",
    text: "Free courses from Anthropic on Claude, Claude Code and AI agents. The best free classroom I have found.",
    link: { label: "Visit Claude Academy", to: "https://academy.claude.com", external: true },
  },
  {
    category: "Prompt library",
    title: "prompts.chat",
    text: "A big free library of prompts for writing, coding, images and research. I grab from it often.",
    link: { label: "Visit prompts.chat", to: "https://prompts.chat", external: true },
  },
  {
    category: "Free tools",
    title: "OpenAlternative",
    text: "Free, open source swaps for the paid tools you use every day. Check here before you renew anything.",
    link: { label: "Visit OpenAlternative", to: "https://openalternative.co", external: true },
  },
  {
    category: "Free API keys",
    title: "NVIDIA Build",
    text: "Free API keys for strong AI models like Kimi, GLM and DeepSeek. Good for testing ideas at zero cost.",
    link: { label: "Visit NVIDIA Build", to: "https://build.nvidia.com", external: true },
  },
  {
    category: "AI builder",
    title: "Google AI Studio",
    text: "Describe an app and Google's agent builds it. A fast free way to test an idea.",
    link: { label: "Visit Google AI Studio", to: "https://aistudio.google.com", external: true },
  },
  {
    category: "Security tool",
    title: "Strix",
    text: "An open source tool that attacks your app like a hacker and shows you the holes first. Sharp, and worth it.",
    link: { label: "Visit Strix", to: "https://strix.ai", external: true },
  },
];

export default function Resources() {
  return (
    <div className="np min-h-screen">
      <Helmet>
        <title>Resources — Tools, Books & Links I Recommend | Zain Adtani</title>
        <meta name="description" content="A curated library of tools, books, articles, and links Zain Adtani recommends for AI, building small businesses, writing, and personal growth." />
        <meta property="og:title" content="Resources — Zain Adtani's Recommended Tools & Reading" />
        <meta property="og:description" content="Curated tools, books, articles, and links for AI, small business, writing, and personal growth." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://zainadtani.com/resources" />
      </Helmet>

      <MinimalHeader />

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-6">
        <h1 className="np-serif text-[34px] leading-tight">Resources</h1>
        <p className="np-muted mt-3 text-[16px] leading-relaxed">
          Tools, guides, and finds I actually use or recommend. Newest first.
        </p>

        <ol className="mt-14 space-y-14">
          {POSTS.map((post, i) => (
            <li key={post.title} className="flex gap-5">
              <span className="np-muted np-serif w-8 shrink-0 pt-1 text-right text-[15px]" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="np-muted text-[13px] tracking-wide">
                  {post.category}
                </p>
                <h2 className="np-serif mt-2 text-[22px] leading-snug">{post.title}</h2>
                <p className="mt-2 text-[16px] leading-relaxed">{post.text}</p>
                <p className="mt-3 text-[16px]">
                  {post.link.external ? (
                    <a href={post.link.to} target="_blank" rel="noopener noreferrer" className="np-link">
                      {post.link.label}
                    </a>
                  ) : (
                    <Link to={post.link.to} className="np-link">
                      {post.link.label}
                    </Link>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="np-muted mt-20 text-[13px]">
          Some finds first seen on{" "}
          <a href="https://nicksaraev.com/resources" target="_blank" rel="noopener noreferrer" className="np-link">
            nicksaraev.com/resources
          </a>
          .
        </p>
      </main>
    </div>
  );
}
