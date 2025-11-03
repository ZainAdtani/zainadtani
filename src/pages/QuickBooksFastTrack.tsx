import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function QuickBooksFastTrack() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Helmet>
        <title>Bookkeeping Fast Track™ — Elite Bookkeeper Training</title>
        <meta
          name="description"
          content="Designed with CPAs so you learn what actually matters."
        />
      </Helmet>

      <div className="container max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Hero */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            Bookkeeping Fast Track™
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Designed with CPAs so you learn what actually matters.
          </p>
        </header>

        {/* Program Promise */}
        <section className="max-w-4xl mx-auto">
          <Card className="rounded-2xl border bg-card/90 shadow-sm">
            <CardContent className="p-6 md:p-8">
              <p className="text-lg leading-relaxed">
                The <strong>Bookkeeping Fast Track™</strong> is a comprehensive transformation
                program that takes you beyond basic QuickBooks into the principles CPAs actually
                care about. You'll learn the <em>why</em> behind the work, practice with real
                scenarios, and master how to present clean, review-ready books—so CPAs trust you,
                clients rely on you, and premium rates make sense.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Why It's Different */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Why It's Different</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="rounded-2xl border bg-card/90 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <span>Developed with Active CPAs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Teaches exactly what CPAs need from bookkeepers—built alongside former Big 4 and
                  Enrolled Agents.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border bg-card/90 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <span>Beyond Surface-Level Training</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Master the <em>why</em>, not just the clicks—understand the principles behind
                  every transaction.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border bg-card/90 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <span>Real-World Application</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Hands-on scenarios and practice—not theory—so you're ready for anything clients
                  throw at you.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border bg-card/90 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <span>CPA Communication Framework</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Present work like a partner, not a vendor—communicate with confidence and
                  professionalism.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* You'll Become Someone Who... */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">You'll Become Someone Who…</h2>
          <Card className="rounded-2xl border bg-card/90 shadow-sm max-w-4xl mx-auto">
            <CardContent className="p-6 md:p-8">
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Understands the deep "why" behind every transaction</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Knows what CPAs look for when reviewing your work</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Handles complex scenarios with confidence</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Becomes a trusted partner to clients and CPAs</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Commands premium rates</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* What's Inside */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">What's Inside</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Modules Placeholder */}
            <Card className="rounded-2xl border bg-card/90 shadow-sm">
              <CardHeader>
                <CardTitle>Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-muted/30 aspect-video flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Module outline coming soon</p>
                </div>
              </CardContent>
            </Card>

            {/* Downloadables Placeholder */}
            <Card className="rounded-2xl border bg-card/90 shadow-sm">
              <CardHeader>
                <CardTitle>Templates & Checklists</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-muted/30 aspect-video flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Resources coming soon</p>
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
              <h2 className="text-3xl font-bold">Ready to Elevate Your Bookkeeping Career?</h2>
              <p className="text-lg text-muted-foreground">
                Join the Fast Track and become the bookkeeper CPAs trust and clients value.
              </p>
              <Button size="lg" className="gap-2" aria-label="Get Started with Fast Track">
                Get Started with Fast Track
                <ArrowRight className="h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
