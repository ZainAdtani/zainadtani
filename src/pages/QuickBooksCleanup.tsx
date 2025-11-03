import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function QuickBooksCleanup() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Helmet>
        <title>Fast & Easy QBO Cleanup — Premium Cleanup System</title>
        <meta
          name="description"
          content="Turn messy books into $5,000+ paydays—without longer hours."
        />
      </Helmet>

      <div className="container max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Hero */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            Fast & Easy QBO Cleanup
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Turn messy books into $5,000+ paydays—without longer hours.
          </p>
        </header>

        {/* Program Promise */}
        <section className="max-w-4xl mx-auto">
          <Card className="rounded-2xl border bg-card/90 shadow-sm">
            <CardContent className="p-6 md:p-8">
              <p className="text-lg leading-relaxed">
                <strong>Fast & Easy QBO Cleanup</strong> is a comprehensive, hands-on training
                program that gives you workflows, templates, and pricing strategies to confidently
                sell and deliver premium cleanup services. You'll complete a real cleanup inside the
                course and walk away with a repeatable system that saves hours and justifies higher
                fees.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Why It's Different */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Why It's Different</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="rounded-2xl border bg-card/90 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <span>Complete Step-by-Step Workflows</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No guesswork—follow the checklist and deliver consistent, high-quality cleanups.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border bg-card/90 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <span>Hands-On Practice</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete a real cleanup during the course—graduate with actual experience, not
                  just theory.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border bg-card/90 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <span>Premium Pricing Strategies</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Natural scripts that win approval—confidently charge what your expertise is worth.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border bg-card/90 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <span>Time-Saving Techniques</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Insider methods refined from years at Intuit—work smarter, not longer.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border bg-card/90 shadow-sm md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <span>White-Glove Client Experience</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Onboarding, communication, and delivery templates that wow clients and win
                  referrals.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What You'll Get */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">What You'll Get</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Systems Placeholder */}
            <Card className="rounded-2xl border bg-card/90 shadow-sm">
              <CardHeader>
                <CardTitle>Cleanup Systems</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-muted/30 aspect-video flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Workflows coming soon</p>
                </div>
              </CardContent>
            </Card>

            {/* Templates Placeholder */}
            <Card className="rounded-2xl border bg-card/90 shadow-sm">
              <CardHeader>
                <CardTitle>Templates & Scripts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-muted/30 aspect-video flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Resources coming soon</p>
                </div>
              </CardContent>
            </Card>

            {/* Strategies Placeholder */}
            <Card className="rounded-2xl border bg-card/90 shadow-sm md:col-span-2">
              <CardHeader>
                <CardTitle>Pricing Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-muted/30 aspect-video flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Pricing guide coming soon</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Screenshots Gallery Placeholder */}
          <Card className="rounded-2xl border bg-card/90 shadow-sm">
            <CardHeader>
              <CardTitle>Course Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-lg border bg-muted/30 aspect-video flex items-center justify-center"
                  >
                    <p className="text-muted-foreground text-sm">Screenshot {i}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Block */}
        <section className="max-w-4xl mx-auto text-center space-y-6">
          <Card className="rounded-2xl border bg-card/90 shadow-lg">
            <CardContent className="p-8 md:p-12 space-y-6">
              <h2 className="text-3xl font-bold">Ready to Master Premium Cleanups?</h2>
              <p className="text-lg text-muted-foreground">
                Turn chaos into $5,000+ projects with a proven, repeatable system.
              </p>
              <Button size="lg" className="gap-2" aria-label="Get Started with QBO Cleanup">
                Get Started with QBO Cleanup
                <ArrowRight className="h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
