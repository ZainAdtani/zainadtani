import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Share2, ExternalLink, Link2, Play } from "lucide-react";

/**
 * Centralized config so you can add/remove avatars without touching layout.
 * Add new entries here and they’ll auto-render in the gallery.
 */
const AVATARS: {
  id: string;
  title: string;
  description?: string;
  created?: string; // ISO or human
  tags?: string[];
  // full HeyGen embed URLs
  embedUrl: string;
  // Optional canonical (where the asset lives if you want to deep-link)
  sourceUrl?: string;
}[] = [
  {
    id: "db8ce879a39c4148a60024e8c80b3033",
    title: "EA Orientation: Soft Open",
    description: "Warm intro tone. Sets course context and credibility.",
    created: "2025-10-23",
    tags: ["Intro", "Brand", "EA Course"],
    embedUrl: "https://app.heygen.com/embedded-player/db8ce879a39c4148a60024e8c80b3033",
    sourceUrl: "https://app.heygen.com/",
  },
  {
    id: "667c3764d19e49269ad40daea602c280",
    title: "My Story: Mechanical → EA",
    description: "Identity pivot narrative. B-roll heavy. Calm, confident pacing.",
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
      setCopied("Copied!");
      setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied("Copy failed");
      setTimeout(() => setCopied(null), 1800);
    }
  }

  return (
    <>
      <Helmet>
        <title>My AI Avatars – Zain</title>
        <meta name="description" content="AI avatar video project powered by HeyGen." />
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
          <span className="text-foreground">My AI Avatars</span>
        </nav>

        {/* Header / Actions */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">My AI Avatars</h1>
            <p className="text-lg text-muted-foreground mt-2">
              A curated set of HeyGen avatar videos for the Engineer → EA course. Built to scale, designed to impress.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => copyToClipboard(pageShareUrl)}
              className="gap-2"
              aria-label="Copy page link"
              title="Copy page link"
            >
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

        <Separator className="mb-6" />

        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          {/* VIDEOS TAB */}
          <TabsContent value="videos" className="space-y-8">
            {/* Featured player */}
            <Card className="p-3 md:p-4 bg-card backdrop-blur border">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className="min-w-0">
                  <h2 className="text-xl md:text-2xl font-semibold truncate">{active?.title ?? "Selected Video"}</h2>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    {active?.tags?.map((t) => (
                      <Badge key={t} variant="secondary" className="whitespace-nowrap">
                        {t}
                      </Badge>
                    ))}
                    {active?.created && <span className="text-xs text-muted-foreground">• Added {active.created}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => copyToClipboard(active?.embedUrl ?? "")}
                  >
                    <Share2 className="h-4 w-4" />
                    Share embed
                  </Button>
                  {active?.sourceUrl && (
                    <Button asChild size="sm" className="gap-2">
                      <a href={active.sourceUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Open in HeyGen
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <div className="aspect-video w-full overflow-hidden rounded-xl">
                {active?.embedUrl && (
                  <iframe
                    src={active.embedUrl}
                    title={active.title}
                    className="w-full h-full"
                    frameBorder={0}
                    allow="encrypted-media; fullscreen"
                    allowFullScreen
                  />
                )}
              </div>

              {active?.description && <p className="text-sm text-muted-foreground mt-3">{active.description}</p>}
            </Card>

            {/* Gallery grid */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Library</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {AVATARS.map((v) => (
                  <Card
                    key={v.id}
                    className={`group p-3 border cursor-pointer transition ${
                      v.id === activeId ? "ring-2 ring-primary" : "hover:shadow-md"
                    }`}
                    onClick={() => setActiveId(v.id)}
                    role="button"
                    aria-label={`Select ${v.title}`}
                  >
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                      {/* Lightweight posterless preview with a play affordance */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="h-7 w-7 opacity-80" />
                      </div>
                      <iframe
                        src={v.embedUrl}
                        title={`${v.title} (preview)`}
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
                      {v.tags && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {v.tags.slice(0, 3).map((t) => (
                            <Badge key={t} variant="outline" className="text-xs">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          {/* ABOUT TAB */}
          <TabsContent value="about" className="space-y-4">
            <Card className="p-4 md:p-6">
              <h3 className="text-xl font-semibold">Project Notes</h3>
              <p className="text-muted-foreground mt-2">
                This page consolidates AI avatar assets used across the <strong>Engineer → Enrolled Agent</strong>{" "}
                course. The goal is to maintain a single source of truth for production-ready videos, with consistent
                delivery and easy sharing.
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-2 text-sm">
                <li>
                  <strong>Featured Player:</strong> Click any card in the Library to load it into the main player.
                </li>
                <li>
                  <strong>Share:</strong> Use “Share embed” to grab an iframe for Notion, CMS, or landing pages.
                  Governance win: no ad-hoc links.
                </li>
                <li>
                  <strong>Scale:</strong> Add future videos by appending entries to <code>AVATARS</code>. Zero layout
                  changes required. Future-proof by design.
                </li>
              </ul>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
