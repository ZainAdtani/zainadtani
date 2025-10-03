import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, ShoppingBag, Users, BookOpen, Heart } from "lucide-react";
import { Header } from "@/components/Header";
import authorGuide from "@/assets/author-guide-preview.png";
import authorGuidePDF from "@/assets/author-guide.pdf";
import walkingWorkday from "@/assets/walking-workday.png";

const ALL_PRODUCTS = [
  {
    id: "eng2ea-course",
    title: "Engineer to EA — Part 1",
    category: "Courses",
    desc: "Complete course covering all three parts of the Enrolled Agent exam. Fast-track your path from engineer to tax professional.",
    cta: { label: "Enroll Now →", href: "https://whop.com/eng2ea/?a=eng2ea" },
    icon: ShoppingBag,
  },
  {
    id: "free-community",
    title: "Engineer → Enrolled Agent (Free Community)",
    category: "Communities",
    desc: "Join fellow EA students, get study tips, and access free resources. No fluff, just actionable advice.",
    cta: { label: "Join Free →", href: "https://www.skool.com/eng2ea/about" },
    icon: Users,
  },
  {
    id: "author-guide",
    title: "How to Become an Author (PDF Guide)",
    category: "Guides",
    desc: "Proven framework to publish in ~6 months. Includes Kindle, print, and audiobook.",
    media: authorGuide,
    cta: { label: "download free PDF guide", href: authorGuidePDF, download: true },
    icon: BookOpen,
  },
  {
    id: "walking-workday",
    title: "The Walking Workday",
    category: "Wellness",
    desc: "Fit three 20-minute walks into any busy schedule. Calendar and commute strategies to build daily movement without a gym.",
    media: walkingWorkday,
    cta: { label: "New Version Coming Soon", disabled: true },
    icon: Heart,
  },
];

const CATEGORIES = ["Courses", "Guides", "Communities", "Wellness"];

export default function DigitalProductsPage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return ALL_PRODUCTS;
    return ALL_PRODUCTS.filter(p =>
      p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query)
    );
  }, [q]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <header className="py-12 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Digital Products Library</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Search everything in one place — courses, guides, communities, and more.
          </p>

          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              aria-label="Search digital products"
              placeholder="Search by title or description…"
              className="pl-10 h-12"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="pb-24">
        <div className="container mx-auto px-4 max-w-6xl space-y-12 pt-12">
          {CATEGORIES.map((cat) => {
            const items = filtered.filter(p => p.category === cat);
            if (items.length === 0) return null;

            return (
              <section key={cat}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-foreground">{cat}</h2>
                </div>

                {/* Netflix-style horizontal row */}
                <div className="flex gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {items.map((p) => {
                    const Icon = p.icon ?? ExternalLink;
                    return (
                      <Card
                        key={p.id}
                        className="min-w-[280px] max-w-[320px] flex-shrink-0 border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <Icon className="w-5 h-5 text-primary" />
                            <h3 className="font-bold text-lg line-clamp-2 text-foreground">{p.title}</h3>
                          </div>

                          {p.media && (
                            <div className="relative mb-4">
                              <img
                                src={p.media}
                                alt={`${p.title} preview`}
                                className="w-full rounded-md object-cover"
                                loading="lazy"
                              />
                              {p.id === "author-guide" && (
                                <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full bg-primary/90 text-primary-foreground tracking-wide">
                                  Preview
                                </span>
                              )}
                            </div>
                          )}

                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{p.desc}</p>

                          {p.cta?.disabled ? (
                            <Button disabled className="w-full bg-muted text-muted-foreground">
                              {p.cta.label}
                            </Button>
                          ) : (
                            <Button asChild className="w-full bg-primary hover:bg-primary/90 transition-all duration-300">
                              <a
                                href={p.cta.href}
                                target={p.cta.download ? "_blank" : "_self"}
                                rel="noopener"
                                download={p.cta.download}
                                aria-label={p.cta.label}
                              >
                                {p.cta.label}
                              </a>
                            </Button>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </section>
            );
          })}
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
