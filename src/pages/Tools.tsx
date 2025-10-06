import { useState, useMemo, useCallback } from "react";
import { Search, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import zaLogo from "@/assets/za-logo.png";

interface Tool {
  name: string;
  url: string;
  description: string;
  category: string;
}

const TOOLS: Tool[] = [
  // AI & Agents
  {
    name: "Google AI Studio",
    url: "https://aistudio.google.com",
    description: "Build and test AI prompts with Google's latest models",
    category: "AI & Agents",
  },
  {
    name: "Claude",
    url: "https://claude.ai",
    description: "AI assistant by Anthropic for conversations and tasks",
    category: "AI & Agents",
  },
  {
    name: "ElevenLabs (TTS)",
    url: "https://elevenlabs.io",
    description: "Realistic text-to-speech and voice cloning",
    category: "AI & Agents",
  },
  {
    name: "NotebookLM",
    url: "https://notebooklm.google",
    description: "AI-powered research and note-taking assistant",
    category: "AI & Agents",
  },
  // Courses & Learning
  {
    name: "Udemy (My Learning)",
    url: "https://www.udemy.com/home/my-courses/learning/",
    description: "Access your enrolled courses and continue learning",
    category: "Courses & Learning",
  },
  {
    name: "Gamma",
    url: "https://gamma.app",
    description: "Create beautiful presentations with AI assistance",
    category: "Courses & Learning",
  },
  {
    name: "Mastermind.com",
    url: "https://www.mastermind.com",
    description: "Connect with experts and join mastermind groups",
    category: "Courses & Learning",
  },
  // Productivity
  {
    name: "Otter.ai",
    url: "https://otter.ai",
    description: "AI meeting notes and transcription service",
    category: "Productivity",
  },
  {
    name: "Send to Kindle",
    url: "https://www.amazon.com/sendtokindle",
    description: "Email documents directly to your Kindle device",
    category: "Productivity",
  },
  {
    name: "Mindgrasp",
    url: "https://mindgrasp.ai",
    description: "AI study assistant for notes and flashcards",
    category: "Productivity",
  },
  {
    name: "ShowMyPC",
    url: "https://showmypc.com",
    description: "Simple remote desktop and screen sharing",
    category: "Productivity",
  },
  // Research & Writing
  {
    name: "Figma",
    url: "https://www.figma.com",
    description: "Collaborative design and prototyping platform",
    category: "Research & Writing",
  },
  {
    name: "Euless Public Library",
    url: "https://www.eulesstx.gov/132/Euless-Public-Library",
    description: "Access digital resources and library catalog",
    category: "Research & Writing",
  },
  {
    name: "Reddit",
    url: "https://www.reddit.com",
    description: "Communities and discussions on every topic",
    category: "Research & Writing",
  },
  // Utilities
  {
    name: "Temp Mail",
    url: "https://temp-mail.org",
    description: "Disposable email addresses for privacy",
    category: "Utilities",
  },
  {
    name: "Napkin AI",
    url: "https://www.napkin.ai",
    description: "Turn text into visual diagrams instantly",
    category: "Utilities",
  },
  {
    name: "Playlist Manager",
    url: "http://playlist-manager.com/#/login",
    description: "Organize and manage your music playlists",
    category: "Utilities",
  },
];

const CATEGORIES = [
  "AI & Agents",
  "Courses & Learning",
  "Productivity",
  "Research & Writing",
  "Utilities",
];

function ToolCard({ tool }: { tool: Tool }) {
  const getFavicon = (url: string) => {
    try {
      const domain = new URL(url).hostname;
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
      className="group block h-full"
    >
      <div className="h-full backdrop-blur-md bg-card/80 border border-border rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 p-6 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          {getFavicon(tool.url) && (
            <img
              src={getFavicon(tool.url)!}
              alt=""
              className="w-10 h-10 rounded-lg flex-shrink-0"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-1">
              <span className="truncate">{tool.name}</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {tool.description}
            </p>
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

export default function Tools() {
  const [query, setQuery] = useState("");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return TOOLS.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q)
    );
  }, [query]);

  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: 6000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    []
  );

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  useMemo(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const isSearching = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="border-b border-border bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={zaLogo}
              alt="Zain HQ"
              className="w-12 h-12 rounded-lg"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling!.classList.remove("hidden");
              }}
            />
            <div className="hidden text-2xl font-bold text-primary">Zain HQ</div>
          </div>
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
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {isSearching ? (
          // Search Results Grid
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              {filteredTools?.length || 0} result{filteredTools?.length !== 1 ? "s" : ""}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools?.map((tool) => (
                <ToolCard key={tool.name} tool={tool} />
              ))}
            </div>
            {filteredTools?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No tools found matching your search</p>
              </div>
            )}
          </div>
        ) : (
          // Carousel View
          <div className="space-y-8">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[autoplayPlugin]}
              className="w-full"
              setApi={setApi}
            >
              <CarouselContent>
                {CATEGORIES.map((category) => {
                  const categoryTools = TOOLS.filter((t) => t.category === category);
                  return (
                    <CarouselItem key={category}>
                      <div className="space-y-6">
                        <h2 className="text-3xl font-bold">{category}</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {categoryTools.map((tool) => (
                            <ToolCard key={tool.name} tool={tool} />
                          ))}
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <div className="flex items-center justify-center gap-4 mt-8">
                <CarouselPrevious className="static translate-y-0" />
                
                {/* Dot Indicators */}
                <div className="flex gap-2">
                  {CATEGORIES.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        current === index
                          ? "bg-primary w-8"
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                      onClick={() => scrollTo(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>

            {/* Keyboard Navigation Hint */}
            <p className="text-center text-xs text-muted-foreground">
              Use arrow keys to navigate • Hover to pause auto-rotation
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
