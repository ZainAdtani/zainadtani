import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExternalLink, Search, Star } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { BOOKS, type BookStatus, importHundredBooksIfNeeded } from "@/data/books";
import { findCover } from "@/lib/covers";

/** ---------- helpers ---------- **/

// Nice-looking generic cover (dark-friendly). Replace with /assets/book-placeholder.png if you prefer.
const GENERIC_COVER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#1f2937'/>
      <stop offset='100%' stop-color='#0f172a'/>
    </linearGradient>
  </defs>
  <rect width='300' height='450' fill='url(#g)'/>
  <rect x='28' y='28' width='244' height='394' rx='8' ry='8' fill='none' stroke='#334155' stroke-width='3'/>
  <g fill='#94a3b8'>
    <rect x='60' y='90' width='180' height='14' rx='7'/>
    <rect x='60' y='120' width='180' height='14' rx='7' opacity='0.9'/>
    <rect x='60' y='150' width='120' height='14' rx='7' opacity='0.8'/>
    <rect x='60' y='330' width='180' height='10' rx='5' opacity='0.5'/>
    <rect x='60' y='350' width='160' height='10' rx='5' opacity='0.4'/>
  </g>
  <path d='M120 215 h60' stroke='#64748b' stroke-width='10' stroke-linecap='round'/>
  <path d='M100 250 h100' stroke='#475569' stroke-width='6' stroke-linecap='round'/>
</svg>`);

// Build a dependable Amazon search link when we don't have a direct product link
function amazonSearchUrl(title: string, author?: string, tag = "eng2ea-20") {
  const q = [title, author].filter(Boolean).join(" ");
  const base = `https://www.amazon.com/s?k=${encodeURIComponent(q)}`;
  const u = new URL(base);
  if (tag) u.searchParams.set("tag", tag);
  return u.toString();
}

// If you *do* have a direct Amazon URL, make sure the affiliate tag is attached
function withAffiliate(url?: string, tag = "eng2ea-20") {
  try {
    if (!url) return url;
    const u = new URL(url);
    if (!u.searchParams.get("tag")) u.searchParams.set("tag", tag);
    return u.toString();
  } catch {
    return url;
  }
}

/** ---------- styles ---------- **/

const STATUS_COLORS: Record<BookStatus, string> = {
  READ: "bg-green-500/20 text-green-400 border-green-500/50",
  IN_PROGRESS: "bg-red-600/20 text-red-500 border-red-600/50",
  TBR: "bg-muted text-muted-foreground border-border",
};

const STATUS_LABELS: Record<BookStatus, string> = {
  READ: "Read",
  IN_PROGRESS: "Reading",
  TBR: "Want To Read",
};

type SortOption = "title-asc" | "author-asc" | "progress-desc" | "rating-desc";

/** ---------- component ---------- **/

// Debounced search hook for performance
function useDebounced<T>(value: T, delay = 150): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
}

export default function BooksHQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounced(searchQuery, 150);
  const [statusFilter, setStatusFilter] = useState<BookStatus | "ALL">("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("title-asc");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Import 100 books list once on mount (non-blocking)
  useEffect(() => {
    importHundredBooksIfNeeded();
  }, []);

  // counts
  const bookCounts = useMemo(() => {
    return {
      ALL: BOOKS.length,
      READ: BOOKS.filter((b) => b.status === "READ").length,
      IN_PROGRESS: BOOKS.filter((b) => b.status === "IN_PROGRESS").length,
      TBR: BOOKS.filter((b) => b.status === "TBR").length,
    };
  }, []);

  // list
  const filteredAndSortedBooks = useMemo(() => {
    let result = [...BOOKS];

    // filter by query (using debounced value)
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q) ||
          book.tags?.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // filter by status
    if (statusFilter !== "ALL") {
      result = result.filter((book) => book.status === statusFilter);
    }

    // sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "author-asc":
          return a.author.localeCompare(b.author);
        case "progress-desc":
          return (b.progress || 0) - (a.progress || 0);
        case "rating-desc":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [debouncedQuery, statusFilter, sortBy, refreshTrigger]);

  // quietly fill missing covers
  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const b of filteredAndSortedBooks) {
        if (!b.cover) {
          const url = await findCover({ title: b.title, author: b.author, isbn: (b as any).isbn });
          if (url && !cancelled) {
            b.cover = url;
            setRefreshTrigger((x) => x + 1);
          }
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [filteredAndSortedBooks]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Book Portal | Zain Adtani</title>
        <meta name="description" content="Books I've read, I'm reading, and want to read." />
        <meta property="og:title" content="Book Portal | Zain Adtani" />
        <meta property="og:description" content="Books I've read, I'm reading, and want to read." />
      </Helmet>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">Book Portal</h1>
          <p className="text-xl text-muted-foreground">Books I've read, I'm reading, and want to read</p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title, author, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search books"
            />
          </div>

          <div className="flex gap-2 flex-wrap md:flex-nowrap">
            <Button variant={statusFilter === "ALL" ? "default" : "outline"} onClick={() => setStatusFilter("ALL")} size="sm">
              All ({bookCounts.ALL})
            </Button>
            <Button variant={statusFilter === "READ" ? "default" : "outline"} onClick={() => setStatusFilter("READ")} size="sm">
              Read ({bookCounts.READ})
            </Button>
            <Button variant={statusFilter === "IN_PROGRESS" ? "default" : "outline"} onClick={() => setStatusFilter("IN_PROGRESS")} size="sm">
              In Progress ({bookCounts.IN_PROGRESS})
            </Button>
            <Button variant={statusFilter === "TBR" ? "default" : "outline"} onClick={() => setStatusFilter("TBR")} size="sm">
              To Read ({bookCounts.TBR})
            </Button>
          </div>

          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title-asc">Title A-Z</SelectItem>
              <SelectItem value="author-asc">Author A-Z</SelectItem>
              <SelectItem value="rating-desc">Rating (High-Low)</SelectItem>
              <SelectItem value="progress-desc">Progress</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedBooks.map((book) => {
            const coverSrc = book.cover || GENERIC_COVER;
            // always render a button — prefer direct link (with affiliate), else Amazon search
            const href = withAffiliate(book.link) || amazonSearchUrl(book.title, book.author);

            return (
              <Card key={book.id} className="overflow-hidden hover-lift transition-all duration-300 shadow-lg border-2 flex flex-col">
                {/* Cover */}
                <div className="aspect-[2/3] w-full bg-muted relative overflow-hidden">
                  <img
                    src={coverSrc}
                    alt={`${book.title} cover`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = GENERIC_COVER;
                    }}
                  />
                </div>

                <CardContent className="p-4 flex-1 flex flex-col">
                  {/* Title & Author */}
                  <h3 className="font-semibold text-base mb-1 line-clamp-2 text-foreground">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{book.author}</p>

                  {/* Status */}
                  <Badge className={`mb-3 w-fit ${STATUS_COLORS[book.status]}`} variant="outline">
                    {STATUS_LABELS[book.status]}
                  </Badge>

                  {/* Progress */}
                  {book.status === "IN_PROGRESS" && book.progress !== undefined && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{book.progress}%</span>
                      </div>
                      <Progress value={book.progress} className="h-2" />
                    </div>
                  )}

                  {/* Rating */}
                  {book.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < book.rating! ? "fill-yellow-500 text-yellow-500" : "text-muted"}`} />
                      ))}
                    </div>
                  )}

                  {/* Notes (quote) */}
                  {book.notes && <p className="text-sm text-muted-foreground italic mb-3">"{book.notes}"</p>}

                  {/* Tags */}
                  {book.tags && book.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {book.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Always show button */}
                  <Button asChild variant="outline" size="sm" className="mt-auto">
                    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      View on Amazon
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>

                  {/* "View my thoughts" modal - only if notes exist */}
                  {(book.myThoughts || book.notes) && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="mt-2 w-full">
                          View my thoughts
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>{book.title}</DialogTitle>
                          <DialogDescription>{book.author}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 text-sm text-foreground">
                          {book.myThoughts && (
                            <div>
                              <p className="font-semibold mb-1">My thoughts</p>
                              <p className="whitespace-pre-wrap">{book.myThoughts}</p>
                            </div>
                          )}
                          {book.notes && (
                            <div>
                              <p className="font-semibold mb-1">Summary / notes</p>
                              <p className="italic text-muted-foreground whitespace-pre-wrap">
                                {book.notes.length > 600 ? book.notes.slice(0, 597) + "..." : book.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredAndSortedBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No books found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
