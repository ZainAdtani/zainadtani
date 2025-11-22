import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function Services() {
  const services = [
    {
      id: "lovable-site-build",
      title: "Lovable Site Build",
      tagline: "Get a clean, fast site built on Lovable from start to finish.",
      bullets: [
        "One short call to map your goals and pages",
        "Build or refresh your site in Lovable with mobile friendly layouts",
        "Quick walkthrough so you feel safe making edits on your own",
      ],
      buttonText: "Request a Lovable site build",
      buttonLink: "https://calendly.com/zkadtani/job",
    },
    {
      id: "tax-review",
      title: "Tax Review and Savings Plan",
      tagline: "Simple one on one tax help to lower stress and spot savings.",
      bullets: [
        "Review of your recent return and current year situation",
        "Clear list of credits, deductions, and red flags to watch",
        "Action plan you follow or bring to your tax pro",
      ],
      buttonText: "Book a tax review",
      buttonLink: "https://calendly.com/zkadtani/job",
    },
    {
      id: "quickbooks-cleanup",
      title: "QuickBooks Cleanup and Care",
      tagline: "Turn messy QuickBooks files into clean reports clients trust.",
      bullets: [
        "One time cleanup of your current QuickBooks Online books",
        "Fix chart of accounts, bank rules, and starting balances",
        "Option for a simple monthly check in to keep things clean",
      ],
      buttonText: "Ask about QuickBooks cleanup",
      buttonLink: "https://calendly.com/zkadtani/job",
    },
    {
      id: "book-writing",
      title: "Book Writing and Publishing Help",
      tagline: "Help to plan, write, and publish your first book.",
      bullets: [
        "Clarify your book idea and audience",
        "Build a simple outline and writing schedule that fits real life",
        "Guidance on self publishing steps for print, ebook, and audio",
      ],
      buttonText: "Start my book plan",
      buttonLink: "https://calendly.com/zkadtani/job",
    },
    {
      id: "mentoring-tutoring",
      title: "Mentoring and Math Tutoring",
      tagline: "Support for study, career choices, and math courses.",
      bullets: [
        "One on one mentoring for goals, focus, and study habits",
        "Tutoring for algebra, pre calculus, and calculus",
        "Homework help and exam prep with calm, clear steps",
      ],
      buttonText: "Ask about mentoring and tutoring",
      buttonLink: "https://calendly.com/zkadtani/job",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Helmet>
        <title>Services | Zain Adtani</title>
        <meta
          name="description"
          content="Ways I help you with taxes, QuickBooks, writing, and study."
        />
      </Helmet>

      <div className="container max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Hero */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">Services</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Ways I help you with taxes, QuickBooks, writing, and study.
          </p>
        </header>

        {/* Service Cards Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.id}
              className="p-6 rounded-2xl border hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col h-full"
            >
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                  <p className="text-sm text-muted-foreground">{service.tagline}</p>
                </div>
                <ul className="space-y-2 text-sm">
                  {service.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4">
                <Button asChild className="w-full gap-2" aria-label={service.buttonText}>
                  <a href={service.buttonLink} target="_blank" rel="noopener noreferrer">
                    {service.buttonText}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </section>

        {/* Bottom CTA Section */}
        <section className="bg-card/95 backdrop-blur-sm border rounded-2xl p-8 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold mb-2">Not sure which service fits?</h2>
              <p className="text-muted-foreground">Book a short call and we will sort it out together.</p>
            </div>
            <Button asChild size="lg" className="gap-2 shrink-0">
              <a href="https://calendly.com/zkadtani/job" target="_blank" rel="noopener noreferrer">
                Schedule a call
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
