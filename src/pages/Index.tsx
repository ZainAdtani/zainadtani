import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, GraduationCap, Book, Award, Cpu, Sparkles, Music, BookOpen, ExternalLink, Youtube, Linkedin, Heart, X, FileText, Mic, ChevronLeft, ChevronRight, FolderOpen, Lightbulb, Grid3x3, Archive, Dumbbell } from "lucide-react";
import WhatIFollow from "@/components/WhatIFollow";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { TimeBar } from "@/components/TimeBar";
import { ALL_PRODUCTS } from "@/data/products";
import { BOOKS } from "@/data/books";
import { NEWSLETTERS } from "@/data/newsletters";
import headshotImage from "@/assets/zain-headshot.png";
import qbBadge from "@/assets/quickbooks-level2-badge.png";
import awsBadge from "@/assets/aws-cloud-practitioner-badge.png";
import millionaireFastlane from "@/assets/millionaire-fastlane-cover.jpg";
import deanGraziosi from "@/assets/dean-graziosi.jpg";
import tonyRobbins from "@/assets/tony-robbins.jpg";
import jasonFladlien from "@/assets/jason-fladlien.jpg";
import maggieSimbaBook from "@/assets/maggie-simba-book.png";
import financialSorceryBook from "@/assets/financial-sorcery-book.png";
import chrisHaroun from "@/assets/chris-haroun.png";
import trentShelton from "@/assets/trent-shelton.png";
import timFerriss from "@/assets/tim-ferriss.jpg";
import eagleScoutBadge from "@/assets/eagle-scout-badge.png";
import alexHormozi from "@/assets/alex-hormozi.png";
const QUOTES_AND_NOTES = ["It is the unknown we fear when we look upon death and darkness, nothing more. - J.K. Rowling, Harry Potter and the Deathly Hallows", "Instead of digging for gold, sell shovels. Instead of driving a taxi, build Uber. Wealth is not about working harder; it's about creating systems that work harder than you do. - MJ DeMarco, The Millionaire Fastlane", "More than 50% of graduates completely forget what they learn in college within 5 years, and within 10 years it's closer to 100%. If most of our \"education\" inevitably collects dust, then what was the point in learning it? Let's do some simple math: Let's be conservative and say that 5 hours per week are spent attending lectures and studying for exams (10 for finals week). If there are 15 weeks in a semester, that's 30 weeks a year. Multiply that by 4 we get 120 weeks, resulting in 600 hours invested into learning information that for the most part, will not be useful for your future work and career. Now I'm not saying you should renounce education completely, rather look past the shiny allure of \"financial stability and higher wages\" and make an informed decision of whether or not it aligns with what you desire. Almost anything can be learned on the internet, online education is booming. Opportunities for the next wave of innovators are scaling faster and faster thanks to technology and AI. Imagine what you could do with 600 extra hours, $200,000, and 4 years to learn and explore on your own? The future is wide open for those willing to diverge and create.", 'Plan Your Day: Establish a clear plan for your daily activities. This sets the foundation for "traction," where every action intentionally moves you toward your goals, contrasting with "distraction," which pulls you away. Use tools like calendars to allocate specific time blocks for tasks.', "Did you know that the average person spends over one hour on social media per day, just consuming and not creating? Additionally, they spend another 2-3 hours watching television. That's four hours, on average, gone every day. Doing the math, 4 hours lost per day, multiplied by 7 days per week, equals 28 hours per week. That's basically equivalent to a part-time job. In fact, it's literally 3.5 eight-hour workdays lost per week. Four hours lost per day over 30 days = 120 hours = 15 WORKDAYS PER MONTH LOST.", "Motivation is not the cause of action, but the effect. If you wanna feel motivated to do something, take the smallest action towards doing it, then let the momentum carry you forward.", "Don't view exercise as an exchange for something. You don't work out to lose a few pounds or earn that hamburger and ice cream. With this mindset, you will lose motivation quickly and quit. Instead, view exercise as an investment. For every unit of energy you put in, you'll receive multiple units of energy back. The catch is that these units of energy you get back will be spread out over weeks, months and years. This is why exercising hardcore occasionally is far inferior than exercising a little bit every day.", "Statistically speaking, a normal person is physically unhealthy, emotionally anxious and depressed, socially lonely and financially in debt. Fuck being normal.", "Your mindset is the KEY to making more progress in your life, and journaling is the daily WORK that helps you master your mindset.", "Don't make assumptions about people, you have no fucking idea what they've been through. Don't make assumptions about yourself either. The last person we're objective about is ourselves.", "No one thinks about you as much as you think about yourself. Whatever you are insecure about, chances are 99% of people around you haven't even noticed it. This is because everybody else is too busy thinking about themselves. This may strike you as a little bit depressing, but it's actually liberating. It means that you are judged far less than you think.", "Develop a willingness to be disliked. It will grant you the freedom to do what needs to be done, even if it's unpopular.", "Nothing meaningful in life is easy, and nothing easy in life is meaningful. We think we'd like to have everything handed to us on a silver platter, but the truth is that we don't appreciate or enjoy things that we don't struggle for. So stop avoiding the difficult things in your life and instead find the difficult things you enjoy.", "It's never too late to change. It's never too late. I get emails all the time from people asking me, \"Hey, I'm 20 or 40 or 60 or 80, is it too late? Can I change? Is there time?\" The answer is it's never too late, there's always time. The only question is how long we're gonna sit here and make excuses and pretend there's not.", "In some ways, suffering ceases to be suffering at the moment it finds a meaning, such as the meaning of a sacrifice. — Viktor Frankl", "When you factor in every ancestor, timing, and genetic combination, your chances of being here are 1 in 400 trillion. These odds are like winning the lottery 12,996 times in a row. You may not know it, but you're a literal walking lottery winner. Start acting like it. — Me in a future thread I'm writing for my birthday", "BEFORE YOU TEAR DOWN THE FENCE, MAKE SURE YOU KNOW THE WOLVES IT WAS KEEPING AT BAY. — @SahilBloom, The 5 Types of Wealth", "When you complain, you make yourself a victim. Leave the situation, change the situation, or accept it. All else is madness. — Eckhart Tolle", "Material success is not success. I define success as someone who gives and shares what they have. Do not compete with others, compete in caring, respect, honesty, humility, and compassion in both professional and personal relationships. Success to me is someone who uplifts others. — Mawlana Hazar Imam"];

// ---- Podcasts I Follow (data) ----
type Podcast = {
  title: string;
  host: string;
  listen: string;
  website?: string;
  image?: string | null;
  embedHtml?: string | null;
};
const PODCASTS: Podcast[] = [{
  title: "Huberman Lab",
  host: "Andrew Huberman",
  listen: "https://open.spotify.com/show/79CkJF3UJTHFV8Dse3Oy0P",
  website: "https://www.hubermanlab.com/podcast",
  image: "/images/podcasts/huberman-lab.png"
}, {
  title: "Ear Biscuits",
  host: "Rhett & Link",
  listen: "https://open.spotify.com/show/3j9nu2qpJrUxEXp5qMudM7",
  website: "https://www.youtube.com/@earbiscuits",
  image: "/images/podcasts/ear-biscuits.png",
  embedHtml: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/show/3j9nu2qpJrUxEXp5qMudM7?utm_source=generator&t=420" width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
}, {
  title: "Morning Brew Daily",
  host: "Morning Brew",
  listen: "https://open.spotify.com/show/7nc7OQdPTekErtFSRxOBKh",
  website: "https://www.morningbrew.com/podcasts/morning-brew-daily",
  image: "/images/podcasts/morning-brew-daily.png"
}, {
  title: "The Tim Ferriss Show",
  host: "Tim Ferriss",
  listen: "https://open.spotify.com/show/5qSUyCrk9KR69lEiXbjwXM",
  website: "https://tim.blog/podcast/",
  image: "/images/podcasts/tim-ferriss-show.png",
  embedHtml: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/show/5qSUyCrk9KR69lEiXbjwXM?utm_source=generator" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
}, {
  title: "Ultimate Human",
  host: "Gary Brecka",
  listen: "https://open.spotify.com/show/5Faf5ecAnYW7AzGdblqd6R",
  website: "https://www.ultimatehumanpodcast.com/",
  image: "/images/podcasts/ultimate-human.jpg"
}, {
  title: "On Purpose",
  host: "Jay Shetty",
  listen: "https://open.spotify.com/show/5EqqB52m2bsr4k1Ii7sStc",
  website: "https://jayshetty.me/podcast/",
  image: "/images/podcasts/on-purpose.png"
}, {
  title: "Impact Theory",
  host: "Tom Bilyeu",
  listen: "https://open.spotify.com/show/1nARKz2vTIOb7gC9dusE4b",
  website: "https://impacttheory.com/podcast",
  image: "/images/podcasts/impact-theory.png"
}, {
  title: "The Diary Of A CEO",
  host: "Steven Bartlett",
  listen: "https://open.spotify.com/show/7iQXmUT7XGuZSzAMjoNWlX",
  website: "https://www.diaryofaceo.com/",
  image: "/images/podcasts/diary-of-a-ceo.jpg"
}, {
  title: "Brian Windhorst & The Hoop Collective",
  host: "Brian Windhorst",
  listen: "https://open.spotify.com/show/4mOLvZqMud0JromeBgLpIh",
  website: "https://www.espn.com/podcenter/",
  image: "/images/podcasts/brian-windhorst.png"
}];
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

// Helper function for formatting catalog numbers
function pad2(n: number) {
  return n.toString().padStart(2, "0");
}
function getTabFromHash(hash: string): TabKey {
  const clean = hash.replace("#", "") as TabKey;
  // Support old "certifications" hash redirecting to "credentials"
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

// Product catalog excluding free community
const productCatalog = ALL_PRODUCTS.filter(p => p.id !== "free-community");
const Index = () => {
  const [quote, setQuote] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>(() => getTabFromHash(window.location.hash));
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const [shuffleIndex, setShuffleIndex] = useState(0);
  const [isHoveringProducts, setIsHoveringProducts] = useState(false);
  const [productsFading, setProductsFading] = useState(false);

  // All featured products sorted
  const allFeatured = React.useMemo(() => {
    return productCatalog.filter(p => p.featured).sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }, []);

  // Auto-shuffle every 27 seconds
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

  // Filter products based on search query with shuffle
  const filteredProducts = React.useMemo(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return allFeatured.filter(p => p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));
    }
    // Pick 3 based on shuffleIndex
    const shuffled = [...allFeatured].sort(() => {
      // Deterministic-ish shuffle based on shuffleIndex
      return Math.sin(shuffleIndex * 9301 + allFeatured.indexOf(allFeatured[0])) - 0.5;
    });
    // Use a seeded approach: rotate by shuffleIndex
    const start = (shuffleIndex * 3) % allFeatured.length;
    const picked: typeof allFeatured = [];
    for (let i = 0; i < 3 && i < allFeatured.length; i++) {
      picked.push(allFeatured[(start + i) % allFeatured.length]);
    }
    return picked;
  }, [searchQuery, shuffleIndex, allFeatured]);

  // Top books for home page display - randomly selected
  const topBooks = React.useMemo(() => {
    const shuffled = [...BOOKS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 9);
  }, []);
  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * QUOTES_AND_NOTES.length);
    const selectedQuote = QUOTES_AND_NOTES[randomIndex];
    setQuote(selectedQuote);
  };

  // Auto-fetch missing book covers
  useEffect(() => {
    const KEY = "bookCoversV2";
    const cache = JSON.parse(localStorage.getItem(KEY) || "{}");
    async function findCover({
      title,
      author
    }: {
      title: string;
      author: string;
    }): Promise<string | null> {
      // Try Open Library by title+author
      try {
        const q = new URLSearchParams({
          title,
          author
        }).toString();
        const res = await fetch(`https://openlibrary.org/search.json?${q}`);
        const data = await res.json();
        const best = data?.docs?.[0];
        const isbn = best?.isbn?.[0];
        if (isbn) return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
        if (best?.cover_i) return `https://covers.openlibrary.org/b/id/${best.cover_i}-L.jpg`;
      } catch {}
      // Fallback: Google Books thumbnail
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
            const url = await findCover({
              title: b.title,
              author: b.author
            });
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

  // Handle hash changes for tab navigation (only scroll if user clicked or hash changed)
  useEffect(() => {
    const onHashChange = () => {
      const next = getTabFromHash(window.location.hash);
      setActiveTab(next);
      // Only scroll if this is a real hash change (user action), not initial load
      if (document.readyState === "complete") {
        const el = document.getElementById("tabs-section");
        if (el) el.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    };
    window.addEventListener("hashchange", onHashChange);
    // Don't scroll on initial load even if hash exists
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Update hash when tab changes (only after user interaction)
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
    if (el) el.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, [activeTab]);

  // Helper: favicon fallback
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
        <title>Zain Adtani | Simple Sites and Calm Systems</title>
        <meta name="description" content="I build simple sites and calm systems for small business owners. Clear offers, honest copy, simple workflows." />
        <meta property="og:title" content="Zain Adtani | Simple Sites and Calm Systems" />
        <meta property="og:description" content="I build simple sites and calm systems for small business owners. Clear offers, honest copy, simple workflows." />
        <meta property="og:image" content={headshotImage} />
        <meta property="og:type" content="website" />
      </Helmet>

      <TimeBar />

      {/* Hero Section */}
      <section className="pt-8 md:pt-16 pb-16 md:pb-24 bg-gradient-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Headshot with decorative background */}
            <div className="flex-shrink-0 relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full scale-110 -z-10"></div>
              <img src={headshotImage} alt="Zain Adtani - Teacher and Site Builder" className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover object-top" style={{ border: '3px solid #00D4AA', boxShadow: '0 0 30px rgba(0,212,170,0.2)' }} />
            </div>

            {/* Hero Text */}
            <div className="flex-1 text-center md:text-left space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-foreground">Hi, I'm Zain!</h1>
              </div>

              {/* Daily Motivation Generator */}
              <Card className="p-6 shadow-lg border-2 border-primary/20 bg-card text-card-foreground max-w-lg mx-auto md:mx-0">
                <div className="space-y-4">
                  <h3 className="text-lg flex items-center justify-center gap-2 font-semibold text-foreground">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Daily Motivation Generator
                  </h3>
                  <Textarea value={quote} readOnly placeholder="Click the button below to generate a quote or life note..." className="min-h-[120px] text-base resize-none bg-muted text-foreground text-center" />
                  <Button onClick={generateQuote} className="w-full bg-gradient-cta text-white hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
                    Generate Daily Motivation
                  </Button>
                </div>
              </Card>

              {/* Build a Simple Site Card - moved under motivation */}
              <div className="max-w-lg mx-auto md:mx-0">
                <Card className="p-6 border-2 hover:shadow-lg hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-lg font-bold mb-2 text-foreground">Build a Simple Site</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Help for tiny and local business owners who want a clean site that feels like them.
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/website-lab">See Website Projects</Link>
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* (7-card grid removed — pages still accessible via sidebar) */}

      {/* Tabbed Sections */}
      <section id="tabs-section" className="py-16 md:py-24 bg-muted/30">
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
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover-lift transition-all duration-300 shadow-lg border-2 flex flex-col">
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
                ))}
              </div>
            </TabsContent>

            {/* Books Tab */}
            <TabsContent value="books" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Books I'm Reading & Recommend</h3>
                  <p className="text-muted-foreground">A rotating selection from my reading journey</p>
                </div>
                <Button asChild variant="outline">
                  <Link to="/books">View Full Book Portal →</Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topBooks.map(book => <Card key={book.title + book.author} className="overflow-hidden hover-lift transition-all duration-500 shadow-lg border-2 group">
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 z-10 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                      {book.status === "READ" ? "✓ Read" : book.status === "IN_PROGRESS" ? "Reading" : "To Read"}
                    </div>

                    <div className="p-6 flex flex-col h-full">
                      {/* Book Cover */}
                      <div className="relative mb-4 rounded-xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
                        <div className="aspect-[2/3] bg-accent/20">
                          <img src={book.cover ?? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect fill='%23e5e7eb' width='200' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%239ca3af'%3EBook Cover%3C/text%3E%3C/svg%3E"} alt={`Book cover: ${book.title} by ${book.author}`} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" loading="lazy" onError={e => {
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect fill='%23e5e7eb' width='200' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%239ca3af'%3EBook Cover%3C/text%3E%3C/svg%3E";
                      }} />
                        </div>
                      </div>

                      {/* Title & Author */}
                      <h4 className="font-bold text-xl mb-1 text-foreground line-clamp-2">{book.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{book.author}</p>

                      {/* Rating */}
                      {book.rating && <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => <span key={i} className={i < book.rating! ? "text-yellow-500" : "text-muted-foreground/30"}>
                              ★
                            </span>)}
                        </div>}

                      {/* Notes */}
                      {book.notes && <p className="text-xs text-muted-foreground mb-4 flex-grow italic">{book.notes}</p>}

                      {/* CTA Buttons */}
                      <div className="flex flex-col gap-2 mt-auto">
                        {(book.myThoughts || book.notes) && <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="w-full text-xs rounded-full">
                                View my thoughts
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg">
                              <DialogHeader>
                                <DialogTitle>{book.title}</DialogTitle>
                                <DialogDescription>by {book.author}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 text-sm text-foreground">
                                {book.myThoughts && <div>
                                    <p className="font-semibold mb-1">My thoughts</p>
                                    <p className="whitespace-pre-wrap">{book.myThoughts}</p>
                                  </div>}
                                {book.notes && <div>
                                    <p className="font-semibold mb-1">Summary / notes</p>
                                    <p className="italic text-muted-foreground whitespace-pre-wrap">
                                      {book.notes.length > 600 ? book.notes.slice(0, 597) + "..." : book.notes}
                                    </p>
                                  </div>}
                              </div>
                            </DialogContent>
                          </Dialog>}
                        {book.link && <Button asChild variant="outline" size="sm" className="w-full text-xs rounded-full font-semibold transition-all duration-300 hover:shadow-lg">
                            <a href={book.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${book.title} on Amazon`}>
                              View on Amazon
                            </a>
                          </Button>}
                      </div>
                    </div>
                  </Card>)}
              </div>
            </TabsContent>

            {/* Credentials Tab (formerly Certifications) */}
            <TabsContent value="credentials" className="space-y-6">
              <Card className="p-8 hover-lift transition-all duration-300 shadow-lg border-2">
                <div className="flex items-start gap-4 mb-6">
                  <img src={qbBadge} alt="QuickBooks ProAdvisor Level 2 Badge" className="w-32 h-32 object-contain flex-shrink-0" />
                  <div className="bg-primary/10 border-2 border-primary rounded-lg px-4 py-2 self-start">
                    <p className="text-primary font-bold text-lg">Level 2 Certified</p>
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-foreground">QuickBooks Certified ProAdvisor</h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Running a business is hard enough—your books shouldn't be. I'm a QuickBooks Certified ProAdvisor (now
                  Level 2 certified!) and I help business owners get their books cleaned up, organized, and running like
                  clockwork.
                </p>
                <p className="text-muted-foreground mb-4">
                  Whether you're struggling to reconcile accounts, track expenses, or just keep things up to date, I'm
                  here to take that weight off your shoulders.
                </p>
                <div className="space-y-2 text-muted-foreground mb-6">
                  <p className="font-semibold">💼 What I offer:</p>
                  <p>• Full QuickBooks Online setup & training</p>
                  <p>• Monthly reconciliations & cleanups</p>
                  <p>• Help with invoicing, payments, and reports</p>
                  <p>• Personalized support (yes, real answers—not robots)</p>
                </div>
                <p className="text-muted-foreground mb-6">
                  Check out my official badges—and let's chat about how we can make your bookkeeping the easiest part of
                  your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="flex-1 bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg">
                    <a href="https://proadvisor.intuit.com/app/accountant/search?searchId=zainadtani" target="_blank" rel="noopener noreferrer">
                      View My ProAdvisor Profile →
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/10 transition-all duration-300">
                    <a href="https://www.credly.com/badges/31486029-a69d-462a-84d6-cf324f42fdfa/embedded" target="_blank" rel="noopener noreferrer">
                      View My Badge →
                    </a>
                  </Button>
                </div>
              </Card>

              <Card className="p-8 hover-lift transition-all duration-300 shadow-lg border-2">
                <img src={awsBadge} alt="AWS Certified Cloud Practitioner Badge" className="w-32 h-32 object-contain mb-6" />
                <h3 className="text-3xl font-bold mb-4 text-foreground">AWS Certified Cloud Practitioner</h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Foundational certification validating comprehensive understanding of AWS Cloud services, architecture,
                  and best practices.
                </p>
                <div className="space-y-2 text-muted-foreground mb-6">
                  <p className="font-semibold">Key Competencies:</p>
                  <p>• Cloud concepts and AWS global infrastructure</p>
                  <p>• Core AWS services (compute, storage, database, networking)</p>
                  <p>• AWS security and compliance best practices</p>
                  <p>• AWS pricing models and cost optimization</p>
                  <p>• Cloud architecture design principles</p>
                </div>
                <p className="text-sm text-muted-foreground text-center mb-2">
                  Game based training to renew Cloud Practitioner. No exam required.
                </p>
                <p className="text-xs text-muted-foreground text-center mb-4">
                  Available in English, Japanese, Korean, French, and Portuguese.
                </p>
                <div className="space-y-2">
                  <Button asChild className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all duration-300 hover:shadow-lg">
                    <a href="https://skillbuilder.aws/learn/ZCQGNCDS54/aws-cloud-quest-recertify-cloud-practitioner/H5AC9MAA6A?sc_channel=em&trk=2d6615ea-2f04-4726-b969-0f8c555f74f4" target="_blank" rel="noopener noreferrer" tabIndex={0}>
                      Recertify with Cloud Quest →
                    </a>
                  </Button>
                  <Button asChild variant="secondary" className="w-full transition-all duration-300 hover:shadow-md">
                    <a href="https://aws.amazon.com/training/digital/aws-cloud-quest/" target="_blank" rel="noopener noreferrer" tabIndex={0}>
                      About AWS Cloud Quest →
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 transition-all duration-300">
                    <a href="https://www.credly.com/badges/2d636eb8-4677-4783-b829-47394e406a5a/public_url" target="_blank" rel="noopener noreferrer" tabIndex={0}>
                      View AWS Badge →
                    </a>
                  </Button>
                </div>
              </Card>

              <Card className="p-8 hover-lift transition-all duration-300 shadow-lg border-2">
                <div className="flex items-start gap-4 mb-6">
                  <img src={eagleScoutBadge} alt="Eagle Scout Badge" className="w-24 h-24 object-contain flex-shrink-0" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-foreground">Eagle Scout</h3>
                <p className="text-lg text-muted-foreground mb-4">Earned in 2017</p>
                <p className="text-base text-muted-foreground mb-6">
                  Leadership, service, outdoor skills, and community projects. 🧭🏕️🦅
                </p>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 transition-all duration-300">
                  <a href="https://greatriversscouting.org/2023/11/03/eagle-scout-requirements/" target="_blank" rel="noopener noreferrer">
                    What is Eagle Scout →
                  </a>
                </Button>
              </Card>
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
                {[{
                name: "Tony Robbins",
                role: "Life & Business Strategist",
                born: "Feb 29, 1960",
                age: "65 years old",
                imageAlt: "Tony Robbins headshot",
                bio: "American author and motivational coach known for high-energy seminars and best-selling books. Creator of events like Unleash the Power Within and Date With Destiny.",
                bullets: ["Author of Unlimited Power and Awaken the Giant Within", "Decades of global seminars and coaching", "Focus: peak performance, business, life strategy"],
                image: tonyRobbins,
                website: "https://www.tonyrobbins.com"
              }, {
                name: "Dean Graziosi",
                role: "Real Estate & Knowledge Entrepreneur",
                born: "Nov 20, 1968",
                age: "56 years old",
                imageAlt: "Dean Graziosi headshot",
                bio: "NYT best-selling author and investor; co-founder of Mastermind.com with Tony Robbins, helping people package and sell what they know.",
                bullets: ["Built and advised multiple successful companies", "Teaches practical frameworks for momentum", "Focus: small business, marketing, personal growth"],
                image: deanGraziosi,
                website: "https://www.deangraziosi.com"
              }, {
                name: "Alex Hormozi",
                role: "Founder, Acquisition.com",
                born: "",
                age: "",
                imageAlt: "Alex Hormozi headshot",
                bio: "Teaches offers, marketing, and business systems with simple frameworks. Known for $100M Offers and building acquisition.com portfolio.",
                bullets: ["Offers and pricing strategy", "Customer acquisition basics", "Systems and execution"],
                image: alexHormozi,
                website: "https://www.acquisition.com",
                youtube: "https://www.youtube.com/c/alexhormozi"
              }, {
                name: "Jason Fladlien",
                role: "Entrepreneur & Webinar Expert",
                born: "Apr 7, 1983",
                age: "42 years old",
                imageAlt: "Jason Fladlien headshot",
                bio: 'Co-founder of Rapid Crush, known as the "$100M Webinar Man." Record-setting launches and go-to teacher for high-converting webinars.',
                bullets: ["$250M+ in sales to 150k+ customers worldwide", "Holds records for major webinar launches", "Focus: offer design, webinar conversion, scaling"],
                image: jasonFladlien,
                website: "https://jasonfladlien.com/about/"
              }, {
                name: "Chris Haroun",
                role: "Founder & CEO, Haroun Education Ventures",
                born: "",
                age: "",
                imageAlt: "Chris Haroun headshot",
                bio: "Award-winning MBA professor and #1 bestselling business instructor on Udemy. Columbia MBA, Goldman Sachs alum, and VC.",
                bullets: ["2M+ students taught on Udemy", "Speaker at Inc. 5000, TEDx, etc.", "Focus: finance, MBA skills, career strategy"],
                image: chrisHaroun,
                website: "https://www.harouneducationventures.com/"
              }, {
                name: "Trent Shelton",
                role: "Former NFL Player & Motivational Speaker",
                born: "Sep 21, 1984",
                age: "40 years old",
                imageAlt: "Trent Shelton headshot",
                bio: "Former NFL wide receiver turned motivational speaker. Founder of RehabTime, reaching millions with messages on self-worth and resilience.",
                bullets: ["Played for Seattle Seahawks, Indianapolis Colts, Washington Redskins", "Viral videos and millions of followers", "Focus: self-worth, mental strength, purpose"],
                image: trentShelton,
                website: "https://www.trentshelton.com/"
              }, {
                name: "Tim Ferriss",
                role: "Author & Podcast Host",
                born: "Jul 20, 1977",
                age: "47 years old",
                imageAlt: "Tim Ferriss headshot",
                bio: 'Author of The 4-Hour Workweek and host of The Tim Ferriss Show. Early-stage investor in Uber, Facebook, and 50+ companies. Known for "deconstructing world-class performers."',
                bullets: ["700M+ podcast downloads", "Multiple NYT bestsellers", "Focus: productivity, self-experimentation, investing"],
                image: timFerriss,
                website: "https://tim.blog/"
              }].map(person => <Card key={person.name} className="overflow-hidden hover-lift transition-all duration-500 shadow-lg border-2 group">
                    <div className="p-6 flex flex-col h-full">
                      {/* Avatar */}
                      <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl group-hover:border-primary/60 transition-all duration-500">
                        {person.image ? <img src={person.image} alt={person.imageAlt} className="w-full h-full object-cover" loading="lazy" /> : <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                            <img src={faviconFor(person.website)} alt={person.name} className="w-14 h-14 rounded-full" loading="lazy" />
                          </div>}
                      </div>

                      {/* Name & Role */}
                      <h4 className="text-xl font-bold text-center text-foreground">{person.name}</h4>
                      <p className="text-sm text-primary text-center mb-2">{person.role}</p>
                      {person.born && <p className="text-xs text-muted-foreground text-center mb-3">
                          {person.born} • {person.age}
                        </p>}

                      {/* Bio */}
                      <p className="text-sm text-muted-foreground mb-4 text-center">{person.bio}</p>

                      {/* Bullets */}
                      <ul className="text-xs text-muted-foreground space-y-1 mb-4 flex-grow">
                        {person.bullets.map((b, i) => <li key={i} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            {b}
                          </li>)}
                      </ul>

                      {/* CTA */}
                      <div className="mt-auto flex flex-col gap-2">
                        <Button asChild variant="outline" size="sm" className="w-full rounded-full border-primary/50 hover:bg-primary/10 transition-all duration-300">
                          <a href={person.website} target="_blank" rel="noopener noreferrer">
                            Website <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </Button>
                        {(person as any).youtube && <Button asChild variant="outline" size="sm" className="w-full rounded-full border-red-500/50 text-red-500 hover:bg-red-500/10 transition-all duration-300">
                            <a href={(person as any).youtube} target="_blank" rel="noopener noreferrer">
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

      {/* Let's Connect — Compact */}
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


      {/* What I Follow — Combined Newsletters + Podcasts */}
      <WhatIFollow podcasts={PODCASTS} />

      {/* Spotify Playlist Section */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4 max-w-xl text-center space-y-3">
          <h2 className="text-xl font-bold text-foreground">Focus Playlist</h2>
          <p className="text-xs text-muted-foreground">Music I work and study to</p>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe style={{ borderRadius: "12px" }} src="https://open.spotify.com/embed/playlist/4ZHa92ZbMSi2Fwps39XZl5?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
          </div>
        </div>
      </section>

      {/* (Newsletter section removed from homepage) */}

      {/* (Published Works section removed from homepage) */}

      {/* (Buy Me a Coffee moved to footer line below) */}

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="container mx-auto px-4 max-w-6xl text-center space-y-2">
          <a
            href="https://buymeacoffee.com/curiouszen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label="Buy me a coffee"
          >
            ☕ Support my work
          </a>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Zain Education Ventures. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Keyframes for animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0) }
            50% { transform: translateY(-4px) }
            100% { transform: translateY(0) }
          }
        `}
      </style>
    </div>;
};
export default Index;