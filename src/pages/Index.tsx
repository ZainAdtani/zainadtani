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
      className="rounded-xl overflow-hidden bg-[#0F1D2E] border border-[#2C4A73] flex flex-col transition-all duration-200 ease-out hover:-translate-y-1"
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
  return (
    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center md:py-12">
      {/* Left */}
      <div className="order-2 md:order-1 flex flex-col gap-5">
        <span className="inline-flex w-fit items-center gap-2 text-[12px] font-medium tracking-widest uppercase text-[#E9E4A6] bg-white/10 border border-white/25 rounded-full px-4 py-1.5">
          AI Consultant · Author · Financial Educator
        </span>
        <h1 className="font-display font-extrabold text-[36px] md:text-[52px] leading-[1.1] text-[#447BBE]">
          <span className="block">Build with AI.</span>
          <span className="block">Publish your book.</span>
          <span className="block">Protect your family.</span>
        </h1>
        <p className="font-sans text-[16px] md:text-[17px] text-white max-w-[520px]">
          I'm Zain Adtani. I help businesses run on AI, help creators publish books, and help families protect what they build. One partner, three ways forward.
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-4">
          <a
            href="https://calendly.com/zkadtani"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#DD5013] text-white font-display font-semibold px-6 py-3 rounded-[10px] text-[15px] hover:opacity-90 transition-opacity"
          >
            Book a Call
          </a>
          <a
            href="#how-i-help"
            className="inline-flex items-center text-white font-sans font-medium text-[15px] underline-offset-4 hover:underline"
          >
            See how I help →
          </a>
        </div>
      </div>

      {/* Right: photo — fully visible (object-contain), never crops */}
      <div className="order-1 md:order-2 flex items-center justify-center md:py-8">
        <div
          className="relative rounded-full overflow-hidden bg-[#0F1D2E] flex items-center justify-center"
          style={{
            width: "min(80vw, 320px)",
            height: "min(80vw, 320px)",
            maxWidth: 320,
            maxHeight: 320,
            border: "4px solid #447BBE",
            boxShadow:
              "0 0 0 6px rgba(255,255,255,0.15), 0 0 48px rgba(68,123,190,0.55), 0 20px 60px rgba(0,0,0,0.45)",
          }}
        >
          <img
            src={headshotImage}
            alt="Zain Adtani — AI Consultant, Author, Financial Educator"
            className="w-full h-full object-contain object-center"
          />
        </div>
      </div>
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
        <title>Zain Adtani | AI Consultant · Author · Financial Educator</title>
        <meta name="description" content="AI Consultant, Author, and Financial Educator based in DFW Texas. I help small businesses run on AI, help creators publish books, and help families protect what they build." />
        <meta property="og:title" content="Zain Adtani | AI Consultant · Author · Financial Educator" />
        <meta property="og:description" content="AI Consultant, Author, and Financial Educator based in DFW Texas. I help small businesses run on AI, help creators publish books, and help families protect what they build." />
        <meta property="og:url" content="https://zainadtani.com" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://zainadtani.com" />
      </Helmet>

      <TimeBar />

      {/* Hero Section */}
      <section
        className="relative w-full pt-8 pb-12 overflow-hidden bg-[#0F1D2E]"
      >
        <HeroBlock headshotImage={headshotImage} />
      </section>

      {/* ZAP REST — Featured Book */}
      <section className="bg-[#0F1D2E] py-14">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-10 bg-[#0E1628] border border-[#447BBE] rounded-2xl p-8 md:p-10">
            {/* Book Cover */}
            <div className="flex-shrink-0">
              <img
                src="https://images-na.ssl-images-amazon.com/images/P/B0H51RJL7R.01.LZZZZZZZ.jpg"
                alt="ZAP REST book cover by Zain Adtani"
                className="w-36 md:w-44 rounded-xl shadow-2xl"
                style={{ boxShadow: "0 8px 32px rgba(68,123,190,0.35)" }}
              />
            </div>
            {/* Book Info */}
            <div className="flex flex-col gap-4 flex-1 text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="inline-flex items-center gap-1 bg-[#DD5013]/15 border border-[#DD5013]/40 text-[#DD5013] text-[11px] font-semibold tracking-widest uppercase rounded-full px-3 py-1">
                  📚 Now Live on Amazon
                </span>
                <span className="inline-flex items-center gap-1 bg-[#447BBE]/15 border border-[#447BBE]/40 text-[#447BBE] text-[11px] font-semibold tracking-widest uppercase rounded-full px-3 py-1">
                  Kindle + Paperback
                </span>
              </div>
              <h2 className="font-display text-[26px] md:text-[32px] leading-tight text-white">
                ZAP REST
              </h2>
              <p className="font-sans text-[15px] text-[#E9E4A6]/90 max-w-xl">
                Your first step to waking up without anxiety. A practical guide to building a morning routine that fights anxiety before it starts. Written by Zain Adtani.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
                <a
                  href="https://www.amazon.com/dp/B0H51RJL7R"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-[#DD5013] text-white font-sans font-semibold px-6 py-3 rounded-xl text-[14px] hover:opacity-90 transition-opacity"
                >
                  Get It on Amazon — $9.99 →
                </a>
                <a
                  href="https://the-z-letter.beehiiv.com/subscribe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-[#447BBE] text-[#447BBE] font-sans font-semibold px-6 py-3 rounded-xl text-[14px] hover:bg-[#447BBE]/10 transition-colors"
                >
                  Join The Z Letter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* How I Help */}
      <ScrollReveal delay={50}>
      <section id="how-i-help" className="bg-[#0F1D2E] py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-[#447BBE] text-center">HOW I HELP</p>
          <h2 className="font-display font-extrabold text-[36px] md:text-[44px] leading-[1.15] text-[#447BBE] text-center mt-3">
            One partner. Three ways forward.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
            {[
              { title: "Run on AI", body: "For businesses. Simple AI systems, websites, and automations that put you ahead." },
              { title: "Publish Your Book", body: "For creators. Go from idea to published, with AI doing the heavy lifting." },
              { title: "Protect Your Family", body: "For families. Life insurance, wills and trusts, and a plan so one bad day doesn't undo years of work." },
            ].map((c) => (
              <div
                key={c.title}
                className="bg-[#0F1D2E] border border-[#2C4A73] rounded-[14px] p-8 flex flex-col transition-all duration-200 hover:-translate-y-1 hover:border-[#447BBE]"
              >
                <h3 className="font-display font-extrabold text-[22px] text-[#447BBE]">{c.title}</h3>
                <p className="font-sans text-[15px] text-white mt-3 flex-1">{c.body}</p>
                <a
                  href="https://calendly.com/zkadtani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center bg-[#DD5013] text-white font-sans font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Book a Call
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Follow The Build — Social Pills */}
      <ScrollReveal delay={50}>
      <section className="bg-[#0F1D2E] py-20">
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

      {/* Selected Work */}
      <ScrollReveal delay={50}>
      <section className="bg-[#0F1D2E] py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-[#447BBE] text-center">SELECTED WORK</p>
          <h2 className="font-display font-extrabold text-[36px] md:text-[44px] leading-[1.15] text-[#447BBE] text-center mt-3">
            Real projects. Useful outcomes.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
            {[
              { title: "AI Training", body: "Delivered a paid hands-on Claude training session for professionals through a Lockheed connection." },
              { title: "Karmz IV Digital Build", body: "Created a complete wellness clinic website concept and digital customer journey using AI tools." },
              { title: "Book Publishing", body: "Built practical systems for writing, formatting, and publishing books with AI and Amazon KDP." },
            ].map((c) => (
              <div
                key={c.title}
                className="bg-[#0F1D2E] border border-[#2C4A73] rounded-[14px] p-8 flex flex-col transition-all duration-200 hover:-translate-y-1 hover:border-[#447BBE]"
              >
                <h3 className="font-display font-extrabold text-[20px] text-[#447BBE]">{c.title}</h3>
                <p className="font-sans text-[15px] text-white mt-3 flex-1">{c.body}</p>
                <span className="mt-6 font-sans text-[13px] text-[#94A3B8]">Case study coming soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Three Problems. One Trusted Partner. */}
      <section className="bg-[#0F1D2E] py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-[#447BBE] text-center">THREE PROBLEMS. ONE TRUSTED PARTNER.</p>
          <h2 className="font-display font-extrabold text-[36px] md:text-[44px] leading-[1.15] text-[#447BBE] text-center mt-3">
            Build faster. Publish your ideas. Protect your family.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
            {[
              { title: "Your Business Is Losing Time", body: "Simple AI systems, websites, and workflows built around how your business operates.", cta: "Build My AI System", service: "ai-system" },
              { title: "Your Book Is Still an Idea", body: "Turn your knowledge or story into a finished book ready for publishing.", cta: "Publish My Book", service: "book" },
              { title: "Your Family Has Protection Gaps", body: "Understand life insurance, wills and trusts, and the risks most families overlook.", cta: "Review My Family Plan", service: "family-plan" },
            ].map((c) => (
              <div
                key={c.title}
                className="bg-[#0F1D2E] border border-[#2C4A73] rounded-[14px] p-8 flex flex-col transition-all duration-200 hover:-translate-y-1 hover:border-[#447BBE]"
              >
                <h3 className="font-display font-extrabold text-[20px] text-[#447BBE]">{c.title}</h3>
                <p className="font-sans text-[15px] text-white mt-3 flex-1">{c.body}</p>
                <a
                  href={`https://calendly.com/zkadtani?service=${c.service}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center bg-[#DD5013] text-white font-sans font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
                >
                  {c.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />


      {/* Newsletter — The Z Letter */}
      <ScrollReveal delay={100}>
      <section id="z-letter" className="py-20 bg-[#0F1D2E]">
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
              className="w-full bg-[#0F1D2E] border border-[#2C4A73] rounded-xl px-5 py-3.5 font-sans text-[15px] text-[#F1F5F9] placeholder-[#6B7280] focus:outline-none focus:border-[#447BBE] transition-colors"
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
      <section className="py-20 bg-[#0F1D2E]">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-[#DD5013]">
            FINANCIAL EDUCATION
          </p>
          <h2 className="font-display font-extrabold text-[36px] md:text-[44px] leading-[1.15] text-[#E9E4A6] mt-3">
            It's not about how much you earn. It's about how much you keep and grow.
          </h2>
          <p className="font-sans text-[16px] text-white/80 mt-5 max-w-[640px] mx-auto">
            Most families earn decent money and still feel behind. Not because of income. Because nobody taught them the four situations that either protect a family or break one.
          </p>

          {/* 4 situation cards */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {[
              { icon: "🛡️", title: "Dying Too Soon", desc: "Your family keeps the house. Bills don't stop. Life insurance covers the gap." },
              { icon: "⏳", title: "Living Too Long", desc: "Outliving your savings is a real risk. Retirement planning starts now, not at 60." },
              { icon: "🏥", title: "Getting Sick and Not Dying", desc: "A serious illness can hurt your income and drain savings while you recover. The right protection helps cover the gap." },
              { icon: "📜", title: "No Will or Trust", desc: "Without one, the court decides what happens to everything you built. That's not a plan." },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-[10px] p-4 transition-colors duration-200"
                style={{ background: "#0E1628", border: "1px solid #1a2a45" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#447BBE")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1a2a45")}
              >
                <div className="text-2xl">{c.icon}</div>
                <h3 className="font-display font-bold text-[18px] text-[#E9E4A6] mt-2">{c.title}</h3>
                <p className="font-sans text-[14px] text-white/75 mt-1">{c.desc}</p>
              </div>
            ))}
          </div>

          {/* What If You Could box */}
          <div
            className="mt-8 rounded-[12px] p-5 text-left"
            style={{ background: "#0c1322", border: "1px solid #447BBE" }}
          >
            <p className="font-sans text-[11px] font-semibold tracking-widest uppercase text-[#DD5013]">
              The Question
            </p>
            <p className="font-display font-extrabold text-[16px] text-white mt-2 leading-snug">
              What if you could learn these concepts, apply them to your own life, and protect your family before a crisis hits?
            </p>
            <ul className="mt-4 space-y-1.5 font-sans text-[13px] text-white/75">
              <li>✓ One free 30-minute session. No sales pitch.</li>
              <li>✓ Understand your family's actual coverage gaps.</li>
              <li>✓ Walk away knowing exactly what to do next.</li>
            </ul>
          </div>

          {/* Free Resource card */}
          <div
            className="mt-8 mx-auto max-w-2xl rounded-2xl p-8 md:p-10"
            style={{
              background: "linear-gradient(180deg, #0F1626 0%, #0F1D2E 100%)",
              border: "1px solid #447BBE",
              boxShadow: "0 0 32px rgba(68,123,190,0.18), 0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <p className="font-sans text-[11px] font-semibold tracking-widest uppercase text-[#447BBE]">
              Free Resource
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
            </div>
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
            <Button asChild variant="outline" size="sm" className="border-border/60 bg-transparent hover:border-primary/60 hover:shadow-[0_0_12px_rgba(68,123,190,0.2)] transition-all duration-300 gap-2 px-6">
              <a href="https://youtube.com/@buildthenprotect?si=xqttG0cSsbVtBcNn" target="_blank" rel="noopener noreferrer">
                <Youtube className="w-4 h-4 text-red-500" />
                YouTube
              </a>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-border/60 bg-transparent hover:border-primary/60 hover:shadow-[0_0_12px_rgba(68,123,190,0.2)] transition-all duration-300 gap-2 px-6">
              <a href="https://www.linkedin.com/in/zainadtani/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 text-blue-500" />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>

      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Final CTA — Let's Work Together */}
      <ScrollReveal delay={50}>
      <section id="contact" className="py-20 bg-[#0F1D2E]">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-[#447BBE]">LET'S WORK TOGETHER</p>
          <h2 className="font-display font-extrabold text-[40px] md:text-[48px] leading-[1.15] text-[#447BBE] mt-3">
            <span className="block">Ready to Build</span>
            <span className="block">Something Real?</span>
          </h2>
          <p className="font-sans text-[16px] text-white/80 mt-4">
            Whether it's a website, a book, or a smarter way to run your business — let's talk. First call is free.
          </p>
          <a
            href="https://calendly.com/zkadtani"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#DD5013] text-white font-display font-semibold px-8 py-3.5 rounded-xl text-[15px] hover:opacity-90 transition-opacity mt-8"
          >
            Book a Free Call →
          </a>
          <p className="font-sans text-[13px] text-[#94A3B8] mt-4">
            No pressure. Start with a clear conversation.
          </p>
          <div className="mt-10 pt-6 border-t border-[#2C4A73]/60 flex flex-col sm:flex-row gap-3 justify-center items-center text-[13px]">
            <Link to="/lab" className="font-sans text-[#94A3B8] hover:text-[#447BBE] transition-colors">
              Explore what I build for fun →
            </Link>
            <span className="hidden sm:inline text-[#2C4A73]">·</span>
            <Link to="/resources/investing" className="font-sans text-[#94A3B8] hover:text-[#447BBE] transition-colors">
              My Investing Stack →
            </Link>
          </div>
        </div>
      </section>
      </ScrollReveal>

    </div>;
};
export default Index;
