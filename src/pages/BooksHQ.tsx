import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalLink, Search, Star } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { BOOKS, type BookStatus } from "@/data/books";
import maggieStickerImage from "@/assets/maggie-simba-stickers.png";

const STATUS_COLORS: Record<BookStatus, string> = {
  READ: "bg-green-500/20 text-green-400 border-green-500/50",
  IN_PROGRESS: "bg-blue-500/20 text-blue-400 border-blue-500/50",
  TBR: "bg-muted text-muted-foreground border-border"
};

const STATUS_LABELS: Record<BookStatus, string> = {
  READ: "Read",
  IN_PROGRESS: "Reading",
  TBR: "Want To Read"
};

type SortOption = 'title-asc' | 'author-asc' | 'progress-desc' | 'rating-desc';

export default function BooksHQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookStatus | "ALL">("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("title-asc");

  // Count books by status
  const bookCounts = useMemo(() => {
    return {
      ALL: BOOKS.length,
      READ: BOOKS.filter(b => b.status === 'READ').length,
      IN_PROGRESS: BOOKS.filter(b => b.status === 'IN_PROGRESS').length,
      TBR: BOOKS.filter(b => b.status === 'TBR').length
    };
  }, []);

  const filteredAndSortedBooks = useMemo(() => {
    let result = [...BOOKS];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by status
    if (statusFilter !== "ALL") {
      result = result.filter(book => book.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'author-asc':
          return a.author.localeCompare(b.author);
        case 'progress-desc':
          return (b.progress || 0) - (a.progress || 0);
        case 'rating-desc':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, statusFilter, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Book Portal | Zain Adtani</title>
        <meta name="description" content="Books I've read, I'm reading, and want to read." />
        <meta property="og:title" content="Book Portal | Zain Adtani" />
        <meta property="og:description" content="Books I've read, I'm reading, and want to read." />
      </Helmet>

      {/* Easter Egg Dog */}
      <img 
        src={maggieStickerImage} 
        alt="" 
        className="fixed top-32 right-12 w-10 h-10 opacity-10 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50"
        aria-hidden="true"
      />

      <Header />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header with Portal Animation */}
        <div className="text-center mb-8 relative">
          {/* Danny Phantom Green Portal Animation */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
            <svg 
              className="w-[220px] h-[220px] opacity-90"
              viewBox="0 0 200 200"
            >
              <defs>
                <radialGradient id="portalGlow" cx="50%" cy="50%">
                  <stop offset="0%" style={{ stopColor: '#00FFA8', stopOpacity: 0.9 }} />
                  <stop offset="60%" style={{ stopColor: '#10A37F', stopOpacity: 0.25 }} />
                  <stop offset="100%" style={{ stopColor: '#0AFF6C', stopOpacity: 0 }} />
                </radialGradient>
                <filter id="blur">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
              </defs>
              {/* Outer ring */}
              <circle cx="100" cy="100" r="70" fill="none" stroke="url(#portalGlow)" strokeWidth="8" className="motion-safe:animate-spin-slow" style={{ transformOrigin: '100px 100px', animationDuration: '16s' }} />
              {/* Inner swirl */}
              <path d="M100 40 C150 60,150 140,100 160 C50 140,50 60,100 40 Z"
                    fill="url(#portalGlow)" filter="url(#blur)" className="motion-safe:animate-spin-reverse" style={{ transformOrigin: '100px 100px', animationDuration: '12s' }} />
            </svg>
          </div>

          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
              Book Portal
            </h1>
            <p className="text-xl text-muted-foreground">
              Books I've read, I'm reading, and want to read
            </p>
          </div>
        </div>

        {/* Search and Filters */}
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
            <Button
              variant={statusFilter === "ALL" ? "default" : "outline"}
              onClick={() => setStatusFilter("ALL")}
              size="sm"
              aria-pressed={statusFilter === "ALL"}
            >
              All ({bookCounts.ALL})
            </Button>
            <Button
              variant={statusFilter === "READ" ? "default" : "outline"}
              onClick={() => setStatusFilter("READ")}
              size="sm"
              aria-pressed={statusFilter === "READ"}
            >
              Read ({bookCounts.READ})
            </Button>
            <Button
              variant={statusFilter === "IN_PROGRESS" ? "default" : "outline"}
              onClick={() => setStatusFilter("IN_PROGRESS")}
              size="sm"
              aria-pressed={statusFilter === "IN_PROGRESS"}
            >
              In Progress ({bookCounts.IN_PROGRESS})
            </Button>
            <Button
              variant={statusFilter === "TBR" ? "default" : "outline"}
              onClick={() => setStatusFilter("TBR")}
              size="sm"
              aria-pressed={statusFilter === "TBR"}
            >
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
          {filteredAndSortedBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden hover-lift transition-all duration-300 shadow-lg border-2 flex flex-col">
              {/* Cover Image */}
              <div className="aspect-[2/3] w-full bg-muted relative overflow-hidden">
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={`${book.title} cover`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300"%3E%3Crect fill="%23333" width="200" height="300"/%3E%3Ctext fill="%23666" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14"%3ENo Cover%3C/text%3E%3C/svg%3E';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Cover
                  </div>
                )}
              </div>

              <CardContent className="p-4 flex-1 flex flex-col">
                {/* Title & Author */}
                <h3 className="font-semibold text-base mb-1 line-clamp-2 text-foreground">
                  {book.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {book.author}
                </p>

                {/* Status Badge */}
                <Badge 
                  className={`mb-3 w-fit ${STATUS_COLORS[book.status]}`}
                  variant="outline"
                >
                  {STATUS_LABELS[book.status]}
                </Badge>

                {/* Progress Bar for IN_PROGRESS */}
                {book.status === 'IN_PROGRESS' && book.progress !== undefined && (
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
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < book.rating! ? 'fill-yellow-500 text-yellow-500' : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Notes */}
                {book.notes && (
                  <p className="text-sm text-muted-foreground italic mb-3">
                    "{book.notes}"
                  </p>
                )}

                {/* Tags */}
                {book.tags && book.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {book.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Link Button */}
                {book.link && (
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm"
                    className="mt-auto"
                  >
                    <a 
                      href={book.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      View on Amazon
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No books found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
