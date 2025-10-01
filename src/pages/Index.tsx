import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import headshotImage from "@/assets/zain-headshot.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="flex-shrink-0">
              <img 
                src={headshotImage} 
                alt="Zain Adtani - Enrolled Agent" 
                className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-primary shadow-2xl"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Engineer → Enrolled Agent.
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
                I teach busy beginners how to pass the EA exam and get confident with taxes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" className="text-lg px-8 py-6">
                  Join Free Newsletter
                </Button>
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  Start EA Part 1
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <Mail className="w-12 h-12 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Subscribe to Study Notes
            </h2>
            <p className="text-lg text-muted-foreground">
              Each week, I share actionable EA tips, mnemonics, and study wins directly to your inbox. It's free to join, and always will be.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 h-12 text-base"
            />
            <Button type="submit" size="lg" className="h-12 px-8">
              Subscribe
            </Button>
          </form>
          <p className="text-sm text-center text-muted-foreground mt-4">
            No spam. Ever.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Z</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            I'm Z — EA, bookkeeper, and author-in-progress. I help newcomers pass the EA exam with simple explanations and study systems. A teacher at heart, I simplify tax so beginners can pass, get clients, and feel confident.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Zain Adtani. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
