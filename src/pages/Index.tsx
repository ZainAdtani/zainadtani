import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BookOpen, ExternalLink, Youtube, Linkedin, X } from "lucide-react";
import WhatIFollow from "@/components/WhatIFollow";
import { KineticText } from "@/components/KineticText";
import zaLogo from "@/assets/za_logo.png";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect, lazy, Suspense, useMemo } from "react";

const HeroLogo3D = lazy(() => import("@/components/HeroLogo3D"));
import { ScrollReveal } from "@/components/ScrollReveal";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { TimeBar } from "@/components/TimeBar";
import { ALL_PRODUCTS } from "@/data/products";
import { BOOKS } from "@/data/books";
import { QUOTES_AND_NOTES } from "@/data/quotes";
import { PODCASTS } from "@/data/podcasts";
import { ROLE_MODELS } from "@/data/roleModels";
import headshotImage from "@/assets/zain-headshot.png";
import qbBadge from "@/assets/quickbooks-level2-badge.png";
import awsBadge from "@/assets/aws-cloud-practitioner-badge.png";
import eagleScoutBadge from "@/assets/eagle-scout-badge.png";

function faviconFor(url: string) {
  try {
    const u = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=128`;
  } catch {
    return "https://www.google.com/s2/favicons?domain=example.com&sz=128";
  }
}
const TABS = ["digital-products", "books", "credentials", "role-models"] as const;
type TabKey = (typeof TABS)[number];

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}
function getTabFromHash(hash: string): TabKey {
  const clean = hash.replace("#", "") as TabKey;
  if (clean === "certifications" as any) return "credentials";
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
  const [quote, setQuote] = useState("");
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

  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * QUOTES_AND_NOTES.length);
    setQuote(QUOTES_AND_NOTES[randomIndex]);
  };

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
      <section className="pt-12 md:pt-20 pb-12 md:pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-14">
            <div className="flex-1 text-center md:text-left space-y-5">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-foreground leading-tight">
                I Help Businesses Use AI.{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  I Help Creators Publish Books.
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
                Bridging the gap between human creativity and AI efficiency to help you publish faster and scale smarter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-base font-semibold">
                  <Link to="/services">Work With Me</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary/10 rounded-full px-8 text-base font-semibold">
                  <a href="#tabs-section">See What I've Built</a>
                </Button>
              </div>
            </div>

            {/* Profile photo */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <img
                src={headshotImage}
                alt="Zain Adtani — AI Consultant and Author"
                className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full object-cover object-top"
                style={{ boxShadow: '0 0 0 4px hsl(168 100% 42% / 0.35), 0 0 30px hsl(168 100% 42% / 0.15)' }}
              />
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* About Zain */}
      <ScrollReveal delay={50}>
        <section className="py-10 md:py-14 max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-display font-extrabold mb-6 text-foreground">About Zain</h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            I'm Zain Adtani. Mechanical Engineer from UTSA turned AI Consultant.
            I help businesses implement AI and I help creators publish books.
            Eagle Scout. Husband. Builder.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["UTSA Mechanical Engineering", "Eagle Scout", "AWS Certified", "PMP (In Progress)", "4 Languages"].map((cred) => (
              <span key={cred} className="rounded-full border border-primary/40 text-primary text-sm px-4 py-1.5">
                {cred}
              </span>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Daily Motivation Generator */}
      <ScrollReveal delay={50}>
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-lg">
          <Card className="p-6 shadow-lg border-2 border-primary/20 bg-card text-card-foreground">
            <div className="space-y-4">
              <h3 className="text-lg flex items-center justify-center gap-2 font-semibold text-foreground">
                <Sparkles className="w-5 h-5 text-primary" />
                Daily Motivation Generator
              </h3>
              <Textarea value={quote} readOnly placeholder="Click the button below to generate a quote or life note..." className="min-h-[120px] text-base resize-none bg-muted text-foreground text-center" />
              <Button onClick={generateQuote} className="w-full bg-gradient-cta text-primary-foreground hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
                Generate Daily Motivation
              </Button>
            </div>
          </Card>
        </div>
      </section>
      </ScrollReveal>

      {/* How I Help Section */}
      <ScrollReveal delay={100}>
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">Here's How We Can Work Together</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 border border-border bg-card text-card-foreground hover:border-primary/50 hover:shadow-[0_4px_24px_rgba(0,212,170,0.12)] transition-all duration-300">
              <div className="text-3xl mb-3">📖</div>
              <h3 className="text-lg font-bold text-foreground mb-2">Publish Your Book</h3>
              <p className="text-sm text-muted-foreground">You have a story worth sharing. I help everyday people use AI to write, format, and publish on Amazon in weeks — not years.</p>
            </Card>
            <Card className="p-6 border border-border bg-card text-card-foreground hover:border-primary/50 hover:shadow-[0_4px_24px_rgba(0,212,170,0.12)] transition-all duration-300">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="text-lg font-bold text-foreground mb-2">AI for Your Business</h3>
              <p className="text-sm text-muted-foreground">Stop guessing with AI. I help small businesses actually implement it — save time, and grow revenue without the overwhelm.</p>
            </Card>
            <Card className="p-6 border border-border bg-card text-card-foreground hover:border-primary/50 hover:shadow-[0_4px_24px_rgba(0,212,170,0.12)] transition-all duration-300">
              <div className="text-3xl mb-3">💻</div>
              <h3 className="text-lg font-bold text-foreground mb-2">Done-For-You Websites</h3>
              <p className="text-sm text-muted-foreground">Modern AI-powered websites built with Lovable. Fast, clean, and ready to convert. No tech headaches for you.</p>
            </Card>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Tabbed Sections */}
      <ScrollReveal delay={100}>
      <section id="tabs-section" className="py-10 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <Tabs value={activeTab} onValueChange={v => setActiveTab(v as TabKey)} className="w-full" aria-label="Zain site sections">
            <TabsList className="grid w-full grid-cols-4 mb-8 h-auto">
              <TabsTrigger value="digital-products" className="text-xs sm:text-sm px-2 py-2.5">
                Digital Products
              </TabsTrigger>
              <TabsTrigger value="books" className="text-xs sm:text-sm px-2 py-2.5">
                Books
              </TabsTrigger>
              <TabsTrigger value="credentials" className="text-xs sm:text-sm px-2 py-2.5">
                Credentials
              </TabsTrigger>
              <TabsTrigger value="role-models" className="text-xs sm:text-sm px-2 py-2.5">
                Role Models
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
                <div className="flex gap-2 w-full max-w-md relative">
                  <Input type="search" placeholder="Search digital products..." className="flex-1 rounded-full pr-10" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                  {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-24 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Clear search">
                      <X className="w-4 h-4" />
                    </button>}
                  <Button className="rounded-full px-6">Search</Button>
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

            {/* Credentials Tab */}
            <TabsContent value="credentials" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-5 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,212,170,0.15)] transition-all duration-300 shadow-lg border-2">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={qbBadge} alt="QuickBooks ProAdvisor Level 2 Badge" className="w-16 h-16 object-contain flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-foreground">QuickBooks Certified ProAdvisor</h3>
                      <Badge className="bg-primary/10 text-primary border-primary text-xs">Level 2 Certified</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Full QuickBooks Online setup, training, monthly reconciliations, cleanups, invoicing, payments, and reports.
                  </p>
                  <div className="flex gap-2">
                    <Button asChild size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-xs">
                      <a href="https://proadvisor.intuit.com/app/accountant/search?searchId=zainadtani" target="_blank" rel="noopener noreferrer">ProAdvisor Profile →</a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="text-xs">
                      <a href="https://www.credly.com/badges/31486029-a69d-462a-84d6-cf324f42fdfa/embedded" target="_blank" rel="noopener noreferrer">Badge →</a>
                    </Button>
                  </div>
                </Card>

                <Card className="p-5 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,212,170,0.15)] transition-all duration-300 shadow-lg border-2">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={awsBadge} alt="AWS Certified Cloud Practitioner Badge" className="w-16 h-16 object-contain flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-foreground">AWS Cloud Practitioner</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Cloud concepts, core AWS services, security, compliance, pricing models, and architecture design principles.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <Button asChild size="sm" className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs">
                      <a href="https://skillbuilder.aws/learn/ZCQGNCDS54/aws-cloud-quest-recertify-cloud-practitioner/H5AC9MAA6A" target="_blank" rel="noopener noreferrer">Recertify →</a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="text-xs">
                      <a href="https://www.credly.com/badges/2d636eb8-4677-4783-b829-47394e406a5a/public_url" target="_blank" rel="noopener noreferrer">Badge →</a>
                    </Button>
                  </div>
                </Card>

                <Card className="p-5 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,212,170,0.15)] transition-all duration-300 shadow-lg border-2">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={eagleScoutBadge} alt="Eagle Scout Badge" className="w-16 h-16 object-contain flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Eagle Scout</h3>
                      <p className="text-xs text-muted-foreground">Earned 2017</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Leadership, service, outdoor skills, and community projects.
                  </p>
                  <Button asChild variant="outline" size="sm" className="text-xs">
                    <a href="https://greatriversscouting.org/2023/11/03/eagle-scout-requirements/" target="_blank" rel="noopener noreferrer">What is Eagle Scout →</a>
                  </Button>
                </Card>
              </div>
            </TabsContent>

            {/* Role Models Tab */}
            <TabsContent value="role-models" className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-bold mb-3 text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  People I Look Up To
                </h3>
                <p className="text-lg text-muted-foreground">Mentors who inspire my journey</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {ROLE_MODELS.map(person => <Card key={person.name} className="overflow-hidden hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,212,170,0.15)] transition-all duration-500 shadow-lg border-2 group">
                    <div className="p-6 flex flex-col h-full">
                      <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl group-hover:border-primary/60 transition-all duration-500">
                        {person.image ? <img src={person.image} alt={person.imageAlt} className="w-full h-full object-cover" loading="lazy" /> : <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                            <img src={faviconFor(person.website)} alt={person.name} className="w-14 h-14 rounded-full" loading="lazy" />
                          </div>}
                      </div>

                      <h4 className="text-xl font-bold text-center text-foreground">{person.name}</h4>
                      <p className="text-sm text-primary text-center mb-2">{person.role}</p>
                      {person.born && <p className="text-xs text-muted-foreground text-center mb-3">
                          {person.born} • {person.age}
                        </p>}

                      <p className="text-sm text-muted-foreground mb-4 text-center">{person.bio}</p>

                      <ul className="text-xs text-muted-foreground space-y-1 mb-4 flex-grow">
                        {person.bullets.map((b, i) => <li key={i} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            {b}
                          </li>)}
                      </ul>

                      <div className="mt-auto flex flex-col gap-2">
                        <Button asChild variant="outline" size="sm" className="w-full rounded-full border-primary/50 hover:bg-primary/10 transition-all duration-300">
                          <a href={person.website} target="_blank" rel="noopener noreferrer">
                            Website <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </Button>
                        {person.youtube && <Button asChild variant="outline" size="sm" className="w-full rounded-full border-red-500/50 text-red-500 hover:bg-red-500/10 transition-all duration-300">
                            <a href={person.youtube} target="_blank" rel="noopener noreferrer">
                              <Youtube className="w-4 h-4 mr-1" /> YouTube Channel
                            </a>
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

      {/* Let's Connect */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Let's Connect</h2>
          <p className="text-sm text-muted-foreground">Find me on these platforms</p>
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

      {/* What I Follow */}
      <ScrollReveal delay={200}>
      <WhatIFollow podcasts={PODCASTS} />
      </ScrollReveal>

      {/* Spotify Playlist */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4 max-w-xl text-center space-y-3">
          <h2 className="text-xl font-bold text-foreground">Focus Playlist</h2>
          <p className="text-xs text-muted-foreground">Music I work and study to</p>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe style={{ borderRadius: "12px" }} src="https://open.spotify.com/embed/playlist/4ZHa92ZbMSi2Fwps39XZl5?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
          </div>
        </div>
      </section>
    </div>;
};
export default Index;
