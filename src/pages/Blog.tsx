import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, ArrowRight, ExternalLink, Youtube, Loader2, AlertCircle } from "lucide-react";

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
  isoDate: string;
  readTime: string;
};

// Hook to fetch and parse Beehiiv article RSS
function useBeehiivPosts() {
  const [posts, setPosts] = useState<BlogPostCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(ZW_BEEHIIV_FEED_RSS);
        if (!response.ok) throw new Error("Failed to fetch RSS feed");
        
        const xmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlText, "text/xml");
        
        const items = Array.from(doc.querySelectorAll("item"));
        const parsedPosts: BlogPostCard[] = items.map((item, index) => {
          const title = item.querySelector("title")?.textContent || "Untitled";
          const link = item.querySelector("link")?.textContent || "#";
          const pubDate = item.querySelector("pubDate")?.textContent || "";
          const descriptionHtml = item.querySelector("description")?.textContent || 
                                  item.querySelector("content\\:encoded")?.textContent || "";
          
          // Extract categories as tags
          const categoryElements = Array.from(item.querySelectorAll("category"));
          const tags = categoryElements.map(cat => cat.textContent || "").filter(Boolean);
          
          // Strip HTML and create plain text summary
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = descriptionHtml;
          const plainText = tempDiv.textContent || tempDiv.innerText || "";
          const trimmedText = plainText.trim();
          const summary = trimmedText.length > 220 
            ? trimmedText.substring(0, 220).trim() + "…" 
            : trimmedText;
          
          // Format date
          const dateObj = pubDate ? new Date(pubDate) : new Date();
          const isoDate = dateObj.toISOString();
          const dateFormatted = dateObj.toLocaleDateString("en-US", { 
            month: "long", 
            year: "numeric" 
          });
          
          // Estimate read time from description length
          const wordCount = plainText.split(/\s+/).length;
          const readMinutes = Math.max(1, Math.ceil(wordCount / 200));
          const readTime = `${readMinutes}–${readMinutes + 2} min read`;
          
          return {
            id: `post-${index}`,
            title,
            summary,
            tags,
            href: link,
            date: dateFormatted,
            isoDate,
            readTime,
          };
        });
        
        // Sort by date descending and take first 9
        const sortedPosts = parsedPosts
          .sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime())
          .slice(0, 9);
        
        setPosts(sortedPosts);
        setError(null);
      } catch (err) {
        console.error("Error fetching Beehiiv posts:", err);
        setError("Could not load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  return { posts, loading, error };
}

export default function Blog() {
  const [q, setQ] = useState("");
  const { posts, loading, error } = useBeehiivPosts();

  const filteredPosts = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.summary.toLowerCase().includes(term) ||
        p.tags.some((t) => t.toLowerCase().includes(term))
    );
  }, [q, posts]);

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
              <div className="mb-4 flex items-center justify-center">
                <Youtube className="h-24 w-24 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Watch on YouTube</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">Full episodes and clips on YouTube Podcasts.</p>
              
              <Button asChild variant="default" className="w-full">
                <a href={ZW_YOUTUBE_PLAYLIST_URL} target="_blank" rel="noopener noreferrer">
                  Open playlist <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </Card>

            {/* Newsletter Card */}
            <Card className="p-6 rounded-2xl border-border flex flex-col">
              <div className="mb-4">
                <img 
                  src="/images/zains-world-newsletter.png" 
                  alt="Zain's World Newsletter" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Zain's World Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">One email each week with notes, tools, and small wins.</p>
              
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

          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Loading posts...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <AlertCircle className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : filteredPosts.length === 0 ? (
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
