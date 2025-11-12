import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

type Module = {
  title: string;
  notes?: string[];
  lessons: string[];
};

type ResourceLink = {
  label: string;
  href: string;
};

type PriceTier = {
  name: string;
  scopeHint: string;
  price: string;
  includes: string[];
};

const modules: Module[] = [
  {
    title: "Module 1: Diagnostic Review",
    notes: ["Download the QuickNotes", "The QuickNotes are the key to your success!"],
    lessons: [
      "Introduction to the Diagnostic Review",
      "Lesson 1: Review & Proposal Checklist",
      "Lesson 2: Overview & Company Setup",
      "Lesson 3: Banking Activity",
      "Lesson 4: Common Issues",
      "Lesson 5: Profit & Loss",
      "Lesson 6: Balance Sheet",
      "Lesson 7: Accounts Receivable & Payable",
      "Lesson 8: Additional Items",
      "Lesson 9: Additional Items, Part 2",
      "Lesson 10: Preparing the Proposal",
    ],
  },
  {
    title: "Module 2: Setup",
    notes: ["Download the QuickNotes"],
    lessons: [
      "Lesson 1: Client Onboarding",
      "Lesson 2: Getting Started",
      "Lesson 3: Client Requests",
      "Lesson 4: Company Settings",
      "Lesson 5: Ending Balances — Schedule L",
      "Lesson 6: Starting Balances — Source Documents",
      "Lesson 7: Disconnected Bank Feeds — Connecting the Bank Feed",
      "Lesson 8: Disconnected Bank Feeds — Importing Bank Data",
      "Lesson 9: Adding Tasks to the Cleanup Workflow",
    ],
  },
  {
    title: "Module 3: Transaction Review",
    lessons: [
      "Lesson 1: Bank Feed Settings and Old Transactions",
      "Lesson 2: Managing the Bank Feed — Money In",
      "Lesson 3: Managing the Bank Feed — Money Out",
      "Lesson 4: Managing the Bank Rules",
      "Lesson 5: Uncategorized Transactions",
      "Lesson 6: Transactions without Payees",
      "Lesson 7: Undeposited Funds",
      "Lesson 8: Additional Items",
    ],
  },
  {
    title: "Module 4: Final Review",
    lessons: [
      "Lesson 1: Accounts Payable",
      "Lesson 2: Accounts Receivable",
      "Lesson 3: Accounts without Activity and the Chart of Accounts",
      "Lesson 4: Customer List",
      "Lesson 5: Vendor List",
      "Lesson 6: Record Assets",
    ],
  },
  {
    title: "Module 5: Account Reconciliation",
    lessons: [
      "Lesson 1: Account Reconciliation",
      "Lesson 2: Equity Accounts",
      "Lesson 3: Liability Accounts",
      "Lesson 4: Asset Accounts",
    ],
  },
  {
    title: "Module 6: Other Common Issues",
    lessons: [
      "Lesson 1: Products & Services List",
      "Lesson 2: Sales Tax & Sales Tax Liabilities",
      "Lesson 3: Payroll & Payroll Liabilities",
      "Lesson 4: Custom Fields, Tags & Users",
    ],
  },
  {
    title: "Module 7: Wrap-up",
    lessons: [
      "Lesson 1: Review Profit & Loss",
      "Lesson 2: Review Balance Sheet",
      "Lesson 3: Wrap-Up",
      "Lesson 4: Connecting with the Client",
    ],
  },
  {
    title: "Module 8: Final Project",
    lessons: [
      "Introduction to the Final Project",
      "Setting Up your Training Company",
      "The Diagnostic Review",
      "Check Your Work, Part 1",
      "The Cleanup",
      "Check Your Work, Part 2",
      "Congratulations!",
    ],
  },
  {
    title: "Module 9: Monthly Bookkeeping",
    lessons: [
      "Lesson 1: Collecting Source Documents",
      "Lesson 2: Transaction Review",
      "Lesson 3: Account Reconciliation",
      "Lesson 4: Final Review",
    ],
  },
];

const resources: ResourceLink[] = [
  { label: "Download QuickNotes (PDF)", href: "#" },
  { label: "Review & Proposal Checklist (PDF)", href: "#" },
  { label: "Client Onboarding Packet (PDF)", href: "#" },
  { label: "Cleanup Workflow Template (PDF)", href: "#" },
  { label: "Pricing Calculator Sheet (PDF)", href: "#" },
  { label: "Email Scripts & Client Comms (PDF)", href: "#" },
];

const pricing: PriceTier[] = [
  {
    name: "Starter Cleanup",
    scopeHint: "1–2 accounts, ≤ 3 months backlog",
    price: "$1,500–$2,500",
    includes: [
      "Diagnostic Review & proposal",
      "Bank feed setup",
      "Reconcile up to 3 months",
      "COA tidy and basic fixes",
    ],
  },
  {
    name: "Standard Cleanup",
    scopeHint: "2–4 accounts, 3–12 months backlog",
    price: "$3,500–$6,500",
    includes: [
      "Full Diagnostic & plan",
      "Rules, payees, and AR/AP pass",
      "Reconcile up to 12 months",
      "Reporting pack and handoff",
    ],
  },
  {
    name: "Complex Cleanup",
    scopeHint: "5+ accounts, 12–24 months, payroll or sales tax issues",
    price: "$8,000–$15,000+",
    includes: [
      "Multi-entity review",
      "Payroll and sales tax remediation",
      "JE corrections and inventory",
      "Controller-level closeout",
    ],
  },
];

export default function QuickBooksCleanup() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Helmet>
        <title>Fast & Easy QBO Cleanup — Premium Cleanup System</title>
        <meta name="description" content="Turn messy books into $5,000+ paydays—without longer hours." />
      </Helmet>

      <div className="container max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Breadcrumbs */}
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/quickbooks" className="hover:text-primary transition-colors">
            QuickBooks
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Cleanup</span>
        </nav>

        {/* Hero */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">Fast & Easy QBO Cleanup</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Turn messy books into $5,000+ paydays—without longer hours.
          </p>
        </header>

        {/* Program Promise */}
        <section className="max-w-4xl mx-auto">
          <Card className="rounded-2xl border bg-card/90 shadow-sm">
            <CardContent className="p-6 md:p-8">
              <p className="text-lg leading-relaxed">
                <strong>Fast & Easy QBO Cleanup</strong> is a comprehensive, hands-on training program that gives you
                workflows, templates, and a pricing guide to confidently sell and deliver premium cleanup services.
                You'll complete a real cleanup inside the course and walk away with a repeatable system that saves hours
                and justifies higher fees.
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
                  No guesswork, follow the checklist and deliver consistent, high-quality cleanups.
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
                  Complete a real cleanup during the course, graduate with experience.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border bg-card/90 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <span>Premium Pricing Guide</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Clear tiers and scope hints so you price with confidence.</p>
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
                <p className="text-muted-foreground">Methods refined from real engagements to work faster.</p>
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
                  Onboarding, communication, and delivery templates that win referrals.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What You'll Get */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">What You'll Get</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Modules */}
            <Card className="rounded-2xl border bg-card/90 shadow-sm">
              <CardHeader>
                <CardTitle>Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {modules.map((m, idx) => (
                    <details key={idx} className="group rounded-lg border bg-muted/30 p-4 [&_summary]:cursor-pointer">
                      <summary className="font-semibold text-foreground">{m.title}</summary>
                      {m.notes && (
                        <ul className="mt-2 list-disc pl-6 text-sm text-muted-foreground space-y-1">
                          {m.notes.map((n, i) => (
                            <li key={i}>{n}</li>
                          ))}
                        </ul>
                      )}
                      <ul className="mt-3 list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                        {m.lessons.map((l, i) => (
                          <li key={i}>{l}</li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Templates & Scripts */}
            <Card className="rounded-2xl border bg-card/90 shadow-sm">
              <CardHeader>
                <CardTitle>Templates & Scripts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {resources.map((r, i) => (
                    <Button key={i} variant="secondary" className="justify-start" asChild>
                      <Link to={r.href} target="_blank" rel="noreferrer">
                        {r.label}
                      </Link>
                    </Button>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground">PDFs will be linked here.</p>
              </CardContent>
            </Card>

            {/* Pricing Guide */}
            <Card className="rounded-2xl border bg-card/90 shadow-sm md:col-span-2">
              <CardHeader>
                <CardTitle>Pricing Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {pricing.map((t, i) => (
                    <div key={i} className="rounded-xl border bg-background/60 p-5">
                      <div className="text-lg font-semibold">{t.name}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{t.scopeHint}</div>
                      <div className="mt-3 text-2xl font-bold">{t.price}</div>
                      <ul className="mt-3 text-sm text-muted-foreground list-disc pl-5 space-y-1">
                        {t.includes.map((x, j) => (
                          <li key={j}>{x}</li>
                        ))}
                      </ul>
                      <Button className="mt-4 w-full">Use This Tier</Button>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Final price depends on scope discovered during the Diagnostic Review.
                </p>
              </CardContent>
            </Card>
          </div>
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
