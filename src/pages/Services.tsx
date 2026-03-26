import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function Services() {
  const services = [
    {
      id: "launch-website",
      title: "Launch Your Website",
      tagline: "Go from zero to a polished, professional site — no coding required.",
      bullets: [
        "Quick discovery call to map your vision and pages",
        "Custom build on Lovable with a mobile-first, brand-matched design",
        "Hands-on walkthrough so you can update it yourself with confidence",
      ],
      buttonText: "Get started",
      buttonLink: "https://calendly.com/zkadtani/job",
    },
    {
      id: "sat-prep",
      title: "SAT Prep & Academic Mentoring",
      tagline: "Build confidence, sharpen skills, and crush your target score.",
      bullets: [
        "Personalized study plan based on practice test diagnostics",
        "One-on-one sessions covering math, reading, and test strategy",
        "Ongoing mentoring for focus, time management, and college readiness",
      ],
      buttonText: "Book a session",
      buttonLink: "https://calendly.com/zkadtani/job",
    },
    {
      id: "book-publishing",
      title: "Book Writing & Publishing",
      tagline: "Turn your idea into a published book — Kindle, paperback, and audiobook.",
      bullets: [
        "Clarify your concept, audience, and unique angle",
        "Structured writing plan with milestones that fit your schedule",
        "End-to-end guidance on self-publishing for print, ebook, and audio",
      ],
      buttonText: "Start your book",
      buttonLink: "https://calendly.com/zkadtani/job",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Helmet>
        <title>Services | Zain Adtani</title>
        <meta
          name="description"
          content="Website builds, SAT prep, and book publishing help — simple, premium services."
        />
      </Helmet>

      <div className="container max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Hero */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">Services</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Premium help with websites, test prep, and publishing.
          </p>
        </header>

        {/* Service Cards Grid */}
        <section className="grid md:grid-cols-3 gap-6">
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
