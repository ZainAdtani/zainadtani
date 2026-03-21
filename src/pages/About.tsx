import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Youtube, Linkedin, Mail, Calendar } from "lucide-react";
import zainSimba from "@/assets/zain-simba.png";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Left Column - Content */}
          <div className="space-y-6 animate-fade-in">
            {/* About Card */}
            <Card className="p-8 space-y-4 hover-lift">
              <h2 className="text-3xl font-bold text-foreground">About</h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed text-lg">
                <p>Hey, I am Zain.</p>
                <p>I studied engineering at the University of Texas at San Antonio.</p>
                <p>I build simple websites for small businesses.</p>
                <p>I like tools that save time and keep things calm.</p>
              </div>
            </Card>

            {/* Find Me Card */}
            <Card className="p-6 space-y-3 hover-lift">
              <h3 className="text-xl font-bold text-foreground">Find me</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>YouTube for videos.</p>
                <p>LinkedIn for a quick hello.</p>
              </div>
            </Card>
          </div>

          {/* Right Column - Photo */}
          <div className="lg:sticky lg:top-24 animate-fade-in space-y-8">
            {/* Zain with Simba Photo */}
            <div className="relative">
              <div className="absolute inset-0 bg-accent rounded-2xl blur-2xl opacity-40" />
              <div className="relative border-4 border-accent rounded-2xl overflow-hidden shadow-2xl hover-scale">
                <img src={zainSimba} alt="Zain with Simba" className="w-full h-auto object-cover" />
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 shadow-[0_8px_0_0_rgb(153,27,27)] hover:shadow-[0_4px_0_0_rgb(153,27,27)] active:shadow-[0_0px_0_0_rgb(153,27,27)] hover:translate-y-1 active:translate-y-2 transition-all">
                <a href="https://youtube.com/@captainduaadventures?si=xPzuebAHwHZTl52V" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Youtube className="h-5 w-5" />
                  YouTube Channel
                </a>
              </Button>
              <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600 text-white shadow-[0_8px_0_0_rgb(37,99,235)] hover:shadow-[0_4px_0_0_rgb(37,99,235)] active:shadow-[0_0px_0_0_rgb(37,99,235)] hover:translate-y-1 active:translate-y-2 transition-all">
                <a href="https://linkedin.com/in/zainadtani" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Linkedin className="h-5 w-5" />
                  Connect on LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Get In Touch Section */}
        <div className="max-w-5xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-foreground mb-2">Get In Touch</h2>
          <p className="text-muted-foreground mb-8">
            Have a question or want to work together? Reach out below.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6 flex flex-col items-center gap-3 text-center">
              <Mail className="h-8 w-8 text-primary" />
              <h3 className="font-display font-semibold text-foreground">Email</h3>
              <a
                href="mailto:zain@zainadtani.com"
                className="text-primary hover:underline text-sm"
              >
                zain@zainadtani.com
              </a>
            </Card>

            <Card className="p-6 flex flex-col items-center gap-3 text-center">
              <Linkedin className="h-8 w-8 text-primary" />
              <h3 className="font-display font-semibold text-foreground">LinkedIn</h3>
              <Button asChild variant="outline" size="sm">
                <a
                  href="https://www.linkedin.com/in/zainadtani/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect
                </a>
              </Button>
            </Card>

            <Card className="p-6 flex flex-col items-center gap-3 text-center">
              <Youtube className="h-8 w-8 text-primary" />
              <h3 className="font-display font-semibold text-foreground">YouTube</h3>
              <Button asChild variant="outline" size="sm">
                <a
                  href="https://youtube.com/@captainduaadventures?si=xPzuebAHwHZTl52V"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Subscribe
                </a>
              </Button>
            </Card>

            <Card className="p-6 flex flex-col items-center gap-3 text-center">
              <Calendar className="h-8 w-8 text-primary" />
              <h3 className="font-display font-semibold text-foreground">Book a Call</h3>
              <Button variant="outline" size="sm" disabled>
                Coming Soon
              </Button>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Zain Education Ventures. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
