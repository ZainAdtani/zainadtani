import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Play, Download, FileText, Copy, Square, BookOpen, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
    shortBio:
      "Global missionary and scholar whose 10,000+ lectures emphasized contemplation, discipline, and a purposeful life.",
    bullets: [
      "Born 1919 (Amritsar, India); delivered waez worldwide across eight decades.",
      "Known for clarity, structure, and practical spiritual guidance.",
    ],
    links: [
      { label: "Khoja Wiki", url: "https://khojawiki.org" },
      { label: "Ismaili Heritage", url: "https://ismailiheritage.org" },
    ],
  },
];

const RECORDINGS: Recording[] = [
  {
    id: "14",
    title: "#14 — April 28, 1991 — Abu Ali — BAITUL KHAYAL",
    speaker: "Rai Dr. Abualy Alibhai Aziz",
    alias: "Abu Ali",
    dateISO: "1991-04-28",
    tags: ["Waez", "1991", "Baitul Khayal"],
    srcType: "mp3",
    src: "/media/waez-14-april-28-1991.mp3",
    listened: false,
  },
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
    listened: true,
  },
  {
    id: "canada-akh",
    title: "Canada Youth Address — Imam (Aga Khan IV)",
    speaker: "Shah Karim al-Hussaini (Aga Khan IV)",
    alias: "Imam",
    dateISO: "",
    tags: ["Canada", "Youth", "Address"],
    srcType: "mp3",
    src: "/media/canada-youth-address-imam.mp3",
    notes:
      "The Imam urges the youth of his Jamat in Canada to build a strong, united foundation rooted in faith and values. He reminds them not to react with anger to misunderstandings about Islam but to respond with wisdom and dignity. He emphasizes preserving family unity, making good choices, and staying true to Islamic principles—so future generations can thrive in Canada. He ends with his special blessings and a call to think long-term about the legacy they are creating.",
    listened: false,
  },
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
        {/* Hero */}
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
                    <div className="w-full md:w-48 shrink-0 relative">
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
                        <CarouselPrevious className="left-2" />
                        <CarouselNext className="right-2" />
                      </Carousel>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="mb-3">
                      <h3 className="text-2xl font-bold">{missionary.name}</h3>
                      {missionary.alias && (
                        <p className="text-sm text-muted-foreground mt-1">Known as "{missionary.alias}"</p>
                      )}
                    </div>
                    <p className="text-base leading-relaxed mb-4">{missionary.shortBio}</p>
                    {missionary.bullets && missionary.bullets.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-sm opacity-80">
                        {missionary.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </section>

          {/* USA Visit 2025 buttons, shown just above "Waez Library" */}
          <section aria-label="USA Visit 2025">
            <Card className="rounded-2xl border bg-white/90 dark:bg-white/[.06] dark:border-white/10 p-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-2xl font-bold">USA Visit 2025</h2>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="whitespace-normal text-left">
                      <a href="/usa-visit-2025/devotional-literature">
                        <span className="inline-flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          DEVOTIONAL LITERATURE SELECT TEXTS OF THE QUR'AN, GINANS, QASIDAS AND TASBIHS
                        </span>
                      </a>
                    </Button>
                    <Button asChild variant="secondary" className="whitespace-normal text-left">
                      <a href="/usa-visit-2025/illuminate">
                        <span className="inline-flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          ILLUMINATE - LIGHTING the path to MULAQAT
                        </span>
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Coloring Pages Callout */}
                <div className="relative mt-4 pt-4 border-t border-primary/20 animate-fade-in">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  <h3 className="text-lg font-semibold mb-2">Ismaili Center Houston Coloring Pages</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Familiarise yourself and your little ones with the newest Ismaili Center with these special colouring pages, 
                    a fun way for children and families to celebrate the opening of the Ismaili Center, Houston.
                  </p>
                  <Button asChild>
                    <a href="/uploads/Ismaili_Center_Houston_Colouring_Pages.pdf" target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </a>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Ismaili_Center_Houston_Colouring_Pages.pdf</p>
                </div>
              </div>
            </Card>
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
              <p className="text-muted-foreground text-center py-8">No recordings found matching "{searchQuery}"</p>
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
                            <h3 className="font-bold text-base leading-tight">{recording.title}</h3>
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

                        <div className="flex flex-wrap gap-2">
                          {stream && (
                            <Button
                              size="sm"
                              variant={isPlaying ? "secondary" : "default"}
                              onClick={() => setPlayingId(isPlaying ? null : recording.id)}
                            >
                              {isPlaying ? (
                                <>
                                  <Square className="w-3 h-3 mr-1" />
                                  Hide
                                </>
                              ) : (
                                <>
                                  <Play className="w-3 h-3 mr-1" />
                                  Play
                                </>
                              )}
                            </Button>
                          )}
                          <Button size="sm" variant="outline" asChild>
                            <a href={download} target="_blank" rel="noopener noreferrer">
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </a>
                          </Button>
                          {recording.notes && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <FileText className="w-3 h-3 mr-1" />
                                  View Notes
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>{recording.title}</DialogTitle>
                                  <DialogDescription>Recording notes</DialogDescription>
                                </DialogHeader>
                                <div className="mt-4 text-sm leading-relaxed">{recording.notes}</div>
                                <div className="flex gap-2 mt-6">
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      navigator.clipboard.writeText(recording.notes || "");
                                      toast({
                                        title: "Copied!",
                                        description: "Notes copied to clipboard",
                                      });
                                    }}
                                  >
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy Notes
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
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
