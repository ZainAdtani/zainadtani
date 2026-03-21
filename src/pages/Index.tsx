import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cpu, Sparkles, BookOpen, Youtube, Linkedin, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { TimeBar } from "@/components/TimeBar";
import { ALL_PRODUCTS } from "@/data/products";
import headshotImage from "@/assets/zain-headshot.png";

const productCatalog = ALL_PRODUCTS.filter(p => p.id !== "free-community")
  .filter(p => p.featured)
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

const PILLARS = [
  {
    title: "AI for Business",
    icon: Cpu,
    subtitle: "Save time, automate workflows, and grow with AI.",
    link: "/services",
  },
  {
    title: "Publish Your Book",
    icon: BookOpen,
    subtitle: "Go from idea to published author.",
    link: "/services",
  },
  {
    title: "Build Your Website",
    icon: Sparkles,
    subtitle: "Beautiful AI-built websites, fast.",
    link: "/services",
  },
];

const Index = () => {
  const topProducts = React.useMemo(() => productCatalog.slice(0, 3), []);

  return (
    <div className="min-h-screen bg-background">
      <div id="top" />
      <Helmet>
        <title>Zain Adtani | Simple Sites and Calm Systems</title>
        <meta name="description" content="I help businesses use AI, authors publish books, and founders build websites." />
        <meta property="og:title" content="Zain Adtani | Simple Sites and Calm Systems" />
        <meta property="og:description" content="I help businesses use AI, authors publish books, and founders build websites." />
        <meta property="og:image" content={headshotImage} />
        <meta property="og:type" content="website" />
      </Helmet>

      <TimeBar />

      {/* ═══ SECTION 1 — HERO ═══ */}
      <section className="pt-8 md:pt-16 pb-16 md:pb-24 bg-gradient-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-shrink-0 relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full scale-110 -z-10"></div>
              <img
                src={headshotImage}
                alt="Zain Adtani"
                className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover object-top"
                style={{ border: '3px solid #00D4AA', boxShadow: '0 0 30px rgba(0,212,170,0.2)' }}
              />
            </div>

            <div className="flex-1 text-center md:text-left space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-foreground">
                Hi, I'm Zain!
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                I help businesses use AI, authors publish books, and founders build websites.
              </p>
              <Button asChild size="lg" className="bg-gradient-cta text-white hover:scale-[1.02] transition-all duration-300 hover:shadow-lg px-8 py-6 text-lg font-semibold rounded-xl">
                <Link to="/services">Work With Me</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2 — THREE PILLAR CARDS ═══ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PILLARS.map((p) => (
              <Card key={p.title} className="p-8 hover-lift cursor-pointer transition-all duration-300 hover:shadow-xl border-2 shadow-lg text-center">
                <Link to={p.link} className="block space-y-4">
                  <p.icon className="w-12 h-12 text-primary mx-auto" />
                  <h3 className="text-xl font-bold text-foreground">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.subtitle}</p>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3 — DIGITAL PRODUCTS PREVIEW ═══ */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
            Digital Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover-lift transition-all duration-300 shadow-lg border-2 flex flex-col">
                {product.media && (
                  <div className="bg-muted/50">
                    <img
                      src={product.media}
                      alt={`${product.title} preview`}
                      className="w-full h-44 object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{product.desc}</p>
                  <div className="mt-auto">
                    {product.cta && (
                      <Button asChild className="w-full bg-gradient-cta text-white hover:scale-[1.02] transition-all duration-300 hover:shadow-lg rounded-xl">
                        <a href={product.cta.href} target="_blank" rel="noopener noreferrer">
                          Get It →
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="link" className="text-primary text-base">
              <Link to="/digital-products">View All Products →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4 — FOOTER CTA ═══ */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 max-w-2xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Stay in the loop</h2>

          {/* Beehiiv newsletter signup */}
          <form
            className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement | null;
              const email = input?.value.trim();
              if (!email) return;
              const magic = `https://magic.beehiiv.com/v1/dd1643e2-f274-43e4-b193-62276e3e3b48?email=${encodeURIComponent(email)}`;
              window.open(magic, "_blank", "noopener,noreferrer");
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              inputMode="email"
              placeholder="you@example.com"
              className="flex-1 h-12 rounded-lg px-4 bg-background text-foreground placeholder-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button type="submit" className="h-12 px-6 bg-gradient-cta text-white rounded-lg">
              Subscribe
            </Button>
          </form>

          {/* Social links */}
          <div className="flex items-center justify-center gap-6">
            <a href="https://youtube.com/@captainduaadventures" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
              <Youtube className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/zainadtani/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>

          {/* Support link */}
          <a
            href="https://buymeacoffee.com/curiouszen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ☕ Support my work
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="container mx-auto px-4 max-w-6xl text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Zain Education Ventures. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
