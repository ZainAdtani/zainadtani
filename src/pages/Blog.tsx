import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, ArrowRight, ExternalLink } from "lucide-react";
import { BEEHIIV_POSTS } from "@/data/beehiivPosts";

// ============= Link Constants =============
const ZW_BEEHIIV_ARCHIVE_URL = "https://zains-world.beehiiv.com/?utm_source=site&utm_medium=blog&utm_campaign=archive";

export default function Blog() {
  const [q, setQ] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // All available tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    BEEHIIV_POSTS.forEach(post => tags.add(post.primaryTag));
    return Array.from(tags).sort();
  }, []);

  // Filter posts
  const filteredPosts = useMemo(() => {
    let posts = [...BEEHIIV_POSTS];
    
    // Filter by tag
    if (selectedTag) {
      posts = posts.filter(p => p.primaryTag === selectedTag);
    }
    
    // Filter by search query
    const term = q.trim().toLowerCase();
    if (term) {
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.shortSubtitle.toLowerCase().includes(term) ||
          p.primaryTag.toLowerCase().includes(term)
      );
    }
    
    return posts;
  }, [q, selectedTag]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog HQ | Zain Adtani</title>
        <meta name="description" content="Zain's World newsletter and blog posts on AI, productivity, and growth." />
      </Helmet>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight">Blog HQ</h1>
          <p className="mt-3 text-lg text-muted-foreground">Newsletter and notes on AI, productivity, and growth.</p>
        </header>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search posts…" className="h-11" />
        </div>

        {/* Newsletter Banner */}
        <section className="mb-12">
          <Card className="overflow-hidden rounded-2xl border-border">
            <div className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-6">
              <div className="w-full md:w-1/4 flex-shrink-0">
                <img 
                  src="/images/zains-world-newsletter.png" 
                  alt="Zain's World Newsletter" 
                  className="w-full h-32 object-contain rounded-lg"
                />
              </div>
              <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-1">Zain's World Newsletter</h2>
                  <p className="text-sm text-muted-foreground">One email each week with notes, tools, and small wins.</p>
                </div>
                <Button asChild variant="default" className="w-full md:w-auto">
                  <a href={ZW_BEEHIIV_ARCHIVE_URL} target="_blank" rel="noopener noreferrer">
                    Subscribe to Zain's World newsletter <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Tag Filter Pills */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
              className="rounded-full"
            >
              All Posts
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className="rounded-full"
              >
                {tag}
              </Button>
            ))}
          </div>
        </section>

        {/* Latest Posts Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Latest from Zain's World</h2>
            <Button asChild variant="outline">
              <a href={ZW_BEEHIIV_ARCHIVE_URL} target="_blank" rel="noopener noreferrer">
                Browse the archive <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <Card className="p-6 rounded-2xl border-border hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    {/* Tag */}
                    <Badge variant="secondary" className="text-xs w-fit mb-3">
                      {post.primaryTag}
                    </Badge>

                    {/* Title */}
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                      {post.shortSubtitle}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border mt-auto">
                      <div className="flex items-center gap-3">
                        <span>{post.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-primary font-medium">
                        Read <ExternalLink className="h-3 w-3" />
                      </div>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
