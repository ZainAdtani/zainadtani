import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { ExternalLink, Rss, Copy as CopyIcon, Headphones, Youtube, Play } from "lucide-react";
import { useState } from "react";

const SPOTIFY_SHOW_URL = "https://open.spotify.com/show/1Wm3Z8yMzEImKXBPTxCJVF?si=1141081c9bb446c1";
const SPOTIFY_EMBED_URL = "https://open.spotify.com/embed/show/1Wm3Z8yMzEImKXBPTxCJVF?utm_source=generator";
const PODCAST_RSS_URL = "https://rss.beehiiv.com/podcasts/uAS1OHdzkB.xml";
const YOUTUBE_PLAYLIST_URL = "https://youtube.com/playlist?list=PLfuhu_SwTmhRKHpLfI56xvVekuXZTcQn9&si=zdntMLgivK_wGAgX";

export default function MyPodcast() {
  const [copying, setCopying] = useState(false);

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

            <Button variant="outline" onClick={copyRSS} disabled={copying}>
              {copying ? (
                <>
                  <CopyIcon className="mr-2 h-4 w-4" /> Copying
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
              <Button variant="secondary" onClick={copyRSS} disabled={copying}>
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

      {/* Large Spotify Player */}
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
              height="352"
              frameBorder={0}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </Card>
      </section>

      {/* Podcast and YouTube Cards */}
      <section className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Spotify Podcast Card */}
          <Card className="p-6 rounded-2xl border-border flex flex-col">
            <h3 className="text-xl font-bold mb-2">Zain's World Podcast</h3>
            <p className="text-sm text-muted-foreground mb-4">Short solo episodes on taxes, tools, and growth.</p>
            
            <div className="mb-4 flex-grow">
              <iframe
                style={{ borderRadius: "12px" }}
                src={SPOTIFY_EMBED_URL}
                width="100%"
                height="200"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Podcast Embed"
              />
            </div>
            
            <Button asChild variant="default" className="w-full">
              <a href={SPOTIFY_SHOW_URL} target="_blank" rel="noopener noreferrer">
                Listen on Spotify <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </Card>

          {/* YouTube Podcast Card */}
          <Card className="p-6 rounded-2xl border-border flex flex-col">
            <div className="mb-4 flex items-center justify-center">
              <Youtube className="h-24 w-24 text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Watch on YouTube</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-grow">Full episodes and clips on YouTube Podcasts.</p>
            
            <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
              <a href={YOUTUBE_PLAYLIST_URL} target="_blank" rel="noopener noreferrer">
                Open playlist <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </Card>
        </div>
      </section>
    </main>
  );
}
