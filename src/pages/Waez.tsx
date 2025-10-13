import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Search, PlayCircle, Home as HomeIcon, ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import abuAliPortrait from "@/assets/abu-ali-portrait.png";

// Front-matter data - easy to edit
const GOOGLE_DRIVE_URL = "PASTE_MY_GOOGLE_DRIVE_LINK_HERE";

const FEATURED_ITEMS = [
  {
    title: "Bait-ul-Khayal — April 1991 (Canada)",
    note: "Classic waez on purpose and practice inside Bait-ul-Khayal; grounding + practical steps.",
    type: "audio" as const,
    url: "DRIVE_LINK_1991_AK"
  },
  {
    title: "How to Focus in Ibadat Bandagi",
    note: "Short, direct guidance on attention and sincerity during prayers.",
    type: "audio" as const,
    url: "DRIVE_LINK_FOCUS"
  },
  {
    title: "A Short Course for Bait-ul-Khayal",
    note: "Multi-part series—frameworks, habits, and inner discipline.",
    type: "audio" as const,
    url: "DRIVE_LINK_SHORT_COURSE"
  },
  {
    title: "Process of Death — Gujarati/Urdu notes",
    note: "Contemplative guidance on mortality and meaning; PDF handout.",
    type: "pdf" as const,
    url: "DRIVE_LINK_DEATH_PDF"
  }
];

export default function Waez() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = FEATURED_ITEMS.filter(
    item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.note.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <Helmet>
        <title>Waez — Listen on the Go | Zain Adtani</title>
        <meta name="description" content="Selections from community recordings of Rai Dr. Abualy Alibhai Aziz (Abu Ali) — religious talks and lectures." />
        <meta property="og:title" content="Waez — Listen on the Go | Zain Adtani" />
        <meta property="og:description" content="Selections from community recordings and notes" />
        <meta property="og:image" content="/og-waez.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="max-w-[70ch] mx-auto px-4 py-16 leading-relaxed">
        {/* Breadcrumb + Back Links */}
        <nav className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
          <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <HomeIcon className="w-4 h-4" />
            Home
          </Link>
          <span>▸</span>
          <Link to="/sports" className="hover:text-primary transition-colors">
            Articles
          </Link>
          <span>▸</span>
          <span className="text-foreground font-medium">Waez</span>
        </nav>

        <div className="flex gap-3 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/sports" className="flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Back to Articles
            </Link>
          </Button>
        </div>
        {/* Hero */}
        <header className="text-center mb-16 border-b border-dotted border-muted-foreground/30 pb-8">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-3">
            Waez — Listen on the Go
          </h1>
          <p className="text-muted-foreground text-lg mb-3">
            Selections from community recordings and notes
          </p>
          <Badge variant="secondary" className="text-xs">
            Updated: {today}
          </Badge>
        </header>

        {/* Section 1 — About Abu Ali */}
        <section className="mb-16 border-b border-dotted border-muted-foreground/30 pb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
            About Rai Dr. Abualy Alibhai Aziz (1919–2008)
          </h2>

          <div className="md:grid md:grid-cols-[1fr_180px] md:gap-8">
            {/* Bio text */}
            <div className="prose prose-slate max-w-none">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:leading-none mb-4">
                Rai Dr. Abualy Alibhai Aziz—affectionately known as <strong>Abu Ali</strong>—was a renowned Ismaili missionary and scholar whose work spanned eight decades. He delivered <strong>10,000+ lectures worldwide</strong>, with thousands recorded after the 1950s, leaving a living archive of waez and guidance for generations.{" "}
                <a 
                  href="https://khojawiki.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                  aria-label="Khoja Wiki reference"
                >
                  <sup>[1]</sup>
                </a>
              </p>

              <p className="mb-4">
                Born in Amritsar, India (Aug 21, 1919), he began religious service early and became one of the most travelled and recognized missionaries of the 20th century, known for his clarity, discipline, and devotion.{" "}
                <a 
                  href="https://ismailiheritage.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                  aria-label="Ismaili Heritage reference"
                >
                  <sup>[2]</sup>
                </a>
              </p>

              <p className="mb-4">
                His preserved works and papers today number <strong>12,000+ items</strong> in a curated collection at the University of Toronto Mississauga.{" "}
                <a 
                  href="https://utm.utoronto.ca" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                  aria-label="University of Toronto Collections reference"
                >
                  <sup>[3]</sup>
                </a>
              </p>

              <div className="border-l-4 border-primary pl-4 my-6 bg-muted/30 py-3 rounded-r">
                <p className="text-sm font-medium italic mb-1">Why this page</p>
                <p className="text-sm text-muted-foreground">
                  A small, respectful doorway into that legacy—short summaries, quick listening access, and links to deeper archives.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4 my-6 bg-blue-50 dark:bg-blue-950/20 py-3 rounded-r">
                <p className="text-sm font-medium mb-2">What is Bait-ul-Khayal?</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>A practice of contemplative reflection and mindfulness in the Ismaili tradition</li>
                  <li>Focuses on cultivating inner awareness, gratitude, and spiritual discipline</li>
                  <li>Involves structured thought exercises to connect with higher purpose and meaning</li>
                </ul>
                <a 
                  href="https://www.youtube.com/results?search_query=bait+ul+khayal+ismaili"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline mt-2 inline-block"
                >
                  Learn more →
                </a>
              </div>

              {/* Sources footnote */}
              <div className="text-xs text-muted-foreground border-t border-muted pt-4 mt-6">
                <p className="font-semibold mb-2">Sources:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>
                    <a 
                      href="https://khojawiki.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Khoja Wiki
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://ismailiheritage.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Ismaili Heritage — "Ismaili Heroes"
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://utm.utoronto.ca" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      UTM Collections
                    </a>
                  </li>
                  <li>Simerg</li>
                </ol>
              </div>
            </div>

            {/* Portrait */}
            <div className="hidden md:flex items-start justify-center mt-2">
              <img
                src={abuAliPortrait}
                alt="Rai Dr. Abualy Alibhai Aziz portrait"
                className="w-40 h-40 object-cover rounded-lg shadow-lg border-2 border-muted"
              />
            </div>
          </div>
        </section>

        {/* Section 2 — Featured Tracks */}
        <section className="mb-16 border-b border-dotted border-muted-foreground/30 pb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
            Featured Tracks
          </h2>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by title or note..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item, idx) => (
              <Card key={idx} className="shadow-md border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg text-foreground pr-2">
                      {item.title}
                    </h3>
                    <Badge variant="outline" className="shrink-0">
                      {item.type}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {item.note}
                  </p>

                  <Button 
                    asChild 
                    className="w-full"
                    aria-label={`Play ${item.title} on Google Drive`}
                  >
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <PlayCircle className="w-4 h-4" />
                      Play on Drive
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No items match your search.
            </p>
          )}
        </section>

        {/* Section 3 — Full Collection */}
        <section className="mb-16">
          <Card className="shadow-lg border-2 bg-primary/5">
            <CardContent className="p-8 text-center">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
                Get the Full Collection
              </h2>
              <p className="text-muted-foreground mb-6">
                Prefer browsing everything? Open the Drive.
              </p>
              <Button 
                asChild 
                size="lg"
                aria-label="Open full Google Drive folder"
              >
                <a 
                  href={GOOGLE_DRIVE_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  Open Google Drive Folder
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
