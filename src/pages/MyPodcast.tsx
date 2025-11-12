import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";

export default function MyPodcast() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Helmet>
        <title>Zain's World Podcast - Stories, Lessons, and Notes</title>
        <meta
          name="description"
          content="My personal podcast. Short lessons and stories. New episodes coming soon."
        />
      </Helmet>

      <section className="rounded-2xl border bg-background/70 p-8 shadow-sm">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Zain's World Podcast
        </h1>
        <p className="mt-2 text-muted-foreground">
          Stories, lessons, and notes from my life. Clean and simple. No fluff.
        </p>

        <div className="mt-6 flex gap-3">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Subscribe on Spotify
          </Button>
          <Button variant="outline">Apple Podcasts coming soon</Button>
        </div>

        <div className="mt-10 space-y-3">
          <div className="text-sm text-muted-foreground">
            Episodes will appear here once I publish. I will add a Spotify embed
            and RSS later.
          </div>
        </div>
      </section>
    </main>
  );
}
