import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "@/data/blog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { monthYear } from "@/lib/dates";

export default function Blog() {
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const posts = [...BLOG_POSTS].filter((p) => p.status !== "draft");
    if (!term) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.excerpt.toLowerCase().includes(term) ||
        (p.tags ?? []).some((t) => t.toLowerCase().includes(term)),
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
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight">Blog HQ</h1>
          <p className="mt-3 text-lg text-muted-foreground">Short, useful notes on AI, productivity, and an EA path.</p>
        </header>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-10">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search posts…" className="h-11" />
        </div>

        {/* List */}
        <ul className="space-y-5">
          {list.map((post) => {
            const displayDate = post.date ?? monthYear();
            const displayRead = post.readTime ?? "—";
            return (
              <li key={post.id}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block rounded-2xl border bg-card/70 backdrop-blur p-6 hover:bg-card transition-shadow hover:shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-3">
                    {post.tags?.slice(0, 3).map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold leading-snug group-hover:underline">
                    {post.title}
                  </h2>

                  <p className="mt-2 text-muted-foreground">{post.excerpt}</p>

                  <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> {displayDate}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {displayRead}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2">
                      Read More
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
