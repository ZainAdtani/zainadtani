import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import zLetterLogo from "@/assets/z-letter-logo.jpeg";
import { NEWSLETTER_NAME, NEWSLETTER_RSS_URL, NEWSLETTER_SUBSCRIBE_URL } from "@/data/newsletter";

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
}

const RSS_URL = NEWSLETTER_RSS_URL;
const SUBSCRIBE_URL = NEWSLETTER_SUBSCRIBE_URL;

const FALLBACK_ITEMS: FeedItem[] = [
  { title: "How I Use AI to Write a Book in 30 Days", link: SUBSCRIBE_URL, pubDate: "" },
  { title: "The 3 AI Tools Every Small Business Needs", link: SUBSCRIBE_URL, pubDate: "" },
  { title: "Why I Quit My 9-5 to Build with AI", link: SUBSCRIBE_URL, pubDate: "" },
];

export function ZLetterFeed() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(RSS_URL)
      .then((r) => r.text())
      .then((text) => {
        const xml = new DOMParser().parseFromString(text, "text/xml");
        const entries = Array.from(xml.querySelectorAll("item")).slice(0, 12);
        const parsed = entries.map((el) => ({
          title: el.querySelector("title")?.textContent ?? "",
          link: el.querySelector("link")?.textContent ?? "#",
          pubDate: el.querySelector("pubDate")?.textContent ?? "",
        }));
        setItems(parsed.length > 0 ? parsed : FALLBACK_ITEMS);
      })
      .catch(() => setItems(FALLBACK_ITEMS))
      .finally(() => setLoading(false));
  }, []);

  const [query, setQuery] = useState("");
  const shown = items.filter((it) => it.title.toLowerCase().includes(query.trim().toLowerCase()));

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
    <div className="py-0">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="relative mx-auto mb-6 max-w-md">
          <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search issues"
            aria-label="Search issues by title"
            className="w-full rounded-full border border-border bg-card py-2.5 pl-9 pr-4 font-sans text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-6 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              ))
            : shown.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border-l-4 border-l-secondary border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_4px_24px_rgba(68,123,190,0.12)]"
                >
                  <img
                    src={zLetterLogo}
                    alt={NEWSLETTER_NAME}
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
    </div>
  );
}
