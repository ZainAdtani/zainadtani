import { useState, useMemo, useRef } from "react";
import { Search, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Tool {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  iconUrl?: string;
}

const TOOLS: Tool[] = [
  // AI & Agents
  {
    id: "google-ai-studio",
    name: "Google AI Studio",
    url: "https://aistudio.google.com",
    description: "Build and test AI prompts with Google's latest models",
    category: "AI & Agents",
  },
  {
    id: "claude",
    name: "Claude",
    url: "https://claude.ai",
    description: "AI assistant by Anthropic for conversations and tasks",
    category: "AI & Agents",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    url: "https://www.perplexity.ai",
    description: "AI answer engine for fast, cited results",
    category: "AI & Agents",
  },
  {
    id: "gemini",
    name: "Gemini",
    url: "https://gemini.google.com",
    description: "Google's AI assistant for planning, writing, and more",
    category: "AI & Agents",
  },
  {
    id: "microsoft-copilot",
    name: "Microsoft Copilot",
    url: "https://copilot.microsoft.com",
    description: "AI companion from Microsoft",
    category: "AI & Agents",
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs (TTS)",
    url: "https://elevenlabs.io",
    description: "Realistic text-to-speech and voice cloning",
    category: "AI & Agents",
  },
  {
    id: "hedra",
    name: "Hedra",
    url: "https://www.hedra.com/app/home",
    description: "AI video, audio, and imagery creation. Great for talking character videos.",
    category: "AI & Agents",
    iconUrl: "/images/tools/hedra-icon.png",
  },
  {
    id: "notebooklm",
    name: "NotebookLM",
    url: "https://notebooklm.google",
    description: "AI-powered research and note-taking assistant",
    category: "AI & Agents",
  },
  // Courses & Learning
  {
    id: "udemy",
    name: "Udemy (My Learning)",
    url: "https://www.udemy.com/home/my-courses/learning/",
    description: "Access your enrolled courses and continue learning",
    category: "Courses & Learning",
  },
  {
    id: "mastermind",
    name: "Mastermind.com",
    url: "https://www.mastermind.com",
    description: "Connect with experts and join mastermind groups",
    category: "Courses & Learning",
  },
  // Productivity
  {
    id: "fathom",
    name: "Fathom AI Meeting Assistant",
    url: "https://www.fathom.ai/",
    description: "AI meeting assistant that records, transcribes, and summarizes calls from Zoom and other platforms. Helps you capture key moments, action items, and highlights without manual note taking.",
    category: "Productivity",
  },
  {
    id: "gamma",
    name: "Gamma",
    url: "https://gamma.app",
    description: "Create beautiful presentations with AI assistance",
    category: "Productivity",
  },
  {
    id: "figma",
    name: "Figma",
    url: "https://www.figma.com",
    description: "Collaborative design and prototyping platform",
    category: "Productivity",
  },
  {
    id: "otter",
    name: "Otter.ai",
    url: "https://otter.ai",
    description: "AI meeting notes and transcription service",
    category: "Productivity",
  },
  {
    id: "send-to-kindle",
    name: "Send to Kindle",
    url: "https://www.amazon.com/sendtokindle",
    description: "Email documents directly to your Kindle device",
    category: "Productivity",
  },
  {
    id: "mindgrasp",
    name: "Mindgrasp",
    url: "https://mindgrasp.ai",
    description: "AI study assistant for notes and flashcards",
    category: "Productivity",
  },
  // Images & Design
  {
    id: "canva",
    name: "Canva Pro",
    url: "https://www.canva.com",
    description: "Visual design tool for presentations, thumbnails, course covers, and social posts. Great for quick, polished graphics that match my brand colors and fonts.",
    category: "Images & Design",
  },
  {
    id: "bing-image-creator",
    name: "Bing Image Creator",
    url: "https://www.bing.com/images/create?FORM=GENILP",
    description: "Turn ideas into AI images with prompt-based creation",
    category: "Images & Design",
  },
  {
    id: "ideogram",
    name: "Ideogram",
    url: "https://ideogram.ai/t/explore",
    description: "Create images with strong typography and styles; explore community prompts",
    category: "Images & Design",
  },
  {
    id: "mj-splitter",
    name: "MJ Splitter",
    url: "https://www.mjsplitter.com/",
    description: "Split MidJourney grids into individual high-quality files—free, no signup",
    category: "Images & Design",
  },
  {
    id: "upscale-media",
    name: "upscale.media",
    url: "https://www.upscale.media/",
    description: "Upscale and enhance images automatically (denoise, sharpen, enlarge)",
    category: "Images & Design",
  },
  // Utilities
  {
    id: "temp-mail",
    name: "Temp Mail",
    url: "https://temp-mail.org",
    description: "Disposable email addresses for privacy",
    category: "Utilities",
  },
  {
    id: "napkin-ai",
    name: "Napkin AI",
    url: "https://www.napkin.ai",
    description: "Turn text into visual diagrams instantly",
    category: "Utilities",
  },
  {
    id: "playlist-manager",
    name: "Playlist Manager",
    url: "http://playlist-manager.com/#/login",
    description: "Organize and manage your music playlists",
    category: "Utilities",
  },
  // Apps
  {
    id: "bookmory",
    name: "Bookmory",
    url: "https://apps.apple.com/us/app/bookmory-reading-tracker/id1515533482",
    description: "Reading tracker & notes",
    category: "Apps",
    iconUrl: "/images/tools/bookmory-icon.png",
  },
  {
    id: "heygen",
    name: "HeyGen",
    url: "https://www.heygen.com",
    description: "AI avatar video creator",
    category: "Apps",
  },
  {
    id: "dr-berg-junk-food-meter",
    name: "Dr. Berg – Junk Food Meter",
    url: "https://apps.apple.com/us/app/dr-berg-junk-food-meter/id6738574318",
    description: "Scan barcodes to spot ultra-processed ingredients",
    category: "Apps",
    iconUrl: "/images/tools/dr-berg-icon.png",
  },
  {
    id: "audible",
    name: "Audible",
    url: "https://www.audible.com/ep/howtolisten",
    description: "Audiobooks & podcasts",
    category: "Apps",
  },
  {
    id: "elevenreader",
    name: "ElevenReader",
    url: "https://apps.apple.com/us/app/elevenreader-voice-reader/id6479373050",
    description: "High-quality AI reader for web pages, PDFs, and text",
    category: "Apps",
    iconUrl: "/images/tools/elevenreader-icon.png",
  },
  {
    id: "delta-emulator",
    name: "Delta – Game Emulator",
    url: "https://apps.apple.com/us/app/delta-game-emulator/id1048524688",
    description: "Play classic Nintendo-era games (bring your own legal ROMs)",
    category: "Apps",
    iconUrl: "/images/tools/delta-icon.png",
  },
  {
    id: "suno",
    name: "Suno",
    url: "https://suno.com/",
    description: "Create AI-generated music and vocals in minutes",
    category: "Apps",
  },
  {
    id: "nba-app",
    name: "NBA App",
    url: "https://www.nba.com/app",
    description: "Live scores, highlights, League Pass",
    category: "Apps",
  },
  {
    id: "chatgpt-app",
    name: "ChatGPT",
    url: "https://chatgpt.com/download/",
    description: "Official ChatGPT app",
    category: "Apps",
  },
  // Marketplaces
  {
    id: "etsy",
    name: "Etsy",
    url: "https://www.etsy.com/",
    description: "Handmade, vintage, and unique goods marketplace",
    category: "Marketplaces",
  },
  {
    id: "ebay",
    name: "eBay",
    url: "https://www.ebay.com/",
    description: "Online marketplace for buying and selling",
    category: "Marketplaces",
  },
  {
    id: "whop",
    name: "WHOP",
    url: "https://whop.com/",
    description: "Digital products and memberships marketplace",
    category: "Marketplaces",
  },
  {
    id: "mastermind-marketplace",
    name: "Mastermind.com",
    url: "https://www.mastermind.com/",
    description: "Connect with experts and join mastermind groups",
    category: "Marketplaces",
  },
  {
    id: "udemy-marketplace",
    name: "Udemy",
    url: "https://www.udemy.com/",
    description: "Online learning and teaching marketplace",
    category: "Marketplaces",
  },
  {
    id: "youtube-marketplace",
    name: "YouTube",
    url: "https://www.youtube.com/",
    description: "Video sharing and discovery platform",
    category: "Marketplaces",
    iconUrl: "/logos/youtube.png",
  },
  // Courses I Recommend
  {
    id: "aws-cloud-practitioner-essentials",
    name: "AWS Cloud Practitioner Essentials",
    url: "https://www.coursera.org/learn/aws-cloud-practitioner-essentials",
    description: "Foundational AWS cloud concepts and services",
    category: "Courses I Recommend",
    iconUrl: "/logos/coursera.png",
  },
  {
    id: "aws-cloud-technical-essentials-course",
    name: "AWS Cloud Technical Essentials",
    url: "https://www.coursera.org/learn/aws-cloud-technical-essentials",
    description: "Technical fundamentals of AWS cloud",
    category: "Courses I Recommend",
    iconUrl: "/logos/coursera.png",
  },
  {
    id: "aws-fundamentals-migrating",
    name: "AWS Fundamentals, Migrating to the Cloud",
    url: "https://www.coursera.org/learn/aws-fundamentals-migrating-to-the-cloud",
    description: "Learn cloud migration strategies with AWS",
    category: "Courses I Recommend",
    iconUrl: "/logos/coursera.png",
  },
  {
    id: "aws-fundamentals-specialization-course",
    name: "AWS Fundamentals Specialization",
    url: "https://www.coursera.org/specializations/aws-fundamentals",
    description: "Complete AWS fundamentals learning path",
    category: "Courses I Recommend",
    iconUrl: "/logos/coursera.png",
  },
  {
    id: "nlp-practitioner-course",
    name: "NLP Practitioner plus Master",
    url: "https://www.udemy.com/course/nlp-practitioner-master-practitioner-certification-course/",
    description: "Comprehensive NLP certification training",
    category: "Courses I Recommend",
  },
];

const HIDDEN_IDS = new Set(["showmypc", "euless-public-library", "reddit"]);

const SECTION_ORDER = ["AI & Agents", "Productivity", "Images & Design", "Courses & Learning", "Utilities", "Apps", "Marketplaces", "Courses I Recommend"];

function ToolCard({ tool }: { tool: Tool }) {
  const getIcon = (tool: Tool) => {
    if (tool.iconUrl) return tool.iconUrl;
    try {
      const domain = new URL(tool.url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return null;
    }
  };

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block flex-shrink-0 w-[320px] snap-start"
    >
      <div className="h-[280px] backdrop-blur-md bg-card/90 border border-border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 p-8 flex flex-col gap-6">
        <div className="flex items-start gap-4">
          {getIcon(tool) && (
            <img
              src={getIcon(tool)!}
              alt=""
              className="w-12 h-12 rounded-xl flex-shrink-0"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-2">
              <span className="truncate">{tool.name}</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {tool.description}
            </p>
            {tool.id === "delta-emulator" && (
              <p className="text-xs text-muted-foreground/70 mt-1 italic">
                Use only game files you own.
              </p>
            )}
          </div>
        </div>
        <Button
          className="w-full mt-auto"
          onClick={(e) => {
            e.preventDefault();
            window.open(tool.url, "_blank", "noopener,noreferrer");
          }}
        >
          Open Tool
        </Button>
      </div>
    </a>
  );
}

function ScrollableSection({ section }: { section: { name: string; items: Tool[] } }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 360;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="space-y-6">
      <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{section.name}</h2>
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            aria-label={`Scroll ${section.name} left`}
            className="h-9 w-9"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            aria-label={`Scroll ${section.name} right`}
            className="h-9 w-9"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="relative">
        {/* Mobile scroll arrows */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("left")}
          aria-label={`Scroll ${section.name} left`}
          className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full shadow-lg bg-card/95 backdrop-blur-sm"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("right")}
          aria-label={`Scroll ${section.name} right`}
          className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full shadow-lg bg-card/95 backdrop-blur-sm"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* Horizontal scroll container */}
        <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 px-4 pb-4 snap-x snap-mandatory" style={{ paddingLeft: 'max(1rem, calc((100vw - 72rem) / 2))', paddingRight: 'max(1rem, calc((100vw - 72rem) / 2))' }}>
            {section.items.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Tools() {
  const [query, setQuery] = useState("");

  const displayTools = useMemo(() => {
    return TOOLS.filter(t => !HIDDEN_IDS.has(t.id));
  }, []);

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    
    const normalizeDigits = (s: string) => (s.match(/\d+/g) || []).join("");
    const qDigits = normalizeDigits(query);
    
    return displayTools.filter((tool) => {
      const titleMatch = tool.name.toLowerCase().includes(q);
      const descMatch = tool.description.toLowerCase().includes(q);
      const digitMatch = qDigits.length > 0 && normalizeDigits(tool.name) === qDigits;
      return titleMatch || descMatch || digitMatch;
    });
  }, [query, displayTools]);

  const orderedSections = useMemo(() => {
    const grouped = displayTools.reduce((acc, tool) => {
      if (!acc[tool.category]) acc[tool.category] = [];
      acc[tool.category].push(tool);
      return acc;
    }, {} as Record<string, Tool[]>);

    return SECTION_ORDER
      .map(name => ({
        name,
        items: (grouped[name] ?? []).sort((a, b) => a.name.localeCompare(b.name))
      }))
      .filter(s => s.items.length > 0);
  }, [displayTools]);

  const isSearching = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b border-border bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Tools</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Everything I use—organized by category
          </p>

          {/* Search Bar */}
          <div className="max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search tools…"
                className="pl-10 h-12 bg-card/50 backdrop-blur-sm border-border"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search tools"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 ml-1">
              Matches Tools across HQ
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pb-12">
        {isSearching ? (
          // Search Results Grid
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-semibold mb-6">
              {filteredTools?.length || 0} result{filteredTools?.length !== 1 ? "s" : ""}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools?.map((tool) => (
                <div key={tool.name} className="w-full">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full"
                  >
                    <div className="h-full backdrop-blur-md bg-card/90 border border-border rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 p-6 flex flex-col gap-4">
                      <div className="flex items-start gap-3">
                         {(() => {
                          const icon = tool.iconUrl || (() => {
                            try {
                              const domain = new URL(tool.url).hostname;
                              return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
                            } catch {
                              return null;
                            }
                          })();
                          
                          return icon ? (
                            <img
                              src={icon}
                              alt=""
                              className="w-10 h-10 rounded-lg flex-shrink-0"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : null;
                        })()}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground flex items-center gap-2 mb-1">
                            <span className="truncate">{tool.name}</span>
                            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {tool.description}
                          </p>
                          {tool.id === "delta-emulator" && (
                            <p className="text-xs text-muted-foreground/70 mt-1 italic">
                              Use only game files you own.
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        className="w-full mt-auto"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(tool.url, "_blank", "noopener,noreferrer");
                        }}
                      >
                        Open Tool
                      </Button>
                    </div>
                  </a>
                </div>
              ))}
            </div>
            {filteredTools?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No tools found matching your search</p>
              </div>
            )}
          </div>
        ) : (
          // Apple-Style Category Sections with Horizontal Scroll
          <div className="space-y-16">
            {orderedSections.map((section) => (
              <ScrollableSection key={section.name} section={section} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
