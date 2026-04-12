import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Youtube, Linkedin, Calendar } from "lucide-react";
import zainSimba from "@/assets/zain-simba.png";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-2xl">
        {/* Photo */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-3xl" />
            <img
              src={zainSimba}
              alt="Zain with Simba"
              className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl border-2 border-primary/20"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Hey, I am Zain.</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I studied engineering at the University of Texas at San Antonio.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I build simple websites for small businesses.
          </p>
        </div>

        {/* Social buttons */}
        <div className="flex justify-center gap-4 mb-16">
          <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 shadow-[0_8px_0_0_rgb(153,27,27)] hover:shadow-[0_4px_0_0_rgb(153,27,27)] active:shadow-[0_0px_0_0_rgb(153,27,27)] hover:translate-y-1 active:translate-y-2 transition-all">
            <a href="https://youtube.com/@captainduaadventures?si=xPzuebAHwHZTl52V" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Youtube className="h-5 w-5" />
              YouTube
            </a>
          </Button>
          <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600 text-white shadow-[0_8px_0_0_rgb(37,99,235)] hover:shadow-[0_4px_0_0_rgb(37,99,235)] active:shadow-[0_0px_0_0_rgb(37,99,235)] hover:translate-y-1 active:translate-y-2 transition-all">
            <a href="https://linkedin.com/in/zainadtani" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </a>
          </Button>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-primary/30 mx-auto mb-16" />

        {/* Get In Touch */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Get In Touch</h2>
          <p className="text-muted-foreground">Have a question or want to work together?</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-6 flex flex-col items-center gap-3 text-center">
            <Linkedin className="h-8 w-8 text-primary" />
            <h3 className="font-semibold text-foreground">LinkedIn</h3>
            <Button asChild variant="outline" size="sm">
              <a href="https://www.linkedin.com/in/zainadtani/" target="_blank" rel="noopener noreferrer">
                Connect
              </a>
            </Button>
          </Card>

          <Card className="p-6 flex flex-col items-center gap-3 text-center">
            <Youtube className="h-8 w-8 text-primary" />
            <h3 className="font-semibold text-foreground">YouTube</h3>
            <Button asChild variant="outline" size="sm">
              <a href="https://youtube.com/@captainduaadventures?si=xPzuebAHwHZTl52V" target="_blank" rel="noopener noreferrer">
                Subscribe
              </a>
            </Button>
          </Card>

          <Card className="p-6 flex flex-col items-center gap-3 text-center">
            <Calendar className="h-8 w-8 text-primary" />
            <h3 className="font-semibold text-foreground">Book a Call</h3>
            <Button asChild variant="outline" size="sm">
              <a href="https://calendly.com/zkadtani/job" target="_blank" rel="noopener noreferrer">
                Schedule
              </a>
            </Button>
          </Card>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-primary/30 mx-auto my-16" />

        {/* What I'm Listening To */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">What I'm Listening To</h2>
          <p className="text-muted-foreground">Music I work and study to</p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg mb-16">
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/4ZHa92ZbMSi2Fwps39XZl5?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>

        {/* Tools I Use & Recommend */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Tools I Use & Recommend</h2>
          <p className="text-muted-foreground">Platforms I personally use and trust</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { emoji: "📈", name: "Fidelity", desc: "Where I invest for the long term", url: "https://www.fidelity.com" },
            { emoji: "📱", name: "Robinhood", desc: "Simple trading and crypto", url: "https://www.robinhood.com" },
            { emoji: "🏦", name: "Marcus by Goldman Sachs", desc: "High yield savings", url: "https://www.marcus.com" },
          ].map((r) => (
            <a
              key={r.name}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-border/50 bg-card/50 p-4 text-sm transition-all duration-200 hover:border-primary/60 hover:scale-[1.02]"
            >
              <span className="text-xl mb-2 block">{r.emoji}</span>
              <span className="font-semibold text-foreground block">{r.name}</span>
              <span className="text-muted-foreground text-xs">{r.desc}</span>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
};

