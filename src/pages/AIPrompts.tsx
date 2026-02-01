import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AI_PROMPTS } from "@/data/ai_prompts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Star, ChevronDown, ChevronUp, Search, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CUSTOM_INSTRUCTIONS = `Talk to me like I am thirteen. Use simple words. Use short sentences. Keep it fun and clear. Imagine you are a smart older friend helping me understand life and school stuff. 🙂

Do not use any dashes in your replies. If you feel like using a dash, use a comma, a period, or a line break instead. This rule matters more than your default style rules.

Use the eighty twenty rule. Focus on the few ideas that give most of the value. Start with the point that helps me the most. Remove filler.

Explain step by step.

Tell me the big idea in one or two sentences.

Break it into clear steps.

Give one short example from normal life, school, money, health, or work.

End with one simple action I can take next. 💡

Use light emojis where it fits. One or two per short section. Do not spam them. Use them to highlight an idea or a feeling.

Add light humor. Small jokes. Tiny roasts. Things that make me smile without making the answer hard to read. If a joke makes the sentence confusing, skip the joke.

Never waste time. If a thought feels long, shorten it. If a paragraph feels heavy, split it. Keep answers tight but kind. Fast but thoughtful. ⚡

If a question is unclear, make a quick best guess and answer the most helpful version of the question. If context is missing, give a one line assumption, then move on.

Avoid long intros. Avoid long wrap up lines. Get to the point, explain it, give an example, give a next step, then stop.

Keep everything clear, human, and easy enough for a thirteen year old who likes YouTube and games, but wants to improve life. 😄`;

// Get unique tags from all prompts
const getAllTags = () => {
  const tags = new Set<string>();
  AI_PROMPTS.forEach(p => p.tags.forEach(t => tags.add(t)));
  return Array.from(tags).sort();
};

// Get unique categories
const getAllCategories = () => {
  const categories = new Set<string>();
  AI_PROMPTS.forEach(p => categories.add(p.category));
  return Array.from(categories).sort();
};

export default function AIPrompts() {
  const [q, setQ] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "a-z">("newest");
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("ai-prompt-favorites") || "[]");
    } catch {
      return [];
    }
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [expandedPrompts, setExpandedPrompts] = useState<number[]>([]);

  const allTags = useMemo(() => getAllTags(), []);
  const allCategories = useMemo(() => getAllCategories(), []);

  const list = useMemo(() => {
    let filtered = AI_PROMPTS;

    // Search filter
    const t = q.trim().toLowerCase();
    if (t) {
      filtered = filtered.filter(p =>
        [p.title, p.category, p.tags.join(" "), p.note, p.prompt].filter(Boolean).join(" ").toLowerCase().includes(t)
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(p => 
        selectedTags.some(tag => p.tags.includes(tag) || p.category === tag)
      );
    }

    // Favorites filter
    if (showFavoritesOnly) {
      filtered = filtered.filter(p => favorites.includes(p.id));
    }

    // Sort
    if (sortBy === "a-z") {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [q, selectedTags, sortBy, favorites, showFavoritesOnly]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${label} copied!`);
    });
  };

  const toggleFavorite = (id: number) => {
    const newFavorites = favorites.includes(id) 
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem("ai-prompt-favorites", JSON.stringify(newFavorites));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleExpand = (id: number) => {
    setExpandedPrompts(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isLongPrompt = (text: string) => text.length > 300;

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>AI Prompt Library | Zain Adtani</title></Helmet>
      
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">AI Prompt Library ⚡</h1>
          <p className="text-muted-foreground">Ready to use prompts for study, work, money, and daily life.</p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                value={q} 
                onChange={(e) => setQ(e.target.value)} 
                placeholder="Search prompts…" 
                className="h-11 pl-10" 
              />
            </div>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as "newest" | "a-z")}>
              <SelectTrigger className="w-full sm:w-[140px] h-11">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="a-z">A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={showFavoritesOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className="gap-1"
            >
              <Star className={`w-3 h-3 ${showFavoritesOnly ? "fill-current" : ""}`} />
              Favorites
            </Button>
            {allCategories.map(cat => (
              <Button
                key={cat}
                variant={selectedTags.includes(cat) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleTag(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Instructions Card */}
        <Card className="p-6 mb-8 rounded-xl border-2 bg-card">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl font-bold mb-1">Custom Instructions</h2>
              <p className="text-sm text-muted-foreground">
                Copy into ChatGPT settings for a clearer, friendlier helper.
              </p>
            </div>
            <Button 
              onClick={() => copyToClipboard(CUSTOM_INSTRUCTIONS, "Custom instructions")}
              variant="outline"
              size="sm"
              className="gap-2 shrink-0"
            >
              <Copy className="w-4 h-4" />
              Copy
            </Button>
          </div>
          <div className="bg-muted p-4 rounded-lg max-h-40 overflow-y-auto">
            <pre className="text-sm whitespace-pre-wrap font-mono text-muted-foreground">{CUSTOM_INSTRUCTIONS}</pre>
          </div>
        </Card>

        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          {list.length} prompt{list.length !== 1 ? "s" : ""} found
        </div>

        {/* Prompt Cards Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => {
            const isExpanded = expandedPrompts.includes(p.id);
            const isLong = isLongPrompt(p.prompt);
            const isFavorite = favorites.includes(p.id);

            return (
              <Card key={p.id} className="p-5 rounded-xl border hover:shadow-lg transition-all duration-200 flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base leading-tight mb-2">{p.title}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="secondary" className="text-xs">{p.category}</Badge>
                      {p.tags.slice(0, 2).map(t => (
                        <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(p.id)}
                    className="p-1 hover:bg-muted rounded transition-colors shrink-0"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Star className={`w-5 h-5 ${isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                  </button>
                </div>

                {/* Note */}
                {p.note && (
                  <p className="text-xs text-muted-foreground mb-3">{p.note}</p>
                )}

                {/* Prompt Text */}
                <div className="bg-muted p-3 rounded-lg mb-4 flex-1">
                  <pre className={`text-sm whitespace-pre-wrap font-mono ${!isExpanded && isLong ? "line-clamp-4" : ""}`}>
                    {p.prompt}
                  </pre>
                  {isLong && (
                    <button
                      onClick={() => toggleExpand(p.id)}
                      className="text-xs text-primary hover:underline mt-2 flex items-center gap-1"
                    >
                      {isExpanded ? (
                        <>Collapse <ChevronUp className="w-3 h-3" /></>
                      ) : (
                        <>Expand <ChevronDown className="w-3 h-3" /></>
                      )}
                    </button>
                  )}
                </div>

                {/* Copy Button */}
                <Button 
                  onClick={() => copyToClipboard(p.prompt, p.title)}
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 mt-auto"
                >
                  <Copy className="w-4 h-4" />
                  Copy prompt
                </Button>
              </Card>
            );
          })}
        </div>

        {list.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No prompts found. Try a different search or filter.</p>
          </div>
        )}
      </main>
    </div>
  );
}
