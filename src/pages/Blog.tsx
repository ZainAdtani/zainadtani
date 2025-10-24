import { useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Play, Pause, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

// ===== 1) Blog data (added audioUrl + tags) =====
const BLOG_POSTS = [
  {
    id: 1,
    title: "My Top 10 (Insanely Simple) Prompts I Use Every Week",
    excerpt: "Discover the AI prompts that save me hours of work every single week.",
    date: "January 2025",
    readTime: "5 min read",
    status: "published" as const,
    slug: "top-10-prompts",
    audioUrl: "/audio/top-10-prompts.mp3", // put your ElevenLabs mp3 here (see notes below)
    tags: ["AI", "Productivity"],
  },
  {
    id: 2,
    title: "ChatGPT vs Claude: Which AI Should You Use (and When)?",
    excerpt: "A practical comparison of the two leading AI assistants and when to use each one.",
    date: "January 2025",
    readTime: "7 min read",
    status: "published" as const,
    slug: "chatgpt-vs-claude",
    audioUrl: "/audio/chatgpt-vs-claude.mp3",
    tags: ["AI", "Tools"],
  },
  {
    id: 3,
    title: "From Chaos to Clarity: Cut Your Inbox Time by 70% Using AI",
    excerpt: "My exact system for managing email efficiently with AI assistance.",
    date: "January 2025",
    readTime: "6 min read",
    status: "published" as const,
    slug: "email-chaos-to-clarity",
    audioUrl: "/audio/email-chaos-to-clarity.mp3",
    tags: ["Systems", "Productivity"],
  },
  // NEW: add two more so the grid looks balanced
  {
    id: 4,
    title: "Engineer → EA: Why Part 1 (Individuals) Is the Make-or-Break",
    excerpt: "If you master Individuals, everything else gets easier. Here’s how I’m approaching it.",
    date: "January 2025",
    readTime: "5 min read",
    status: "published" as const,
    slug: "ea-part1-strategy",
    audioUrl: "/audio/ea-part1-strategy.mp3",
    tags: ["EA Exam", "Study"],
  },
  {
    id: 5,
    title: "The 80/20 Study Loop: Tiny Reps, Big Gains",
    excerpt: "A minimal, repeatable loop for daily study momentum (works for any hard topic).",
    date: "January 2025",
    readTime: "4 min read",
    status: "published" as const,
    slug: "8020-study-loop",
    audioUrl: "/audio/8020-study-loop.mp3",
    tags: ["Learning", "Mindset"],
  },
];

// ===== 2) Minimal, clean audio bar (Sahil-style) =====
function AudioBar({ src, title }: { src?: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const [time, setTime] = useState({ cur: 0, dur: 0 });

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play();
    } else {
      a.pause();
    }
  };

  const onTimeUpdate = () => {
    const a = audioRef.current;
    if (!a) return;
    setTime({ cur: a.currentTime, dur: a.duration || 0 });
    setProgress(a.duration ? a.currentTime / a.duration : 0);
  };

  const onPlay = () => setPlaying(true);
  const onPause = () => setPlaying(false);

  const fmt = (n: number) => {
    if (!isFinite(n)) return "0:00";
    const m = Math.floor(n / 60);
    const s = Math.floor(n % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!src) return null;

  return (
    <div className="w-full rounded-2xl border bg-card/80 backdrop-blur shadow-sm p-4">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{title}</div>
          <div
            className="h-2 rounded-full bg-muted mt-2 cursor-pointer"
            onClick={(e) => {
              const a = audioRef.current;
              if (!a) return;
              const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
              const ratio = (e.clientX - rect.left) / rect.width;
              a.currentTime = (a.duration || 0) * Math.max(0, Math.min(1, ratio));
            }}
          >
            <div className="h-2 rounded-full bg-primary" style={{ width: `${progress * 100}%` }} />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {fmt(time.cur)} / {fmt(time.dur)}
          </div>
        </div>
        <Headphones className="w-4 h-4 text-primary/80" />
      </div>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onTimeUpdate={onTimeUpdate}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}

export default function Blog() {
  // top (featured) + rest
  const [featured, rest] = useMemo(() => {
    const arr = [...BLOG_POSTS];
    return [arr[0], arr.slice(1)];
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog | Zain Adtani</title>
        <meta
          name="description"
          content="Practical insights on productivity, AI, taxes, and life optimization by Zain Adtani."
        />
      </Helmet>

      <main className="container mx-auto px-4 py-14 max-w-4xl">
        {/* ===== Hero Featured (title + meta + audio) ===== */}
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">{featured.title}</h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{featured.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{featured.readTime}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              {featured.tags?.map((t: string) => (
                <Badge key={t} variant="secondary" className="px-2 py-0">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/* Sahil-style audio bar */}
          <AudioBar src={featured.audioUrl} title={`Listen — ${featured.title}`} />

          <p className="text-lg text-muted-foreground mt-6">{featured.excerpt}</p>

          <div className="mt-6">
            <Link to={`/blog/${featured.slug}`}>
              <Button>
                Read the post <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        {/* ===== Rest of posts ===== */}
        <section className="space-y-6">
          {rest.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{post.title}</CardTitle>
                    <CardDescription className="text-base mt-2">{post.excerpt}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {post.tags?.slice(0, 2).map((t: string) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* small inline audio (optional) */}
                {post.audioUrl && (
                  <div className="mt-2">
                    <AudioBar src={post.audioUrl} title={`Listen — ${post.title}`} />
                  </div>
                )}

                <CardContent className="px-0 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <Button variant="ghost" size="sm">
                        Read More <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
