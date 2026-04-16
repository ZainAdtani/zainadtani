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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-foreground leading-tight">
                I Help Businesses Use AI.{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  I Help Creators Publish Books. Both in weeks, not years.
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
                Strategy to shipped. No fluff. Real results.
              </p>
              <a href="#z-letter" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                Read the latest issue of The Z Letter →
              </a>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="bg-gradient-to-r from-[#00D4AA] to-[#3B82F6] text-white hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,212,170,0.3)] transition-all duration-200 rounded-full px-8 text-base font-semibold">
                  <Link to="/services">Work With Me on AI →</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 rounded-full px-8 text-base font-semibold">
                  <Link to="/services">Help Me Publish My Book →</Link>
                </Button>
              </div>
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
          <p className="text-muted-foreground text-center text-base mb-10">Engineer, Eagle Scout, and aspiring author based in DFW.</p>
          <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
            I am Zain. Engineer by training. Builder by obsession. I help small businesses plug AI into their work, and I help everyday people turn their story into a real book on Amazon. Based in DFW, Texas. Let's build something.
          </p>
          <Link to="/about" className="text-primary hover:underline font-medium">
            Read my full story →
          </Link>
        </section>
      </ScrollReveal>

      <div className="h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* How I Help Section */}
      <ScrollReveal delay={100}>
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">Here's How We Can Work Together</h2>
          <p className="text-muted-foreground text-center text-base mb-10">Pick your path. Let's get to work.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8 border border-border/50 hover:border-primary/60 border-t-2 border-t-primary bg-card text-card-foreground hover:shadow-[0_8px_32px_rgba(0,212,170,0.2)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
              <div className="text-5xl mb-3">💻</div>
              <h3 className="text-xl font-bold text-foreground mb-2">Done-For-You AI Websites</h3>
              <p className="text-sm text-muted-foreground mb-4">Fast, modern websites built in days, not months. You run the business. I run the tech. Live in under two weeks. ⚡</p>
              <div className="mt-auto">
                <Button asChild size="sm" className="rounded-full bg-gradient-to-r from-[#00D4AA] to-[#3B82F6] text-white hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,212,170,0.3)] transition-all duration-200">
                  <a href="#contact">Get Started</a>
                </Button>
              </div>
            </Card>
            <Card className="p-8 border border-border/50 hover:border-primary/60 border-t-2 border-t-primary bg-card text-card-foreground hover:shadow-[0_8px_32px_rgba(0,212,170,0.2)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
              <div className="text-5xl mb-3">📖</div>
              <h3 className="text-xl font-bold text-foreground mb-2">Publish Your Book</h3>
              <p className="text-sm text-muted-foreground mb-4">You have a book in you. Let's get it out. I help you write, format, and publish on Amazon. Kindle, paperback, and audiobook ready. 📖</p>
              <div className="mt-auto">
                <Button asChild size="sm" className="rounded-full bg-gradient-to-r from-[#00D4AA] to-[#3B82F6] text-white hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,212,170,0.3)] transition-all duration-200">
                  <a href="#contact">Get Started</a>
                </Button>
              </div>
            </Card>
            <Card className="p-8 border border-border/50 hover:border-primary/60 border-t-2 border-t-primary bg-card text-card-foreground hover:shadow-[0_8px_32px_rgba(0,212,170,0.2)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
              <div className="text-5xl mb-3">💰</div>
              <h3 className="text-xl font-bold text-foreground mb-2">Creator Monetization</h3>
              <p className="text-sm text-muted-foreground mb-4">Got an audience but no product? I help creators turn knowledge into digital products using AI. You bring the audience. I bring the build. We split the win. 💰</p>
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

      {/* The Z Letter — Combined Section */}
      <ScrollReveal delay={100}>
      <section id="z-letter" className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">The Z Letter</h2>
          <p className="text-muted-foreground text-center text-base mb-6">One email every Sunday. No fluff. Just value.</p>
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

      {/* Tabbed Sections */}
      <ScrollReveal delay={100}>
      <section id="tabs-section" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">Digital Products</h2>
          <p className="text-muted-foreground text-center text-base mb-10">Tools and resources I have built for you.</p>
          <Tabs value={activeTab} onValueChange={v => setActiveTab(v as TabKey)} className="w-full" aria-label="Zain site sections">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-auto">
              <TabsTrigger value="digital-products" className="text-xs sm:text-sm px-2 py-2.5">
                Digital Products
              </TabsTrigger>
              <TabsTrigger value="books" className="text-xs sm:text-sm px-2 py-2.5">
                Books
              </TabsTrigger>
            </TabsList>

            {/* Digital Products Tab */}
            <TabsContent value="digital-products" className="space-y-6">
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="flex items-center justify-between w-full mb-2">
                  <div className="flex-1" />
                  <p className="text-sm font-semibold text-muted-foreground tracking-wider">Digital Product HQ</p>
                  <div className="flex-1 flex justify-end">
                    <Button asChild variant="outline" size="sm">
                      <Link to="/digital-products">View All Products →</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-400 ${productsFading ? "opacity-0" : "opacity-100"}`}
                onMouseEnter={() => setIsHoveringProducts(true)}
                onMouseLeave={() => setIsHoveringProducts(false)}
              >
                {filteredProducts.map((product, index) => (
                  <ScrollReveal key={product.id} delay={index * 100}>
                  <Card className="overflow-hidden hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,212,170,0.15)] transition-all duration-300 shadow-lg border-2 flex flex-col">
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-2 text-foreground line-clamp-2">{product.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{product.desc}</p>
                      {product.media && (
                        <div className="relative mb-4 overflow-hidden rounded-lg bg-muted/50 flex items-center justify-center">
                          <img src={product.media} alt={product.title} className="w-full h-40 object-cover" loading="lazy" />
                        </div>
                      )}
                      <div className="mt-auto flex flex-col gap-2">
                        {product.cta && (
                          <Button asChild className="w-full rounded-full bg-gradient-cta text-white hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
                            <a href={product.cta.href} target="_blank" rel="noopener noreferrer" aria-label={`Get ${product.title}`}>
                              {product.cta.label}
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                  </ScrollReveal>
                ))}
              </div>
            </TabsContent>

            {/* Books Tab */}
            <TabsContent value="books" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Books I'm Reading & Recommend</h3>
                  <p className="text-muted-foreground">A rotating selection from my reading journey</p>
                </div>
                <Button asChild variant="outline">
                  <Link to="/books">View All Books →</Link>
                </Button>
              </div>

              <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-400 ${booksFading ? "opacity-0" : "opacity-100"}`}
                onMouseEnter={() => setIsHoveringBooks(true)}
                onMouseLeave={() => setIsHoveringBooks(false)}
              >
                {displayedBooks.map(book => <Card key={book.title + book.author} className="overflow-hidden hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,212,170,0.15)] transition-all duration-500 shadow-lg border-2 group">
                    <div className="absolute top-4 right-4 z-10 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                      {book.status === "READ" ? "✓ Read" : book.status === "IN_PROGRESS" ? "Reading" : "To Read"}
                    </div>
                    <div className="p-6 flex flex-col h-full">
                      <div className="relative mb-4 rounded-xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
                        <div className="aspect-[2/3] bg-accent/20">
                          <img src={book.cover ?? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect fill='%23e5e7eb' width='200' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%239ca3af'%3EBook Cover%3C/text%3E%3C/svg%3E"} alt={`Book cover: ${book.title} by ${book.author}`} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" loading="lazy" onError={e => {
                            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect fill='%23e5e7eb' width='200' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%239ca3af'%3EBook Cover%3C/text%3E%3C/svg%3E";
                          }} />
                        </div>
                      </div>
                      <h4 className="font-bold text-xl mb-1 text-foreground line-clamp-2">{book.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{book.author}</p>
                      {book.rating && <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => <span key={i} className={i < book.rating! ? "text-yellow-500" : "text-muted-foreground/30"}>★</span>)}
                        </div>}
                      {book.notes && <p className="text-xs text-muted-foreground mb-4 flex-grow italic">{book.notes}</p>}
                      <div className="flex flex-col gap-2 mt-auto">
                        {(book.myThoughts || book.notes) && <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="w-full text-xs rounded-full">View my thoughts</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg">
                              <DialogHeader>
                                <DialogTitle>{book.title}</DialogTitle>
                                <DialogDescription>by {book.author}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 text-sm text-foreground">
                                {book.myThoughts && <div><p className="font-semibold mb-1">My thoughts</p><p className="whitespace-pre-wrap">{book.myThoughts}</p></div>}
                                {book.notes && <div><p className="font-semibold mb-1">Summary / notes</p><p className="italic text-muted-foreground whitespace-pre-wrap">{book.notes.length > 600 ? book.notes.slice(0, 597) + "..." : book.notes}</p></div>}
                              </div>
                            </DialogContent>
                          </Dialog>}
                        {book.link && <Button asChild variant="outline" size="sm" className="w-full text-xs rounded-full font-semibold transition-all duration-300 hover:shadow-lg">
                            <a href={book.link} target="_blank" rel="noopener noreferrer">View on Amazon</a>
                          </Button>}
                      </div>
                    </div>
                  </Card>)}
              </div>
            </TabsContent>

          </Tabs>
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
            <Button asChild size="sm" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-300 hover:shadow-lg gap-2 px-6">
              <a href="https://youtube.com/@captainduaadventures?si=xPzuebAHwHZTl52V" target="_blank" rel="noopener noreferrer">
                <Youtube className="w-4 h-4" />
                YouTube
              </a>
            </Button>
            <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-300 hover:shadow-lg gap-2 px-6">
              <a href="https://www.linkedin.com/in/zainadtani/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4" />
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
