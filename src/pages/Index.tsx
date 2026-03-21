import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, GraduationCap, Book, Award, Cpu, Sparkles, Music, BookOpen, ExternalLink, Youtube, Linkedin, Heart, X, FileText, Mic, ChevronLeft, ChevronRight, FolderOpen, Lightbulb, Grid3x3, Archive, Dumbbell } from "lucide-react";
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

  // Filter products based on search query
  const filteredProducts = React.useMemo(() => {
    const featured = productCatalog.filter(p => p.featured).sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    if (!searchQuery.trim()) return featured.slice(0, 7);
    const query = searchQuery.toLowerCase();
    return featured.filter(p => p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));
  }, [searchQuery]);

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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, idx) => {
                const num = pad2(idx + 1);
                return <Card key={product.id} className="overflow-hidden hover-lift transition-all duration-300 shadow-lg border-2 flex flex-col">
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Badge className="rounded-full text-xs">#{num}</Badge>
                          </div>
                          {product.badge && <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
                              {product.badge}
                            </Badge>}
                        </div>

                        <h3 className="text-xl font-bold mb-2 text-foreground line-clamp-2">{product.title}</h3>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{product.desc}</p>

                        {product.media && <div className="relative mb-4 overflow-hidden rounded-lg bg-muted/50 flex items-center justify-center">
                            <img src={product.media} alt={product.title} className="w-full h-40 object-cover" loading="lazy" />
                          </div>}

                        <div className="mt-auto flex flex-col gap-2">
                          {product.cta && <Button asChild className="w-full rounded-full bg-gradient-cta text-white hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
                              <a href={product.cta.href} target="_blank" rel="noopener noreferrer" aria-label={`Get ${product.title}`}>
                                {product.cta.label}
                              </a>
                            </Button>}
                        </div>
                      </div>
                    </Card>;
              })}
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

      {/* About Me Section - Dark Mode with 3D Effects */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{
          animationDelay: "1s"
        }}></div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Card className="p-10 shadow-2xl border-2 border-slate-700 bg-slate-800/80 backdrop-blur-xl overflow-hidden relative group hover:scale-[1.02] transition-all duration-500" style={{
          transformStyle: "preserve-3d"
        }}>
            {/* 3D Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="text-center mb-10 relative" style={{
            transform: "translateZ(30px)"
          }}>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white flex items-center justify-center gap-3">
                <span className="animate-bounce">👋</span>
                Let's Connect!
                <span className="animate-bounce" style={{
                animationDelay: "0.2s"
              }}>
                  🚀
                </span>
              </h2>
              <p className="text-xl text-slate-300 flex items-center justify-center gap-2">
                <span>📚</span>
                Follow my journey on social media
                <span>💡</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative" style={{
            transform: "translateZ(40px)"
          }}>
              <Button asChild size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/50 hover:-translate-y-1 gap-3 px-8 py-6 text-lg group/btn border-2 border-red-500/50" style={{
              transformStyle: "preserve-3d"
            }}>
                <a href="https://youtube.com/@captainduaadventures?si=xPzuebAHwHZTl52V" target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
                  <span className="font-bold">YouTube Channel</span>
                  <span className="text-2xl">▶️</span>
                </a>
              </Button>

              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 gap-3 px-8 py-6 text-lg group/btn border-2 border-blue-500/50" style={{
              transformStyle: "preserve-3d"
            }}>
                <a href="https://www.linkedin.com/in/zainadtani/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
                  <span className="font-bold">LinkedIn Profile</span>
                  <span className="text-2xl">💼</span>
                </a>
              </Button>
            </div>

            {/* Fun Stats */}
            <div className="mt-10 pt-8 border-t border-slate-700 grid grid-cols-3 gap-4 text-center">
              <div className="group/stat hover:scale-110 transition-transform cursor-default">
                <div className="text-3xl mb-2 group-hover/stat:animate-bounce">🎓</div>
                <div className="text-slate-400 text-sm">Learning</div>
              </div>
              <div className="group/stat hover:scale-110 transition-transform cursor-default">
                <div className="text-3xl mb-2 group-hover/stat:animate-bounce">📊</div>
                <div className="text-slate-400 text-sm">Growing</div>
              </div>
              <div className="group/stat hover:scale-110 transition-transform cursor-default">
                <div className="text-3xl mb-2 group-hover/stat:animate-bounce">🌟</div>
                <div className="text-slate-400 text-sm">Sharing</div>
              </div>
            </div>
          </Card>
        </div>
      </section>


      {/* Newsletters I Follow Section */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/5">
        {/* Gradient mesh background effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">Newsletters I Follow 📬</h2>
              <p className="text-lg text-muted-foreground">My favorite weekly reads for growth, health, and finance</p>
            </div>

            {/* Newsletter Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {NEWSLETTERS.map(newsletter => <Card key={newsletter.href} className="hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col p-5 border-2 bg-card">
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-foreground">
                      <a href={newsletter.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label={`Subscribe to ${newsletter.title}`}>
                        {newsletter.title}
                      </a>
                    </h3>
                    {newsletter.byline && <p className="text-xs text-primary font-semibold mt-0.5">{newsletter.byline}</p>}
                    <p className="text-sm text-muted-foreground mt-2">{newsletter.blurb}</p>
                  </div>
                  <Button asChild className="mt-4 w-full">
                    <a href={newsletter.href} target="_blank" rel="noopener noreferrer" aria-label={`Subscribe to ${newsletter.title}`}>
                      Subscribe →
                    </a>
                  </Button>
                </Card>)}
            </div>
          </div>
        </div>
      </section>

      {/* Podcasts I Follow — Frame-by-Frame Navigation */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
              Podcasts I Follow <span className="italic">🎙️</span>
            </h2>
            <div className="mt-2 h-1.5 w-24 rounded-full bg-primary/30 mx-auto" />
            <p className="mt-3 text-lg text-muted-foreground">
              A rolling list of shows I learn from every week
            </p>
          </div>

          {/* Podcast Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {PODCASTS.map(podcast => <Card key={podcast.listen} className="hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col rounded-2xl border-2 bg-card shadow-lg">
                {/* Image/header */}
                <div className="relative h-40 bg-muted flex items-center justify-center overflow-hidden">
                  {podcast.image ? <img src={podcast.image} alt={`${podcast.title} cover`} className="w-full h-full object-cover" loading="lazy" /> : <img src={faviconFor(podcast.website || podcast.listen)} alt={`${podcast.title} icon`} className="w-14 h-14 rounded-xl border bg-background" loading="lazy" />}
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-grow">
                  <p className="text-xs text-muted-foreground mb-1">{podcast.host}</p>
                  <h3 className="text-lg font-semibold leading-snug text-foreground line-clamp-2">
                    <a href={podcast.listen} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label={`Listen to ${podcast.title}`}>
                      {podcast.title}
                    </a>
                  </h3>

                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <a href={podcast.listen} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium hover:underline" aria-label={`Listen to ${podcast.title} on Spotify`}>
                      <Mic className="w-4 h-4" />
                      Listen
                    </a>
                    {podcast.website && <a href={podcast.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground" aria-label={`Visit ${podcast.title} website`} title="Website">
                        <ExternalLink className="w-4 h-4" />
                      </a>}
                  </div>
                </div>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Spotify Playlist Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-8 shadow-lg border-2">
            <div className="text-center mb-8">
              <Music className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">Focus Playlist 🎵</h2>
              <p className="text-lg text-muted-foreground">
                My curated playlist to help you focus while working or studying
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <iframe style={{
              borderRadius: "12px"
            }} src="https://open.spotify.com/embed/playlist/4ZHa92ZbMSi2Fwps39XZl5?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
            </div>
          </Card>
        </div>
      </section>

      {/* Newsletter Section — Wide Native Form + iPhone Mock (Light/Dark Ready) */}
      <section id="newsletter" className="relative overflow-hidden py-16 md:py-20">
        {/* Background: adaptive gradients (stronger in light mode) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="hidden dark:block w-full h-full" style={{
          background: "radial-gradient(900px 420px at 50% 0%, rgba(37,99,235,0.10), transparent 60%), radial-gradient(700px 360px at 85% 20%, rgba(34,197,94,0.10), transparent 60%)"
        }} />
          <div className="block dark:hidden w-full h-full" style={{
          background: "radial-gradient(900px 420px at 50% 0%, rgba(37,99,235,0.20), transparent 60%), radial-gradient(700px 360px at 85% 20%, rgba(34,197,94,0.18), transparent 60%)"
        }} />
        </div>

        {/* Subtle spinning globe */}
        <div className="absolute -right-28 -top-10 opacity-25 md:opacity-30 animate-[spin_55s_linear_infinite] z-0" aria-hidden="true">
          <svg width="420" height="420" viewBox="0 0 420 420">
            <defs>
              <radialGradient id="gw" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity=".8" />
                <stop offset="60%" stopColor="#60A5FA" stopOpacity=".2" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <circle cx="210" cy="210" r="120" fill="url(#gw)" />
            {[...Array(6)].map((_, i) => <ellipse key={i} cx="210" cy="210" rx={30 + i * 15} ry={120} fill="none" stroke="#93C5FD" strokeOpacity=".25" />)}
            {[...Array(6)].map((_, i) => <ellipse key={`lat-${i}`} cx="210" cy="210" rx={120} ry={30 + i * 15} fill="none" stroke="#93C5FD" strokeOpacity=".25" />)}
            <g transform="translate(182,188)">
              <rect rx="12" width="56" height="56" className="fill-black/80 dark:fill-[#0B1220]/85" />
              <text x="28" y="36" textAnchor="middle" fontSize="32" fill="#FFFFFF" fontWeight="700">Z</text>
            </g>
          </svg>
        </div>

        <div className="relative z-10 container mx-auto max-w-4xl px-6">
          {/* Newsletter Banner Image */}
          <div className="rounded-2xl overflow-hidden shadow-2xl mb-8">
            <img 
              src="/images/zains-world-newsletter-banner.png" 
              alt="Zain's World Newsletter" 
              className="w-full h-auto object-cover"
            />
          </div>

          <Card className="p-8 md:p-10 bg-card/80 backdrop-blur-sm border-2 shadow-xl">
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Join Zain's World
              </h2>
              
              <p className="text-lg text-muted-foreground font-medium">
                Free posts. Quick ideas. No fluff.
              </p>

              {/* Native form using Beehiiv magic link */}
              <form className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto" onSubmit={e => {
                e.preventDefault();
                const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement | null;
                const email = input?.value.trim();
                if (!email) return;
                const magic = `https://magic.beehiiv.com/v1/dd1643e2-f274-43e4-b193-62276e3e3b48?email=${encodeURIComponent(email)}`;
                const a = document.createElement("a");
                a.href = magic;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                document.body.appendChild(a);
                a.click();
                a.remove();
              }}>
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input 
                  id="newsletter-email" 
                  name="email" 
                  type="email" 
                  required 
                  inputMode="email" 
                  placeholder="you@example.com" 
                  className="flex-1 h-12 rounded-lg px-4 bg-background text-foreground placeholder-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary" 
                />
                <Button type="submit" className="h-12 px-6">
                  Join
                </Button>
              </form>

              {/* Buttons row */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <a href="https://zains-world.beehiiv.com/" target="_blank" rel="noopener noreferrer">
                    Read the Newsletter
                  </a>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Read past posts on Beehiiv, then subscribe there too.
              </p>
            </div>
          </Card>
        </div>

        <style>{`
          @keyframes float { 0%{transform:translateY(0)} 50%{transform:translateY(-6px)} 100%{transform:translateY(0)} }
        `}</style>
      </section>

      {/* My Published Works Section */}
      <section id="published-works" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              My <span className="text-accent">Published Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Books I'm writing to share knowledge and inspire others
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="overflow-hidden hover-lift group">
              <div className="relative">
                <img src={maggieSimbaBook} alt="If Maggie & Simba Could Talk Book Cover" className="w-full h-auto object-cover" />
                <div className="absolute top-8 -right-12 bg-gradient-to-r from-accent to-primary text-white px-16 py-2 transform rotate-45 shadow-lg">
                  <span className="font-bold text-sm">IN THE WORKS</span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-bold">If Maggie & Simba Could Talk</h3>
                <p className="text-sm text-muted-foreground mb-2">A Memoir of Love, Loss, and Life Lessons</p>
                <p className="text-muted-foreground">A heartfelt memoir exploring the profound lessons learned from two beloved companions.</p>
              </div>
            </Card>

            <Card className="overflow-hidden hover-lift group">
              <div className="relative">
                <img src={financialSorceryBook} alt="The School of Financial Sorcery Book Cover" className="w-full h-auto object-cover" />
                <div className="absolute top-8 -right-12 bg-gradient-to-r from-accent to-primary text-white px-16 py-2 transform rotate-45 shadow-lg">
                  <span className="font-bold text-sm">IN THE WORKS</span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold">The School of Financial Sorcery</h3>
                <p className="text-sm text-muted-foreground mb-2">How to Master Money Like Magic</p>
                <p className="text-muted-foreground">Practical wisdom and transformative strategies for building wealth and financial freedom.</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Buy Me a Coffee — Final CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="relative overflow-hidden border-2 border-primary/20 bg-card shadow-2xl">
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: "radial-gradient(600px 300px at 50% 0%, hsl(var(--primary)/0.08), transparent 70%)" }} />
            <div className="relative z-10 flex flex-col items-center text-center gap-6 p-10 md:p-14">
              <div className="text-6xl leading-none select-none">☕</div>
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Was this helpful?</h2>
                <p className="text-lg text-muted-foreground max-w-sm mx-auto">
                  If anything here sparked an idea or saved you time, you can say thanks with a coffee. It genuinely means a lot.
                </p>
              </div>
              <Button asChild size="lg" className="gap-2 px-8 py-6 text-base font-semibold rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                <a href="https://buymeacoffee.com/curiouszen" target="_blank" rel="noopener noreferrer" aria-label="Buy me a coffee">
                  <Heart className="w-5 h-5" />
                  Buy Me a Coffee
                </a>
              </Button>
              <p className="text-xs text-muted-foreground">No pressure. Just vibes. ✨</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="container mx-auto px-4 max-w-6xl text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Zain Education Ventures. All rights reserved.
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