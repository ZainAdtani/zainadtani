// src/pages/BlogPost.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { BLOG_POSTS } from "@/data/blog";

function WatchTabs({ videoUrl, slidesEmbedUrl }: { videoUrl?: string; slidesEmbedUrl?: string }) {
  if (!videoUrl && !slidesEmbedUrl) return null;

  const [tab, setTab] = React.useState<"video" | "slides">("video");

  return (
    <div className="rounded-xl border bg-card">
      <div className="p-4">
        <h3 className="text-sm font-semibold">Watch or browse — your choice</h3>
        <p className="text-sm text-muted-foreground">
          Click a tab to watch the video or go through the slides.
        </p>
      </div>

      <div className="px-4 pb-4">
        <div className="inline-flex rounded-md border overflow-hidden">
          <button
            onClick={() => setTab("video")}
            className={`px-4 py-2 text-sm ${tab === "video" ? "bg-muted font-semibold" : "bg-background"}`}
          >
            Video
          </button>
          <button
            onClick={() => setTab("slides")}
            className={`px-4 py-2 text-sm ${tab === "slides" ? "bg-muted font-semibold" : "bg-background"}`}
          >
            Slides
          </button>
        </div>

        {tab === "video" && videoUrl && (
          <div className="mt-4 aspect-[9/16] w-full max-w-sm mx-auto overflow-hidden rounded-lg border">
            <video controls playsInline className="w-full h-full">
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
        )}

        {tab === "slides" && slidesEmbedUrl && (
          <div className="mt-4 aspect-video w-full rounded-lg overflow-hidden border">
            <iframe src={slidesEmbedUrl} allow="fullscreen" title="Slides" className="w-full h-full" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function BlogPostPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  React.useEffect(() => {
    if (post) document.title = `${post.title} • Blog`;
  }, [post]);

  if (!post) {
    return <main className="container mx-auto px-4 max-w-3xl py-10">Post not found.</main>;
  }

  return (
    <main className="container mx-auto px-4 max-w-3xl py-10">
      {/* TITLE — top of page (no hero video above) */}
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{post.title}</h1>

      {/* Meta row (date • read time • tags) */}
      <div className="mt-2 text-sm text-muted-foreground flex flex-wrap gap-x-3 gap-y-1">
        <span>{post.date ?? "—"}</span>
        <span>•</span>
        <span>{post.readTime ?? "—"}</span>
        {!!post.tags?.length && (
          <>
            <span>•</span>
            <span>{post.tags.join(", ")}</span>
          </>
        )}
      </div>

      {/* Video / Slides (no Download tab) */}
      <div className="mt-6">
        <WatchTabs videoUrl={post.videoUrl} slidesEmbedUrl={post.slidesEmbedUrl} />
      </div>

      {/* Content */}
      <article className="prose dark:prose-invert mt-8">
        {post.sections
          ? post.sections.map((sec) => (
              <section key={sec.id} id={sec.id}>
                {sec.title ? <h2>{sec.title}</h2> : null}
                {sec.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </section>
            ))
          : post.content?.map((p, i) => <p key={i}>{p}</p>)}
      </article>
    </main>
  );
}
