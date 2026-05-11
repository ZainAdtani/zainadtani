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
    href: "https://zainadtani.notion.site/Zain-s-Notion-Pok-dex-3d1da8f06b194c24a7aeb9f54aa43294",
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
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center justify-center w-full bg-[#DD5013] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          {project.buttonText}
        </a>
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
      <section className="relative w-full bg-[#0A0F1A] pt-8 pb-0 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center md:py-12">
          {/* Left: text */}
          <div className="order-2 md:order-1 flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 text-[12px] font-medium tracking-widest uppercase text-[#447BBE] bg-[#447BBE]/10 border border-[#447BBE]/20 rounded-full px-4 py-1.5">
              AI Consultant · Author · Coach
            </span>
            <h1 className="font-display font-extrabold text-[36px] md:text-[52px] leading-[1.1] text-[#F1F5F9]">
              <span className="block">I Help Businesses</span>
              <span className="block">Run on AI.</span>
              <span className="block">I Help Creators</span>
              <span className="block">Publish Books.</span>
            </h1>
            <p className="font-sans text-[17px] text-[#94A3B8] max-w-[420px]">
              Strategy to shipped. No fluff. Real results.<br />
              Based in DFW, Texas.
            </p>
            <div className="flex gap-3 flex-wrap mt-2">
              <a
                href="https://calendly.com/zkadtani"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#447BBE] text-[#0A0F1A] font-display font-semibold px-6 py-3 rounded-[10px] text-[15px] hover:opacity-90 transition-opacity"
              >
                Book a Free Call
              </a>
              <a
                href="https://the-z-letter.beehiiv.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border-[1.5px] border-[#447BBE]/40 text-[#447BBE] font-display font-semibold px-6 py-3 rounded-[10px] text-[15px] hover:border-[#447BBE] transition-colors"
              >
                Read The Z Letter
              </a>
            </div>
            <p className="mt-4 font-sans text-[13px] text-[#6B7280]">
              📍 DFW, Texas  ·  🎓 UTSA Mechanical Engineer  ·  📚 Published Author
            </p>
          </div>

          {/* Right: photo */}
          <div
            className="order-1 md:order-2 relative rounded-2xl overflow-hidden md:max-h-[520px] border-2"
            style={{ borderColor: "#447BBE", boxShadow: "0 0 24px rgba(68, 123, 190, 0.3)" }}
          >
            <img
              src={headshotImage}
              alt="Zain Adtani — AI Consultant and Author"
              className="w-full h-full object-cover object-top max-h-[320px] md:max-h-[520px] rounded-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0F1A] to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

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

      {/* Let's Connect */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">Let's Connect</h2>
          <p className="text-muted-foreground text-center text-base mb-10">Find me on these platforms</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button asChild variant="outline" size="sm" className="border-border/60 bg-transparent hover:border-primary/60 hover:shadow-[0_0_12px_rgba(0,212,170,0.2)] transition-all duration-300 gap-2 px-6">
              <a href="https://youtube.com/@captainduaadventures?si=xPzuebAHwHZTl52V" target="_blank" rel="noopener noreferrer">
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

          <div className="text-center mt-10">
            <Link
              to="/fun-projects"
              className="inline-block border-2 border-[#447BBE] text-[#447BBE] font-semibold rounded-full bg-transparent hover:bg-[#447BBE] hover:text-white transition-colors duration-200"
              style={{ padding: "12px 32px" }}
            >
              See All Fun Projects →
            </Link>
          </div>
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

    </div>;
};
export default Index;
