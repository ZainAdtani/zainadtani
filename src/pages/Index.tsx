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
      <ScrollReveal>
      <section className="pt-12 md:pt-20 pb-12 md:pb-20 bg-gradient-hero bg-dot-grid">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-14">
            <div className="flex-1 text-center md:text-left space-y-5">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-foreground leading-tight animate-hero-rise">
                I Help Businesses Use AI.{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  I Help Creators Publish Books. Both in weeks, not years.
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0 animate-hero-rise" style={{ animationDelay: "200ms" }}>
                Strategy to shipped. No fluff. Real results.
              </p>
              <a href="#z-letter" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors animate-hero-rise" style={{ animationDelay: "300ms" }}>
                Read the latest issue of The Z Letter →
              </a>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-hero-rise" style={{ animationDelay: "400ms" }}>
                <span className="cta-gradient-border">
                  <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 rounded-full px-8 text-base font-semibold border-0">
                    <Link to="/services">Work With Me on AI →</Link>
                  </Button>
                </span>
                <span className="cta-gradient-border">
                  <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 rounded-full px-8 text-base font-semibold border-0">
                    <Link to="/services">Help Me Publish My Book →</Link>
                  </Button>
                </span>
              </div>
              <p className="text-base font-normal text-muted-foreground/80 italic animate-hero-rise" style={{ animationDelay: "550ms" }}>
                Helping businesses and creators across DFW and beyond.
              </p>
            </div>

            {/* Profile photo */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <img
                src={headshotImage}
                alt="Zain Adtani — AI Consultant and Author"
                className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full object-cover object-top animate-glow-pulse"
              />
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* About Zain */}
      <ScrollReveal delay={50}>
        <section className="py-20 max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">A little about me</h2>
          <p className="text-muted-foreground text-center text-base mb-10">Engineer. Eagle Scout. Published author. Based in DFW.</p>
          <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
            I am Zain. Mechanical Engineer by degree. Builder by obsession. I run Adtani Education Ventures LLC, where I help small businesses implement AI into their daily workflows, and I help everyday people write, format, and publish their first book on Amazon — in weeks, not years. Eagle Scout. Trilingual. Based in DFW, Texas. Let's build something.
          </p>
          <Link to="/about" className="text-primary hover:underline font-medium">
            Read my full story →
          </Link>
        </section>
      </ScrollReveal>

      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* How I Help Section */}
      <ScrollReveal delay={100}>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">Here's How We Can Work Together</h2>
          <p className="text-muted-foreground text-center text-base mb-10">Pick your path. Let's get to work.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8 border border-border/50 hover:border-primary/60 border-t-2 border-t-primary bg-card text-card-foreground hover:shadow-[0_8px_32px_rgba(0,212,170,0.2)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
              <div className="text-5xl mb-3">💻</div>
              <h3 className="text-xl font-bold text-foreground mb-2">Done-For-You AI Websites</h3>
              <p className="text-base font-normal text-muted-foreground mb-4">Fast, modern websites built in days, not months using Lovable and AI. You bring the vision. I handle design, copy, build, and launch. Live in under two weeks.</p>
              <div className="mt-auto">
                <Button asChild size="sm" className="rounded-full bg-gradient-to-r from-[#00D4AA] to-[#3B82F6] text-white hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,212,170,0.3)] transition-all duration-200">
                  <a href="#contact">Get Started</a>
                </Button>
              </div>
            </Card>
            <Card className="p-8 border border-border/50 hover:border-primary/60 border-t-2 border-t-primary bg-card text-card-foreground hover:shadow-[0_8px_32px_rgba(0,212,170,0.2)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
              <div className="text-5xl mb-3">📖</div>
              <h3 className="text-xl font-bold text-foreground mb-2">Publish Your Book</h3>
              <p className="text-base font-normal text-muted-foreground mb-4">You have a story. Let's get it on Amazon. I help you write, format, and publish on Kindle, paperback, and audiobook. From first draft to live listing, done with you.</p>
              <div className="mt-auto">
                <Button asChild size="sm" className="rounded-full bg-gradient-to-r from-[#00D4AA] to-[#3B82F6] text-white hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,212,170,0.3)] transition-all duration-200">
                  <a href="#contact">Get Started</a>
                </Button>
              </div>
            </Card>
            <Card className="p-8 border border-border/50 hover:border-primary/60 border-t-2 border-t-primary bg-card text-card-foreground hover:shadow-[0_8px_32px_rgba(0,212,170,0.2)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
              <div className="text-5xl mb-3">⚙️</div>
              <h3 className="text-xl font-bold text-foreground mb-2">AI Workflow Consulting</h3>
              <p className="text-base font-normal text-muted-foreground mb-4">Tired of doing the same tasks manually? I build custom AI systems for your business using Claude, Notion, and automation tools. One session can save you 10 hours a week.</p>
              <div className="mt-auto">
                <Button asChild size="sm" className="rounded-full bg-gradient-to-r from-[#00D4AA] to-[#3B82F6] text-white hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,212,170,0.3)] transition-all duration-200">
                  <a href="#contact">Get Started</a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Social Proof / Results Strip */}
      <ScrollReveal delay={80}>
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: "10+", label: "AI Systems Built" },
              { num: "2 Weeks", label: "Avg. Website Delivery" },
              { num: "1 Book Live", label: "on Amazon KDP" },
              { num: "250+", label: "Taught at Lockheed" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-[#0F2340] border-l-[3px] border-l-[#00D4AA] rounded-md p-6 flex flex-col items-start"
              >
                <div className="font-display font-extrabold text-[32px] leading-none text-[#00D4AA]">
                  {s.num}
                </div>
                <div className="mt-2 text-[14px] font-normal text-[#94A3B8]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* The Z Letter — Combined Section */}
      <ScrollReveal delay={100}>
      <section id="z-letter" className="py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">The Z Letter</h2>
          <p className="text-muted-foreground text-center text-base mb-6 inline-flex items-center gap-2 justify-center w-full">
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            One email every Sunday. No fluff. Just value.
          </p>
          <div className="text-center mb-10">
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-[#00D4AA] to-[#3B82F6] text-white hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,212,170,0.3)] transition-all duration-200 px-8 text-base font-semibold">
              <a href="https://thezletter.beehiiv.com/subscribe" target="_blank" rel="noopener noreferrer">
                Subscribe Free →
              </a>
            </Button>
          </div>
          <ZLetterFeed />
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

      {/* Let's Work Together / Contact */}
      <ScrollReveal delay={50}>
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4 max-w-2xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-foreground">
              Ready to Build Something?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you need an AI strategy, a website, or help publishing your book, let's talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-[#00D4AA] to-[#3B82F6] text-white hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,212,170,0.3)] transition-all duration-200 px-8 text-base font-semibold">
                <a href="https://calendly.com/zkadtani" target="_blank" rel="noopener noreferrer">Book a Call</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-[hsl(217,91%,60%)] text-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,60%)]/10 px-8 text-base font-semibold">
                <a href="mailto:zkadtani@gmail.com">Send Me an Email</a>
              </Button>
            </div>
          </div>
        </section>
      </ScrollReveal>

    </div>;
};
export default Index;
