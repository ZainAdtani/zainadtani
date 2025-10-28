import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "@/data/blog";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const TAGS = ["All", "AI", "Productivity", "Systems", "Tools", "Life"] as const;

export default function Blog() {
  // 🔎 simple search + tag filter (kid-easy)
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<(typeof TAGS)[number]>("All");

  const published = useMemo(
    () => BLOG_POSTS.filter(p => p.status === "published"),
    []
  );

  const featured = useMemo(
    () => published.find(p => p.featured),
    [published]
  );

  const startHere = useMemo(
    () => published.filter(p => p.pinned).slice(0, 3),
    [published]
  );

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    let posts = [...published];

    if (tag !== "All") posts = posts.filter(p => p.tags?.includes(tag));
    if (term) {
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.excerpt.toLowerCase().includes(term)
      );
    }
    // keep featured at top in list too (but not duplicated)
    return posts
      .filter(p => p.slug !== featured?.slug)
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [q, tag, featured, published]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog | Zain Adtani</title>
        <meta
          name="description"
          content="Practical insights on productivity, AI, taxes, and life optimization by Zain Adtani."
        />
      </Helmet>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* 🧭 HERO — “Start here” like Tim */}
        <section className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Blog HQ 🚀</h1>
          <p className="text-muted-foreground text-lg">
            Short, useful notes on <span className="font-medium">AI</span>,{" "}
            <span className="font-medium">productivity</span>,{" "}
            and building an <span className="font-medium">EA career</span>.
          </p>
        </section>

        {/* 📌 START HERE row (pinned set) */}
        {startHere.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-3">Start Here 📍</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {startHere.map((p) => (
                <Card key={p.id} className="hover:shadow transition">
                  <CardHeader>
                    <CardTitle className="text-lg leading-snug">
                      <Link to={`/blog/${p.slug}`} className="hover:underline">
                        {p.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3">{p.excerpt}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* 🌟 FEATURED banner (big, single card) */}
        {featured && (
          <section className="mb-10">
            <div className="rounded-2xl border overflow-hidden bg-card/60 backdrop-blur">
              {featured.coverImage && (
                <div className="aspect-[16/6] w-full bg-muted">
                  <img
                    src={featured.coverImage}
                    alt={featured.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-6 md:p-8">
                <div className="mb-3 flex items-center gap-2">
                  <Badge>Featured</Badge>
                  {featured.tags?.map(t => (
                    <Badge key={t} variant="secondary">{t}</Badge>
                  ))}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{featured.title}</h2>
                <p className="text-muted-foreground mb-4">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {featured.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {featured.readTime}
                  </span>
                </div>
                <Button asChild>
                  <Link to={`/blog/${featured.slug}`}>
                    Read the post <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* 🔎 Search + 🏷️ Tags */}
        <section className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex-1">
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search posts…"
                className="h-11"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {TAGS.map(t => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={`px-3 py-2 rounded-full border text-sm transition ${
                    tag === t ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 🗂️ List */}
        <section className="space-y-6">
          {list.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition">
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <CardTitle className="text-2xl">
                    <Link to={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <div className="flex gap-2">
                    {post.tags?.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
                  </div>
                </div>

                <CardDescription className="text-base mb-4">
                  {post.excerpt}
                </CardDescription>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {post.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {post.readTime}
                    </span>
                  </div>

                  <Button asChild variant="ghost" size="sm">
                    <Link to={`/blog/${post.slug}`}>
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
