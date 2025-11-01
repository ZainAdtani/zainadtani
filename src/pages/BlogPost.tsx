import React from "react";
import { useParams } from "react-router-dom";
import { BLOG_POSTS } from "@/data/blog";

function Tabs({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border bg-card">{children}</div>;
}

export default function BlogPostPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  React.useEffect(() => {
    if (post) document.title = `${post.title} • Blog`;
  }, [post]);

  if (!post) return <main className="container mx-auto px-4 max-w-3xl py-10">Post not found.</main>;

  // ---- IF RENDER (only for this slug) ----
  const isAutomation = slug === "save-5-hours-automation-audit";

  const HEYGEN_IFRAME_SRC = "https://app.heygen.com/embedded-player/8ba283951a04402f8b9f625377fb3086";
  const GAMMA_IFRAME_SRC = "https://gamma.app/embed/lhmoxndy1b2dtye";

  return (
    <main className="container mx-auto px-4 max-w-3xl py-10">
      {/* Title first (no hero above) */}
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{post.title}</h1>

      {/* meta row */}
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

      {/* Tabs: Video + Slides only (no Download) */}
      {isAutomation && (
        <div className="mt-6">
          <Tabs>
            <div className="p-4">
              <h3 className="text-sm font-semibold">Watch or browse — your choice</h3>
              <p className="text-sm text-muted-foreground">Click a tab to watch the video or go through the slides.</p>
            </div>

            <TabBlock
              videoIframeSrc={HEYGEN_IFRAME_SRC}
              slidesIframeSrc={GAMMA_IFRAME_SRC}
            />
          </Tabs>
        </div>
      )}

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

function TabBlock({
  videoIframeSrc,
  slidesIframeSrc,
}: {
  videoIframeSrc: string;
  slidesIframeSrc: string;
}) {
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
