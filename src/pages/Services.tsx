import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/zkadtani";

export default function Services() {
  const services = [
    {
      id: "ai-websites",
      title: "Done-For-You AI Websites",
      subtitle: "Your business deserves a real website.",
      body: "I build fast, modern websites for small businesses using the latest AI tools. From first call to live site in days, not months.",
      bullets: [
        "Discovery call to map your pages and goals",
        "Custom-built, mobile-first design",
        "Walkthrough so you can manage it yourself",
      ],
      buttonText: "Get Started →",
    },
    {
      id: "book-publishing",
      title: "Book Writing & Publishing",
      subtitle: "Your story deserves to be published.",
      body: "I help everyday people write, format, and publish their book on Amazon. Kindle, paperback, and PDF. You bring the idea. I help you finish it.",
      bullets: [
        "Clarify your concept, audience, and angle",
        "Writing plan with milestones that fit your schedule",
        "End-to-end guidance on self-publishing",
      ],
      buttonText: "Start Your Book →",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Helmet>
        <title>Services | Zain Adtani</title>
        <meta
          name="description"
          content="AI websites and book publishing help — real work, real results."
        />
      </Helmet>

      <div className="container max-w-5xl mx-auto px-4 py-12 space-y-16">
        {/* Hero */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">Services</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Real work. Real results.
          </p>
        </header>

        {/* Service Cards Grid */}
        <section className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className="p-8 rounded-2xl border hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col h-full"
            >
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{service.title}</h2>
                  <p className="text-sm font-medium text-primary">{service.subtitle}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.body}</p>
                <ul className="space-y-2 text-sm">
                  {service.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6">
                <Button asChild className="w-full gap-2" aria-label={service.buttonText}>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
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
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
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
