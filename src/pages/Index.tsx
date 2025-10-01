import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Calculator, FileText, Mail, Youtube } from "lucide-react";
import headshotImage from "@/assets/zain-headshot.png";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[hsl(var(--hero-bg))] text-[hsl(var(--hero-foreground))] py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="mb-6 text-sm tracking-widest text-muted-foreground uppercase">
            Zain Adtani
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Engineer → Enrolled Agent.
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-[hsl(var(--hero-foreground))]/80 max-w-2xl mx-auto">
            I teach busy beginners how to pass the EA exam and get confident with taxes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
              Join Free Newsletter
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-2 border-[hsl(var(--hero-foreground))]/20 text-[hsl(var(--hero-foreground))] hover:bg-[hsl(var(--hero-foreground))]/10"
            >
              Start EA Part 1
            </Button>
          </div>
          <div className="text-sm text-[hsl(var(--hero-foreground))]/60">
            As seen on <span className="font-semibold">YouTube</span> • <span className="font-semibold">WHOP</span> • <span className="font-semibold">Udemy</span> (coming)
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <Mail className="w-12 h-12 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Study Notes In Your Inbox
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Short, friendly emails with EA tips, mnemonics, and weekly wins.
          </p>
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
          <p className="text-sm text-muted-foreground mt-4">
            No spam. Ever.
          </p>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <div className="text-sm tracking-widest text-muted-foreground uppercase mb-2">
              Resources
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join The New 1%
            </h2>
            <p className="text-lg text-muted-foreground">
              Become future-proof with these tools
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-8">
                <Calculator className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3">EA Part 1 Course</h3>
                <p className="text-muted-foreground mb-6">
                  Everything you need to pass Individuals — explained like you're new. Video + audio + cheatsheets.
                </p>
                <Button className="w-full">View Course</Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-8">
                <FileText className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-xl font-bold mb-3">QuickBooks Fast Track</h3>
                <p className="text-muted-foreground mb-6">
                  The essentials to clean books and look professional. Templates included.
                </p>
                <Button className="w-full" variant="outline">Explore</Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-8">
                <BookOpen className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3">Book: Engineer to EA</h3>
                <p className="text-muted-foreground mb-6">
                  My journey from mechanical engineering to Enrolled Agent. Join the waitlist for early chapters.
                </p>
                <Button className="w-full" variant="outline">Get Updates</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-shrink-0">
              <img 
                src={headshotImage} 
                alt="Zain Adtani - Enrolled Agent" 
                className="w-48 h-48 rounded-full object-cover border-4 border-primary"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About Z</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm Z — EA, bookkeeper, and author-in-progress. I help newcomers pass the EA exam with simple explanations and study systems. A teacher at heart, I simplify tax so beginners can pass, get clients, and feel confident.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-primary/5 border-l-4 border-primary">
              <CardContent className="p-8">
                <p className="text-lg italic">
                  "Be the authentic or best. Alas for lack now dead or old — J.C. Watling, Henry Potter and Ali."
                </p>
              </CardContent>
            </Card>
            <Card className="bg-accent/5 border-l-4 border-accent">
              <CardContent className="p-8">
                <p className="text-lg italic">
                  "Instead of hoping for gold, we'll search, instead of saving a life, build a nest about seeking healer. It's about creating systems that work harder than you." — AJ
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Latest Posts</h2>
          <div className="space-y-4">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    How to Master EA Part 1: A Beginner's Roadmap
                  </h3>
                  <p className="text-sm text-muted-foreground">January 15, 2025</p>
                </div>
                <Button variant="ghost">Read →</Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    5 Mnemonics That Saved My EA Exam
                  </h3>
                  <p className="text-sm text-muted-foreground">January 8, 2025</p>
                </div>
                <Button variant="ghost">Read →</Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    From Engineer to Tax Pro: My Story
                  </h3>
                  <p className="text-sm text-muted-foreground">January 1, 2025</p>
                </div>
                <Button variant="ghost">Read →</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[hsl(var(--hero-bg))] text-[hsl(var(--hero-foreground))] py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a 
              href="#" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Youtube className="w-5 h-5" />
              YouTube
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <FileText className="w-5 h-5" />
              WHOP
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              Udemy
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
              Email
            </a>
          </div>
          <div className="text-center text-sm text-[hsl(var(--hero-foreground))]/60">
            © {new Date().getFullYear()} Zain Adtani. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
