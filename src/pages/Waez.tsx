import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, Play, Download, ExternalLink } from "lucide-react";

type Missionary = {
  id: string;
  name: string;
  alias?: string;
  portrait?: string;
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
};

const MISSIONARIES: Missionary[] = [
  {
    id: "abu-ali",
    name: "Rai Dr. Abualy Alibhai Aziz",
    alias: "Abu Ali",
    portrait: "/images/waez/abu-ali.jpg",
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
    notes: "Recorded in Toronto, Canada"
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

export default function Waez() {
  const [searchQuery, setSearchQuery] = useState("");
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filteredRecordings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return RECORDINGS;
    return RECORDINGS.filter((r) => {
      return (
        r.title.toLowerCase().includes(q) ||
        r.speaker.toLowerCase().includes(q) ||
        r.alias?.toLowerCase().includes(q) ||
        r.dateISO?.includes(q) ||
        r.tags?.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

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
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Waez</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center gap-1">
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-br from-primary via-primary/80 to-accent bg-clip-text text-transparent">
            Waez Timeline
          </h1>
          <p className="text-lg text-muted-foreground">
            A journey through the teachings of Rai Dr. Abualy Alibhai Aziz
          </p>
        </div>

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
                  {missionary.portrait && (
                    <img
                      src={missionary.portrait}
                      alt={missionary.name}
                      className="w-28 h-28 md:w-36 md:h-36 rounded-xl object-cover bg-white/30 dark:bg-white/10"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-2xl font-bold">{missionary.name}</h3>
                        {missionary.alias && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Known as "{missionary.alias}"
                          </p>
                        )}
                      </div>
                      <Badge variant="outline" className="shrink-0 bg-amber-50 text-amber-900 dark:bg-amber-900/20 dark:text-amber-50 border-amber-200 dark:border-amber-800">
                        Updated: {today}
                      </Badge>
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
                            rel="noopener noreferrer"
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
                          <h3 className="font-bold text-base leading-tight mb-2">
                            {recording.title}
                          </h3>
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
