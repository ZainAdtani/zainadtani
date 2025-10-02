import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, PiggyBank, LineChart, BookOpen, Target } from "lucide-react";

const Investing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Investing
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Building wealth through smart investment strategies and financial education
            </p>
          </div>
        </div>
      </section>

      {/* Investment Philosophy */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                My Investment <span className="text-primary">Philosophy</span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Investing isn't just about making money—it's about building financial freedom and creating opportunities for yourself and those you care about.
                </p>
                <p>
                  I believe in a balanced approach that combines long-term wealth building with calculated risks, always focusing on continuous learning and adaptation.
                </p>
                <p>
                  Whether it's stocks, real estate, or building businesses, the key is understanding the fundamentals and staying disciplined.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 text-center hover-lift transition-all duration-300">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-2xl mb-2">Long-Term</h3>
                <p className="text-muted-foreground">Focus on sustainable growth</p>
              </Card>
              
              <Card className="p-6 text-center hover-lift transition-all duration-300">
                <Target className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-bold text-2xl mb-2">Strategic</h3>
                <p className="text-muted-foreground">Data-driven decisions</p>
              </Card>
              
              <Card className="p-6 text-center hover-lift transition-all duration-300">
                <PiggyBank className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-2xl mb-2">Diversified</h3>
                <p className="text-muted-foreground">Spread risk wisely</p>
              </Card>
              
              <Card className="p-6 text-center hover-lift transition-all duration-300">
                <BookOpen className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-bold text-2xl mb-2">Educated</h3>
                <p className="text-muted-foreground">Always learning</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Areas */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Where I <span className="text-primary">Invest</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover-lift transition-all duration-300 border-2">
              <DollarSign className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Stock Market</h3>
              <p className="text-muted-foreground leading-relaxed">
                Index funds, dividend stocks, and growth opportunities. Building a diversified portfolio for long-term wealth creation.
              </p>
            </Card>
            
            <Card className="p-8 hover-lift transition-all duration-300 border-2">
              <LineChart className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-4">Business Ventures</h3>
              <p className="text-muted-foreground leading-relaxed">
                Creating and investing in businesses that solve real problems. From digital products to service-based companies.
              </p>
            </Card>
            
            <Card className="p-8 hover-lift transition-all duration-300 border-2">
              <TrendingUp className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Real Estate</h3>
              <p className="text-muted-foreground leading-relaxed">
                Property investments for passive income and long-term appreciation. Building a real estate portfolio strategically.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-8 md:p-12 text-center">
            <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Investment Resources
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Coming soon: My curated list of books, courses, and tools that have helped shape my investment journey. 
              Stay tuned for detailed guides, strategies, and insights.
            </p>
            <div className="inline-block px-8 py-3 bg-accent/20 text-accent font-bold rounded-lg">
              COMING SOON
            </div>
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

export default Investing;
