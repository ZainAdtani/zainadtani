import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const sections = [
  { id: "quranic-text", title: "QURANIC TEXT, TRANSLITERATION, AND TRANSLATION" },
  { id: "an-nur", title: "Surat an-Nur (The Light) - Ayat an-Nur (The Light)" },
  { id: "al-kawthar", title: "Surat al-Kawthar (Abundance)" },
  { id: "an-nasr", title: "Surat an-Nasr (Succour)" },
  { id: "al-rum", title: "Surat al-Rum (The Byzantines)" },
];

export default function DevotionalLiterature() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/5 to-background">
      <Helmet>
        <title>Devotional Literature | Zain Adtani</title>
        <meta name="description" content="Select texts of the Qur'an, Ginans, Qasidas and Tasbihs" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <a href="/waez">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to USA Visit 2025
            </a>
          </Button>
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Devotional Literature</h1>
            <div className="h-1 bg-gradient-to-r from-primary/50 via-primary to-transparent rounded-full" />
          </div>
          <p className="text-lg text-muted-foreground mt-6">
            Select texts of the Qur'an, Ginans, Qasidas and Tasbihs for reflection and contemplation.
          </p>
        </div>

        {/* Sticky Table of Contents */}
        <Card className="sticky top-4 z-10 mb-8 p-4 bg-card/95 backdrop-blur-sm shadow-lg rounded-xl border">
          <h2 className="font-semibold mb-3 text-sm uppercase tracking-wide">Table of Contents</h2>
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left text-sm px-3 py-2 rounded-md transition-all hover:bg-accent ${
                  activeSection === section.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </Card>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, idx) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-32 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <Card className="rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                <h2 className="text-2xl font-bold mb-6 text-foreground">{section.title}</h2>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-muted-foreground">Arabic</h3>
                    <div className="bg-accent/20 rounded-lg p-4 min-h-[80px]">
                      {/* Arabic text placeholder */}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-muted-foreground">Transliteration</h3>
                    <div className="bg-accent/20 rounded-lg p-4 min-h-[80px]">
                      {/* Transliteration placeholder */}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-muted-foreground">English Translation</h3>
                    <div className="bg-accent/20 rounded-lg p-4 min-h-[80px]">
                      {/* Translation placeholder */}
                    </div>
                  </div>
                </div>
              </Card>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
