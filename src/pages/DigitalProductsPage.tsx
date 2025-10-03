import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";
import { ALL_PRODUCTS, CATEGORIES } from "@/data/products";

export default function DigitalProductsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<typeof CATEGORIES[number]>("All");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return ALL_PRODUCTS.filter(p => 
      (cat === "All" || p.category === cat) &&
      (!query || p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query))
    );
  }, [q, cat]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <header className="py-10 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Digital Products Library</h1>
          <p className="text-muted-foreground mt-2">
            Search everything in one place — courses, guides, communities, and more.
          </p>

          {/* Search */}
          <div className="relative mt-6 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              aria-label="Search digital products"
              placeholder="Search by title or description…"
              className="pl-10 h-12"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2 mt-6">
            {CATEGORIES.map((c) => (
              <Button
                key={c}
                type="button"
                variant={cat === c ? "default" : "outline"}
                onClick={() => setCat(c)}
                className="rounded-full h-9"
                aria-pressed={cat === c}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>
      </header>

      <main className="pb-24">
        <div className="container mx-auto px-4 max-w-6xl pt-8">
          {filtered.length === 0 && (
            <p className="text-muted-foreground text-center py-12">
              No results. Try a different search or category.
            </p>
          )}

          {/* Discover grid (Skool-like) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <Card 
                key={p.id} 
                className="group overflow-hidden border-2 bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {p.media && (
                  <div className="relative">
                    <img
                      src={p.media}
                      alt={`${p.title} preview`}
                      className="w-full h-44 object-cover"
                      loading="lazy"
                    />
                    {p.badge && (
                      <span className="absolute top-3 left-3 text-[10px] px-2 py-0.5 rounded-full bg-primary/90 text-primary-foreground tracking-wide">
                        {p.badge}
                      </span>
                    )}
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg leading-snug line-clamp-2 text-foreground flex-1">
                      {p.title}
                    </h3>
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {p.category}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{p.desc}</p>

                  {p.tags && p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.tags.map((t) => (
                        <Badge key={t} variant="outline" className="rounded-full text-xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {p.cta?.disabled ? (
                    <Button disabled className="w-full bg-muted text-muted-foreground">
                      {p.cta.label}
                    </Button>
                  ) : (
                    <Button asChild className="w-full">
                      <a
                        href={p.cta?.href ?? "#"}
                        target={p.cta?.download ? "_blank" : "_self"}
                        rel="noopener"
                        download={p.cta?.download}
                        aria-label={p.cta?.label ?? "Open"}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {p.cta?.label ?? "Open"}
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="container mx-auto px-4 max-w-6xl text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Zain Adtani. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
