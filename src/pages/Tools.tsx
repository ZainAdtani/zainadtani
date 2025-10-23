import { useState, useMemo } from "react";
import { Search, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Tool {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
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
    id: "elevenlabs",
    name: "ElevenLabs (TTS)",
    url: "https://elevenlabs.io",
    description: "Realistic text-to-speech and voice cloning",
    category: "AI & Agents",
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
    id: "gamma",
    name: "Gamma",
    url: "https://gamma.app",
    description: "Create beautiful presentations with AI assistance",
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
  // Research & Writing
  {
    id: "figma",
    name: "Figma",
    url: "https://www.figma.com",
    description: "Collaborative design and prototyping platform",
    category: "Research & Writing",
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
];

const HIDDEN_IDS = new Set(["showmypc", "euless-public-library", "reddit"]);

const SECTION_ORDER = ["AI & Agents", "Productivity", "Research & Writing", "Courses & Learning", "Utilities"];

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
      className="group block flex-shrink-0 w-[320px] snap-start"
    >
      <div className="h-[280px] backdrop-blur-md bg-card/90 border border-border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 p-8 flex flex-col gap-6">
        <div className="flex items-start gap-4">
          {getFavicon(tool.url) && (
            <img
              src={getFavicon(tool.url)!}
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

  const displayTools = useMemo(() => {
    return TOOLS.filter(t => !HIDDEN_IDS.has(t.id));
  }, []);

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return displayTools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q)
    );
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
                          try {
                            const domain = new URL(tool.url).hostname;
                            return (
                              <img
                                src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                                alt=""
                                className="w-10 h-10 rounded-lg flex-shrink-0"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            );
                          } catch {
                            return null;
                          }
                        })()}
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
              <section key={section.name} className="space-y-6">
                <div className="container mx-auto px-4 max-w-6xl">
                  <h2 className="text-3xl font-bold tracking-tight">{section.name}</h2>
                </div>
                
                <div className="relative">
                  {/* Gradient fade on edges */}
                  <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
                  
                  {/* Horizontal scroll container */}
                  <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex gap-6 px-4 pb-4 snap-x snap-mandatory" style={{ paddingLeft: 'max(1rem, calc((100vw - 72rem) / 2))', paddingRight: 'max(1rem, calc((100vw - 72rem) / 2))' }}>
                      {section.items.map((tool) => (
                        <ToolCard key={tool.id} tool={tool} />
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
