import { useState, useMemo, useEffect } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { ExternalLink, Search, Star } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { BOOKS, type BookStatus } from "@/data/books";
import { findCover } from "@/lib/covers";

const BOOKS_PER_PAGE = 12;

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

function amazonSearchUrl(title: string, author?: string, tag = "eng2ea-20") {
  const q = [title, author].filter(Boolean).join(" ");
  const base = `https://www.amazon.com/s?k=${encodeURIComponent(q)}`;
  const u = new URL(base);
  if (tag) u.searchParams.set("tag", tag);
  return u.toString();
}

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
  const [statusFilter, setStatusFilter] = useState<BookStatus | "ALL" | "DIGITAL_FILES">("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("title-asc");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery, statusFilter, sortBy]);

  const bookCounts = useMemo(() => {
    return {
      ALL: BOOKS.length,
      READ: BOOKS.filter((b) => b.status === "READ").length,
      IN_PROGRESS: BOOKS.filter((b) => b.status === "IN_PROGRESS").length,
      TBR: BOOKS.filter((b) => b.status === "TBR").length,
      DIGITAL_FILES: BOOKS.filter((b) => b.hasFreePdf).length,
    };
  }, []);

  const filteredAndSortedBooks = useMemo(() => {
    let result = [...BOOKS];
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter((book) => {
        const authors = book.author.split(/[,;&]| and /i).map(a => a.trim().toLowerCase());
        return book.title.toLowerCase().includes(q) || authors.some(a => a.includes(q));
      });
    }
    if (statusFilter === "DIGITAL_FILES") {
      result = result.filter((book) => book.hasFreePdf);
    } else if (statusFilter !== "ALL") {
      result = result.filter((book) => book.status === statusFilter);
    }
    result.sort((a, b) => {
      switch (sortBy) {
        case "title-asc": return a.title.localeCompare(b.title);
        case "author-asc": return a.author.localeCompare(b.author);
        case "progress-desc": return (b.progress || 0) - (a.progress || 0);
        case "rating-desc": return (b.rating || 0) - (a.rating || 0);
        default: return 0;
      }
    });
    return result;
  }, [debouncedQuery, statusFilter, sortBy, refreshTrigger]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedBooks.length / BOOKS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedBooks = filteredAndSortedBooks.slice((safePage - 1) * BOOKS_PER_PAGE, safePage * BOOKS_PER_PAGE);

  // Build visible page numbers
  const pageNumbers = useMemo(() => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (safePage > 3) pages.push("ellipsis");
      for (let i = Math.max(2, safePage - 1); i <= Math.min(totalPages - 1, safePage + 1); i++) {
        pages.push(i);
      }
      if (safePage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  }, [totalPages, safePage]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const b of paginatedBooks) {
        if (!b.cover) {
          const url = await findCover({ title: b.title, author: b.author, isbn: (b as any).isbn });
          if (url && !cancelled) {
            b.cover = url;
            setRefreshTrigger((x) => x + 1);
          }
        }
      }
    })();
    return () => { cancelled = true; };
  }, [paginatedBooks]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Book Portal | Zain Adtani</title>
        <meta name="description" content="Books I've read, I'm reading, and want to read." />
        <meta property="og:title" content="Book Portal | Zain Adtani" />
        <meta property="og:description" content="Books I've read, I'm reading, and want to read." />
      </Helmet>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">Book Portal</h1>
          <p className="text-xl text-muted-foreground">Books I've read, I'm reading, and want to read</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title or author..."
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
            <Button 
              className={statusFilter === "DIGITAL_FILES" ? "bg-red-600 text-white hover:bg-red-700" : "bg-red-600/10 text-red-600 border border-red-600/20 hover:bg-red-600/20"}
              onClick={() => setStatusFilter("DIGITAL_FILES")} 
              size="sm"
            >
              Digital files ({bookCounts.DIGITAL_FILES})
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

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {((safePage - 1) * BOOKS_PER_PAGE) + 1}–{Math.min(safePage * BOOKS_PER_PAGE, filteredAndSortedBooks.length)} of {filteredAndSortedBooks.length} books
        </p>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedBooks.map((book, index) => {
            const coverSrc = book.cover || GENERIC_COVER;
            const href = withAffiliate(book.link) || amazonSearchUrl(book.title, book.author);

            return (
              <ScrollReveal key={book.id} delay={index * 80}>
              <Card className="overflow-hidden hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,212,170,0.15)] transition-all duration-300 shadow-lg border-2 flex flex-col h-full">
                <div className="aspect-[2/3] w-full bg-muted relative overflow-hidden">
                  <img
                    src={coverSrc}
                    alt={`${book.title} cover`}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = GENERIC_COVER; }}
                  />
                </div>

                <CardContent className="p-4 flex-1 flex flex-col">
                  {book.whopUrl && (
                    <a
                      href={book.whopUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mb-2 inline-flex w-full items-center justify-center rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-600 transition-colors"
                    >
                      🎁 Get free PDF
                    </a>
                  )}

                  <h3 className="font-semibold text-base mb-1 line-clamp-2 text-foreground">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{book.author}</p>

                  <Badge className={`mb-3 w-fit ${STATUS_COLORS[book.status]}`} variant="outline">
                    {STATUS_LABELS[book.status]}
                  </Badge>

                  {book.status === "IN_PROGRESS" && book.progress !== undefined && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{book.progress}%</span>
                      </div>
                      <Progress value={book.progress} className="h-2" />
                    </div>
                  )}

                  {book.rating && book.rating > 0 && (
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < book.rating! ? "fill-yellow-500 text-yellow-500" : "text-muted"}`} />
                      ))}
                    </div>
                  )}

                  {book.notes && <p className="text-sm text-muted-foreground italic mb-3 line-clamp-3">"{book.notes}"</p>}

                  {book.tags && book.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {book.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col gap-2 mt-auto">
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        View on Amazon
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>

                    {(book.myThoughts || book.notes) && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="w-full">
                            {book.status === "READ" ? "View my thoughts" : "View notes"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{book.title}</DialogTitle>
                            <DialogDescription>{book.author}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            {book.myThoughts && (
                              <div>
                                <p className="text-sm font-semibold text-muted-foreground mb-2">My Thoughts</p>
                                <p className="text-base leading-relaxed">{book.myThoughts}</p>
                              </div>
                            )}
                            {book.notes && (
                              <div>
                                <p className="text-sm font-semibold text-muted-foreground mb-2">
                                  {book.myThoughts ? "Book Description" : "Notes"}
                                </p>
                                <p className="text-base leading-relaxed italic text-muted-foreground">{book.notes}</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </CardContent>
              </Card>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={safePage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {pageNumbers.map((p, i) => (
                  <PaginationItem key={i}>
                    {p === "ellipsis" ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        isActive={p === safePage}
                        onClick={() => setCurrentPage(p)}
                        className="cursor-pointer"
                      >
                        {p}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={safePage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {filteredAndSortedBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No books found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
