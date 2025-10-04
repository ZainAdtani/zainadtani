import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Users, GraduationCap, Book, Award, ShoppingBag, Sparkles, Music, BookOpen, ExternalLink, Youtube, Linkedin, Heart, ChevronUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState, useEffect, lazy, Suspense } from "react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { ALL_PRODUCTS } from "@/data/products";
import headshotImage from "@/assets/zain-headshot.png";
import qbBadge from "@/assets/quickbooks-level2-badge.png";
import awsBadge from "@/assets/aws-cloud-practitioner-badge.png";
import millionaireFastlane from "@/assets/millionaire-fastlane-cover.jpg";
import deanGraziosi from "@/assets/dean-graziosi.jpg";
import tonyRobbins from "@/assets/tony-robbins.jpg";
import jasonFladlien from "@/assets/jason-fladlien.jpg";
import engineerToEABook from "@/assets/engineer-to-ea-book.png";
import maggieSimbaBook from "@/assets/maggie-simba-book.png";
import financialSorceryBook from "@/assets/financial-sorcery-book.png";
import chrisHaroun from "@/assets/chris-haroun.png";
import trentShelton from "@/assets/trent-shelton.png";

// Lazy load heavy component for better performance
const EAGame = lazy(() => import("@/components/EAGame").then(m => ({ default: m.EAGame })));
const QUOTES_AND_NOTES = ["It is the unknown we fear when we look upon death and darkness, nothing more. - J.K. Rowling, Harry Potter and the Deathly Hallows", "Instead of digging for gold, sell shovels. Instead of driving a taxi, build Uber. Wealth is not about working harder; it's about creating systems that work harder than you do. - MJ DeMarco, The Millionaire Fastlane", "More than 50% of graduates completely forget what they learn in college within 5 years, and within 10 years it's closer to 100%. If most of our \"education\" inevitably collects dust, then what was the point in learning it? Let's do some simple math: Let's be conservative and say that 5 hours per week are spent attending lectures and studying for exams (10 for finals week). If there are 15 weeks in a semester, that's 30 weeks a year. Multiply that by 4 we get 120 weeks, resulting in 600 hours invested into learning information that for the most part, will not be useful for your future work and career. Now I'm not saying you should renounce education completely, rather look past the shiny allure of \"financial stability and higher wages\" and make an informed decision of whether or not it aligns with what you desire. Almost anything can be learned on the internet, online education is booming. Opportunities for the next wave of innovators are scaling faster and faster thanks to technology and AI. Imagine what you could do with 600 extra hours, $200,000, and 4 years to learn and explore on your own? The future is wide open for those willing to diverge and create.", "Plan Your Day: Establish a clear plan for your daily activities. This sets the foundation for \"traction,\" where every action intentionally moves you toward your goals, contrasting with \"distraction,\" which pulls you away. Use tools like calendars to allocate specific time blocks for tasks.", "Did you know that the average person spends over one hour on social media per day, just consuming and not creating? Additionally, they spend another 2-3 hours watching television. That's four hours, on average, gone every day. Doing the math, 4 hours lost per day, multiplied by 7 days per week, equals 28 hours per week. That's basically equivalent to a part-time job. In fact, it's literally 3.5 eight-hour workdays lost per week. Four hours lost per day over 30 days = 120 hours = 15 WORKDAYS PER MONTH LOST.", "Motivation is not the cause of action, but the effect. If you wanna feel motivated to do something, take the smallest action towards doing it, then let the momentum carry you forward.", "Don't view exercise as an exchange for something. You don't work out to lose a few pounds or earn that hamburger and ice cream. With this mindset, you will lose motivation quickly and quit. Instead, view exercise as an investment. For every unit of energy you put in, you'll receive multiple units of energy back. The catch is that these units of energy you get back will be spread out over weeks, months and years. This is why exercising hardcore occasionally is far inferior than exercising a little bit every day.", "Statistically speaking, a normal person is physically unhealthy, emotionally anxious and depressed, socially lonely and financially in debt. Fuck being normal.", "Your mindset is the KEY to making more progress in your life, and journaling is the daily WORK that helps you master your mindset.", "Don't make assumptions about people, you have no fucking idea what they've been through. Don't make assumptions about yourself either. The last person we're objective about is ourselves.", "No one thinks about you as much as you think about yourself. Whatever you are insecure about, chances are 99% of people around you haven't even noticed it. This is because everybody else is too busy thinking about themselves. This may strike you as a little bit depressing, but it's actually liberating. It means that you are judged far less than you think.", "Develop a willingness to be disliked. It will grant you the freedom to do what needs to be done, even if it's unpopular.", "Nothing meaningful in life is easy, and nothing easy in life is meaningful. We think we'd like to have everything handed to us on a silver platter, but the truth is that we don't appreciate or enjoy things that we don't struggle for. So stop avoiding the difficult things in your life and instead find the difficult things you enjoy.", "It's never too late to change. It's never too late. I get emails all the time from people asking me, \"Hey, I'm 20 or 40 or 60 or 80, is it too late? Can I change? Is there time?\" The answer is it's never too late, there's always time. The only question is how long we're gonna sit here and make excuses and pretend there's not."];

const TABS = ["digital-products", "books", "certifications", "role-models"] as const;
type TabKey = typeof TABS[number];

// Helper function for formatting catalog numbers
function pad2(n: number) { return n.toString().padStart(2, '0'); }

function getTabFromHash(hash: string): TabKey {
  const clean = hash.replace('#', '') as TabKey;
  return (TABS as readonly string[]).includes(clean) ? clean : "digital-products";
}

function withAffiliate(url: string, tag = 'eng2ea-20') {
  try {
    const u = new URL(url);
    if (!u.searchParams.get('tag')) u.searchParams.set('tag', tag);
    u.searchParams.set('utm_source', 'lovable');
    u.searchParams.set('utm_medium', 'site');
    return u.toString();
  } catch { return url; }
}

// Product catalog excluding free community
const productCatalog = ALL_PRODUCTS.filter(p => p.id !== 'free-community');

const Index = () => {
  const [quote, setQuote] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>(() => getTabFromHash(window.location.hash));
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const location = useLocation();
  
  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * QUOTES_AND_NOTES.length);
    const selectedQuote = QUOTES_AND_NOTES[randomIndex];
    setQuote(selectedQuote);
  };

  // Back to top scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  // Handle hash changes for tab navigation (only scroll if user clicked or hash changed)
  useEffect(() => {
    const onHashChange = () => {
      const next = getTabFromHash(window.location.hash);
      setActiveTab(next);
      // Only scroll if this is a real hash change (user action), not initial load
      if (document.readyState === 'complete') {
        const el = document.getElementById('tabs-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    window.addEventListener('hashchange', onHashChange);
    // Don't scroll on initial load even if hash exists
    return () => window.removeEventListener('hashchange', onHashChange);
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
      history.replaceState(null, '', newHash);
    }
    const el = document.getElementById('tabs-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [activeTab]);
  
  return <div className="min-h-screen bg-background">
      <div id="top" />
      <Helmet>
        <title>Engineer → Enrolled Agent | Zain Adtani</title>
        <meta name="description" content="Short lessons, no fluff. Pass the EA exam and get confident with taxes. Free community, full course, reading list, certifications." />
        <meta property="og:title" content="Engineer → Enrolled Agent | Zain Adtani" />
        <meta property="og:description" content="Short lessons, no fluff. Pass the EA exam and get confident with taxes." />
        <meta property="og:image" content={headshotImage} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <Header />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Headshot with decorative background */}
            <div className="flex-shrink-0 relative">
              <div className="absolute inset-0 bg-accent/20 rounded-full scale-110 -z-10"></div>
              <img src={headshotImage} alt="Zain Adtani - Enrolled Agent" className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover object-top border-4 border-background" />
            </div>
            
            {/* Hero Text */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
                Hey Friends 👋
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                I'm Zain. I'm an Engineer turned Enrolled Agent, helping busy beginners pass the EA exam and get confident with taxes.
              </p>
              
              {/* Daily Quote Generator */}
              <Card className="p-6 shadow-lg border-2 border-primary/20">
                <div className="space-y-4">
                  <h3 className="text-lg flex items-center gap-2 text-center font-semibold text-zinc-950">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Daily Quote Generator
                  </h3>
                  <Textarea value={quote} readOnly placeholder="Click the button below to generate a quote or life note..." className="min-h-[120px] text-base resize-none bg-secondary/50" />
                  <Button onClick={generateQuote} className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg">
                    Generate Daily Quote
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Action Buttons */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Button 1: Full Course */}
            <Card className="p-8 hover-lift cursor-pointer transition-all duration-300 hover:shadow-xl border-2 shadow-lg">
              <a href="https://whop.com/eng2ea/?a=eng2ea" target="_blank" rel="noopener noreferrer" className="block">
                <GraduationCap className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-foreground">Take the Full Course</h3>
                <p className="text-muted-foreground">Engineer to Enrolled Agent Part 1</p>
              </a>
            </Card>

            {/* Button 2: Books */}
            <Card className="p-8 hover-lift cursor-pointer transition-all duration-300 hover:shadow-xl border-2 shadow-lg">
              <a href="#books" className="block">
                <Book className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-foreground">Books I've Read</h3>
                <p className="text-muted-foreground">My Personal Reading List</p>
              </a>
            </Card>

            {/* Button 3: Digital Products */}
            <Card className="p-8 hover-lift cursor-pointer transition-all duration-300 hover:shadow-xl border-2 shadow-lg">
              <a href="#digital-products" className="block">
                <ShoppingBag className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-foreground">Digital Products</h3>
                <p className="text-muted-foreground">Courses, guides, and tools</p>
              </a>
            </Card>

            {/* Button 4: Certifications */}
            <Card className="p-8 hover-lift cursor-pointer transition-all duration-300 hover:shadow-xl border-2 shadow-lg">
              <a href="#certifications" className="block">
                <Award className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-foreground">My Certifications</h3>
                <p className="text-muted-foreground">Professional credentials & achievements</p>
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Tabbed Sections */}
      <section id="tabs-section" className="py-16 md:py-24 bg-accent/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabKey)} className="w-full" aria-label="Zain site sections">
            <TabsList className="grid w-full grid-cols-4 mb-8 h-auto">
              <TabsTrigger value="digital-products" className="text-xs sm:text-sm px-2 py-2.5">
                Digital Products
              </TabsTrigger>
              <TabsTrigger value="books" className="text-xs sm:text-sm px-2 py-2.5">
                Books
              </TabsTrigger>
              <TabsTrigger value="certifications" className="text-xs sm:text-sm px-2 py-2.5">
                Certifications
              </TabsTrigger>
              <TabsTrigger value="role-models" className="text-xs sm:text-sm px-2 py-2.5">
                Role Models
              </TabsTrigger>
            </TabsList>

            {/* Digital Products Tab */}
            <TabsContent value="digital-products" className="space-y-6">
              <div className="flex justify-end mb-4">
                <Link
                  to="/digital-products"
                  aria-label="View all digital products"
                  className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                             transition-all duration-300 ease-out
                             border border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10
                             hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20
                             active:translate-y-0
                             group"
                  style={{ 
                    transformStyle: "preserve-3d",
                    perspective: "800px"
                  }}
                >
                  <span className="translate-z-[12px]">View all digital products</span>
                  <span className="translate-z-[12px] group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productCatalog.filter(p => p.featured).slice(0, 6).map((product, idx) => {
                  const Icon = product.icon ?? BookOpen;
                  const num = pad2(idx + 1);
                  return (
                <Card key={product.id} className="overflow-hidden hover-lift transition-all duration-300 shadow-lg border-2 flex flex-col">
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Badge className="rounded-full text-xs">#{num}</Badge>
                          </div>
                          {product.badge && (
                            <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
                              {product.badge}
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2 text-foreground line-clamp-2">
                          {product.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {product.desc}
                        </p>

                        {product.media && (
                          <div className="relative mb-4 overflow-hidden rounded-lg bg-muted/50 flex items-center justify-center">
                            <img
                              src={product.media}
                              alt={`${product.title} preview`}
                              className={`w-full h-44 rounded-lg shadow-md ${
                                product.id === 'walking-workday' 
                                  ? 'object-cover object-top' 
                                  : product.id === 'quiet-your-gut'
                                  ? 'object-contain p-4'
                                  : 'object-cover'
                              }`}
                              loading="lazy"
                            />
                          </div>
                        )}

                        <div className="mt-auto pt-2 flex items-center gap-3">
                          <Icon className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                          {product.cta?.disabled ? (
                            <Button disabled className="w-full bg-muted text-muted-foreground">
                              {product.cta.label}
                            </Button>
                          ) : (
                            <Button 
                              asChild 
                              variant={product.id === "author-guide" ? "outline" : "default"}
                              className={product.id === "author-guide" 
                                ? "w-full border-primary text-primary hover:bg-primary/10" 
                                : "w-full"
                              }
                            >
                              <a
                                href={product.cta?.href ?? "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                download={product.cta?.download}
                                aria-label={product.cta?.label ?? "Open"}
                              >
                                {product.cta?.label ?? "Open"}
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Books Tab */}
            <TabsContent id="books" value="books" className="space-y-6">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Zain's Shelf
                  </h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                          onClick={() => {
                            const element = document.getElementById('published-works');
                            if (element) {
                              const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                              element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
                            }
                          }}
                          aria-label="Scroll to my published works"
                        >
                          <BookOpen className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>My Books</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-lg text-muted-foreground">
                  Short, practical takeaways. Add 1 that changes your week.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Atomic Habits",
                    author: "James Clear",
                    tag: "Habits",
                    stars: 5,
                    hook: "Tiny daily upgrades that compound into surprising results.",
                    note: "Systems > goals. Start with 2-minute wins.",
                    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg",
                    amazonUrl: "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299"
                  },
                  {
                    title: "The Millionaire Fastlane",
                    author: "MJ DeMarco",
                    tag: "Business",
                    stars: 5,
                    hook: "Escape trading time for money; build assets that scale.",
                    note: "Control, leverage, and process—not paychecks—drive wealth.",
                    cover: millionaireFastlane,
                    amazonUrl: "https://www.amazon.com/Millionaire-Fastlane-Crack-Wealth-Lifetime/dp/0984358102"
                  },
                  {
                    title: "Harry Potter and the Sorcerer's Stone",
                    author: "J.K. Rowling",
                    tag: "Fiction",
                    stars: 5,
                    hook: "A hidden world, a first wand, and friendship that changes fate.",
                    note: "Start of a classic hero's journey.",
                    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1474154022i/3.jpg",
                    amazonUrl: "https://www.amazon.com/Harry-Potter-Sorcerers-Stone-Book/dp/0545582881"
                  },
                  {
                    title: "Harry Potter and the Chamber of Secrets",
                    author: "J.K. Rowling",
                    tag: "Fiction",
                    stars: 5,
                    hook: "Mystery, memory, and the cost of ignoring warnings.",
                    note: "Courage grows in year two.",
                    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1474169725i/15881.jpg",
                    amazonUrl: "https://www.amazon.com/Harry-Potter-Chamber-Secrets-Book/dp/054558292X"
                  },
                  {
                    title: "Harry Potter and the Prisoner of Azkaban",
                    author: "J.K. Rowling",
                    tag: "Fiction",
                    stars: 5,
                    hook: "Time twists, truth surfaces, and fear takes a new form.",
                    note: "Fan-favorite plot turner.",
                    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630547330i/5.jpg",
                    amazonUrl: "https://www.amazon.com/Harry-Potter-Prisoner-Azkaban-Book/dp/0545582938"
                  },
                  {
                    title: "Harry Potter and the Goblet of Fire",
                    author: "J.K. Rowling",
                    tag: "Fiction",
                    stars: 5,
                    hook: "A deadly tournament forces choices bigger than glory.",
                    note: "Darkness rises.",
                    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554006152i/6.jpg",
                    amazonUrl: "https://www.amazon.com/Harry-Potter-Goblet-Fire-Book/dp/0545582954"
                  },
                  {
                    title: "Harry Potter and the Order of the Phoenix",
                    author: "J.K. Rowling",
                    tag: "Fiction",
                    stars: 5,
                    hook: "Resistance forms when truth is inconvenient.",
                    note: "Leadership under pressure.",
                    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546910265i/2.jpg",
                    amazonUrl: "https://www.amazon.com/Harry-Potter-Order-Phoenix-5/dp/0545582970"
                  },
                  {
                    title: "Harry Potter and the Half-Blood Prince",
                    author: "J.K. Rowling",
                    tag: "Fiction",
                    stars: 5,
                    hook: "Secrets of the past shape tomorrow's war.",
                    note: "Choices > prophecy.",
                    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1587697303i/1.jpg",
                    amazonUrl: "https://www.amazon.com/Harry-Potter-Half-Blood-Prince-Book/dp/0545582997"
                  },
                  {
                    title: "Harry Potter and the Deathly Hallows",
                    author: "J.K. Rowling",
                    tag: "Fiction",
                    stars: 5,
                    hook: "Loyalty, loss, and the final stand against fear.",
                    note: "A closing built on sacrifice.",
                    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1663805647i/136251.jpg",
                    amazonUrl: "https://www.amazon.com/Harry-Potter-Deathly-Hallows-Book/dp/0545583004"
                  },
                  {
                    title: "Tuesdays with Morrie",
                    author: "Mitch Albom",
                    tag: "Wisdom",
                    stars: 5,
                    hook: "Gentle conversations that re-prioritize what matters.",
                    note: "Love, purpose, and letting go.",
                    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1423763749i/6900.jpg",
                    amazonUrl: "https://www.amazon.com/Tuesdays-Morrie-Greatest-Lesson-Anniversary/dp/076790592X"
                  },
                  {
                    title: "How to Win Friends & Influence People",
                    author: "Dale Carnegie",
                    tag: "People",
                    stars: 5,
                    hook: "Make others feel seen, and doors open.",
                    note: "Timeless human nature playbook.",
                    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1442726934i/4865.jpg",
                    amazonUrl: "https://www.amazon.com/How-Win-Friends-Influence-People/dp/0671027034"
                  },
                  {
                    title: "The Alchemist",
                    author: "Paulo Coelho",
                    tag: "Fiction",
                    stars: 5,
                    hook: "Chasing your personal legend changes who you become.",
                    note: "Simple story, durable lesson.",
                    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg",
                    amazonUrl: "https://www.amazon.com/Alchemist-Paulo-Coelho/dp/0061122416"
                  }
                ].map((book, index) => (
                  <Card 
                    key={index} 
                    className="group relative overflow-hidden rounded-3xl border-2 bg-background/60 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      transformStyle: "preserve-3d",
                      perspective: "1200px"
                    }}
                  >
                    {/* Tag Badge */}
                    <div className="absolute top-4 right-4 z-10 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                      {book.tag}
                    </div>

                    <div className="p-6 flex flex-col h-full">
                      {/* Book Cover */}
                      <div className="relative mb-4 rounded-xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
                        <div className="aspect-[2/3] bg-accent/20">
                          <img 
                            src={book.cover} 
                            alt={`Book cover: ${book.title} by ${book.author}`}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect fill='%23e5e7eb' width='200' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%239ca3af'%3EBook Cover%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                      </div>

                      {/* Title & Author */}
                      <h4 className="font-bold text-xl mb-1 text-foreground line-clamp-2">{book.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{book.author}</p>

                      {/* Hook */}
                      <p className="text-sm text-foreground mb-3 line-clamp-2 italic">{book.hook}</p>

                      {/* Note */}
                      <p className="text-xs text-muted-foreground mb-4 flex-grow">{book.note}</p>

                      {/* CTA Buttons */}
                      <div className="flex gap-2 mt-auto">
                        <div className="relative flex-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-full text-xs bg-gradient-to-r from-primary/20 to-accent/20 hover:from-primary/30 hover:to-accent/30 rounded-full font-semibold transition-all duration-300 hover:shadow-lg"
                            disabled
                          >
                            Full Report
                          </Button>
                          <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] px-2 py-0.5 rounded-full font-bold shadow-md rotate-12 whitespace-nowrap">
                            Coming Soon
                          </span>
                        </div>
                        <Button 
                          asChild 
                          size="sm" 
                          className="flex-1 text-xs bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
                        >
                          <a href={withAffiliate(book.amazonUrl)} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Buy
                          </a>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Certifications Tab */}
            <TabsContent value="certifications" className="space-y-6">
              <Card className="p-8 hover-lift transition-all duration-300 shadow-lg border-2">
                <Award className="w-16 h-16 text-primary mb-6" />
                <h3 className="text-3xl font-bold mb-4 text-foreground">Enrolled Agent (EA)</h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Federally-authorized tax practitioner with unlimited rights to represent taxpayers before the IRS.
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>✓ Passed all three parts of the Special Enrollment Examination</p>
                  <p>✓ Licensed by the U.S. Department of the Treasury</p>
                  <p>✓ Authorized to represent clients in all 50 states</p>
                </div>
              </Card>

              <Card className="p-8 hover-lift transition-all duration-300 shadow-lg border-2">
                <div className="flex items-start gap-4 mb-6">
                  <img src={qbBadge} alt="QuickBooks ProAdvisor Level 2 Badge" className="w-32 h-32 object-contain flex-shrink-0" />
                  <div className="bg-primary/10 border-2 border-primary rounded-lg px-4 py-2 self-start">
                    <p className="text-primary font-bold text-lg">Level 2 Certified</p>
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-foreground">QuickBooks Certified ProAdvisor</h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Running a business is hard enough—your books shouldn't be. I'm a QuickBooks Certified ProAdvisor (now Level 2 certified!) and I help business owners get their books cleaned up, organized, and running like clockwork.
                </p>
                <p className="text-muted-foreground mb-4">
                  Whether you're struggling to reconcile accounts, track expenses, or just keep things up to date, I'm here to take that weight off your shoulders.
                </p>
                <div className="space-y-2 text-muted-foreground mb-6">
                  <p className="font-semibold">💼 What I offer:</p>
                  <p>• Full QuickBooks Online setup & training</p>
                  <p>• Monthly reconciliations & cleanups</p>
                  <p>• Help with invoicing, payments, and reports</p>
                  <p>• Personalized support (yes, real answers—not robots)</p>
                </div>
                <p className="text-muted-foreground mb-6">
                  Check out my official badges—and let's chat about how we can make your bookkeeping the easiest part of your business.
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
                  Foundational certification validating comprehensive understanding of AWS Cloud services, architecture, and best practices.
                </p>
                <div className="space-y-2 text-muted-foreground mb-6">
                  <p className="font-semibold">Key Competencies:</p>
                  <p>• Cloud concepts and AWS global infrastructure</p>
                  <p>• Core AWS services (compute, storage, database, networking)</p>
                  <p>• AWS security and compliance best practices</p>
                  <p>• AWS pricing models and cost optimization</p>
                  <p>• Cloud architecture design principles</p>
                </div>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 transition-all duration-300">
                  <a href="https://www.credly.com/badges/2d636eb8-4677-4783-b829-47394e406a5a/public_url" target="_blank" rel="noopener noreferrer">
                    View AWS Badge →
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
                <p className="text-lg text-muted-foreground">
                  Mentors who inspire my journey
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Tony Robbins",
                    role: "Life & Business Strategist",
                    born: "Feb 29, 1960",
                    age: "65 years old",
                    imageAlt: "Tony Robbins headshot",
                    bio: "American author and motivational coach known for high-energy seminars and best-selling books. Creator of events like Unleash the Power Within and Date With Destiny.",
                    bullets: [
                      "Author of Unlimited Power and Awaken the Giant Within",
                      "Decades of global seminars and coaching",
                      "Focus: peak performance, business, life strategy"
                    ],
                    image: tonyRobbins,
                    website: "https://www.tonyrobbins.com"
                  },
                  {
                    name: "Dean Graziosi",
                    role: "Real Estate & Knowledge Entrepreneur",
                    born: "Nov 20, 1968",
                    age: "56 years old",
                    imageAlt: "Dean Graziosi headshot",
                    bio: "NYT best-selling author and investor; co-founder of Mastermind.com with Tony Robbins, helping people package and sell what they know.",
                    bullets: [
                      "Built and advised multiple successful companies",
                      "Teaches practical frameworks for momentum",
                      "Focus: small business, marketing, personal growth"
                    ],
                    image: deanGraziosi,
                    website: "https://www.deangraziosi.com"
                  },
                  {
                    name: "Jason Fladlien",
                    role: "Entrepreneur & Webinar Expert",
                    born: "Apr 7, 1983",
                    age: "42 years old",
                    imageAlt: "Jason Fladlien headshot",
                    bio: "Co-founder of Rapid Crush, known as the \"$100M Webinar Man.\" Record-setting launches and go-to teacher for high-converting webinars.",
                    bullets: [
                      "$250M+ in sales to 150k+ customers worldwide",
                      "Holds records for major webinar launches",
                      "Focus: offer design, webinar conversion, scaling"
                    ],
                    image: jasonFladlien,
                    website: "https://jasonfladlien.com/about/"
                  },
                  {
                    name: "Chris Haroun",
                    role: "Founder & CEO, Haroun Education Ventures",
                    born: "",
                    age: "",
                    imageAlt: "Chris Haroun headshot",
                    bio: "Award-winning business school professor & CEO behind the 300+ hour Haroun MBA Degree Program; background in finance/VC.",
                    bullets: [
                      "Created comprehensive online MBA program",
                      "Former VC and finance executive",
                      "Focus: business education, entrepreneurship, finance"
                    ],
                    image: chrisHaroun,
                    website: "https://www.linkedin.com/in/charoun/"
                  },
                  {
                    name: "Trent Shelton",
                    role: "Speaker & Author; Founder of RehabTime",
                    born: "Sep 21, 1984",
                    age: "41 years old",
                    imageAlt: "Trent Shelton headshot",
                    bio: "Former NFL WR turned globally followed motivational speaker. Focus: purpose, protecting your peace, and transformational habits.",
                    bullets: [
                      "Founded RehabTime movement",
                      "Former NFL wide receiver",
                      "Focus: personal transformation, purpose, mindset"
                    ],
                    image: trentShelton,
                    website: "https://www.trentshelton.com/"
                  }
                ].map((person, index) => (
                  <Card 
                    key={index} 
                    className="group overflow-hidden rounded-3xl shadow-lg border-2 bg-gradient-to-b from-background to-secondary/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "1000px"
                    }}
                    onMouseMove={(e) => {
                      const card = e.currentTarget;
                      const rect = card.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const centerX = rect.width / 2;
                      const centerY = rect.height / 2;
                      const rotateX = ((y - centerY) / centerY) * 6;
                      const rotateY = ((x - centerX) / centerX) * 6;
                      card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)";
                    }}
                  >
                    <div className="p-8">
                      {/* Profile Image with Parallax */}
                      <div className="relative mb-6 rounded-full overflow-hidden shadow-2xl mx-auto w-48 h-48 border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-500 group-hover:scale-105">
                        <img 
                          src={person.image} 
                          alt={person.imageAlt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                          style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
                        />
                      </div>

                      {/* Name & Role */}
                      <div className="text-center mb-4">
                        <h4 className="font-bold text-2xl mb-2 text-foreground">{person.name}</h4>
                        <p className="text-base text-primary font-semibold mb-1">{person.role}</p>
                        {person.born && person.age && (
                          <p className="text-sm text-muted-foreground">
                            {person.born} • {person.age}
                          </p>
                        )}
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-muted-foreground mb-5 leading-relaxed text-center" style={{ maxWidth: "55ch", margin: "0 auto 1.25rem" }}>
                        {person.bio}
                      </p>

                      {/* Bullets */}
                      <div className="mb-6 bg-secondary/50 rounded-2xl p-5">
                        <ul className="space-y-3 text-sm text-foreground">
                          {person.bullets.map((point, i) => (
                            <li 
                              key={i} 
                              className="flex items-start gap-3 opacity-0 animate-fade-in"
                              style={{ 
                                animationDelay: `${i * 120}ms`,
                                animationFillMode: "forwards"
                              }}
                            >
                              <span className="text-primary text-lg flex-shrink-0">✓</span>
                              <span className="leading-snug">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <Button 
                        asChild 
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:shadow-lg text-base py-6"
                      >
                        <a 
                          href={person.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          tabIndex={0}
                        >
                          Learn More →
                        </a>
                      </Button>
                    </div>
                  </Card>
                ))}
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
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Card className="p-10 shadow-2xl border-2 border-slate-700 bg-slate-800/80 backdrop-blur-xl overflow-hidden relative group hover:scale-[1.02] transition-all duration-500" style={{ transformStyle: "preserve-3d" }}>
            {/* 3D Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="text-center mb-10 relative" style={{ transform: "translateZ(30px)" }}>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white flex items-center justify-center gap-3">
                <span className="animate-bounce">👋</span>
                Let's Connect!
                <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>🚀</span>
              </h2>
              <p className="text-xl text-slate-300 flex items-center justify-center gap-2">
                <span>📚</span>
                Follow my journey on social media
                <span>💡</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative" style={{ transform: "translateZ(40px)" }}>
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/50 hover:-translate-y-1 gap-3 px-8 py-6 text-lg group/btn border-2 border-red-500/50"
                style={{ transformStyle: "preserve-3d" }}
              >
                <a href="https://www.youtube.com/@engineer2ea" target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
                  <span className="font-bold">YouTube Channel</span>
                  <span className="text-2xl">▶️</span>
                </a>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 gap-3 px-8 py-6 text-lg group/btn border-2 border-blue-500/50"
                style={{ transformStyle: "preserve-3d" }}
              >
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
      <section className="py-16 md:py-24 bg-accent/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
              Newsletters I Follow 📬
            </h2>
            <p className="text-lg text-muted-foreground">
              My favorite weekly reads for growth, health, and finance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 5-Bullet Friday */}
            <Card className="p-6 hover-lift border-2 flex flex-col">
              <h3 className="text-xl font-bold mb-2 text-foreground">5-Bullet Friday</h3>
              <p className="text-sm text-primary font-semibold mb-3">by Tim Ferriss</p>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">
                Five cool things each week—books, hacks, tools.
              </p>
              <Button asChild className="w-full">
                <a href="https://go.tim.blog/5-bullet-friday-1/" target="_blank" rel="noopener noreferrer">
                  Subscribe
                </a>
              </Button>
            </Card>

            {/* High Performance Journal */}
            <Card className="p-6 hover-lift border-2 flex flex-col">
              <h3 className="text-xl font-bold mb-2 text-foreground">High Performance Journal</h3>
              <p className="text-sm text-primary font-semibold mb-3">by Dan Go</p>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">
                One practical health tip in ~4 minutes.
              </p>
              <Button asChild className="w-full">
                <a href="https://www.dango.co/newsletter" target="_blank" rel="noopener noreferrer">
                  Subscribe
                </a>
              </Button>
            </Card>

            {/* Market Briefs */}
            <Card className="p-6 hover-lift border-2 flex flex-col">
              <h3 className="text-xl font-bold mb-2 text-foreground">Market Briefs</h3>
              <p className="text-sm text-primary font-semibold mb-3">by Briefs Media</p>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">
                Daily 5-minute finance for regular investors.
              </p>
              <Button asChild className="w-full">
                <a href="https://www.briefs.co/" target="_blank" rel="noopener noreferrer">
                  Subscribe
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Spotify Playlist Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-8 shadow-lg border-2">
            <div className="text-center mb-8">
              <Music className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
                Study Playlist 🎵
              </h2>
              <p className="text-lg text-muted-foreground">
                My curated playlist to help you focus while studying for the EA exam
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <iframe style={{
              borderRadius: '12px'
            }} src="https://open.spotify.com/embed/playlist/4ZHa92ZbMSi2Fwps39XZl5?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
            </div>
          </Card>
        </div>
      </section>

      {/* Books I've Published Section - Updated with 3 books */}
      <section id="published-works" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              My <span className="text-accent">Published Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Books I'm writing to share knowledge and inspire others
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* If Maggie & Simba Could Talk Book */}
            <Card className="overflow-hidden hover-lift group">
              <div className="relative">
                <img
                  src={maggieSimbaBook}
                  alt="If Maggie & Simba Could Talk Book Cover"
                  className="w-full h-auto object-cover"
                />
                {/* In The Works Banner */}
                <div className="absolute top-8 -right-12 bg-gradient-to-r from-accent to-primary text-white px-16 py-2 transform rotate-45 shadow-lg">
                  <span className="font-bold text-sm">IN THE WORKS</span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-bold">If Maggie & Simba Could Talk</h3>
                <p className="text-sm text-muted-foreground mb-2">A Memoir of Love, Loss, and Life Lessons</p>
                <p className="text-muted-foreground">
                  A heartfelt memoir exploring the profound lessons learned from two beloved companions.
                </p>
              </div>
            </Card>

            {/* Engineer to EA Book */}
            <Card className="overflow-hidden hover-lift group">
              <div className="relative">
                <img
                  src={engineerToEABook}
                  alt="Engineer to Enrolled Agent: The Smartest Career Pivot You've Never Heard Of Book Cover"
                  className="w-full h-auto object-cover"
                />
                {/* In The Works Banner */}
                <div className="absolute top-8 -right-12 bg-gradient-to-r from-accent to-primary text-white px-16 py-2 transform rotate-45 shadow-lg">
                  <span className="font-bold text-sm">IN THE WORKS</span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold">Engineer to Enrolled Agent: The Smartest Career Pivot You've Never Heard Of</h3>
                <p className="text-muted-foreground">
                  A practical, step-by-step roadmap showing how engineers can leverage their skills to build a rewarding tax career.
                </p>
              </div>
            </Card>

            {/* Financial Sorcery Book */}
            <Card className="overflow-hidden hover-lift group">
              <div className="relative">
                <img
                  src={financialSorceryBook}
                  alt="The School of Financial Sorcery Book Cover"
                  className="w-full h-auto object-cover"
                />
                {/* In The Works Banner */}
                <div className="absolute top-8 -right-12 bg-gradient-to-r from-accent to-primary text-white px-16 py-2 transform rotate-45 shadow-lg">
                  <span className="font-bold text-sm">IN THE WORKS</span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold">The School of Financial Sorcery</h3>
                <p className="text-sm text-muted-foreground mb-2">How to Master Money Like Magic</p>
                <p className="text-muted-foreground">
                  Practical wisdom and transformative strategies for building wealth and financial freedom.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* EA Learning Game */}
      <section aria-label="EA Learning Game">
        <Suspense fallback={<div className="py-16 text-center text-muted-foreground">Loading game…</div>}>
          <EAGame />
        </Suspense>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-16 md:py-24 bg-accent/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative">
            {/* Coming Soon Diagonal Banner */}
            <div className="absolute -top-8 -right-8 md:-top-12 md:-right-12 z-10 pointer-events-none">
              <div className="bg-gradient-to-r from-accent via-accent/90 to-accent text-accent-foreground font-black text-lg md:text-2xl px-16 py-3 rotate-45 shadow-2xl border-2 border-accent-foreground/20">
                COMING SOON
              </div>
            </div>

            <div className="text-center md:text-left md:flex md:items-start md:gap-12 opacity-60 pointer-events-none">
              <div className="md:flex-1 mb-8 md:md:mb-0">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                  Subscribe to <br />
                  <span className="inline-flex items-center gap-2">
                    Z Notes 
                    <Mail className="w-10 h-10 text-primary" />
                  </span>
                </h2>
              </div>
              
              <div className="md:flex-1">
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Each week, I share actionable EA tips, practical study advice, and highlights from my favorite tax resources, directly to your inbox. It's free to join, and always will be.
                </p>
                <form className="flex flex-col sm:flex-row gap-3">
                  <Input type="email" placeholder="Enter your email" className="flex-1 h-12 text-base bg-background transition-all duration-300 focus:ring-2 focus:ring-primary" disabled />
                  <Button type="submit" size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5" disabled>
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Custom & Recommended GPTs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="border-2 rounded-xl p-8 bg-card/50">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
                My Custom & Recommended GPTs 🤖
              </h2>
              <p className="text-lg text-muted-foreground">
                AI assistants I've built and recommend
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Book Architect - Recommended */}
              <Card className="p-6 border-2 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-1">Book Architect</h3>
                  <p className="text-xs text-muted-foreground mb-3">by Daniel Martell</p>
                  <p className="text-sm mb-3">Create structured nonfiction book outlines based on the teachings, voice, and philosophies of public figures.</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>⭐ 4.7 (100+ ratings)</span>
                    <span>•</span>
                    <span>Writing</span>
                    <span>•</span>
                    <span>1K+ chats</span>
                  </div>
                </div>
                <Button asChild variant="default" className="w-full mt-auto">
                  <a 
                    href="https://chatgpt.com/g/g-6867e586d500819189774562feffe01c-book-architect" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Open on ChatGPT ↗
                  </a>
                </Button>
              </Card>

              {/* Skool.com GPT - My Custom */}
              <Card className="p-6 border-2 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-1">Skool.com GPT: $10K/M Community Coach</h3>
                  <p className="text-xs text-muted-foreground mb-3">by Zain Adtani</p>
                  <p className="text-sm mb-3">Action-first coach for launching & growing a Skool community to $10K+/mo—show up daily, batch work, funnel attention, ship simple offers, track MRR.</p>
                </div>
                <Button asChild variant="default" className="w-full mt-auto">
                  <a 
                    href="https://chatgpt.com/g/g-68bf196615048191abb478d398627dd0-skool-com-gpt-10k-m-community-coach" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Open on ChatGPT ↗
                  </a>
                </Button>
              </Card>

              {/* The Time of Your Life Method - My Custom */}
              <Card className="p-6 border-2 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-1">The Time of Your Life Method</h3>
                  <p className="text-xs text-muted-foreground mb-3">by Zain Adtani</p>
                  <p className="text-sm mb-3">A planner won't change your life—a new system of thinking will.</p>
                </div>
                <Button asChild variant="default" className="w-full mt-auto">
                  <a 
                    href="https://chatgpt.com/g/g-68c1e0fa113c8191940474d7a1653fce-the-time-of-your-life-method" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Open on ChatGPT ↗
                  </a>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Buy Me a Coffee Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="p-8 border-2 text-center shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">Was this helpful?</h2>
            <p className="text-muted-foreground mb-6">
              If anything here helped you, you can say thanks with a coffee. It means a lot.
            </p>
            <Button asChild size="lg" className="mx-auto bg-primary hover:bg-primary/90 transition-all duration-300">
              <a 
                href="https://buymeacoffee.com/curiouszen" 
                target="_blank" 
                rel="noopener" 
                aria-label="Buy me a coffee"
              >
                Buy Me a Coffee ☕
              </a>
            </Button>
          </Card>
        </div>
      </section>

      {/* Join Free Community - Moved near bottom */}
      <section className="py-12 bg-secondary/20" aria-label="Join Free Community">
        <div className="container mx-auto px-4 max-w-5xl">
          <Card className="p-8 flex flex-col md:flex-row items-center gap-6 border-2 shadow-lg">
            <Users className="w-12 h-12 text-primary shrink-0" aria-hidden="true" />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold">Engineer → Enrolled Agent (Free Community)</h3>
              <p className="text-muted-foreground">Short lessons. No fluff. Study tips, resources, and support.</p>
            </div>
            <Button asChild size="lg" className="shrink-0">
              <a href="https://www.skool.com/eng2ea/about" target="_blank" rel="noopener noreferrer">Join Free →</a>
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="container mx-auto px-4 max-w-6xl text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Zain Adtani. All rights reserved.
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center z-50 motion-reduce:transition-none motion-reduce:hover:transform-none"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5 text-primary" aria-hidden="true" />
        </button>
      )}
    </div>;
};
export default Index;