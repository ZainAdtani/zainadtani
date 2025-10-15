import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import pikachu from "@/assets/pikachu.png";

export default function ProjectPokedex() {
  const notionPokedexUrl = import.meta.env.VITE_NOTION_POKEDEX_URL;

  return (
    <>
      <Helmet>
        <title>My Pokémon Pokédex – Projects – Zain</title>
        <meta name="description" content="Embedded Notion Pokédex with sprites, stats, and filters." />
      </Helmet>

      <div className="container mx-auto px-4 py-6 max-w-[1600px]">
        {/* Breadcrumbs */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">My Pokémon Pokédex</span>
        </nav>

        {/* Floating Pikachu */}
        <img 
          src={pikachu} 
          alt="Pikachu mascot" 
          className="fixed top-20 right-8 w-16 h-16 md:w-20 md:h-20 animate-bounce z-10 pointer-events-none opacity-90"
        />

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">My Pokémon Pokédex</h1>

        {/* Embed Section */}
        <div className="space-y-3">
          <div className="flex gap-8 items-center justify-between">
            <p className="text-sm text-muted-foreground">
              A Notion-powered Pokédex with sprites, stats, and filters.
            </p>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <a href="https://zainadtani.notion.site/Zain-s-Notion-Pok-dex-3d1da8f06b194c24a7aeb9f54aa43294" target="_blank" rel="noreferrer">Full Screen</a>
              </Button>
              <Button asChild size="sm">
                <a href="https://zainadtani.notion.site/Zain-s-Notion-Pok-dex-3d1da8f06b194c24a7aeb9f54aa43294" target="_blank" rel="noreferrer">Open on Notion</a>
              </Button>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border">
            <iframe
              src="https://zainadtani.notion.site/ebd/3d1da8f06b194c24a7aeb9f54aa43294"
              title="My Pokémon Pokédex"
              style={{ width: "100%", height: "88vh", border: "0" }}
              loading="lazy"
              allowFullScreen
            />
          </div>
          <p className="text-xs text-muted-foreground">
            🧩 This page is embedded from Notion for live updates and filtering.
          </p>
        </div>
      </div>
    </>
  );
}
