import { useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Link2, ExternalLink, ChevronLeft, ChevronRight, Play, Clock } from "lucide-react";

/** ────────────────────────────────────────────────────────────────────────────
 * CONFIG — Add your avatars here. (Poster is optional but recommended.)
 * poster: 16:9 image URL (screencap from HeyGen or a cover you upload)
 * duration: purely display text, e.g., "1:02" or "1 Hour"
 * ──────────────────────────────────────────────────────────────────────────── */
const AVATARS = [
  {
    id: "db8ce879a39c4148a60024e8c80b3033",
    title: "Module 0 — EA Orientation (Soft Open)",
    blurb: "Warm intro tone. Sets course context and credibility.",
    duration: "1:00",
    tags: ["Intro", "EA Course"],
    poster: "/media/avatars/ea-orientation.jpg", // <- replace with your image
    embedUrl: "https://app.heygen.com/embedded-player/db8ce879a39c4148a60024e8c80b3033",
  },
  {
    id: "667c3764d19e49269ad40daea602c280",
    title: "Module 0 — My Story: Mechanical → EA",
    blurb: "Identity pivot narrative with B-roll beats.",
    duration: "1:05",
    tags: ["Story", "B-roll"],
    poster: "/media/avatars/mech-to-ea.jpg", // <- replace with your image
    embedUrl: "https://app.heygen.com/embedded-player/667c3764d19e49269ad40daea602c280",
  },
  // Add more items as you create them…
];

export default function AiAvatars() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = useMemo(() => AVATARS.find((a) => a.id === openId) ?? null, [openId]);

  const railRef = useRef<HTMLDivElement>(null);
  const SCROLL = 720; // px per click (tune to taste)

  function scrollBy(dx: number) {
    const el = railRef.current;
    if (!el) return;
    el.scrollTo({ left: el.scrollLeft + dx, behavior: "smooth" });
  }

  return (
    <>
      <Helmet>
        <title>AI Avatars — Zain</title>
        <meta
          name="description"
          content="Carousel of production-ready HeyGen avatar videos for the Engineer → EA course."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumbs */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/projects" className="hover:text-primary transition-colors">
            Projects
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">AI Avatars</span>
        </nav>

        {/* Hero / Ribbon */}
        <section className="rounded-2xl p-6 md:p-8 mb-8 border bg-gradient-to-br from-[#10A37F0D] via-transparent to-[#FF8A000D]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Content Overview</h1>
              <p className="text-base md:text-lg text-muted-foreground mt-2">
                This is a single project consisting of multiple avatar modules. Click a card to preview.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" className="gap-2">
                <a
                  href={typeof window !== "undefined" ? window.location.href : "#"}
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard?.writeText(window.location.href);
                  }}
                >
                  <Link2 className="h-4 w-4" />
                  Copy page link
                </a>
              </Button>
              <Button asChild className="gap-2">
                <a href="https://app.heygen.com/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Create in HeyGen
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Carousel Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">
              ✺
            </span>
            <h2 className="text-2xl font-semibold">Modules</h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => scrollBy(-SCROLL)} aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scrollBy(SCROLL)} aria-label="Next">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <Separator className="mb-4" />

        {/* Carousel Rail (scroll-snap) */}
        <div
          ref={railRef}
          className="relative flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="AI avatar modules"
        >
          {AVATARS.map((m) => (
            <Card
              key={m.id}
              className="min-w-[320px] max-w-[420px] snap-start shrink-0 overflow-hidden rounded-2xl border hover:shadow-md transition"
            >
              {/* Cover */}
              <div className="relative h-44 w-full overflow-hidden">
                {m.poster ? (
                  <img src={m.poster} alt="" className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-muted to-background" />
                )}
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Body */}
              <div className="p-4">
                <p className="text-sm font-semibold text-primary mb-1">
                  {/** You can compute “Module N” dynamically if you prefer */}
                  Module {AVATARS.indexOf(m) + 1}
                </p>
                <h3 className="text-xl font-semibold leading-snug">{m.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{m.blurb}</p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {m.tags?.map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>

                {/* Footer actions */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {m.duration}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Play className="h-4 w-4" />
                      View
                    </span>
                  </div>
                  <Button size="sm" onClick={() => setOpenId(m.id)}>
                    Open
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal Player */}
      <Dialog open={!!openId} onOpenChange={(v) => !v && setOpenId(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {active && (
            <>
              <DialogHeader className="px-6 pt-6">
                <DialogTitle className="text-xl">{active.title}</DialogTitle>
              </DialogHeader>
              <div className="px-6 pb-6">
                <div className="aspect-video w-full overflow-hidden rounded-xl border bg-background">
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
