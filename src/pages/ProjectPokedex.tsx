import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ExternalLink, Maximize2 } from "lucide-react";

export default function ProjectPokedex() {
  const notionPokedexUrl = import.meta.env.VITE_NOTION_POKEDEX_URL;

  return (
    <>
      <Helmet>
        <title>Pokédex – Projects – Zain</title>
        <meta name="description" content="Embedded Notion Pokédex with sprites, stats, and filters." />
      </Helmet>

      <div className="container mx-auto px-4 py-6 max-w-[1600px]">
        {/* Breadcrumbs */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Pokédex</span>
        </nav>

        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Pokédex</h1>
            <p className="text-muted-foreground">
              A Notion-powered Pokédex with sprites, stats, and filters.
            </p>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant="outline" 
              size="sm"
              asChild
            >
              <a 
                href="/projects/pokedex/index.html" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open in full screen"
              >
                <Maximize2 className="w-4 h-4 mr-2" />
                Full Screen
              </a>
            </Button>
            
            {notionPokedexUrl && (
              <Button 
                variant="outline" 
                size="sm"
                asChild
              >
                <a 
                  href={notionPokedexUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open on Notion"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open on Notion
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Embedded iframe */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-border/50 shadow-lg bg-card">
          <iframe
            src="/projects/pokedex/index.html"
            title="Notion Pokédex"
            className="w-full h-[75vh] sm:h-[85vh] md:h-[90vh]"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>

        {/* Info note */}
        <p className="text-sm text-muted-foreground mt-4 text-center">
          📦 This page is embedded from a local export for speed and reliability.
        </p>
      </div>
    </>
  );
}
