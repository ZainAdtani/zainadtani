import { useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BLOG_POSTS } from "@/data/blog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, Play, Pause, Headphones } from "lucide-react";

// compact, clean audio bar
function AudioBar({ src, title }: { src?: string; title: string }) {
  const aRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [pct, setPct] = useState(0);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);

  const fmt = (n: number) => {
    if (!isFinite(n)) return "0:00";
    const m = Math.floor(n / 60);
    const s = Math.floor(n % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!src) return null;

  return (
    <div className="w-full rounded-2xl border bg-card/80 backdrop-blur shadow-sm p-4">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => {
            const a = aRef.current;
            if (!a) return;
            a.paused ? a.play() : a.pause();
          }}
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>

        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{title}</div>
          <div
            className="h-2 rounded-full bg-muted mt-2 cursor-pointer"
            onClick={(e) => {
              const a = aRef.current;
              if (!a || !dur) return;
              const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
              const ratio = (e.clientX - rect.left) / rect.width;
              a.currentTime = Math.max(0, Math.min(1, ratio)) * dur;
            }}
          >
            <div className="h-2 rounded-full bg-primary" style={{ width: `${pct * 100}%` }} />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {fmt(cur)} / {fmt(dur)}
          </div>
        </div>

        <Headphones className="w-4 h-4 text-primary/80" />
      </div>

      <audio
        ref={aRef}
        src={src}
        preload="metadata"
        onTimeUpdate={() => {
          const a = aRef.current;
          if (!a) return;
          setCur(a.currentTime);
          setDur(a.duration || 0);
          setPct(a.duration ? a.currentTime / a.duration : 0);
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = useMemo(() => BLOG_POSTS.find((p) => p.slug === slug), [slug]);

  if (!post) {
    return (
      <main className="container mx-auto px-4 py-20 max-w-3xl">
        <p className="text-muted-foreground mb-6">Post not found.</p>
        <Button asChild><Link to="/blog">← Back to Blog</Link></Button>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.title} | Zain Adtani</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link to="/blog"><ArrowLeft className="w-4 h-4 mr-2" /> Back</Link>
          </Button>
        </div>

        {/* Hero title */}
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">{post.title}</h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-6">
          <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4"/>{post.date}</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4"/>{post.readTime}</span>
          {post.tags?.length ? (
            <>
              <span>•</span>
              <span className="inline-flex gap-2">{post.tags.map(t => (<Badge key={t} variant="secondary">{t}</Badge>))}</span>
            </>
          ) : null}
        </div>

        {/* Listen bar just under title (Sahil vibe) */}
        <AudioBar src={post.audioUrl} title={`Listen — ${post.title}`} />

        {/* Dek / intro */}
        <p className="text-lg text-muted-foreground mt-6">{post.excerpt}</p>

        {/* Content */}
        <article className="prose prose-slate dark:prose-invert max-w-none mt-8">
          {post.content?.map((para, i) => <p key={i}>{para}</p>)}
        </article>
      </main>
    </div>
  );
}
