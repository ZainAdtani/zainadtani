import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "@/data/blog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function Blog() {
  // 🧠 keep search (tiny + helpful)
  const [q, setQ] = useState("");

  // show in the order you defined in BLOG_POSTS (no images)
  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const posts = [...BLOG_POSTS]; // keep given order
    if (!term) return posts;
    return posts.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.excerpt.toLowerCase().includes(term)
    );
  }, [q]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog | Zain Adtani</title>
        <meta name="description" content="Short, useful notes on AI, productivity, and building an EA career." />
      </Helmet>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">Blog HQ 🚀</h1>
          <p className="text-muted-foreground mt-2">Short, useful notes on AI, productivity, and the EA path.</p>
        </header>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search posts…"
            className="h-11"
          />
        </div>

        {/* Clean list (no images) */}
        <section className="space-y-4">
          {list.map((post) => {
            const isPublished = post.status === "published";
            return (
              <Card
                key={post.id}
                className="border rounded-xl px-5 py-4 hover:shadow-sm transition"
              >
                {/* Title + status badge */}
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl md:text-2xl font-semibold leading-snug">
                    <Link
                      to={isPublished ? `/blog/${post.slug}` : "#"}
                      className={isPublished ? "hover:underline" : "cursor-not-allowed"}
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <Badge variant={isPublished ? "default" : "secondary"}>
                    {isPublished ? "New" : "Coming soon"}
                  </Badge>
                </div>

                {/* Excerpt */}
                <p className="text-base text-muted-foreground mt-2">
                  {post.excerpt}
                </p>

                {/* Meta row */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {post.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {post.readTime}
                    </span>
                  </div>

                  <Button asChild variant="ghost" size="sm" disabled={!isPublished}>
                    <Link to={isPublished ? `/blog/${post.slug}` : "#"}>
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </section>
      </main>
    </div>
  );
}
