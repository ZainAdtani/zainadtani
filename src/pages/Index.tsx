import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Users, GraduationCap, Book, Award, ShoppingBag } from "lucide-react";
import headshotImage from "@/assets/zain-headshot.png";
import communityImage from "@/assets/community-image.png";
import Logo3D from "@/components/Logo3D";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
          <Logo3D />
          <nav className="hidden md:flex items-center gap-6">
            <a href="#digital-products" className="text-foreground hover:text-primary transition-all duration-300">
              Digital Products
            </a>
            <a href="#books" className="text-foreground hover:text-primary transition-all duration-300">
              Books
            </a>
            <a href="#certifications" className="text-foreground hover:text-primary transition-all duration-300">
              Certifications
            </a>
            <a href="#newsletter" className="scroll-smooth">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                Join Newsletter
              </Button>
            </a>
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

      {/* Main Action Buttons */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Button 1: Free Community */}
            <Card className="p-8 hover-lift cursor-pointer transition-all duration-300 hover:shadow-xl">
              <a href="https://www.skool.com/eng2ea/about" target="_blank" rel="noopener noreferrer" className="block">
                <Users className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-foreground">Engineer → Enrolled Agent</h3>
                <p className="text-muted-foreground">Free community • Short lessons. No fluff.</p>
              </a>
            </Card>

            {/* Button 2: Full Course */}
            <Card className="p-8 hover-lift cursor-pointer transition-all duration-300 hover:shadow-xl">
              <a href="https://whop.com/eng2ea/?a=eng2ea" target="_blank" rel="noopener noreferrer" className="block">
                <GraduationCap className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-foreground">Take the Full Course</h3>
                <p className="text-muted-foreground">Engineer to Enrolled Agent Part 1</p>
              </a>
            </Card>

            {/* Button 3: Books */}
            <Card className="p-8 hover-lift cursor-pointer transition-all duration-300 hover:shadow-xl">
              <a href="#books" className="block">
                <Book className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-foreground">Books I've Read</h3>
                <p className="text-muted-foreground">My Personal Reading List</p>
              </a>
            </Card>

            {/* Button 4: Certifications */}
            <Card className="p-8 hover-lift cursor-pointer transition-all duration-300 hover:shadow-xl">
              <a href="#certifications" className="block">
                <Award className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-foreground">My Certifications</h3>
                <p className="text-muted-foreground">Professional credentials & achievements</p>
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Tabbed Sections */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 max-w-6xl">
          <Tabs defaultValue="digital-products" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="digital-products" id="digital-products">Digital Products</TabsTrigger>
              <TabsTrigger value="books" id="books">Books</TabsTrigger>
              <TabsTrigger value="certifications" id="certifications">Certifications</TabsTrigger>
            </TabsList>

            {/* Digital Products Tab */}
            <TabsContent value="digital-products" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="overflow-hidden hover-lift transition-all duration-300">
                  <div className="p-8">
                    <ShoppingBag className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-3 text-foreground">Engineer to EA Part 1</h3>
                    <p className="text-muted-foreground mb-6">
                      Complete course covering all three parts of the Enrolled Agent exam. Fast-track your path from engineer to tax professional.
                    </p>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg">
                      <a href="https://whop.com/eng2ea/?a=eng2ea" target="_blank" rel="noopener noreferrer">
                        Enroll Now →
                      </a>
                    </Button>
                  </div>
                </Card>

                <Card className="overflow-hidden hover-lift transition-all duration-300">
                  <div className="p-8">
                    <Users className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-3 text-foreground">Free Community</h3>
                    <p className="text-muted-foreground mb-6">
                      Join fellow EA students, get study tips, and access free resources. No fluff, just actionable advice.
                    </p>
                    <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 transition-all duration-300">
                      <a href="https://www.skool.com/eng2ea/about" target="_blank" rel="noopener noreferrer">
                        Join Free →
                      </a>
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Books Tab */}
            <TabsContent value="books" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Atomic Habits", author: "James Clear", rating: "⭐⭐⭐⭐⭐", take: "Small changes lead to remarkable results." },
                  { title: "Deep Work", author: "Cal Newport", rating: "⭐⭐⭐⭐⭐", take: "Focus is the new superpower in our distracted world." },
                  { title: "The E-Myth Revisited", author: "Michael Gerber", rating: "⭐⭐⭐⭐", take: "Essential reading for anyone building a business." },
                  { title: "$100M Offers", author: "Alex Hormozi", rating: "⭐⭐⭐⭐⭐", take: "Create offers so good people feel stupid saying no." },
                  { title: "Tax-Free Wealth", author: "Tom Wheelwright", rating: "⭐⭐⭐⭐", take: "How to build massive wealth by reducing taxes legally." },
                  { title: "The Lean Startup", author: "Eric Ries", rating: "⭐⭐⭐⭐", take: "Build, measure, learn - the modern approach to innovation." },
                ].map((book, index) => (
                  <Card key={index} className="p-6 hover-lift transition-all duration-300">
                    <div className="aspect-[2/3] bg-accent mb-4 rounded-md flex items-center justify-center">
                      <Book className="w-16 h-16 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg mb-1 text-foreground">{book.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                    <p className="text-sm mb-2">{book.rating}</p>
                    <p className="text-sm text-muted-foreground italic">{book.take}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Certifications Tab */}
            <TabsContent value="certifications" className="space-y-6">
              <Card className="p-8 hover-lift transition-all duration-300">
                <Award className="w-16 h-16 text-primary mb-6" />
                <h3 className="text-3xl font-bold mb-4 text-foreground">Enrolled Agent (EA)</h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Federally-authorized tax practitioner with unlimited rights to represent taxpayers before the IRS.
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>✓ Passed all three parts of the Special Enrollment Examination</p>
                  <p>✓ Licensed by the U.S. Department of the Treasury</p>
                  <p>✓ Authorized to represent clients in all 50 states</p>
                </div>
              </Card>

              <Card className="p-8 hover-lift transition-all duration-300">
                <GraduationCap className="w-16 h-16 text-primary mb-6" />
                <h3 className="text-3xl font-bold mb-4 text-foreground">Engineering Background</h3>
                <p className="text-lg text-muted-foreground">
                  Leveraging analytical and problem-solving skills from engineering to simplify complex tax concepts.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-16 md:py-24 bg-background">
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
