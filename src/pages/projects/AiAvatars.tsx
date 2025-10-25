import { useMemo, useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

/**
 * THEME — Lemonade-inspired accents.
 * Adjust tokens once and the whole page updates.
 */
const THEME = {
  primary: "#ff0083", // Lemonade pink
  primaryDark: "#dc0073",
  teal: "#24B8A3",
  blue: "#2A76E4",
  bg: "#ffffff",
  chipBg: "#ffe4f2",
};

type AvatarItem = {
  id: string;
  title: string;
  blurb?: string;
  poster: string; // 16:9 or 4:5 poster image (required for the card visual)
  embedUrl: string; // HeyGen iframe URL
  tags?: string[];
  created?: string;
};

const AVATARS: AvatarItem[] = [
  {
    id: "db8ce879a39c4148a60024e8c80b3033",
    title: "EA Orientation — Soft Open",
    blurb: "Warm intro. Sets tone and credibility for your course.",
    poster: "/media/avatars/ea-orientation.jpg", // TODO: swap with your image
    embedUrl: "https://app.heygen.com/embedded-player/db8ce879a39c4148a60024e8c80b3033",
    tags: ["Intro", "EA"],
    created: "2025-10-23",
  },
  {
    id: "667c3764d19e49269ad40daea602c280",
    title: "My Story — Mechanical → EA",
    blurb: "Identity pivot narrative with B-roll beats.",
    poster: "/media/avatars/mech-to-ea.jpg", // TODO: swap with your image
    embedUrl: "https://app.heygen.com/embedded-player/667c3764d19e49269ad40daea602c280",
    tags: ["Story", "B-roll"],
    created: "2025-10-25",
  },
  // Add more avatars as you create them…
];

export default function AiAvatars() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = useMemo(() => AVATARS.find((a) => a.id === openId) ?? null, [openId]);

  const railRef = useRef<HTMLDivElement>(null);

  // Arrow keys for accessibility/flow
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (!railRef.current) return;
      const dx = 600;
      if (e.key === "ArrowRight") railRef.current.scrollBy({ left: dx, behavior: "smooth" });
      if (e.key === "ArrowLeft") railRef.current.scrollBy({ left: -dx, behavior: "smooth" });
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const scrollByPx = (dx: number) => railRef.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <>
      <Helmet>
        <title>AI Avatars — Zain</title>
        <meta name="description" content="A flowing carousel of AI avatar projects. Click a card to watch." />
      </Helmet>

      {/* Page chrome */}
      <div className="container mx-auto px-4 py-8 max-w-6xl" style={{ background: THEME.bg }}>
        {/* Breadcrumbs – minimal */}
        <nav className="text-sm text-muted-foreground mb-5">
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

        {/* Title + subtle underline */}
        <header className="mb-6">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: THEME.primary }}>
            AI Avatars
          </h1>
          <div
            className="h-1 w-24 mt-3 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${THEME.primary}, ${THEME.teal})`,
            }}
          />
        </header>

        {/* Carousel controls pinned top-right */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-base text-muted-foreground">Browse your avatars. Tap a card to play.</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollByPx(-640)}
              aria-label="Previous"
              className="rounded-full"
              style={{ borderColor: THEME.primary, color: THEME.primary }}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollByPx(640)}
              aria-label="Next"
              className="rounded-full"
              style={{ borderColor: THEME.primary, color: THEME.primary }}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Carousel rail: large posters, Lemonade vibe, masked edges for “infinite” feel */}
        <div
          ref={railRef}
          className="relative flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 pt-1
                     [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0, black 3rem, black calc(100% - 3rem), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 3rem, black calc(100% - 3rem), transparent 100%)",
          }}
        >
          {AVATARS.map((a, idx) => (
            <Card
              key={a.id}
              className="snap-start shrink-0 overflow-hidden rounded-3xl border-0 hover:shadow-xl transition
                         min-w-[320px] sm:min-w-[420px] max-w-[520px] bg-white"
              style={{ boxShadow: "0 10px 24px rgba(0,0,0,0.06)" }}
              role="button"
              onClick={() => setOpenId(a.id)}
              aria-label={`Open ${a.title}`}
            >
              {/* Poster */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9", background: "#f6f7f8" }}>
                <img src={a.poster} alt="" className="h-full w-full object-cover" loading="lazy" />
                {/* Pink corner bookmark (brand flair) */}
                <span className="absolute left-3 top-3 h-5 w-5 rounded-sm" style={{ background: THEME.primary }} />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid place-items-center h-12 w-12 rounded-full" style={{ background: THEME.primary }}>
                    <Play className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                <h3 className="text-xl font-extrabold leading-tight">{a.title}</h3>
                {a.blurb && <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{a.blurb}</p>}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {a.tags?.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="text-xs border-0"
                      style={{ background: THEME.chipBg, color: THEME.primaryDark }}
                    >
                      {t}
                    </Badge>
                  ))}
                  {a.created && <span className="text-xs text-muted-foreground">• {a.created}</span>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal player — clean, focus on video */}
      <Dialog open={!!openId} onOpenChange={(v) => !v && setOpenId(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-3xl">
          {active && (
            <>
              <DialogHeader className="px-6 pt-6">
                <DialogTitle className="text-xl font-bold" style={{ color: THEME.primary }}>
                  {active.title}
                </DialogTitle>
              </DialogHeader>
              <div className="px-6 pb-6">
                <div
                  className="aspect-video w-full overflow-hidden rounded-2xl border"
                  style={{ borderColor: THEME.chipBg }}
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
                {active.blurb && <p className="text-sm text-muted-foreground mt-3">{active.blurb}</p>}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
