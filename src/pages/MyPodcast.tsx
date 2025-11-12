import { Helmet } from "react-helmet-async"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import {
ExternalLink,
Rss,
Copy as CopyIcon,
Headphones,
Loader2,
Play,
} from "lucide-react"
import { useMemo, useState } from "react"

const SPOTIFY_SHOW_URL = "https://open.spotify.com/show/1Wm3Z8yMzEImKXBPTxCJVF
"
const SPOTIFY_EMBED_URL =
"https://open.spotify.com/embed/show/1Wm3Z8yMzEImKXBPTxCJVF
"
const PODCAST_RSS_URL = "https://rss.beehiiv.com/podcasts/uAS1OHdzkB.xml
"

export default function MyPodcast() {
const [copying, setCopying] = useState(false)

const jsonLd = useMemo(
() => ({
"@context": "https://schema.org
",
"@type": "PodcastSeries",
name: "Zain's World Podcast",
url: "https://zainadtani.com/my-podcast
",
sameAs: [SPOTIFY_SHOW_URL],
description:
"Short lessons and stories from Zain's life, study, work, and faith.",
inLanguage: "en",
webFeed: PODCAST_RSS_URL,
publisher: {
"@type": "Person",
name: "Zain Adtani",
},
}),
[]
)

async function copyRSS() {
try {
setCopying(true)
await navigator.clipboard.writeText(PODCAST_RSS_URL)
toast({ title: "Copied RSS to clipboard" })
} catch {
toast({ title: "Copy failed, tap to try again" })
} finally {
setCopying(false)
}
}

return (
<main className="mx-auto max-w-5xl px-4 py-10">
<Helmet>
<title>Zain's World Podcast</title>
<meta name="description" content="Short lessons and stories. Subscribe on Spotify. RSS available." />
<script type="application/ld+json">
{JSON.stringify(jsonLd)}
</script>
</Helmet>

  {/* Hero */}
  <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-b from-green-600/15 via-green-500/10 to-background p-8 md:p-12">
    <div className="relative z-10">
      <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
        <Headphones className="h-3.5 w-3.5" />
        Weekly show
      </div>

      <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
        Zain's World Podcast
      </h1>
      <p className="mt-3 max-w-2xl text-base text-muted-foreground">
        Stories, lessons, and notes from my life. Simple ideas you can use.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          asChild
          className="bg-green-600 text-white hover:bg-green-700"
        >
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

        <Button variant="outline" asChild>
          <a href={PODCAST_RSS_URL} target="_blank" rel="noreferrer">
            Open RSS
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-xs font-medium text-muted-foreground">
          Podcast RSS
        </label>
        <div className="flex items-center gap-2">
          <Input readOnly value={PODCAST_RSS_URL} className="font-mono" />
          <Button variant="secondary" onClick={copyRSS}>
            <CopyIcon className="mr-2 h-4 w-4" />
            Copy
          </Button>
        </div>
      </div>
    </div>

    {/* Glow */}
    <div className="absolute -right-14 -top-14 h-64 w-64 rounded-full bg-green-400/20 blur-3xl" />
    <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-green-300/10 blur-3xl" />
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
          src={`${SPOTIFY_EMBED_URL}?utm_source=zain-site`}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </Card>
    <p className="mt-3 text-sm text-muted-foreground">
      If the player looks empty, Spotify is still processing your show.
    </p>
  </section>

  {/* Roadmap */}
  <section className="mt-12 grid gap-6 md:grid-cols-3">
    <Card className="p-6">
      <h3 className="text-lg font-semibold">Format</h3>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        <li>5 to 12 minute solo episodes</li>
        <li>One idea and clear steps</li>
        <li>New episode weekly</li>
      </ul>
    </Card>
    <Card className="p-6">
      <h3 className="text-lg font-semibold">Topics</h3>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        <li>Study systems for EA Part 1</li>
        <li>QuickBooks and money habits</li>
        <li>Faith, adab, and family</li>
      </ul>
    </Card>
    <Card className="p-6">
      <h3 className="text-lg font-semibold">What’s next</h3>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        <li>Add Apple link after approval</li>
        <li>Auto list episodes from RSS</li>
        <li>Post show notes on the blog</li>
      </ul>
    </Card>
  </section>
</main>


)
}