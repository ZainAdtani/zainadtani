import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, BookOpen } from "lucide-react";
import { Header } from "@/components/Header";
import { ALL_PRODUCTS, CATEGORIES } from "@/data/products";
import Logo3D from "@/components/Logo3D";

function pad2(n: number) { return n.toString().padStart(2, '0'); }

export default function DigitalProductsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<typeof CATEGORIES[number]>("All");

  // Exclude free community from product catalog
  const catalog = useMemo(() => ALL_PRODUCTS.filter(p => p.id !== 'free-community'), []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return catalog
      .filter(p => 
        (cat === "All" || p.category === cat) &&
        (!query || p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query))
      )
      .map((p, idx) => ({ ...p, catalogIndex: idx + 1 }));
  }, [catalog, q, cat]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Digital Products — MAJESTY HQ | Zain Adtani</title>
        <meta name="description" content="Search courses, guides, and tools—all in one place." />
        <meta property="og:title" content="Digital Products — MAJESTY HQ | Zain Adtani" />
        <meta property="og:description" content="Search courses, guides, and tools—all in one place." />
      </Helmet>
      
      <Header />
      
      <header className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <div className="flex justify-center mb-4">
            <Logo3D />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">MAJESTY HQ</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Search courses, guides, and tools—all in one place.
          </p>

          {/* Search */}
          <div className="mt-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 bg-secondary/40 border rounded-full px-4 py-2 motion-safe:transition-all">
              <Search className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
              <Input
                aria-label="Search digital products"
                placeholder="Search by title or description…"
                className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            
            {/* Category chips */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {CATEGORIES.map((c) => (
                <Button
                  key={c}
                  type="button"
                  variant={cat === c ? "default" : "outline"}
                  onClick={() => setCat(c)}
                  className="rounded-full text-sm motion-safe:transition-all"
                  aria-pressed={cat === c}
                >
                  {c}
                </Button>
              ))}
            </div>
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

          {/* Product grid with catalog numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => {
              const Icon = p.icon ?? BookOpen;
              const num = pad2(p.catalogIndex);
              return (
                <Card 
                  key={p.id} 
                  className="group overflow-hidden border-2 bg-card motion-safe:hover:shadow-xl motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-1"
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
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <Badge className="rounded-full">#{num}</Badge>
                        <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                      </div>
                      <Badge variant="secondary" className="shrink-0 text-xs">
                        {p.category}
                      </Badge>
                    </div>
                    
                    <h3 className="font-bold text-lg leading-snug line-clamp-2 text-foreground mb-2">
                      {p.title}
                    </h3>

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
              );
            })}
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
