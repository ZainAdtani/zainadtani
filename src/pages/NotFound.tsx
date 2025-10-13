import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Home, BookOpen, Music } from "lucide-react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4">
      <Helmet>
        <title>404 - Page Not Found | Zain Adtani</title>
      </Helmet>

      <div className="max-w-2xl w-full text-center">
        {/* Big Emoji */}
        <div 
          className="text-8xl mb-6 cursor-pointer transition-transform hover:scale-110"
          onMouseEnter={() => setShowConfetti(true)}
          onMouseLeave={() => setShowConfetti(false)}
        >
          🤷‍♂️
          {showConfetti && (
            <span className="inline-block animate-fade-in text-4xl">
              ✨🎉🎊✨
            </span>
          )}
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-500 to-primary bg-clip-text text-transparent">
          Well, This is Awkward
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Looks like you've wandered into the void. Let's get you back on track.
        </p>

        {/* Quick Search */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search the site..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Go</Button>
          </div>
        </form>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" variant="default">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/books" className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Books HQ
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/waez" className="flex items-center gap-2">
              <Music className="w-5 h-5" />
              Waez
            </Link>
          </Button>
        </div>

        {/* Footer note */}
        <p className="mt-12 text-sm text-muted-foreground">
          Error code: 404 | Path: <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
