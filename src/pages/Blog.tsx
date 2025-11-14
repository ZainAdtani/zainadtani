import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, ArrowRight, ExternalLink, Youtube } from "lucide-react";

// ============= Link Constants =============
const ZW_SPOTIFY_SHOW_URL = "https://open.spotify.com/show/1Wm3Z8yMzEImKXBPTxCJVF?si=1141081c9bb446c1";
const ZW_SPOTIFY_EMBED_URL = "https://open.spotify.com/embed/show/1Wm3Z8yMzEImKXBPTxCJVF?utm_source=generator";
const ZW_YOUTUBE_PLAYLIST_URL = "https://youtube.com/playlist?list=PLfuhu_SwTmhRKHpLfI56xvVekuXZTcQn9&si=zdntMLgivK_wGAgX";
const ZW_BEEHIIV_ARCHIVE_URL = "https://zains-world.beehiiv.com/?utm_source=site&utm_medium=blog&utm_campaign=archive";
const ZW_BEEHIIV_FEED_RSS = "https://rss.beehiiv.com/feeds/jHsdvEe1Hm.xml";
const ZW_BEEHIIV_PODCAST_RSS = "https://rss.beehiiv.com/podcasts/uAS1OHdzkB.xml";

// ============= Blog Post Cards Data =============
type BlogPostCard = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  href: string;
  date: string;
  readTime: string;
};

const BLOG_POSTS: BlogPostCard[] = [
  {
    id: "tims-tough-journey",
    title: "Tim's Tough Journey, Told by a Teacher",
    summary: "A classroom style retell of one person's slow path from hurt to healing with safety, skills, and kindness.",
    tags: ["Mindset", "Healing"],
    href: "https://zains-world.beehiiv.com/p/tough-journey",
    date: "October 2025",
    readTime: "6–8 min read",
  },
  {
    id: "interrupt-the-plan",
    title: "Interrupt the Plan — A Note to the Fighters Who Need Permission",
    summary: "Stopping mid step and choosing something better. A note for anyone who never felt allowed to stop.",
    tags: ["Hope", "Resilience"],
    href: "https://zains-world.beehiiv.com/p/interrupt-the-plan",
    date: "October 2025",
    readTime: "5–7 min read",
  },
  {
    id: "save-5-hours",
    title: "Save 5 Hours, Keep Your Sanity: A Beginner's Automation Audit",
    summary: "A simple weekly system to free 4–5 hours, protect your best energy, and keep the boring tasks handled.",
    tags: ["Productivity", "Automation", "Systems"],
    href: "https://zains-world.beehiiv.com/p/automation-audit",
    date: "October 2025",
    readTime: "7–9 min read",
  },
];

export default function Blog() {
  const [q, setQ] = useState("");

  const filteredPosts = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return BLOG_POSTS;
    return BLOG_POSTS.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.summary.toLowerCase().includes(term) ||
        p.tags.some((t) => t.toLowerCase().includes(term))
    );
  }, [q]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog HQ | Zain Adtani</title>
        <meta name="description" content="Zain's World podcast, newsletter, and blog posts on AI, productivity, and growth." />
      </Helmet>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight">Blog HQ</h1>
          <p className="mt-3 text-lg text-muted-foreground">Podcast, newsletter, and notes on AI, productivity, and growth.</p>
        </header>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search posts…" className="h-11" />
        </div>

        {/* Pods and Newsletter Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Spotify Podcast Card */}
            <Card className="p-6 rounded-2xl border-border flex flex-col">
              <h3 className="text-xl font-bold mb-2">Zain's World Podcast</h3>
              <p className="text-sm text-muted-foreground mb-4">Short solo episodes on taxes, tools, and growth.</p>
              
              <div className="mb-4 flex-grow">
                <iframe
                  style={{ borderRadius: "12px" }}
                  src={ZW_SPOTIFY_EMBED_URL}
                  width="100%"
                  height="200"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Podcast Embed"
                />
              </div>
              
              <Button asChild variant="default" className="w-full">
                <a href={ZW_SPOTIFY_SHOW_URL} target="_blank" rel="noopener noreferrer">
                  Listen on Spotify <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </Card>

            {/* YouTube Podcast Card */}
            <Card className="p-6 rounded-2xl border-border flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Youtube className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Watch on YouTube</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">Full episodes and clips on YouTube Podcasts.</p>
              
              <Button asChild variant="default" className="w-full">
                <a href={ZW_YOUTUBE_PLAYLIST_URL} target="_blank" rel="noopener noreferrer">
                  Open playlist <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </Card>

            {/* Newsletter Card */}
            <Card className="p-6 rounded-2xl border-border flex flex-col">
              <h3 className="text-xl font-bold mb-2">Weekend newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">One email each weekend with notes, tools, and small wins.</p>
              
              <Button asChild variant="default" className="w-full">
                <a href={ZW_BEEHIIV_ARCHIVE_URL} target="_blank" rel="noopener noreferrer">
                  Subscribe on Beehiiv <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </Card>
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
            <div className="overflow-x-auto pb-4">
              <div className="flex md:flex-row flex-col gap-6 md:overflow-x-auto md:snap-x md:snap-mandatory">
                {filteredPosts.map((post) => (
                  <a
                    key={post.id}
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block md:min-w-[400px] md:snap-start"
                  >
                    <Card className="p-6 rounded-2xl border-border hover:shadow-lg hover:border-primary/50 transition-all h-full flex flex-col">
                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>

                      {/* Summary */}
                      <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">{post.summary}</p>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                        <div className="flex items-center gap-4">
                          <span>{post.date}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-primary font-medium">
                          Read on Zain's World <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
