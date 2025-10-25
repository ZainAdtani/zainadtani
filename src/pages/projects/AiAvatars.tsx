import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Link2, ExternalLink, Share2, Play } from "lucide-react";

/** ────────────────────────────────────────────────────────────────────────────
 *  CONFIG: Add/remove videos here. The layout auto-updates.
 *  ──────────────────────────────────────────────────────────────────────────── */
const AVATARS = [
  {
    id: "db8ce879a39c4148a60024e8c80b3033",
    title: "EA Orientation — Soft Open",
    description: "Warm intro. Sets tone and credibility for Module 0.",
    created: "2025-10-23",
    tags: ["Intro", "Brand", "EA Course"],
    embedUrl: "https://app.heygen.com/embedded-player/db8ce879a39c4148a60024e8c80b3033",
    sourceUrl: "https://app.heygen.com/",
  },
  {
    id: "667c3764d19e49269ad40daea602c280",
    title: "My Story — Mechanical → EA",
    description: "Identity pivot narrative with B-roll prompts.",
    created: "2025-10-25",
    tags: ["Story", "B-roll", "EA Course"],
    embedUrl: "https://app.heygen.com/embedded-player/667c3764d19e49269ad40daea602c280",
    sourceUrl: "https://app.heygen.com/",
  },
];

export default function AiAvatars() {
  const [activeId, setActiveId] = useState(AVATARS[0]?.id);
  const active = useMemo(() => AVATARS.find((v) => v.id === activeId) ?? AVATARS[0], [activeId]);
  const [copied, setCopied] = useState<string | null>(null);
  const pageShareUrl = typeof window !== "undefined" ? window.location.href : "";

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied("Copied");
      setTimeout(() => setCopied(null), 1200);
    } catch {
      setCopied("Failed");
      setTimeout(() => setCopied(null), 1200);
    }
  }

  return (
    <>
      <Helmet>
        <title>AI Avatars — Zain</title>
        <meta name="description" content="Production-ready HeyGen avatar videos for the Engineer → EA course." />
      </Helmet>

      <TooltipProvider>
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

          {/* Hero */}
          <section className="rounded-2xl p-6 md:p-8 mb-8 border bg-gradient-to-br from-[#10A37F0D] via-transparent to-[#FF8A000D]">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">AI Avatars</h1>
                <p className="text-base md:text-lg text-muted-foreground mt-2">
                  A curated library of HeyGen avatar videos used throughout the Engineer → EA program.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2" onClick={() => copyToClipboard(pageShareUrl)}>
                  <Link2 className="h-4 w-4" />
                  {copied ?? "Copy page link"}
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

          {/* Featured Player */}
          <Card className="p-4 md:p-6 mb-8 border rounded-2xl bg-card">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="min-w-0">
                <h2 className="text-xl md:text-2xl font-semibold truncate">{active.title}</h2>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  {active.tags?.map((t) => (
                    <Badge key={t} variant="secondary" className="whitespace-nowrap">
                      {t}
                    </Badge>
                  ))}
                  {active.created && <span className="text-xs text-muted-foreground">• Added {active.created}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => copyToClipboard(active.embedUrl)}
                    >
                      <Share2 className="h-4 w-4" />
                      Embed
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy iframe embed</TooltipContent>
                </Tooltip>
                {active.sourceUrl && (
                  <Button asChild size="sm" className="gap-2">
                    <a href={active.sourceUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Open in HeyGen
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Subtle device frame */}
            <div className="mx-auto w-full max-w-3xl rounded-[2rem] border bg-muted/30 p-3 md:p-4">
              <div className="aspect-[9/16] w-full overflow-hidden rounded-[1.4rem] bg-background">
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

            {active.description && (
              <p className="text-sm text-muted-foreground mt-4 max-w-3xl mx-auto text-center">{active.description}</p>
            )}
          </Card>

          {/* Library */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Library</h3>
              <Separator className="hidden md:block w-2/3" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {AVATARS.map((v) => {
                const isActive = v.id === activeId;
                return (
                  <Card
                    key={v.id}
                    className={`group border rounded-xl p-3 transition
                      ${isActive ? "ring-2 ring-primary" : "hover:shadow-sm hover:border-foreground/20"}`}
                    role="button"
                    onClick={() => setActiveId(v.id)}
                    aria-label={`Play ${v.title}`}
                  >
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                      {/* Posterless preview with a soft play affordance */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="h-7 w-7 opacity-70 group-hover:opacity-90 transition" />
                      </div>
                      {/* Hidden iframe to hint load (no autoplay, no UI) */}
                      <iframe
                        src={v.embedUrl}
                        title={`${v.title} preview`}
                        className="absolute inset-0 w-[1px] h-[1px] opacity-0 pointer-events-none"
                        tabIndex={-1}
                        aria-hidden
                      />
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-medium truncate">{v.title}</h4>
                        {v.created && <span className="text-xs text-muted-foreground shrink-0">{v.created}</span>}
                      </div>
                      {v.tags?.length ? (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {v.tags.slice(0, 3).map((t) => (
                            <Badge key={t} variant="outline" className="text-xs">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>
      </TooltipProvider>
    </>
  );
}
