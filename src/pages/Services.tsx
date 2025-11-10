import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

type PricingTier = {
  id: string;
  name: string;
  price: string;
  offer: string;
  note?: string;
  cta: string;
  ctaHref: string;
  inclusions: string[];
};

const tiers: PricingTier[] = [
  {
    id: "free-starter",
    name: "Free Starter",
    price: "Free",
    offer: "30-minute website creation session",
    note: "You will provide the code during the session",
    cta: "Book Free Session",
    ctaHref: "#contact",
    inclusions: ["30-minute consultation", "Live website walkthrough", "Basic guidance and tips"],
  },
  {
    id: "one-time-build",
    name: "One-Time Build",
    price: "$5",
    offer: "Single website creation deliverable",
    cta: "Get Started",
    ctaHref: "#contact",
    inclusions: ["Complete website setup", "Responsive design", "Single revision round", "Delivery within 7 days"],
  },
  {
    id: "care-plan",
    name: "Care Plan",
    price: "$20/month",
    offer: "One hour of updates and changes each month",
    cta: "Subscribe",
    ctaHref: "#contact",
    inclusions: [
      "1 hour monthly updates",
      "Priority support",
      "Design tweaks and fixes",
      "Content updates",
      "Ongoing maintenance",
    ],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/5 to-background">
      <Helmet>
        <title>Services | Zain Adtani</title>
        <meta name="description" content="Website creation and maintenance services using Lovable" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Services</h1>
          <p className="text-lg text-muted-foreground">I build and update your Lovable site</p>
        </header>

        <section className="mb-16">
          <div className="relative mb-8">
            <h2 className="text-3xl font-bold text-center text-foreground mb-2">Pricing</h2>
            <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <Card
                key={tier.id}
                className="rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{tier.name}</h3>
                    <p className="text-3xl font-bold text-primary mt-2">{tier.price}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{tier.offer}</p>
                    {tier.note && <p className="text-xs text-muted-foreground mt-1">{tier.note}</p>}
                  </div>
                  <ul className="space-y-2">
                    {tier.inclusions.map((inclusion, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{inclusion}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full hover:scale-105 transition-transform">
                    <a href={tier.ctaHref}>{tier.cta}</a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="contact">
          <Card className="rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-1">What is Lovable?</h3>
                <p>
                  Lovable is a modern platform for building beautiful, responsive websites quickly and efficiently. All
                  services use Lovable as the foundation.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">How do I get started?</h3>
                <p>
                  Click any "Get Started" or "Book" button above to contact me. We'll discuss your needs and choose the
                  best plan for you.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Can I switch plans?</h3>
                <p>Yes, you can upgrade or change plans at any time. Just reach out and we'll make it happen.</p>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
