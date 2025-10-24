import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "@/data/blog";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function Blog() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const posts = [...BLOG_POSTS];
    if (!term) return posts;
    return posts.filter(p =>
      p.title.toLowerCase().includes(term) || p.excerpt.toLowerCase().includes(term)
    );
  }, [q]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog | Zain Adtani</title>
        <meta
          name="description"
          content="Practical insights on productivity, AI, taxes, and life optimization by Zain Adtani."
        />
      </Helmet>

      <main className="container mx-auto px-4 py-14 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Blog HQ</h1>
          <p className="text-lg text-muted-foreground">Search across essays and notes</p>
        </div>

        <div className="max-w-xl mx-auto mb-8">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search posts…"
            className="h-11"
          />
        </div>

        <div className="space-y-6">
          {list.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition">
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <CardTitle className="text-2xl">{post.title}</CardTitle>
                  {post.status === "published" ? <Badge>New</Badge> : <Badge variant="secondary">Coming soon</Badge>}
                </div>
                <CardDescription className="text-base mb-4">{post.excerpt}</CardDescription>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {post.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {post.readTime}
                    </span>
                  </div>

                  <Button asChild variant="ghost" size="sm" disabled={post.status !== "published"}>
                    <Link to={`/blog/${post.slug}`}>
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
