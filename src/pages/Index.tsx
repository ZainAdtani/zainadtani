import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Youtube, Linkedin, X } from "lucide-react";

import { KineticText } from "@/components/KineticText";
import zaLogo from "@/assets/za_logo.png";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect, lazy, Suspense, useMemo } from "react";

const HeroLogo3D = lazy(() => import("@/components/HeroLogo3D"));
import { ScrollReveal } from "@/components/ScrollReveal";
import { ZLetterFeed } from "@/components/ZLetterFeed";
import pokemonImg from "@/assets/pokemon-pokedex.png";
import harryPotterImg from "@/assets/harry-potter-world.png";

interface FunProject {
  title: string;
  description: string;
  image: string;
  href: string;
  buttonText: string;
  badgeText: string;
  badgeBg: string;
  external?: boolean;
}

const FUN_PROJECTS: FunProject[] = [
  {
    title: "Zain's Notion Pokédex",
    description:
      "All 151 original Pokemon. Every stat, type, height, weight, and HP. Filterable by number, weight, height, type, and attack. Built entirely in Notion. Yes, I made this.",
    image: pokemonImg,
    href: "/pokedex",
    buttonText: "Open the Pokédex →",
    badgeText: "151 Pokémon",
    badgeBg: "#DD5013",
    external: true,
  },
  {
    title: "Harry Potter World",
    description:
      "A Hogwarts-themed hub built in Notion. Books, audiobooks, key story moments, and lore. For the obsessed.",
    image: harryPotterImg,
    href: "/harry-potter",
    buttonText: "Enter the Wizarding World →",
    badgeText: "Hogwarts Built",
    badgeBg: "#447BBE",
    external: false,
  },
];

function FunProjectCard({ project }: { project: FunProject }) {
  return (
    <div
      className="rounded-xl overflow-hidden bg-[#0F2340] border border-[#1E3A5F] flex flex-col transition-all duration-200 ease-out hover:-translate-y-1"
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.3)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "")}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
        <span
          className="absolute top-3 left-3 rounded-full text-white text-xs font-semibold"
          style={{ backgroundColor: project.badgeBg, padding: "8px 14px" }}
        >
          {project.badgeText}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent pointer-events-none" />
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <h3 className="font-sans font-bold text-xl text-white">{project.title}</h3>
        <p className="text-sm text-[#E9E4A6] flex-1">{project.description}</p>
        <Link
          to={project.href}
          className="mt-2 inline-flex items-center justify-center w-full bg-[#DD5013] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          {project.buttonText}
        </Link>
      </div>
    </div>
  );
}
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { TimeBar } from "@/components/TimeBar";
import { ALL_PRODUCTS } from "@/data/products";
import { BOOKS } from "@/data/books";


import headshotImage from "@/assets/zain-headshot.png";


const TABS = ["digital-products", "books"] as const;
type TabKey = (typeof TABS)[number];

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}
function getTabFromHash(hash: string): TabKey {
  const clean = hash.replace("#", "") as TabKey;
  return (TABS as readonly string[]).includes(clean) ? clean : "digital-products";
}
function withAffiliate(url: string, tag = "eng2ea-20") {
  try {
    const u = new URL(url);
    if (!u.searchParams.get("tag")) u.searchParams.set("tag", tag);
    u.searchParams.set("utm_source", "lovable");
    u.searchParams.set("utm_medium", "site");
    return u.toString();
  } catch {
    return url;
  }
}

const productCatalog = ALL_PRODUCTS.filter(p => p.id !== "free-community");

const HERO_TABS = [
  {
    key: "ai",
    label: "AI Consulting",
    h3: "Your competitors are already using AI. Are you?",
    body: "I audit your workflow, find the time leaks, and build a custom AI system. One session saves 5 to 10 hours a week.",
    cta: "Book a free audit →",
  },
  {
    key: "book",
    label: "Publish a Book",
    h3: "Your story deserves to be on Amazon, not in a Google Doc.",
    body: "I help you write, format, and publish your book in 30 days. Kindle, paperback, and audiobook. Done for you.",
    cta: "Let's publish yours →",
  },
  {
    key: "family",
    label: "Protect Your Family",
    h3: "Most families are one emergency away from a financial disaster.",
    body: "Life insurance, retirement, wills, critical illness. I walk families through all four. No pressure. Just education.",
    cta: "Get a free education session →",
  },
] as const;

const FREE_PROMPT = `You are an AI business assistant for [Business Name], a [type of business] in [city]. Your job is to help the owner answer customer questions, summarize emails, draft responses, and save time on admin tasks. Always be professional, friendly, and brief. Never make up information. If you don't know something, say so.`;

function HeroBlock({ headshotImage }: { headshotImage: string }) {
  const [tab, setTab] = useState<string>("ai");
  const [promptOpen, setPromptOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const active = HERO_TABS.find((t) => t.key === tab) ?? HERO_TABS[0];

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(FREE_PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center md:py-12">
      {/* Left */}
      <div className="order-2 md:order-1 flex flex-col gap-5">
        <span className="inline-flex w-fit items-center gap-2 text-[12px] font-medium tracking-widest uppercase text-[#E9E4A6] bg-white/10 border border-white/25 rounded-full px-4 py-1.5">
          AI Consultant · Author · Financial Educator
        </span>
        <h1 className="font-display font-extrabold text-[36px] md:text-[52px] leading-[1.1] text-[#E9E4A6]">
          <span className="block">I help businesses run on AI.</span>
          <span className="block">I help creators publish books.</span>
          <span className="block">I help families protect their future.</span>
        </h1>
        <p className="font-sans font-medium text-[16px] text-white">
          Real help. Real results. Based in DFW, Texas.
        </p>

        {/* Tab switcher */}
        <div
          role="tablist"
          aria-label="Service selector"
          className="inline-flex flex-wrap gap-2 p-1.5 bg-white/10 border border-white/20 rounded-full w-fit max-w-full"
        >
          {HERO_TABS.map((t) => {
            const isActive = t.key === tab;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(t.key)}
                className={`min-h-[44px] px-4 sm:px-5 rounded-full font-sans text-[13px] sm:text-[14px] font-semibold transition-all ${
                  isActive
                    ? "bg-white text-[#0A0F1A]"
                    : "bg-transparent text-white border border-white/70 hover:bg-white/10"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div key={active.key} className="animate-fade-in flex flex-col gap-3 pt-1" style={{ animationDuration: "100ms" }}>
          <h3 className="font-display font-extrabold text-[20px] md:text-[22px] leading-snug text-[#E9E4A6]">
            {active.h3}
          </h3>
          <p className="font-sans text-[14px] text-white/90 max-w-[480px]">{active.body}</p>
          <a
            href="https://calendly.com/zkadtani"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center justify-center border-[1.5px] border-white text-white font-sans font-semibold px-4 py-2 rounded-[8px] text-[13px] hover:bg-white hover:text-[#447BBE] transition-colors"
          >
            {active.cta}
          </a>
        </div>

        {/* Free Prompt CTA bar */}
        <div
          className="mt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between bg-[#0E1628] border border-[#447BBE]/70 rounded-full px-4 sm:px-5 py-3"
          style={{ boxShadow: "0 0 22px rgba(68,123,190,0.35)" }}
        >
          <div className="flex items-center gap-2 text-white font-sans text-[13px] sm:text-[14px]">
            <span aria-hidden="true">⚡</span>
            <span>Free: Copy my most-used AI prompt for small businesses.</span>
          </div>
          <button
            onClick={() => setPromptOpen(true)}
            className="inline-flex items-center justify-center bg-[#DD5013] text-white font-sans font-semibold text-[13px] px-4 py-2 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap min-h-[40px]"
          >
            Get the prompt →
          </button>
        </div>

        {/* Primary CTA */}
        <a
          href="https://calendly.com/zkadtani"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center justify-center bg-[#0A0F1A] text-white font-display font-semibold px-6 py-3 rounded-[10px] text-[15px] hover:opacity-90 transition-opacity w-full sm:w-auto sm:self-start"
        >
          Book a Free Call
        </a>
      </div>

      {/* Right: photo */}
      <div className="order-1 md:order-2 flex items-center justify-center md:py-8">
        <div
          className="relative rounded-full overflow-hidden"
          style={{
            width: "min(80vw, 280px)",
            height: "min(80vw, 280px)",
            maxWidth: 280,
            maxHeight: 280,
            border: "4px solid #447BBE",
            boxShadow:
              "0 0 0 6px rgba(255,255,255,0.15), 0 0 48px rgba(68,123,190,0.55), 0 20px 60px rgba(0,0,0,0.45)",
          }}
        >
          <img
            src={headshotImage}
            alt="Zain Adtani — AI Consultant and Author"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* Prompt Modal */}
      <Dialog open={promptOpen} onOpenChange={setPromptOpen}>
        <DialogContent className="max-w-lg bg-[#0A0F1A] border-[#447BBE]/60 text-white">
          <DialogHeader>
            <DialogTitle className="font-display text-[#E9E4A6]">Free AI Prompt for Small Businesses</DialogTitle>
            <DialogDescription className="text-white/70 font-sans">
              Copy, paste, and replace the bracketed parts with your details.
            </DialogDescription>
          </DialogHeader>
          <pre className="whitespace-pre-wrap bg-[#0E1628] border border-[#447BBE]/40 rounded-lg p-4 text-[13px] font-mono text-white/90 max-h-[300px] overflow-auto">
{FREE_PROMPT}
          </pre>
          <button
            onClick={copyPrompt}
            className="inline-flex items-center justify-center bg-[#DD5013] text-white font-sans font-semibold text-[14px] px-4 py-2.5 rounded-md hover:opacity-90 transition-opacity"
          >
            {copied ? "Copied!" : "Copy prompt"}
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
const Index = () => {
  const [activeTab, setActiveTab] = useState<TabKey>(() => getTabFromHash(window.location.hash));
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const [shuffleIndex, setShuffleIndex] = useState(0);
  const [isHoveringProducts, setIsHoveringProducts] = useState(false);
  const [productsFading, setProductsFading] = useState(false);

  const allFeatured = React.useMemo(() => {
    return productCatalog.filter(p => p.featured).sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }, []);

  useEffect(() => {
    if (isHoveringProducts || searchQuery.trim()) return;
    const timer = setInterval(() => {
      setProductsFading(true);
      setTimeout(() => {
        setShuffleIndex(prev => prev + 1);
        setProductsFading(false);
      }, 400);
    }, 27000);
    return () => clearInterval(timer);
  }, [isHoveringProducts, searchQuery]);

  const filteredProducts = React.useMemo(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return allFeatured.filter(p => p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));
    }
    const start = (shuffleIndex * 3) % allFeatured.length;
    const picked: typeof allFeatured = [];
    for (let i = 0; i < 3 && i < allFeatured.length; i++) {
      picked.push(allFeatured[(start + i) % allFeatured.length]);
    }
    return picked;
  }, [searchQuery, shuffleIndex, allFeatured]);

  const [bookShuffleIndex, setBookShuffleIndex] = useState(0);
  const [isHoveringBooks, setIsHoveringBooks] = useState(false);
  const [booksFading, setBooksFading] = useState(false);

  const displayedBooks = React.useMemo(() => {
    const allBooks = [...BOOKS];
    const start = (bookShuffleIndex * 3) % allBooks.length;
    const picked: typeof allBooks = [];
    for (let i = 0; i < 3 && i < allBooks.length; i++) {
      picked.push(allBooks[(start + i) % allBooks.length]);
    }
    return picked;
  }, [bookShuffleIndex]);

  useEffect(() => {
    if (isHoveringBooks) return;
    const timer = setInterval(() => {
      setBooksFading(true);
      setTimeout(() => {
        setBookShuffleIndex(prev => prev + 1);
        setBooksFading(false);
      }, 400);
    }, 27000);
    return () => clearInterval(timer);
  }, [isHoveringBooks]);


  useEffect(() => {
    const KEY = "bookCoversV2";
    const cache = JSON.parse(localStorage.getItem(KEY) || "{}");
    async function findCover({ title, author }: { title: string; author: string }): Promise<string | null> {
      try {
        const q = new URLSearchParams({ title, author }).toString();
        const res = await fetch(`https://openlibrary.org/search.json?${q}`);
        const data = await res.json();
        const best = data?.docs?.[0];
        const isbn = best?.isbn?.[0];
        if (isbn) return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
        if (best?.cover_i) return `https://covers.openlibrary.org/b/id/${best.cover_i}-L.jpg`;
      } catch {}
      try {
        const q = encodeURIComponent(`${title} ${author}`);
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=1`);
        const data = await res.json();
        const img = data?.items?.[0]?.volumeInfo?.imageLinks?.thumbnail || data?.items?.[0]?.volumeInfo?.imageLinks?.smallThumbnail;
        if (img) return img.replace(/^http:/, "https:");
      } catch {}
      return null;
    }
    (async () => {
      let changed = false;
      for (const b of BOOKS) {
        if (!b.cover) {
          const key = `${b.title}__${b.author}`.toLowerCase();
          if (cache[key]) {
            b.cover = cache[key];
          } else {
            const url = await findCover({ title: b.title, author: b.author });
            if (url) {
              b.cover = url;
              cache[key] = url;
              changed = true;
            }
          }
        }
      }
      if (changed) localStorage.setItem(KEY, JSON.stringify(cache));
    })();
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const next = getTabFromHash(window.location.hash);
      setActiveTab(next);
      if (document.readyState === "complete") {
        const el = document.getElementById("tabs-section");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }
    const newHash = `#${activeTab}`;
    if (window.location.hash !== newHash) {
      history.replaceState(null, "", newHash);
    }
    const el = document.getElementById("tabs-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeTab]);

  function favicon32(u?: string) {
    try {
      const x = new URL(u!);
      return `https://www.google.com/s2/favicons?domain=${x.hostname}&sz=128`;
    } catch {
      return "";
    }
  }

  return <div className="min-h-screen bg-background">
      <div id="top" />
      <Helmet>
        <title>Zain Adtani | AI Consultant + Author | DFW Texas</title>
        <meta name="description" content="Zain Adtani helps businesses implement AI and helps everyday people publish books. AI consulting, Lovable websites, and book coaching in DFW, Texas." />
        <meta property="og:title" content="Zain Adtani | AI Consultant + Author | DFW Texas" />
        <meta property="og:description" content="Zain Adtani helps businesses implement AI and helps everyday people publish books. AI consulting, Lovable websites, and book coaching in DFW, Texas." />
        <meta property="og:image" content={headshotImage} />
        <meta property="og:type" content="website" />
      </Helmet>

      <TimeBar />

      {/* Hero Section */}
      <section
        className="relative w-full pt-8 pb-0 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at top left, #5A8FD0 0%, #447BBE 40%, #2E5A93 100%)",
        }}
      >
        <HeroBlock headshotImage={headshotImage} />
      </section>

      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Follow The Build — Social Pills */}
      <ScrollReveal delay={50}>
      <section className="bg-[#0A0F1A] py-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-[#447BBE]">FOLLOW THE BUILD</p>
          <h2 className="font-display font-extrabold text-[40px] md:text-[52px] leading-[1.15] text-[#E9E4A6] mt-3">
            Find me everywhere.
          </h2>
          <p className="font-sans text-[16px] text-[#94A3B8] mt-4 max-w-2xl mx-auto">
            I post the real build across LinkedIn, YouTube, Instagram, and email. Follow wherever you scroll.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { icon: "▶️", label: "YouTube · @BuildThenProtect", href: "https://youtube.com/@buildthenprotect" },
              { icon: "in", label: "LinkedIn · Zain Adtani", href: "https://linkedin.com/in/zainadtani" },
              { icon: "in", label: "LinkedIn · Adtani Education Ventures", href: "https://linkedin.com/company/adtani-education-ventures" },
              { icon: "📸", label: "Instagram · @zainadtani", href: "https://instagram.com/zainadtani" },
              { icon: "📸", label: "Instagram · @adtanieducationventures", href: "https://instagram.com/adtanieducationventures" },
              { icon: "✉️", label: "The Z Letter", href: "https://the-z-letter.beehiiv.com" },
            ].map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0E1628] border border-[#447BBE]/60 text-white font-sans text-[14px] px-4 py-2.5 rounded-full hover:border-[#447BBE] hover:shadow-[0_0_18px_rgba(68,123,190,0.45)] transition-all duration-200"
              >
                <span className="text-[14px]">{s.icon}</span>
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* How Can I Help You? */}
      <section className="bg-[#0A0F1A] py-[100px]">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-[#447BBE] text-center">YOUR PROBLEM. MY SPECIALTY.</p>
          <h2 className="font-display font-extrabold text-[40px] md:text-[52px] leading-[1.15] text-[#F1F5F9] text-center mt-3">
            <span className="block">Most Businesses Are Leaving</span>
            <span className="block">Money on the Table.</span>
          </h2>
          <p className="font-sans text-[16px] text-[#94A3B8] text-center mt-4">
            Bad websites. Unwritten books. Wasted hours. I fix all three.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
            {[
              { icon: "🤖", title: "Your Website Is Costing You Clients", body: "If your site looks like 2015, people leave in 10 seconds. I build clean, fast, AI-powered websites that actually convert. Live in two weeks, not two months.", cta: "Let's build yours →" },
              { icon: "📖", title: "Your Book Is Still in Your Head", body: "You have a story worth publishing. I help you write it, format it, and get it live on Amazon. Kindle, paperback, audiobook. Done.", cta: "Let's publish yours →" },
              { icon: "⚡", title: "You Are Doing AI's Job By Hand", body: "You are spending hours on tasks Claude can do in minutes. I audit your workflow and build you a custom system. One session saves 5 to 10 hours a week.", cta: "Let's automate yours →" },
            ].map((c) => (
              <div
                key={c.title}
                className="bg-[#0F2340] border border-[#1E3A5F] rounded-[14px] p-8 transition-all duration-[250ms] hover:border-[rgba(0,212,170,0.4)] hover:-translate-y-[3px] flex flex-col"
              >
                <div className="text-3xl">{c.icon}</div>
                <h3 className="font-display font-bold text-[20px] text-[#FFFFFF] mt-4">{c.title}</h3>
                <p className="font-sans text-[15px] text-[#E9E4A6] mt-3 flex-1">{c.body}</p>
                <Link to="/services" className="inline-block mt-4 font-sans font-medium text-[14px] text-[#447BBE] hover:underline">
                  {c.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* The Journey Timeline */}
      <ScrollReveal delay={50}>
      <section className="bg-[#0A0F1A] py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center">
            <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-[#447BBE]">THE BUILD</p>
            <h2 className="font-display font-extrabold text-[40px] md:text-[52px] leading-[1.15] text-[#F1F5F9] mt-3">
              From engineer to founder, in public.
            </h2>
          </div>

          <ol className="relative mt-12 border-l-2 border-[#447BBE]/30 ml-2 space-y-8">
            {[
              { label: "Filed the LLC", body: "Filed Adtani Education Ventures LLC in Texas. $308, no lawyer." },
              { label: "Launched The Z Letter", body: "One practical AI idea every Sunday. Always free." },
              { label: "First paid AI consulting", body: "Taught Claude to an engineer and got paid in 30 minutes." },
              { label: "Started Build Then Protect", body: "Documenting the whole build on YouTube." },
              { label: "Stepped into gov contracting", body: "First site visit booked before registration was even active." },
            ].map((m, i) => (
              <li key={i} className="pl-6 relative">
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#447BBE] border-4 border-[#0A0F1A]" />
                <p className="font-display font-bold text-[18px] text-[#E9E4A6]">{m.label}</p>
                <p className="font-sans text-[15px] text-[#94A3B8] mt-1">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      </ScrollReveal>

      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Newsletter — The Z Letter */}
      <ScrollReveal delay={100}>
      <section id="z-letter" className="py-20 bg-[#0A0F1A]">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center">
            <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-[#447BBE]">FREE WEEKLY NEWSLETTER</p>
            <h2 className="font-display font-extrabold text-[40px] md:text-[48px] leading-[1.15] text-[#F1F5F9] mt-3">
              <span className="block">Subscribe to</span>
              <span className="block">The Z Letter</span>
            </h2>
            <p className="font-sans text-[16px] text-[#94A3B8] mt-4">
              Every Sunday I send one practical AI tip, one tool worth your time, and one idea that makes you think. No fluff. Always free.
            </p>
          </div>
          <div className="mt-8 max-w-md mx-auto flex flex-col gap-3">
            <input
              id="zletterEmail"
              type="email"
              placeholder="you@email.com"
              className="w-full bg-[#0F2340] border border-[#1E3A5F] rounded-xl px-5 py-3.5 font-sans text-[15px] text-[#F1F5F9] placeholder-[#6B7280] focus:outline-none focus:border-[#447BBE] transition-colors"
            />
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('zletterEmail') as HTMLInputElement;
                const email = el?.value?.trim();
                if (!email || !email.includes('@')) {
                  el?.focus();
                  return;
                }
                const url = 'https://magic.beehiiv.com/v1/dd1643e2-f274-43e4-b193-62276e3e3b48?email=' + encodeURIComponent(email);
                window.open(url, '_blank');
              }}
              className="w-full bg-[#447BBE] text-[#0A0F1A] font-display font-semibold text-[15px] px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
            >
              Subscribe Free →
            </button>
            <p className="text-center font-sans text-[13px] text-[#6B7280] mt-2">
              Sundays at 9AM Central. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Financial Education */}
      <ScrollReveal delay={50}>
      <section className="py-20 bg-[#0A0F1A]">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-[#DD5013]">
            FINANCIAL EDUCATION
          </p>
          <h2 className="font-display font-extrabold text-[40px] md:text-[48px] leading-[1.15] text-[#E9E4A6] mt-3">
            Protecting Families. Building Wealth.
          </h2>
          <p className="font-sans text-[16px] text-[#E9E4A6]/70 mt-5 max-w-2xl mx-auto">
            I help families understand the 4 financial situations most people never plan for. Life insurance. Retirement planning. Critical illness protection. Wills and trusts. No pressure. Just education.
          </p>

          <div
            className="mt-10 mx-auto max-w-2xl rounded-2xl p-8 md:p-10"
            style={{
              background: "linear-gradient(180deg, #0F1626 0%, #0A0F1A 100%)",
              border: "1px solid #447BBE",
              boxShadow: "0 0 32px rgba(68,123,190,0.18), 0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <p className="font-sans text-[11px] font-semibold tracking-widest uppercase text-[#447BBE]">
              Presentation
            </p>
            <h3 className="font-display font-bold text-[24px] md:text-[28px] leading-tight text-[#FFFFFF] mt-2">
              View the 30-Min Financial Education Deck
            </h3>
            <p className="font-sans text-[15px] text-[#E9E4A6]/80 mt-4 max-w-xl mx-auto">
              A simple walkthrough of the four financial situations most families avoid, dying too soon, living too long, getting sick and not dying, and having no will or trust.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
              <a
                href="https://gamma.app/docs/Master-BOP-75tzizrns082stq"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md font-sans font-semibold text-[15px] text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
                style={{ background: "#DD5013", boxShadow: "0 8px 24px rgba(221,80,19,0.35)" }}
              >
                Open the Deck
              </a>
              {/* Secondary "Download PDF" button is intentionally hidden until a PDF asset is uploaded. */}
            </div>

            <p className="font-sans text-[12px] text-[#E9E4A6]/60 mt-6">
              HGI Associate · NPN 20207668
            </p>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Let's Connect */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">Let's Connect</h2>
          <p className="text-muted-foreground text-center text-base mb-10">Find me on these platforms</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button asChild variant="outline" size="sm" className="border-border/60 bg-transparent hover:border-primary/60 hover:shadow-[0_0_12px_rgba(0,212,170,0.2)] transition-all duration-300 gap-2 px-6">
              <a href="https://youtube.com/@buildthenprotect?si=xqttG0cSsbVtBcNn" target="_blank" rel="noopener noreferrer">
                <Youtube className="w-4 h-4 text-red-500" />
                YouTube
              </a>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-border/60 bg-transparent hover:border-primary/60 hover:shadow-[0_0_12px_rgba(0,212,170,0.2)] transition-all duration-300 gap-2 px-6">
              <a href="https://www.linkedin.com/in/zainadtani/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 text-blue-500" />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>

      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* My Personal Investing Stack */}
      <ScrollReveal delay={50}>
      <section className="py-20 bg-[#0A0F1A]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-[#447BBE]">
              WHAT I ACTUALLY DO WITH MONEY
            </p>
            <h2
              className="text-[#F1F5F9] text-4xl md:text-5xl mt-3"
              style={{ fontFamily: '"Luckiest Guy", cursive' }}
            >
              My Personal Investing Stack.
            </h2>
            <p className="font-sans text-[15px] mt-4 max-w-2xl mx-auto" style={{ color: "#E9E4A6" }}>
              Not financial advice. Just what I personally hold and why. Do your own research.
            </p>
          </div>

          {(() => {
            type Item = { ticker: string; name: string; desc: string; href?: string };
            const columns: { header: string; items: Item[] }[] = [
              {
                header: "My Top Holdings",
                items: [
                  { ticker: "NVDA", name: "Nvidia", desc: "AI infrastructure. The picks and shovels of the AI gold rush." },
                  { ticker: "GOOGL", name: "Google", desc: "AI, cloud, search, YouTube. Too many moats to ignore." },
                  { ticker: "AAPL", name: "Apple", desc: "Everyone has one. Ecosystem lock-in is undefeated." },
                ],
              },
              {
                header: "My Roth IRA",
                items: [
                  { ticker: "VOO", name: "Vanguard S&P 500", desc: "The whole market. Set it and forget it." },
                  { ticker: "SCHD", name: "Schwab Dividend", desc: "Dividend growth. Gets paid while I sleep." },
                  { ticker: "QQQM", name: "Invesco Nasdaq", desc: "Tech heavy. Long on the future." },
                ],
              },
              {
                header: "Where I Hold It",
                items: [
                  { ticker: "Fidelity", name: "", desc: "Roth IRA home base.", href: "https://www.fidelity.com" },
                  { ticker: "Robinhood", name: "", desc: "Individual stocks and DCA.", href: "https://robinhood.com" },
                  { ticker: "Marcus Savings", name: "", desc: "High yield cash reserve.", href: "https://www.marcus.com" },
                ],
              },
            ];
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {columns.map((col) => (
                  <div key={col.header} className="flex flex-col gap-4">
                    <h3 className="font-display font-bold text-xl text-[#F1F5F9]">{col.header}</h3>
                    {col.items.map((it) => {
                      const cardInner = (
                        <div
                          className="rounded-[10px] p-4 transition-colors duration-200"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(68,123,190,0.15)",
                            borderLeft: "3px solid #447BBE",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "rgba(68,123,190,0.08)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)")
                          }
                        >
                          <div className="font-sans font-bold text-white text-[15px]">
                            {it.ticker}
                            {it.name ? (
                              <span className="text-white/70 font-medium"> · {it.name}</span>
                            ) : null}
                          </div>
                          <p className="font-sans text-[13px] mt-1" style={{ color: "#E9E4A6" }}>
                            {it.desc}
                          </p>
                        </div>
                      );
                      return it.href ? (
                        <a
                          key={it.ticker}
                          href={it.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          {cardInner}
                        </a>
                      ) : (
                        <div key={it.ticker}>{cardInner}</div>
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          })()}

          <p className="text-center font-sans text-[12px] text-[#6B7280] mt-10 max-w-2xl mx-auto">
            This is not financial advice. These are my personal holdings for educational purposes only.
          </p>
        </div>
      </section>
      </ScrollReveal>

      {/* Final CTA — Let's Work Together */}
      <ScrollReveal delay={50}>
      <section id="contact" className="py-20 bg-[#0A0F1A]">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-[#447BBE]">LET'S WORK TOGETHER</p>
          <h2 className="font-display font-extrabold text-[40px] md:text-[48px] leading-[1.15] text-[#F1F5F9] mt-3">
            <span className="block">Ready to Build</span>
            <span className="block">Something Real?</span>
          </h2>
          <p className="font-sans text-[16px] text-[#94A3B8] mt-4">
            Whether it's a website, a book, or a smarter way to run your business — let's talk. First call is free.
          </p>
          <a
            href="https://calendly.com/zkadtani"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#447BBE] text-[#0A0F1A] font-display font-semibold px-8 py-3.5 rounded-xl text-[15px] hover:opacity-90 transition-opacity mt-8"
          >
            Book a Free Call →
          </a>
          <p className="font-sans text-[13px] text-[#6B7280] mt-4">
            No pitch. No pressure. Just a real conversation.
          </p>
        </div>
      </section>
      </ScrollReveal>

      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Just For Fun teaser */}
      <ScrollReveal delay={50}>
      <section
        className="px-6"
        style={{ backgroundColor: "rgba(68, 123, 190, 0.04)", paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-[#447BBE]">JUST FOR FUN</p>
            <h2 className="font-display text-[40px] md:text-[56px] leading-[1.1] text-[#F1F5F9] mt-3">
              Not Everything Has to Make Money.
            </h2>
            <p className="font-sans text-[16px] text-[#E9E4A6] mt-4">
              Sometimes I build things because they're cool. Pokemon. Harry Potter. More coming.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FUN_PROJECTS.map((p) => (
              <FunProjectCard key={p.title} project={p} />
            ))}
          </div>

        </div>
      </section>
      </ScrollReveal>

    </div>;
};
export default Index;
