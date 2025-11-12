import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import fastTrackThumb from "@/assets/bookkeeping-fast-track-thumb.png";
import cleanupThumb from "@/assets/qbo-cleanup-thumb.png";

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
            Learn QuickBooks faster, clean up smarter, and deliver work you are proud of.
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
          {/* Left: Image */}
          <div className="order-2 md:order-1">
            <img
              src={fastTrackThumb}
              alt="Bookkeeping Fast Track course thumbnail"
              className="w-full aspect-video rounded-2xl object-cover shadow-md"
            />
          </div>

          {/* Right: Content */}
          <Card className="order-1 md:order-2 rounded-2xl border bg-card/90 shadow-sm">
            <CardContent className="p-6 md:p-8 space-y-4">
              <h2 className="text-3xl font-bold">Introducing: The Bookkeeping Fast Track™</h2>
              <p className="text-muted-foreground">
                Build the skills and confidence to deliver QuickBooks work that stands out.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span>🚀</span>
                  <span>Master the core moves that make QuickBooks click.</span>
                </li>
                <li className="flex gap-2">
                  <span>🧠</span>
                  <span>Understand why each step matters so your work stays clean.</span>
                </li>
                <li className="flex gap-2">
                  <span>🧪</span>
                  <span>Practice with guided scenarios and checkpoints.</span>
                </li>
                <li className="flex gap-2">
                  <span>🧰</span>
                  <span>Use checklists and notes to move faster every week.</span>
                </li>
                <li className="flex gap-2">
                  <span>💼</span>
                  <span>Show organized books clients trust.</span>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild className="gap-2" aria-label="View Fast Track">
                  <Link to="/quickbooks/fast-track">
                    View Fast Track
                    <ArrowRight className="h-4 w-4" />
                  </Link>
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
                Turn messy books into premium projects with a proven playbook and pricing guide.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span>🧩</span>
                  <span>Step-by-step cleanup playbook from intake to handoff.</span>
                </li>
                <li className="flex gap-2">
                  <span>🧪</span>
                  <span>Complete a hands-on cleanup project inside the training.</span>
                </li>
                <li className="flex gap-2">
                  <span>💵</span>
                  <span>Pricing guide and tiers so you quote with confidence.</span>
                </li>
                <li className="flex gap-2">
                  <span>⚡</span>
                  <span>Time savers for feeds, rules, and reconciliation.</span>
                </li>
                <li className="flex gap-2">
                  <span>🤍</span>
                  <span>Client-ready templates for a smooth experience.</span>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild className="gap-2" aria-label="View Cleanup Course">
                  <Link to="/quickbooks/cleanup">
                    View Cleanup Course
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right: Image */}
          <div>
            <img
              src={cleanupThumb}
              alt="Fast and Easy QBO Cleanup course thumbnail"
              className="w-full aspect-video rounded-2xl object-cover shadow-md"
            />
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
