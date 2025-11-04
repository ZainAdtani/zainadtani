import { useMemo, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "@/data/blog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { monthYear } from "@/lib/dates";

interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

export default function Blog() {
  const [q, setQ] = useState("");
  const [rssItems, setRssItems] = useState<RSSItem[]>([]);
  const [rssError, setRssError] = useState(false);

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const response = await fetch('https://rss.beehiiv.com/feeds/jHsdvEe1Hm.xml');
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const items = Array.from(xml.querySelectorAll('item')).slice(0, 3).map(item => ({
          title: item.querySelector('title')?.textContent || '',
          link: item.querySelector('link')?.textContent || '',
          pubDate: item.querySelector('pubDate')?.textContent || '',
          description: item.querySelector('description')?.textContent?.replace(/<[^>]*>/g, '').slice(0, 140) || ''
        }));
        setRssItems(items);
      } catch (error) {
        console.error('RSS fetch failed:', error);
        setRssError(true);
      }
    };
    fetchRSS();
  }, []);

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

        {/* Latest from Zane's World - RSS Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Latest from Zane's World</h2>
          {rssError ? (
            <div className="text-center py-8">
              <Button asChild variant="default" size="lg">
                <a 
                  href="https://zains-world.beehiiv.com/?utm_source=site&utm_medium=blog&utm_campaign=archive"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Browse the archive <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {rssItems.map((item, idx) => (
                <Card key={idx} className="p-6 rounded-2xl border-border hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{item.description}</p>
                  <a
                    href={`${item.link}?utm_source=site&utm_medium=blog&utm_campaign=latest_issues`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    Read <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Card>
              ))}
            </div>
          )}
        </section>

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
