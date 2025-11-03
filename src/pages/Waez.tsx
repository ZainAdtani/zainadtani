import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Play, Download, ExternalLink } from "lucide-react";

type Missionary = {
  id: string;
  name: string;
  alias?: string;
  images?: string[];
  shortBio: string;
  bullets?: string[];
  links?: { label: string; url: string }[];
};

type Recording = {
  id: string;
  title: string;
  speaker: string;
  alias?: string;
  dateISO?: string;
  tags?: string[];
  srcType: "mp3" | "gdrive" | "external";
  src: string;
  notes?: string;
  listened?: boolean;
};

const MISSIONARIES: Missionary[] = [
  {
    id: "abu-ali",
    name: "Rai Dr. Abualy Alibhai Aziz",
    alias: "Abu Ali",
    images: [
      "/images/waez/abu-ali-1.png",
      "/images/waez/abu-ali-2.png",
      "/images/waez/abu-ali-3.png",
      "/images/waez/abu-ali-4.png",
    ],
    shortBio: "Global missionary and scholar whose 10,000+ lectures emphasized contemplation, discipline, and a purposeful life.",
    bullets: [
      "Born 1919 (Amritsar, India); delivered waez worldwide across eight decades.",
      "Known for clarity, structure, and practical spiritual guidance."
    ],
    links: [
      { label: "Khoja Wiki", url: "https://khojawiki.org" },
      { label: "Ismaili Heritage", url: "https://ismailiheritage.org" }
    ]
  }
];

const RECORDINGS: Recording[] = [
  {
    id: "131",
    title: "#131 — April 24, 1991 — Abu Ali",
    speaker: "Rai Dr. Abualy Alibhai Aziz",
    alias: "Abu Ali",
    dateISO: "1991-04-24",
    tags: ["Waez", "1991"],
    srcType: "mp3",
    src: "/media/waez-131-april-24-1991.mp3",
    notes: "Recorded in Toronto, Canada",
    listened: true
  }
];

function getStreamAndDownload(r: Recording) {
  if (r.srcType === "mp3") return { stream: r.src, download: r.src };
  if (r.srcType === "gdrive") {
    const stream = `https://drive.google.com/uc?export=download&id=${r.src}`;
    const view = `https://drive.google.com/file/d/${r.src}/view?usp=sharing`;
    return { stream, download: view };
  }
  return { stream: null, download: r.src };
}

function normalizeDigits(s: string) {
  return (s.match(/\d+/g) || []).join("");
}

export default function Waez() {
  const [searchQuery, setSearchQuery] = useState("");
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filteredRecordings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return RECORDINGS;
    const qDigits = normalizeDigits(q);
    return RECORDINGS.filter((r) => {
      const titleDigits = normalizeDigits(r.title);
      return (
        r.title.toLowerCase().includes(q) ||
        r.speaker.toLowerCase().includes(q) ||
        r.alias?.toLowerCase().includes(q) ||
        r.dateISO?.includes(q) ||
        r.tags?.some((t) => t.toLowerCase().includes(q)) ||
        (titleDigits === qDigits && qDigits.length > 0)
      );
    });
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/5 to-background">
      <Helmet>
        <title>Waez — Spiritual Timeline | Zain Adtani</title>
        <meta name="description" content="A journey through the teachings of Rai Dr. Abualy Alibhai Aziz (Abu Ali)" />
        <meta property="og:title" content="Waez — Spiritual Timeline | Zain Adtani" />
        <meta property="og:description" content="Explore timeless wisdom through a visual journey" />
        <meta property="og:image" content="/og-waez.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <header className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">Waez</h1>
        </header>

        <div className="space-y-12">
          {/* Missionary Spotlight */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Missionary Spotlight</h2>
            {MISSIONARIES.map((missionary) => (
              <Card
                key={missionary.id}
                className="rounded-2xl border bg-white/90 dark:bg-white/[.06] dark:border-white/10 p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row gap-6 md:items-start">
                  {missionary.images && missionary.images.length > 0 && (
                    <div className="w-full md:w-48 shrink-0">
                      <Carousel className="w-full">
                        <CarouselContent>
                          {missionary.images.map((img, idx) => (
                            <CarouselItem key={idx}>
                              <img
                                src={img}
                                alt={`${missionary.name} - ${idx + 1}`}
                                className="w-full h-48 md:h-56 rounded-xl object-cover bg-white/30 dark:bg-white/10"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = "none";
                                }}
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="mb-3">
                      <h3 className="text-2xl font-bold">{missionary.name}</h3>
                      {missionary.alias && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Known as "{missionary.alias}"
                        </p>
                      )}
                    </div>
                    <p className="text-base leading-relaxed mb-4">{missionary.shortBio}</p>
                    {missionary.bullets && missionary.bullets.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-sm opacity-80 mb-4">
                        {missionary.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {missionary.links && missionary.links.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {missionary.links.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border dark:border-white/10 hover:bg-white/50 dark:hover:bg-white/10 transition-colors"
                          >
                            {link.label}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </section>

          {/* Waez Library */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Waez Library</h2>
              <Input
                type="text"
                placeholder="Search waez by title, date, or tag…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>

            {filteredRecordings.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No recordings found matching "{searchQuery}"
              </p>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
                {filteredRecordings.map((recording) => {
                  const { stream, download } = getStreamAndDownload(recording);
                  const isPlaying = playingId === recording.id;
                  return (
                    <Card
                      key={recording.id}
                      className="rounded-2xl border bg-white/90 dark:bg-white/[.06] dark:border-white/10 p-4 md:p-5 w-[300px] shrink-0 snap-start md:w-auto"
                    >
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-base leading-tight">
                              {recording.title}
                            </h3>
                            {recording.listened && (
                              <Badge
                                variant="outline"
                                className="shrink-0 border-emerald-500/30 text-emerald-700 bg-emerald-50 dark:text-emerald-200 dark:bg-emerald-900/30"
                              >
                                Listened
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {recording.alias || recording.speaker}
                            {recording.dateISO && (
                              <>
                                {" · "}
                                {new Date(recording.dateISO).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </>
                            )}
                          </p>
                        </div>

                        {recording.tags && recording.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {recording.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {recording.notes && (
                          <p className="text-xs text-muted-foreground italic">
                            {recording.notes}
                          </p>
                        )}

                        <div className="flex gap-2">
                          {stream && (
                            <Button
                              size="sm"
                              variant={isPlaying ? "secondary" : "default"}
                              onClick={() => setPlayingId(isPlaying ? null : recording.id)}
                              className="flex-1"
                            >
                              <Play className="w-3 h-3 mr-1" />
                              {isPlaying ? "Hide" : "Play"}
                            </Button>
                          )}
                          <Button size="sm" variant="outline" asChild>
                            <a href={download} target="_blank" rel="noopener noreferrer">
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </a>
                          </Button>
                        </div>

                        {isPlaying && stream && (
                          <audio
                            controls
                            autoPlay
                            className="w-full mt-2"
                            src={stream}
                            onError={() => {
                              console.error("Audio failed to load");
                            }}
                          >
                            Your browser does not support the audio element.
                          </audio>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
