// src/pages/Blog.tsx
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "@/data/blog";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { monthYear } from "@/lib/dates";

export default function Blog() {
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const posts = [...BLOG_POSTS];
    // newest first later if you add real dates; for now keep order
    if (!term) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.excerpt.toLowerCase().includes(term)
    );
  }, [q]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog | Zain Adtani</title>
        <meta
          name="description"
          content="Short, useful notes on AI, productivity, and building an EA career."
        />
      </Helmet>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Blog HQ 🚀
          </h1>
          <p className="mt-2 text-muted-foreground">
            Short, useful notes on AI, productivity, and an EA path.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search posts…"
            className="h-11"
          />
        </div>

        {/* Clean card list (no images) */}
        <div className="space-y-4">
          {list.map((post) => {
            const displayDate = post.date ?? monthYear();
            const displayRead = post.readTime ?? "—";
            const isNew = post.status === "published";
            return (
              <Card key={post.id} className="border rounded-2xl hover:shadow-sm transition">
                <CardHeader className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={isNew ? "default" : "secondary"}>
                      {isNew ? "New" : "Coming soon"}
                    </Badge>
                    {post.tags?.slice(0, 3).map((t) => (
                      <Badge key={t} variant="outline">{t}</Badge>
                    ))}
                  </div>

                  <CardTitle className="text-2xl">
                    <Link
                      to={isNew ? `/blog/${post.slug}` : "#"}
                      className={isNew ? "hover:underline" : "cursor-not-allowed opacity-60"}
                    >
                      {post.title}
                    </Link>
                  </CardTitle>

                  <CardDescription className="text-base">
                    {post.excerpt}
                  </CardDescription>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> {displayDate}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {displayRead}
                      </span>
                    </div>

                    <Button
                      asChild
                      size="sm"
                      variant="ghost"
                      disabled={!isNew}
                    >
                      <Link to={isNew ? `/blog/${post.slug}` : "#"}>
                        Read More <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
