import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Code, Sparkles, Rocket } from "lucide-react";

export default function WebsiteLab() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Website Starter Lab | Zain Adtani</title>
        <meta name="description" content="Simple site templates and case studies for small business owners who want a clean site that fits their story." />
      </Helmet>

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Code className="h-8 w-8 text-primary" />
            <Sparkles className="h-6 w-6 text-accent" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            Website Starter Lab
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple site templates and case studies for small business owners who want a clean site that fits their story.
          </p>
        </header>

        {/* Coming Soon */}
        <Card className="p-12 text-center rounded-2xl border-border bg-gradient-to-br from-primary/5 to-accent/5">
          <Rocket className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-lg mx-auto">
            I'm building a collection of simple, effective website templates and real case studies to help small business owners create sites they're proud of.
          </p>
          <p className="text-sm text-muted-foreground">
            Check back soon or subscribe to my newsletter for updates.
          </p>
        </Card>
      </main>
    </div>
  );
}
