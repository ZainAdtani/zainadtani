import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Shield,
  Youtube,
  Linkedin,
  Instagram,
  Mail,
  Wrench,
  Library,
  FolderGit2,
  User,
  Smartphone,
} from "lucide-react";

import { ScrollReveal } from "@/components/ScrollReveal";
import { ZLetterFeed } from "@/components/ZLetterFeed";
import { TodaysNoteStrip } from "@/components/TodaysNote";
import { TimeBar } from "@/components/TimeBar";
import { StarMap } from "@/components/home/StarMap";
import { AppsSection } from "@/components/home/AppsSection";
import { Button } from "@/components/ui/button";
import { BOOKS } from "@/data/books";
import { AMAZON_BOOKS } from "@/data/myBooks";
import { PARTNER_PLAN } from "@/data/ai-checkup";
import { BooksJsonLd } from "@/components/BooksJsonLd";
import {
  NEWSLETTER_HOST,
  NEWSLETTER_NAME,
  NEWSLETTER_SUBSCRIBE_URL,
  newsletterWithCadence,
  openNewsletterSignup,
} from "@/data/newsletter";
import headshotImage from "@/assets/zain-hero-portrait.png.asset.json";
import wavingHand from "@/assets/waving-hand.png";
import pokemonImg from "@/assets/pokemon-pokedex.png";

const CALENDLY_URL = "https://calendly.com/zkadtani";
const MISSED_CALL_CALCULATOR_URL = "/missed-call-calculator";
const OWNER_STRESS_TEST_URL = "/owner-stress-test";

const YOUTUBE_URL = "https://www.youtube.com/@BuildThenProtect";

const VISITOR_PATHS = [
  {
    icon: Bot,
    title: "Run on AI",
    body: "Help small businesses save time using practical AI systems, websites, and workflows.",
    cta: "Explore AI Services",
    to: "/services#ai-consulting",
  },
  {
    icon: BookOpen,
    title: "Publish Your Book",
    body: "Help authors and creators turn an idea into a finished book.",
    cta: "See Publishing Help",
    to: "/services#book-publishing",
  },
  {
    icon: Shield,
    title: "Protect Your Family",
    body: "Education about life insurance, living benefits, wills, trusts, and family protection.",
    cta: "Learn About Family Protection",
    to: "/family-protection-gap",
  },
];

const DISCOVERY = [
  {
    label: "Featured Resources",
    title: "Resources",
    body: "Guides, prompt library, and a map of everything on this site.",
    to: "/resources",
    icon: Library,
    internal: true,
  },
  {
    label: "Books",
    title: "Reading Library",
    body: `Notes and covers from the books I actually read. ${BOOKS.length} and counting.`,
    to: "/books",
    icon: BookOpen,
    internal: true,
  },
  {
    label: "Built by Z",
    title: "Projects",
    body: "Real builds, experiments, and tools made with AI.",
    to: "/projects",
    icon: FolderGit2,
    internal: true,
  },
  {
    label: "Built by Z",
    title: "Tools I Use",
    body: "The apps, devices, and software behind the daily work.",
    to: "/tools",
    icon: Wrench,
    internal: true,
  },
  {
    label: "Watch and Learn",
    title: "YouTube",
    body: "Walkthroughs and build videos, in plain language.",
    to: YOUTUBE_URL,
    icon: Youtube,
    internal: false,
  },
  {
    label: "About",
    title: "Meet Zain",
    body: "Who I am, what I build, and why I do this work.",
    to: "/about",
    icon: User,
    internal: true,
  },
  {
    label: "Local businesses",
    title: "Free AI Checkup",
    body: "A report card for your website, Google reviews, social pages, and AI search.",
    to: "/ai-checkup",
    icon: Bot,
    internal: true,
  },
  {
    label: "On the App Store",
    title: "iPhone apps",
    body: "BuzzerBlock, PathFolk, and NOMsters are on the App Store. Three more are on the way.",
    to: "/#apps",
    icon: Smartphone,
    internal: true,
  },
];

const FUN_PROJECTS = [
  {
    title: "Zain's Notion Pokédex",
    description:
      "All 151 original Pokémon. Every stat, type, height, weight, and HP. Filterable and built entirely in Notion.",
    image: pokemonImg,
    href: "/pokedex",
    badge: "151 Pokémon",
  },
  {
    title: "Harry Potter World",
    description:
      "A Hogwarts-themed hub built in Notion. Books, audiobooks, key story moments, and lore.",
    image: "/images/projects/harry-potter-world-cover.png",
    href: "/harry-potter",
    badge: "Hogwarts Built",
  },
];

const SOCIAL_GROUPS = [
  {
    platform: "YouTube",
    Icon: Youtube,
    links: [
      { label: "Build Then Protect", href: YOUTUBE_URL },
      { label: "History You Missed Daily", href: "https://www.youtube.com/@HistoryYouMissedDaily" },
      { label: "The AI You Missed", href: "https://www.youtube.com/@theaiyoumissed" },
    ],
  },
  {
    platform: "LinkedIn",
    Icon: Linkedin,
    links: [
      { label: "Zain Adtani", href: "https://www.linkedin.com/in/zainadtani" },
      { label: "Adtani Education Ventures", href: "https://www.linkedin.com/company/adtani-education-ventures" },
    ],
  },
  {
    platform: "Instagram",
    Icon: Instagram,
    links: [{ label: "@adtanieducationventures", href: "https://www.instagram.com/adtanieducationventures" }],
  },
  {
    platform: "Newsletter",
    Icon: Mail,
    links: [{ label: newsletterWithCadence(), href: NEWSLETTER_HOST }],
  },
];

const FINANCIAL_SITUATIONS = [
  {
    title: "Dying Too Soon",
    desc: "Your family keeps the house. Bills don't stop. Life insurance covers the gap.",
  },
  {
    title: "Living Too Long",
    desc: "Outliving your savings is a real risk. Retirement planning starts now, not at 60.",
  },
  {
    title: "Getting Sick and Not Dying",
    desc: "A serious illness can hurt your income and drain savings while you recover. The right protection helps cover the gap.",
  },
  {
    title: "No Will or Trust",
    desc: "Without one, the court decides what happens to everything you built. That's not a plan.",
  },
];

function Divider() {
  return <div className="hairline max-w-5xl mx-auto" />;
}

function SectionHead({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="font-display text-[30px] md:text-[40px] leading-[1.15] text-[#0A0F1A] mt-2">
        {title}
      </h2>
      {sub && <p className="font-sans text-[16px] leading-relaxed text-[#0A0F1A]/70 mt-3">{sub}</p>}
    </div>
  );
}

function subscribeToDailyZ(email: string): "ok" | "fallback" {
  return openNewsletterSignup(email);
}

type SubState = { kind: "idle" | "ok" | "error"; msg?: string };

function SubStatus({ state }: { state: SubState }) {
  if (state.kind === "idle") return null;
  return (
    <p role="status" aria-live="polite" className={`mt-2 font-sans text-[14px] font-medium ${state.kind === "error" ? "text-destructive" : "text-foreground"}`}>
      {state.msg}
    </p>
  );
}

const Index = () => {
  const [heroSub, setHeroSub] = useState<SubState>({ kind: "idle" });
  const [mainSub, setMainSub] = useState<SubState>({ kind: "idle" });
  const handleSub = (e: React.FormEvent<HTMLFormElement>, set: (s: SubState) => void) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
    const email = input?.value?.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      set({ kind: "error", msg: "Please enter a valid email address." });
      input?.focus();
      return;
    }
    subscribeToDailyZ(email);
    set({ kind: "ok", msg: `Almost done. Finish your signup for ${NEWSLETTER_NAME} in the new tab.` });
    input.value = "";
  };
  // Handle in-page anchors arriving from other routes.
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }
    }
  }, []);

  return (
    <div className="bg-white">
      <div id="top" />
      <Helmet>
        <title>Zain Adtani | AI Consultant · Author · Licensed Financial Professional</title>
        <meta
          name="description"
          content="AI Consultant, Author, and Licensed Financial Professional based in DFW Texas. I help small businesses run on AI, help creators publish books, and help families protect what they build."
        />
        <meta property="og:title" content="Zain Adtani | AI Consultant · Author · Licensed Financial Professional" />
        <meta
          property="og:description"
          content="AI Consultant, Author, and Licensed Financial Professional based in DFW Texas. I help small businesses run on AI, help creators publish books, and help families protect what they build."
        />
        <meta property="og:url" content="https://zainadtani.com" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://zainadtani.com" />
      </Helmet>
      <BooksJsonLd />

      <TimeBar />

      {/* 1 — HERO */}
      <section className="hero-warm px-5 py-10 sm:py-12 md:py-14 text-center">
        <div className="mx-auto max-w-3xl flex flex-col items-center">
          <div className="relative isolate w-48 h-48 sm:w-56 sm:h-56 shrink-0 mb-7">
            <div aria-hidden="true" className="hero-sun-blob absolute -inset-3 -z-10" />
            <img
              src={headshotImage.url}
              alt="Zain Adtani"
              className="w-full h-full rounded-full object-cover object-[center_18%] border-4 border-background"
              width={224}
              height={224}
              fetchPriority="high"
              onError={(event) => {
                const image = event.currentTarget;
                const fallback = `https://zainadtani.com${headshotImage.url}`;
                if (image.src !== fallback) image.src = fallback;
              }}
            />
          </div>
          <h1 className="hero-greeting text-[48px] sm:text-[60px] md:text-[72px] leading-[1.15] text-foreground">
            Hey friends <span className="sr-only">👋</span><img src={wavingHand} alt="" aria-hidden="true" className="inline-block align-[-0.08em] w-[0.8em] h-[0.8em]" />
          </h1>
          <svg aria-hidden="true" viewBox="0 0 310 30" className="hero-underline w-56 sm:w-72 h-7 mt-1" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
            <path d="M5 10 Q88 1 155 9 T305 7" />
            <path d="M13 21 Q95 15 156 20 T298 17" />
          </svg>
          <p className="max-w-2xl mt-5 font-sans text-[17px] sm:text-[20px] leading-relaxed text-foreground">
            I'm Z — AI consultant, author of <a href="#books" className="font-bold underline underline-offset-4 decoration-primary hover:text-primary">3 books</a>, and licensed financial professional helping families protect what they build.
          </p>
        </div>
      </section>

      <TodaysNoteStrip />

      <div className="border-y border-border bg-background px-5 py-4 text-center font-sans text-[13px] sm:text-[15px] font-medium text-foreground">
        3 books on Amazon · Licensed TX Life &amp; Health · Eagle Scout
      </div>

      {/* Hero actions */}
      <section aria-label="Get started" className="bg-background px-5 pt-6 text-center">
        <div className="mx-auto max-w-3xl flex flex-col items-center gap-3">
          <a href="#start" className="btn-cta w-full sm:w-auto">
            See how I can help
          </a>
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link to={MISSED_CALL_CALCULATOR_URL} className="btn-secondary-outline">
              Free Missed Call Calculator
            </Link>
            <Link to={OWNER_STRESS_TEST_URL} className="btn-secondary-outline">
              Take the Owner Stress Test
            </Link>
          </div>
        </div>
      </section>

      <section aria-label={`Join ${NEWSLETTER_NAME}`} className="bg-background px-5 py-6 sm:py-7 text-center">
        <form
          className="mx-auto max-w-lg"
          onSubmit={(e) => handleSub(e, setHeroSub)}
        >
          <div className="flex flex-col sm:flex-row gap-2">
            <label htmlFor="heroZletterEmail" className="sr-only">Email address for {NEWSLETTER_NAME}</label>
            <input
              id="heroZletterEmail"
              name="email"
              type="email"
              placeholder="Your email address"
              className="min-w-0 flex-1 rounded-lg border border-input bg-background px-4 py-3 font-sans text-[16px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
            <Button type="submit" variant="secondary" className="h-auto min-h-12 px-7 rounded-lg font-sans font-semibold text-[15px]">Join free</Button>
          </div>
          <p className="mt-2 font-sans text-[13px] text-muted-foreground">Two minutes. No fluff. Free forever.</p>
          <SubStatus state={heroSub} />
        </form>
      </section>

      <StarMap />

      {/* 2 — VISITOR PATHS */}
      <section id="how-i-help" className="section-y bg-white scroll-mt-20">
        <div className="container mx-auto px-5 sm:px-6 max-w-6xl">
          <SectionHead
            eyebrow="Start here"
            title="How can I help you?"
            sub="One partner. Three ways forward."
          />
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
              {VISITOR_PATHS.map(({ icon: Icon, title, body, cta, to }) => (
                <div key={title} className="surface-card p-7 flex flex-col">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#447BBE]/10 text-[#447BBE]">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-[20px] text-[#0A0F1A] mt-4">{title}</h3>
                  <p className="font-sans text-[15px] leading-relaxed text-[#0A0F1A]/70 mt-2 flex-1">
                    {body}
                  </p>
                  <Link to={to} className="btn-cta mt-6 w-full">
                    {cta}
                  </Link>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <div className="mt-7 flex flex-col items-start justify-between gap-4 rounded-lg border border-border bg-accent/25 p-6 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <p className="font-sans text-base leading-7 text-foreground">Own a local business? Get a free report card on how you show up on Google and AI search.</p>
              <p className="mt-1 font-sans text-[14px] leading-6 text-foreground/75">
                If you want the gaps handled each month, the Local AI Visibility Partner is ${PARTNER_PLAN.monthlyPrice}/month.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <Button asChild variant="outline" className="h-auto min-h-12 shrink-0 whitespace-normal px-5 py-3 font-semibold text-primary">
                <Link to="/ai-checkup">Free AI Checkup <ArrowRight aria-hidden="true" /></Link>
              </Button>
              <Link to="/ai-checkup#partner" className="font-sans text-[14px] font-semibold text-[#2F5C90] underline underline-offset-4">
                See the ${PARTNER_PLAN.monthlyPrice}/month plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      <AppsSection />

      <Divider />

      {/* 3 — BOOKS */}
      <section id="books" className="section-y bg-white scroll-mt-20">
        <div className="container mx-auto px-5 sm:px-6 max-w-6xl">
          <SectionHead
            eyebrow="Author"
            title="My books"
            sub="Three books, all live on Amazon. Pick the one that fits where you are."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            {AMAZON_BOOKS.map((book) => (
              <ScrollReveal key={book.asin}>
                <div className="rounded-2xl surface-warm border border-[#D97706]/25 p-6 flex flex-col items-center text-center h-full">
                  <div className="w-[130px] shrink-0">
                    <div className="w-full aspect-[2/3] rounded-xl bg-white p-2 shadow-[0_6px_20px_rgba(10,15,26,0.10)]">
                      <img
                        src={`https://images-na.ssl-images-amazon.com/images/P/${book.asin}.01.LZZZZZZZ.jpg`}
                        alt={`${book.title} book cover by Zain Adtani`}
                        className="w-full h-full object-contain"
                        width={130}
                        height={195}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-white border border-[#447BBE]/30 px-3 py-1 font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-[#2F5C90] mt-4">
                    {book.format}
                  </span>
                  <h3 className="font-display text-[22px] leading-tight text-[#0A0F1A] mt-3">
                    {book.title}
                  </h3>
                  <p className="font-sans text-[14px] leading-relaxed text-[#0A0F1A]/75 mt-2 flex-1">
                    {book.blurb}
                  </p>
                  <a
                    href={`https://www.amazon.com/dp/${book.asin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cta w-full mt-5"
                  >
                    Get It on Amazon — {book.price}
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* 4 — THE Z LETTER */}
      <section id="z-letter" className="section-y bg-white scroll-mt-20">
        <div className="container mx-auto px-5 sm:px-6 max-w-3xl">
          <SectionHead
            eyebrow={newsletterWithCadence()}
            title={`Get ${NEWSLETTER_NAME}`}
            sub="One useful money idea and one fun thing in your inbox every morning. Two minutes. No fluff. Free forever."
          />
          <form
            className="mt-8 max-w-md mx-auto flex flex-col gap-3"
            onSubmit={(e) => handleSub(e, setMainSub)}
          >
            <label htmlFor="zletterEmail" className="sr-only">
              Email address
            </label>
            <input
              id="zletterEmail"
              name="email"
              type="email"
              placeholder="you@email.com"
              className="w-full rounded-xl border border-[#447BBE]/30 bg-white px-5 py-3.5 font-sans text-[16px] text-[#0A0F1A] placeholder:text-[#0A0F1A]/40 focus:outline-none focus:border-[#447BBE]"
            />
            <button type="submit" className="btn-cta w-full">
              Send Me {NEWSLETTER_NAME}
            </button>
            <p className="text-center font-sans text-[13px] text-[#0A0F1A]/60">
              Every morning. Unsubscribe anytime.
            </p>
            <div className="text-center"><SubStatus state={mainSub} /></div>
          </form>
        </div>

        <div className="mt-10">
          <p className="text-center font-sans text-[14px] font-semibold tracking-wide text-[#0A0F1A]/70 mb-4">
            Fresh from the inbox
          </p>
          <ZLetterFeed />
        </div>
      </section>

      <Divider />

      {/* 5 — FEATURED CONTENT / DISCOVERY */}
      <section className="section-y bg-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-6xl">
          <SectionHead
            eyebrow="Explore"
            title="Featured content"
            sub="Everything here is real work you can read, use, or watch today."
          />
          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
              {DISCOVERY.map(({ label, title, body, to, icon: Icon, internal }) => {
                const inner = (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#447BBE]/10 text-[#447BBE]">
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <span className="font-sans text-[11px] font-semibold tracking-[0.14em] uppercase text-[#A85B05]">
                        {label}
                      </span>
                    </div>
                    <h3 className="font-display text-[18px] text-[#0A0F1A] mt-4">{title}</h3>
                    <p className="font-sans text-[14px] leading-relaxed text-[#0A0F1A]/70 mt-1.5 flex-1">
                      {body}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold text-[#2F5C90] mt-4">
                      Open <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </>
                );
                return internal ? (
                  <Link key={title} to={to} className="surface-card p-6 flex flex-col">
                    {inner}
                  </Link>
                ) : (
                  <a
                    key={title}
                    href={to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="surface-card p-6 flex flex-col"
                  >
                    {inner}
                  </a>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* 6 — MEET ZAIN */}
      <section className="section-y bg-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-4xl">
          <div className="rounded-2xl border border-[#447BBE]/18 bg-white p-7 md:p-10 shadow-[0_6px_22px_rgba(10,15,26,0.06)]">
            <p className="eyebrow">Meet Zain</p>
            <h2 className="font-display text-[28px] md:text-[36px] leading-tight text-[#0A0F1A] mt-2">
              Hi, I'm Z.
            </h2>
            <p className="font-sans text-[16px] md:text-[17px] leading-relaxed text-[#0A0F1A]/75 mt-4">
              Hey friends. I'm Zain, but most people call me Z.
            </p>
            <p className="font-sans text-[16px] md:text-[17px] leading-relaxed text-[#0A0F1A]/75 mt-3">
              I'm an AI consultant, a licensed financial professional, and an author, based in
              Dallas-Fort Worth.
            </p>
            <p className="font-sans text-[16px] md:text-[17px] leading-relaxed text-[#0A0F1A]/75 mt-3">
              I teach families how money actually works. Then I help them protect it. I'm licensed
              in Texas for life and health insurance.
            </p>
            <p className="font-sans text-[16px] md:text-[17px] leading-relaxed text-[#0A0F1A]/75 mt-3">
              I also help small businesses use practical AI without the overwhelm, and I help
              people publish the book they keep putting off.
            </p>
            <p className="font-sans text-[16px] md:text-[17px] leading-relaxed text-[#0A0F1A]/75 mt-3">
              I've written three books on Amazon.
            </p>
            <p className="font-sans text-[16px] md:text-[17px] leading-relaxed text-[#0A0F1A]/75 mt-3">
              Education first. No pitch. No pressure.
            </p>
            <p className="font-sans text-[16px] md:text-[17px] leading-relaxed text-[#0A0F1A]/75 mt-3">
              Every morning I send The Z Letter: one useful money idea, one fun thing, and one line
              to remember.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 font-sans font-semibold text-[15px] text-[#2F5C90] mt-6 underline-offset-4 hover:underline"
            >
              More about me <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <Divider />

      {/* 7 — CURRENT PROJECTS + SOCIAL */}
      <section className="section-y bg-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-6xl">
          <SectionHead
            eyebrow="Built by Z"
            title="Things I'm building"
            sub="Side builds and experiments. Same curiosity, less pressure."
          />
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
              {FUN_PROJECTS.map((p) => (
                <Link key={p.title} to={p.href} className="surface-card overflow-hidden flex flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#F3F6FA]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      width={640}
                      height={360}
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 font-sans text-[11px] font-semibold tracking-wide text-[#0A0F1A]">
                      {p.badge}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col gap-2 flex-1">
                    <h3 className="font-display text-[18px] text-[#0A0F1A]">{p.title}</h3>
                    <p className="font-sans text-[14px] leading-relaxed text-[#0A0F1A]/70 flex-1">
                      {p.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold text-[#2F5C90] mt-2">
                      Open <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>

          <div className="mt-8 rounded-xl border border-[#447BBE]/15 bg-[#F7F9FC] px-5 py-5">
            <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-[#0A0F1A]/70">
              Follow the build
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {SOCIAL_GROUPS.map(({ platform, Icon, links }) => (
                <div key={platform}>
                  <p className="flex items-center gap-2 font-sans text-[14px] font-semibold text-[#0A0F1A]">
                    <Icon className="w-4 h-4 text-[#447BBE]" aria-hidden="true" />
                    {platform}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-sans text-[14px] text-[#2F5C90] underline underline-offset-4 hover:text-[#DD5013] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#447BBE] rounded"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-4">
              <Link
                to="/lab"
                className="font-sans text-[14px] text-[#2F5C90] underline-offset-4 hover:underline"
              >
                Explore the Lab
              </Link>
              <Link
                to="/resources/investing"
                className="font-sans text-[14px] text-[#2F5C90] underline-offset-4 hover:underline"
              >
                My Investing Stack
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* 8 — FINANCIAL EDUCATION */}
      <section className="section-y bg-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-4xl">
          <SectionHead
            eyebrow="Financial education"
            title="It's not about how much you earn. It's about how much you keep and grow."
            sub="Most families earn decent money and still feel behind. Not because of income. Because nobody taught them the four situations that either protect a family or break one."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            {FINANCIAL_SITUATIONS.map((c) => (
              <div key={c.title} className="surface-card p-6">
                <h3 className="font-display text-[17px] text-[#0A0F1A]">{c.title}</h3>
                <p className="font-sans text-[14px] leading-relaxed text-[#0A0F1A]/70 mt-2">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl surface-warm border border-[#D97706]/25 p-7 md:p-9 text-center">
            <p className="font-sans text-[11px] font-semibold tracking-[0.14em] uppercase text-[#A85B05]">
              Free resource
            </p>
            <h3 className="font-display text-[22px] md:text-[26px] leading-tight text-[#0A0F1A] mt-2">
              View the 30-Min Financial Education Deck
            </h3>
            <p className="font-sans text-[15px] leading-relaxed text-[#0A0F1A]/75 mt-3 max-w-xl mx-auto">
              A simple walkthrough of the four financial situations most families avoid: dying too
              soon, living too long, getting sick and not dying, and having no will or trust.
              Education only, at your own pace.
            </p>
            <a
              href="https://gamma.app/docs/Master-BOP-75tzizrns082stq"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta mt-6"
            >
              Open the Deck
            </a>
          </div>
        </div>
      </section>

      <Divider />

      {/* 9 — FINAL CTA */}
      <section id="contact" className="section-y bg-white scroll-mt-20">
        <div className="container mx-auto px-5 sm:px-6 max-w-2xl text-center">
          <h2 className="font-display text-[30px] md:text-[40px] leading-[1.15] text-[#0A0F1A]">
            Ready to build something useful?
          </h2>
          <p className="font-sans text-[16px] leading-relaxed text-[#0A0F1A]/70 mt-4">
            Whether it's a website, a book, or a smarter way to run your business, let's talk. First
            call is free.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">
              Book a Call
            </a>
            <a
              href={NEWSLETTER_SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-outline"
            >
              Join {NEWSLETTER_NAME}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
