import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play } from "lucide-react";

/** Brand flavor */
const PINK = "#ff0083";
const PINK_DARK = "#dc0073";

/** Hero artwork */
const HERO_BANNER = "/media/avatars/hero-ai-avatars.jpg";

type AvatarItem = {
  id: string;
  title: string;
  poster: string;
  embedUrl: string;
};

const AVATARS: AvatarItem[] = [
  {
    id: "db8ce879a39c4148a60024e8c80b3033",
    title: "EA Orientation — Soft Open",
    poster: "/media/avatars/ea-orientation.jpg",
    embedUrl: "https://app.heygen.com/embedded-player/db8ce879a39c4148a60024e8c80b3033",
  },
  {
    id: "667c3764d19e49269ad40daea602c280",
    title: "My Story — Mechanical → EA",
    poster: "/media/avatars/mech-to-ea.jpg",
    embedUrl: "https://app.heygen.com/embedded-player/667c3764d19e49269ad40daea602c280",
  },
  // add more here when you record new clips
];

export default function AiAvatars() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = useMemo(() => AVATARS.find((a) => a.id === openId) ?? null, [openId]);

  return (
    <>
      <Helmet>
        <title>AI Avatars — Zain</title>
        <meta
          name="description"
          content="Short avatar stories and explainer clips. Pick a video and watch in one tap."
        />
      </Helmet>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 pt-4 max-w-6xl">
        <nav className="text-sm text-muted-foreground mb-2">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/projects" className="hover:underline">
            Projects
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">AI Avatars</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4">
        <Card className="relative overflow-hidden rounded-3xl border-0 bg-gradient-to-r from-[#050816] via-[#050816] to-[#12001f] mb-10">
          {/* Background image blur */}
          <div className="absolute inset-0 opacity-60">
            <img src={HERO_BANNER} alt="" className="h-full w-full object-cover blur-sm scale-105" />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#050816]/90 via-[#050816]/70 to-[#050816]/40" />

          <div className="relative z-10 grid gap-8 p-8 md:p-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: PINK }}>
                AI Avatars
              </h1>
              <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-xl">
                A growing wall of avatar videos for stories, courses, and experiments. Tap a card to watch in a clean,
                focused player.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs md:text-sm text-foreground/80">
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">
                  🎥 Built with HeyGen
                </span>
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">
                  ⚡ Perfect for short lessons
                </span>
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">
                  🧪 New clips added over time
                </span>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="relative mx-auto h-56 w-80 rounded-3xl bg-white/5 p-1 shadow-2xl">
                <div className="h-full w-full rounded-2xl bg-black overflow-hidden flex items-center justify-center">
                  <div className="relative h-full w-full">
                    <img src={AVATARS[0]?.poster} alt="" className="h-full w-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-0 grid place-items-center">
                      <div
                        className="grid place-items-center h-14 w-14 rounded-full shadow-lg"
                        style={{ background: PINK }}
                      >
                        <Play className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <div className="absolute left-4 bottom-4">
                      <p className="text-xs text-white/70 uppercase tracking-wide">Featured</p>
                      <p className="text-sm font-semibold text-white">{AVATARS[0]?.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Gallery */}
      <section className="container mx-auto px-4 max-w-6xl pb-12">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">Avatar Library</h2>
          <p className="text-xs md:text-sm text-muted-foreground">
            {AVATARS.length} video
            {AVATARS.length === 1 ? "" : "s"} live today
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AVATARS.map((a) => (
            <Card
              key={a.id}
              className="group overflow-hidden rounded-2xl border border-border/60 bg-card hover:border-[rgba(255,0,131,0.6)] hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer"
              onClick={() => setOpenId(a.id)}
              role="button"
              aria-label={`Play ${a.title}`}
            >
              <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
                <img src={a.poster} alt="" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <span
                  className="absolute left-3 top-3 h-4 w-4 rounded-full border-2 border-white shadow-md"
                  style={{ background: PINK }}
                />
                <div className="absolute inset-0 grid place-items-center">
                  <div
                    className="grid place-items-center h-12 w-12 rounded-full shadow-lg group-hover:scale-105 transition-transform"
                    style={{ background: PINK }}
                  >
                    <Play className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-base md:text-lg font-semibold leading-snug">{a.title}</h3>
              </div>
            </Card>
          ))}
        </div>

        {AVATARS.length === 0 && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            No avatar clips yet. Once you add iframes to the list above they will appear here.
          </div>
        )}
      </section>

      {/* Player dialog */}
      <Dialog open={!!openId} onOpenChange={(v) => !v && setOpenId(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-3xl">
          {active && (
            <div className="w-full">
              <div className="px-6 pt-6 pb-3 flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-bold" style={{ color: PINK_DARK }}>
                  {active.title}
                </h2>
              </div>
              <div className="px-6 pb-6">
                <div
                  className="aspect-video w-full overflow-hidden rounded-2xl border bg-black"
                  style={{ borderColor: `${PINK}33` }}
                >
                  <iframe
                    src={active.embedUrl}
                    title={active.title}
                    className="w-full h-full"
                    frameBorder={0}
                    allow="encrypted-media; fullscreen"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
