import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";
import headshotImage from "@/assets/zain-headshot.png";
import communityImage from "@/assets/community-image.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
          <div className="text-2xl font-bold text-foreground">Zain Adtani</div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="https://www.skool.com/eng2ea/about" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-all duration-300">
              Free Community
            </a>
            <a href="https://whop.com/eng2ea/?a=eng2ea" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-all duration-300">
              EA Course
            </a>
            <a href="#books" className="text-foreground hover:text-primary transition-all duration-300">
              Books
            </a>
            <a href="#certifications" className="text-foreground hover:text-primary transition-all duration-300">
              Certifications
            </a>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              Join Newsletter
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-hero-bg">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Headshot with decorative background */}
            <div className="flex-shrink-0 relative">
              <div className="absolute inset-0 bg-accent/20 rounded-full scale-110 -z-10"></div>
              <img 
                src={headshotImage} 
                alt="Zain Adtani - Enrolled Agent" 
                className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover object-top border-4 border-background"
              />
            </div>
            
            {/* Hero Text */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
                Hey Friends 👋
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                I'm Zain. I'm an Engineer turned Enrolled Agent, helping busy beginners pass the EA exam and get confident with taxes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center md:text-left md:flex md:items-start md:gap-12">
            <div className="md:flex-1 mb-8 md:md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Subscribe to <br />
                <span className="inline-flex items-center gap-2">
                  Study Notes 
                  <Mail className="w-10 h-10 text-primary" />
                </span>
              </h2>
            </div>
            
            <div className="md:flex-1">
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Each week, I share actionable EA tips, practical study advice, and highlights from my favorite tax resources, directly to your inbox. It's free to join, and always will be.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 h-12 text-base bg-background transition-all duration-300 focus:ring-2 focus:ring-primary"
                />
                <Button type="submit" size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Free Community Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <a href="https://www.skool.com/eng2ea/about" target="_blank" rel="noopener noreferrer" className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img 
                  src={communityImage} 
                  alt="Join our free community" 
                  className="w-full h-64 md:h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  Join Our Free Community
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Connect with fellow EA students, get study tips, and access free resources to help you pass the exam.
                </p>
                <Button className="w-fit bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  Join Now →
                </Button>
              </div>
            </a>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="container mx-auto px-4 max-w-6xl text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Zain Adtani. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
