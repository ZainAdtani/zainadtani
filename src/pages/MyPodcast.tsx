import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { ExternalLink, Rss, Copy as CopyIcon, Headphones, Loader2, Play, AlertCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const SPOTIFY_SHOW_URL = "https://open.spotify.com/show/1Wm3Z8yMzEImKXBPTxCJVF?si=1141081c9bb446c1";
const SPOTIFY_EMBED_URL = "https://open.spotify.com/embed/show/1Wm3Z8yMzEImKXBPTxCJVF?utm_source=generator";
const PODCAST_RSS_URL = "https://rss.beehiiv.com/podcasts/uAS1OHdzkB.xml";

type Episode = {
  id: string;
  title: string;
  summary: string;
  link: string;
  audioUrl: string;
  pubDate: string;
  isoDate: string;
};

// Hook to fetch and parse Beehiiv podcast RSS
function useBeehiivEpisodes() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        const response = await fetch(PODCAST_RSS_URL);
        if (!response.ok) throw new Error("Failed to fetch podcast RSS");
        
        const xmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlText, "text/xml");
        
        const items = Array.from(doc.querySelectorAll("item"));
        const parsedEpisodes: Episode[] = items.map((item, index) => {
          const title = item.querySelector("title")?.textContent || "Untitled Episode";
          const link = item.querySelector("link")?.textContent || "#";
          const pubDate = item.querySelector("pubDate")?.textContent || "";
          const descriptionHtml = item.querySelector("description")?.textContent || "";
          
          // Get audio URL from enclosure
          const enclosure = item.querySelector("enclosure");
          const audioUrl = enclosure?.getAttribute("url") || "";
          
          // Strip HTML and create plain text summary
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = descriptionHtml;
          const plainText = tempDiv.textContent || tempDiv.innerText || "";
          const summary = plainText.trim().substring(0, 180) + (plainText.length > 180 ? "…" : "");
          
          // Format date
          const dateObj = pubDate ? new Date(pubDate) : new Date();
          const isoDate = dateObj.toISOString();
          const dateFormatted = dateObj.toLocaleDateString("en-US", { 
            month: "long",
            day: "numeric",
            year: "numeric" 
          });
          
          return {
            id: `episode-${index}`,
            title,
            summary,
            link,
            audioUrl,
            pubDate: dateFormatted,
            isoDate,
          };
        });
        
        // Sort by date descending
        const sortedEpisodes = parsedEpisodes.sort(
          (a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime()
        );
        
        setEpisodes(sortedEpisodes);
        setError(null);
      } catch (err) {
        console.error("Error fetching podcast episodes:", err);
        setError("Could not load episodes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchEpisodes();
  }, []);

  return { episodes, loading, error };
}

export default function MyPodcast() {
  const [copying, setCopying] = useState(false);
  const { episodes, loading, error } = useBeehiivEpisodes();

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "PodcastSeries",
      name: "Zain's World Podcast",
      url: "https://zainadtani.com/my-podcast",
      sameAs: [SPOTIFY_SHOW_URL],
      description: "Short lessons and stories from Zain's life, study, work, and faith.",
      inLanguage: "en",
      webFeed: PODCAST_RSS_URL,
      publisher: {
        "@type": "Person",
        name: "Zain Adtani",
      },
    }),
    [],
  );

  async function copyRSS() {
    try {
      setCopying(true);
      await navigator.clipboard.writeText(PODCAST_RSS_URL);
      toast({ title: "Copied RSS to clipboard" });
    } catch {
      toast({ title: "Copy failed, try again" });
    } finally {
      setCopying(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Helmet>
        <title>Zain's World Podcast</title>
        <meta name="description" content="Short lessons and stories. Subscribe on Spotify. RSS available." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-b from-green-600/15 via-green-500/10 to-background p-8 md:p-12">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Headphones className="h-3.5 w-3.5" />
            Weekly show
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">Zain's World Podcast</h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Stories, lessons, and notes from my life. Simple ideas you use.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="bg-green-600 text-white hover:bg-green-700">
              <a href={SPOTIFY_SHOW_URL} target="_blank" rel="noreferrer">
                Listen on Spotify
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>

            <Button variant="outline" onClick={copyRSS}>
              {copying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Copying
                </>
              ) : (
                <>
                  <Rss className="mr-2 h-4 w-4" />
                  Copy RSS
                </>
              )}
            </Button>

            <Button variant="secondary" asChild>
              <a href={PODCAST_RSS_URL} target="_blank" rel="noreferrer">
                Subscribe on Beehiiv
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-xs font-medium text-muted-foreground">Podcast RSS</label>
            <div className="flex items-center gap-2">
              <Input readOnly value={PODCAST_RSS_URL} className="font-mono" />
              <Button variant="secondary" onClick={copyRSS}>
                <CopyIcon className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
          </div>
        </div>

        {/* Glow accents */}
        <div className="pointer-events-none absolute -right-14 -top-14 h-64 w-64 rounded-full bg-green-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-green-300/10 blur-3xl" />
      </section>

      {/* Player */}
      <section className="mt-10">
        <Card className="overflow-hidden">
          <div className="bg-muted/40 px-6 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Play className="h-4 w-4" />
              Latest on Spotify
            </div>
          </div>
          <div className="aspect-[16/9] bg-background md:aspect-[21/9]">
            <iframe
              title="Spotify embed"
              src={SPOTIFY_EMBED_URL}
              width="100%"
              height="100%"
              frameBorder={0}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </Card>
      </section>

      {/* Episodes */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Episodes</h2>
        
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Loading episodes...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <AlertCircle className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : episodes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No episodes available yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {episodes.map((episode) => (
              <Card key={episode.id} className="p-6">
                <h3 className="text-xl font-semibold mb-2">{episode.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{episode.summary}</p>
                <p className="text-xs text-muted-foreground mb-4">{episode.pubDate}</p>
                <div className="flex gap-2">
                  {episode.audioUrl && (
                    <Button asChild variant="default" size="sm">
                      <a href={episode.audioUrl} target="_blank" rel="noreferrer">
                        Listen
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  )}
                  {episode.link && episode.link !== "#" && (
                    <Button asChild variant="outline" size="sm">
                      <a href={episode.link} target="_blank" rel="noreferrer">
                        Show notes
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
