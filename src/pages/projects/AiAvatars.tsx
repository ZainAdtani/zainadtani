import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play } from "lucide-react";

const PINK = "#ff0083";
const PINK_DARK = "#dc0073";

const HERO_BANNER = "/media/avatars/hero-ai-avatars.jpg";

type AvatarItem = {
  id: string;
  title: string;
  embedUrl: string;
};

const AVATARS: AvatarItem[] = [
  {
    id: "e41b9aec7c024e5bb44f4d05f5d4e3cf",
    title: "Lesson 1 - Welcome + My Story (Mechanical → EA)",
    embedUrl: "https://app.heygen.com/embedded-player/e41b9aec7c024e5bb44f4d05f5d4e3cf",
  },
  {
    id: "24bafd9b40be43878fea66623e71bab7",
    title: "Walking Workday System",
    embedUrl: "https://app.heygen.com/embedded-player/24bafd9b40be43878fea66623e71bab7",
  },
  {
    id: "b1021def417a4fb6972e860ee99c2391",
    title: "Cartoon Zain",
    embedUrl: "https://app.heygen.com/embedded-player/b1021def417a4fb6972e860ee99c2391",
  },
  {
    id: "4cf5abe45c374d6bb8efaf98d5be2404",
    title: "Study Smarter, Not Harder",
    embedUrl: "https://app.heygen.com/embedded-player/4cf5abe45c374d6bb8efaf98d5be2404",
  },
  {
    id: "667c3764d19e49269ad40daea602c280",
    title: "Avatar IV - Walking Workday Ebook",
    embedUrl: "https://app.heygen.com/embedded-player/667c3764d19e49269ad40daea602c280",
  },
  {
    id: "de240564e0f14ea28b64a04a8969cd16",
    title: "Break Sedentary Momentum",
    embedUrl: "https://app.heygen.com/embedded-player/de240564e0f14ea28b64a04a8969cd16",
  },
  {
    id: "a210f5858abd4602a3db203f3fdf19c8",
    title: "Tiny Teamwork Tokens",
    embedUrl: "https://app.heygen.com/embedded-player/a210f5858abd4602a3db203f3fdf19c8",
  },
  {
    id: "4bd881b9951f4b64b68304e51d19f127",
    title: "Avatar IV - Cap Dua",
    embedUrl: "https://app.heygen.com/embedded-player/4bd881b9951f4b64b68304e51d19f127",
  },
  {
    id: "fccd47dfe16b47a8bbd89e4a4d3a0c39",
    title: "Avatar IV - Maggie Says Hi",
    embedUrl: "https://app.heygen.com/embedded-player/fccd47dfe16b47a8bbd89e4a4d3a0c39",
  },
  {
    id: "6052a8714435408da6e73c61379bf5ce",
    title: "Avatar IV - Maggie Intro Wants Treats And Love",
    embedUrl: "https://app.heygen.com/embedded-player/6052a8714435408da6e73c61379bf5ce",
  },
  {
    id: "482d49c1d51340d9b4b341a97ecfdaec",
    title: "Avatar IV - Zain Journaling",
    embedUrl: "https://app.heygen.com/embedded-player/482d49c1d51340d9b4b341a97ecfdaec",
  },
  {
    id: "1f7090216ed448ae9cad4636b4f497ae",
    title: "Busy Life Study",
    embedUrl: "https://app.heygen.com/embedded-player/1f7090216ed448ae9cad4636b4f497ae",
  },
  {
    id: "cace8e176b854b3eb7981d0db84aa107",
    title: "Automate Your Week",
    embedUrl: "https://app.heygen.com/embedded-player/cace8e176b854b3eb7981d0db84aa107",
  },
  {
    id: "980beba2db1045a1b238df8be11c97d7",
    title: "Imam's Forgiveness",
    embedUrl: "https://app.heygen.com/embedded-player/980beba2db1045a1b238df8be11c97d7",
  },
  {
    id: "8d00a9e82ca14f3d9d8b504014109d94",
    title: "Life Is Like Basketball",
    embedUrl: "https://app.heygen.com/embedded-player/8d00a9e82ca14f3d9d8b504014109d94",
  },
  {
    id: "1c27650791f74c4c8a005a98b214df59",
    title: "Value Investing Wisdom",
    embedUrl: "https://app.heygen.com/embedded-player/1c27650791f74c4c8a005a98b214df59",
  },
];

export default function AiAvatars() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = useMemo(() => AVATARS.find((a) => a.id === openId) ?? null, [openId]);

  return (
    <>
      <Helmet>
        <title>AI Avatars - Zain</title>
        <meta
          name="description"
          content="Short avatar stories and explainer clips. Pick a video and watch in one tap."
        />
      </Helmet>

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

      <section className="mx-auto max-w-6xl px-4">
        <Card className="relative overflow-hidden rounded-3xl border-0 bg-gradient-to-r from-[#050816] via-[#050816] to-[#12001f] mb-10">
          <div className="absolute inset-0 opacity-60">
            <img src={HERO_BANNER} alt="" className="h-full w-full object-cover blur-sm scale-105" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-[#050816]/90 via-[#050816]/70 to-[#050816]/40" />

          <div className="relative z-10 p-8 md:p-10 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: PINK }}>
              AI Avatars
            </h1>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">
              A growing wall of avatar videos for stories, courses, and experiments. Tap a card to watch in a clean,
              focused player.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-xs md:text-sm text-foreground/80">
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">🎥 Built with HeyGen</span>
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">
                ⚡ Great for short lessons
              </span>
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">
                🧪 New clips added over time
              </span>
            </div>
          </div>
        </Card>
      </section>

      <section className="container mx-auto px-4 max-w-6xl pb-12">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">Avatar Library</h2>
          <p className="text-xs md:text-sm text-muted-foreground">
            {AVATARS.length} video{AVATARS.length === 1 ? "" : "s"} live today
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
              <div className="relative w-full flex items-center justify-center" style={{ aspectRatio: "16 / 9" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#050816] via-[#111827] to-[#12001f]" />
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(255,0,131,0.6),_transparent_55%)]" />
                <div className="relative z-10 flex flex-col items-center justify-center gap-3">
                  <div
                    className="grid place-items-center h-14 w-14 rounded-full shadow-lg group-hover:scale-105 transition-transform"
                    style={{ background: PINK }}
                  >
                    <Play className="h-7 w-7 text-white" />
                  </div>
                  <p className="px-4 text-center text-xs text-white/70">Tap to watch</p>
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
            No avatar clips yet. Add videos to the list above and they will appear here.
          </div>
        )}
      </section>

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
