import { useMemo, useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

/** Brand flavor — Lemonade-esque */
const PINK = "#ff0083";
const PINK_DARK = "#dc0073";

/** Full-bleed banner image (16:9 or wider). Replace with your hero. */
const HERO_BANNER = "/media/avatars/hero-ai-avatars.jpg";

type AvatarItem = {
  id: string;
  title: string;
  poster: string; // required: nice cover image
  embedUrl: string; // required: HeyGen iframe URL
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
  // add more…
];

export default function AiAvatars() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = useMemo(() => AVATARS.find((a) => a.id === openId) ?? null, [openId]);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!railRef.current) return;
      const dx = 640;
      if (e.key === "ArrowRight") railRef.current.scrollBy({ left: dx, behavior: "smooth" });
      if (e.key === "ArrowLeft") railRef.current.scrollBy({ left: -dx, behavior: "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const nudge = (dx: number) => railRef.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <>
      <Helmet>
        <title>AI Avatars — Zain</title>
        <meta name="description" content="Poster-first carousel of AI avatar videos. Click to play." />
      </Helmet>

      {/* Minimal breadcrumbs */}
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

      {/* Hero banner */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-0">
          <div className="relative h-[34rem] w-full overflow-hidden rounded-none md:rounded-[2.5rem]">
            <img src={HERO_BANNER} alt="" className="h-full w-full object-cover" />
            {/* playful gradient wash */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,0,131,0.10) 0%, rgba(255,255,255,0.0) 40%, rgba(255,255,255,0.85) 100%)",
              }}
            />
            {/* Headline */}
            <div className="absolute bottom-8 left-6 md:left-10">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight drop-shadow-sm" style={{ color: PINK }}>
                AI Avatars
              </h1>
              <p className="mt-2 text-base md:text-lg text-foreground/70">Click a poster. Hit play. Magic happens.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel */}
      <section className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-end gap-2 mb-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => nudge(-640)}
            className="rounded-full border-2"
            style={{ borderColor: PINK, color: PINK }}
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => nudge(640)}
            className="rounded-full border-2"
            style={{ borderColor: PINK, color: PINK }}
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div
          ref={railRef}
          className="relative flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 pt-1
                     [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0, black 3rem, black calc(100% - 3rem), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 3rem, black calc(100% - 3rem), transparent 100%)",
          }}
        >
          {AVATARS.map((a) => (
            <Card
              key={a.id}
              className="snap-start shrink-0 overflow-hidden rounded-3xl border-0 bg-white min-w-[320px] sm:min-w-[420px] max-w-[520px]
                         hover:shadow-2xl hover:-translate-y-0.5 transition will-change-transform"
              role="button"
              onClick={() => setOpenId(a.id)}
              aria-label={`Open ${a.title}`}
              style={{ boxShadow: "0 12px 26px rgba(0,0,0,0.07)" }}
            >
              {/* Poster with centered play */}
              <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
                <img src={a.poster} alt="" className="h-full w-full object-cover" loading="lazy" />
                {/* tiny pink tab for flair */}
                <span className="absolute left-3 top-3 h-5 w-5 rounded-sm" style={{ background: PINK }} />
                {/* play button */}
                <div className="absolute inset-0 grid place-items-center">
                  <div
                    className="grid place-items-center h-14 w-14 rounded-full shadow-lg"
                    style={{ background: PINK }}
                  >
                    <Play className="h-7 w-7 text-white" />
                  </div>
                </div>
              </div>
              {/* Title only */}
              <div className="p-4">
                <h3 className="text-lg md:text-xl font-extrabold leading-tight">{a.title}</h3>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Modal player */}
      <Dialog open={!!openId} onOpenChange={(v) => !v && setOpenId(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-3xl">
          {active && (
            <div className="w-full">
              <div className="px-6 pt-6 pb-3">
                <h2 className="text-xl md:text-2xl font-black" style={{ color: PINK }}>
                  {active.title}
                </h2>
              </div>
              <div className="px-6 pb-6">
                <div
                  className="aspect-video w-full overflow-hidden rounded-2xl border"
                  style={{ borderColor: `${PINK}20` }}
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
