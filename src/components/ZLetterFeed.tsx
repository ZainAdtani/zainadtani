import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import zLetterLogo from "@/assets/z-letter-logo.jpeg";

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
}

const RSS_URL = "https://rss.beehiiv.com/feeds/jHsdvEe1Hm.xml";

export function ZLetterFeed() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(RSS_URL)
      .then((r) => r.text())
      .then((text) => {
        const xml = new DOMParser().parseFromString(text, "text/xml");
        const entries = Array.from(xml.querySelectorAll("item")).slice(0, 3);
        setItems(
          entries.map((el) => ({
            title: el.querySelector("title")?.textContent ?? "",
            link: el.querySelector("link")?.textContent ?? "#",
            pubDate: el.querySelector("pubDate")?.textContent ?? "",
          }))
        );
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (raw: string) => {
    try {
      return new Date(raw).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return raw;
    }
  };

  return (
    <section id="z-letter" className="py-10 md:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-center text-foreground mb-10">
          Latest from The Z Letter
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-6 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              ))
            : items.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border-l-4 border-l-secondary border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_4px_24px_rgba(0,212,170,0.12)]"
                >
                  <img
                    src={zLetterLogo}
                    alt="The Z Letter"
                    className="w-12 h-12 rounded-lg border border-border object-cover mb-3"
                  />
                  <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {formatDate(item.pubDate)}
                  </p>
                  <span className="text-sm text-primary font-medium">
                    Read →
                  </span>
                </a>
              ))}
        </div>
      </div>
    </section>
  );
}
