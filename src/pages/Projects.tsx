import { Helmet } from "react-helmet-async";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import pokeballBg from "@/assets/pokeball-background.png";
import pikachu from "@/assets/pikachu.png";

export default function Projects() {
  const notionPokedexUrl = import.meta.env.VITE_NOTION_POKEDEX_URL;

  return (
    <>
      <Helmet>
        <title>Fun Projects – Zain</title>
        <meta name="description" content="Fun projects, experiments, and creative builds." />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumbs */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Projects</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Side projects, experiments, and fun builds. A collection of things I've created to learn, explore, and share.
          </p>
        </div>

        {/* Floating Pikachu */}
        <img 
          src={pikachu} 
          alt="Pikachu" 
          className="fixed bottom-8 right-8 sm:bottom-6 sm:right-6 w-20 h-20 animate-bounce z-30 pointer-events-none opacity-90"
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 100}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              {project.id === 'pokedex' ? (
                <div className="aspect-video w-full overflow-hidden bg-muted relative">
                  <img 
                    src={pokeballBg} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : project.thumbnail ? (
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225"%3E%3Crect width="400" height="225" fill="%23222"%3E%3C/rect%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23666" font-size="20" font-family="system-ui"%3E' + project.title + '%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
              ) : null}
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link to={project.route}>Open</Link>
                </Button>
                {project.id === 'pokedex' && notionPokedexUrl && (
                  <Button 
                    variant="outline" 
                    size="icon"
                    asChild
                  >
                    <a 
                      href={notionPokedexUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Open on Notion"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </>
  );
}
