import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function QuickBooks() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Helmet>
        <title>QuickBooks HQ — Elite Bookkeeping Training</title>
        <meta
          name="description"
          content="Two elite training paths—learn fast, deliver cleaner, charge premium."
        />
      </Helmet>

      <div className="container max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Breadcrumbs */}
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">QuickBooks</span>
        </nav>

        {/* Hero */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">QuickBooks HQ</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Two elite training paths—learn fast, deliver cleaner, charge premium.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="gap-2">
              <Link to="/quickbooks/fast-track">
                Explore Fast Track
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link to="/quickbooks/cleanup">
                Explore QBO Cleanup
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </header>

        {/* Section A: Bookkeeping Fast Track */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Image placeholder */}
          <div className="order-2 md:order-1">
            <div className="rounded-2xl border bg-muted/30 aspect-[4/3] flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Course preview placeholder</p>
            </div>
          </div>

          {/* Right: Content */}
          <Card className="order-1 md:order-2 rounded-2xl border bg-card/90 shadow-sm">
            <CardContent className="p-6 md:p-8 space-y-4">
              <h2 className="text-3xl font-bold">Introducing: The Bookkeeping Fast Track™</h2>
              <p className="text-muted-foreground">
                The first program designed with CPAs to create elite-level bookkeepers.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Built alongside active CPAs (including former Big 4 + EAs)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Learn the why behind each entry—not just which buttons to click</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Real-world practice on scenarios CPAs actually care about</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>CPA communication framework to present work like a pro</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Become a trusted partner who commands premium rates</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button asChild className="gap-2">
                  <Link to="/quickbooks/fast-track">
                    View Fast Track
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link to="/quickbooks/fast-track">Learn more</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section B: Fast & Easy QBO Cleanup */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Content */}
          <Card className="rounded-2xl border bg-card/90 shadow-sm">
            <CardContent className="p-6 md:p-8 space-y-4">
              <h2 className="text-3xl font-bold">Fast & Easy QBO Cleanup</h2>
              <p className="text-muted-foreground">
                The complete system for turning financial messes into $5,000+ paydays—without more hours.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Step-by-step cleanup workflows and comprehensive checklists</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Hands-on: complete a real cleanup project inside the course</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Premium pricing scripts that feel natural</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Time-saving techniques from an ex-Intuit specialist</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>White-glove client experience templates that win referrals</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button asChild className="gap-2">
                  <Link to="/quickbooks/cleanup">
                    View Cleanup Course
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link to="/quickbooks/cleanup">Learn more</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right: Image placeholder */}
          <div>
            <div className="rounded-2xl border bg-muted/30 aspect-[4/3] flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Course preview placeholder</p>
            </div>
          </div>
        </section>

        {/* Bottom persistent CTA bar */}
        <div className="sticky bottom-0 bg-card/95 backdrop-blur-sm border-t rounded-t-2xl p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            <p className="text-lg font-medium text-center sm:text-left">
              Ready to choose your path?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button asChild className="gap-2">
                <Link to="/quickbooks/fast-track">
                  Go to Fast Track
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <Link to="/quickbooks/cleanup">
                  Go to Cleanup
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
