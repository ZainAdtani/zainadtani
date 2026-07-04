import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, Wrench } from "lucide-react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <Helmet>
        <title>Page Not Found · Zain Adtani</title>
        <meta name="description" content="The page you're looking for doesn't exist. Head back home or explore services, books, and resources." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://zainadtani.com/404" />
      </Helmet>

      <div className="max-w-2xl w-full text-center">
        <p
          className="text-7xl md:text-8xl font-bold mb-4"
          style={{ color: "#447BBE", fontFamily: "'Luckiest Guy', cursive", letterSpacing: "0.03em" }}
        >
          404
        </p>

        <h1 className="text-3xl md:text-5xl mb-4">
          404: Nothing To See Here (Yet)
        </h1>

        <p className="text-lg md:text-xl mb-10 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
          This page either moved, got deleted, or never existed. Kind of like a New Year's resolution. Let's get you somewhere real.
        </p>


        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="lg">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/services" className="flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              Services
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/resources" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Resources
            </Link>
          </Button>
        </div>

        <p className="mt-12 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          Path: <code className="font-mono">{location.pathname}</code>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
