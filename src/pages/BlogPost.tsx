// src/pages/BlogPost.tsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import { BLOG_POSTS } from "@/data/blog";

/* ---------- UI helpers ---------- */

function BackButton() {
  return (
    <div className="mb-6">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-muted transition-colors"
        aria-label="Back to all blog posts"
      >
        <span className="text-lg">←</span>
        Back to all posts
      </Link>
    </div>
  );
}

function Tabs({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border bg-card">{children}</div>;
}

/** Video-only block for posts that do NOT have slides yet.
 *  - If you later have a HeyGen iframe, paste it where indicated.
 */
function VideoOnlyBlock({ iframeSrc }: { iframeSrc?: string }) {
  const hasIframe = typeof iframeSrc === "string" && iframeSrc.trim().length > 0;

  return (
    <div className="rounded-xl border bg-card">
      <div className="p-4">
        <h3 className="text-sm font-semibold">Watch or listen — your choice</h3>
        <p className="text-sm text-muted-foreground">Click to play the video when it’s available.</p>
      </div>

      <div className="px-4 pb-4">
        <div className="mt-2 aspect-video w-full rounded-lg overflow-hidden border bg-muted/30 flex items-center justify-center">
          {hasIframe ? (
            <iframe
              src={iframeSrc}
              width="100%"
              height="100%"
              title="Episode video"
              frameBorder="0"
              allow="encrypted-media; fullscreen"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            // Placeholder (you will paste your HeyGen iframe later)
            <div className="text-center p-6 text-sm text-muted-foreground">
              <div className="mb-2 font-medium">Video coming soon</div>
              <div className="opacity-80">When you have the HeyGen iframe, paste it here (inside VideoOnlyBlock).</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Tabs block for the Automation post (Video + Slides only) */
function TabBlock({ videoIframeSrc, slidesIframeSrc }: { videoIframeSrc: string; slidesIframeSrc: string }) {
  const [tab, setTab] = React.useState<"video" | "slides">("video");
  return (
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

      {tab === "video" && (
        <div className="mt-4 aspect-video w-full rounded-lg overflow-hidden border">
          <iframe
            src={videoIframeSrc}
            width="100%"
            height="100%"
            title="HeyGen video"
            frameBorder="0"
            allow="encrypted-media; fullscreen"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      )}

      {tab === "slides" && (
        <div className="mt-4 aspect-video w-full rounded-lg overflow-hidden border">
          <iframe
            src={slidesIframeSrc}
            width="100%"
            height="100%"
            title="Gamma slides"
            allow="fullscreen"
            className="w-full h-full"
          />
        </div>
      )}
    </div>
  );
}

/* ---------- Page ---------- */

export default function BlogPostPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  React.useEffect(() => {
    if (post) document.title = `${post.title} • Blog`;
  }, [post]);

  if (!post) {
    return <main className="container mx-auto px-4 max-w-3xl py-10">Post not found.</main>;
  }

  const isAutomation = slug === "save-5-hours-automation-audit";

  // Embed sources (kept inline per your current approach)
  const HEYGEN_IFRAME_SRC = "https://app.heygen.com/embedded-player/8ba283951a04402f8b9f625377fb3086";
  const GAMMA_IFRAME_SRC = "https://gamma.app/embed/lhmoxndy1b2dtye";

  return (
    <main className="container mx-auto px-4 max-w-3xl py-10">
      <BackButton />

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{post.title}</h1>

      {/* Meta row */}
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

      {/* Media block:
          - Automation post: Tabs (Video + Slides)
          - Others: Video-only placeholder (ready for HeyGen iframe later) */}
      <div className="mt-6">
        {isAutomation ? (
          <Tabs>
            <div className="p-4">
              <h3 className="text-sm font-semibold">Watch or browse — your choice</h3>
              <p className="text-sm text-muted-foreground">Click a tab to watch the video or go through the slides.</p>
            </div>
            <TabBlock videoIframeSrc={HEYGEN_IFRAME_SRC} slidesIframeSrc={GAMMA_IFRAME_SRC} />
          </Tabs>
        ) : (
          <VideoOnlyBlock /* later: iframeSrc={YOUR_HEYGEN_URL} */ />
        )}
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
