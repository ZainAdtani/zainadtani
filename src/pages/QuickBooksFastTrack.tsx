import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

type Module = {
  title: string;
  lessons: string[];
};

type ResourceLink = {
  label: string;
  href: string; // replace with real PDF links later
};

const modules: Module[] = [
  {
    title: "MODULE 1: Introduction to Core Bookkeeping Skills",
    lessons: [
      "Lesson 1: Introduction to Bookkeeping — 15 minutes",
      "Lesson 2: Introduction to Matching",
      "Lesson 3: Introduction to Reconciling",
      "Lesson 4: Introduction to Reports",
      "Lesson 5: Introduction to the Accounting Cycle",
    ],
  },
  {
    title: "MODULE 2: Mastering the Foundations: Expenses",
    lessons: [
      "Lesson 1: Introduction to Operating Expenses",
      "Lesson 2: Sole Proprietor Expenses, Part 1",
      "Lesson 3: Sole Proprietor Expenses, Part 2",
      "Lesson 4: Partnership Expenses",
      "Lesson 5: S-Corps, C-Corps & LLCs",
      "Lesson 6: Cost of Goods Sold",
      "Lesson 7: Introduction to Inventory",
      "Lesson 8: Communication: Questions & Issues",
    ],
  },
  {
    title: "MODULE 3: Mastering the Foundations: Income",
    lessons: [
      "Lesson 1: Introduction to Tracking Income",
      "Lesson 2: Products & Services",
      "Lesson 3: Undeposited Funds",
      "Lesson 4: Other Payment Types",
      "Lesson 5: Deposits",
    ],
  },
  {
    title: "MODULE 4: Mastering the Foundations: Double Entry Accounting",
    lessons: [
      "Lesson 1: Introduction to Double Entry Accounting",
      "Lesson 2: Natural Balances",
      "Lesson 3: Moving Money",
    ],
  },
  {
    title: "MODULE 5: Building on the Basics: Accrual Accounting",
    lessons: [
      "Lesson 1: Introduction to Accrual Accounting",
      "Lesson 2: Accounts Payable",
      "Lesson 3: Accounts Receivable, Part 1",
      "Lesson 4: Accounts Receivable, Part 2",
    ],
  },
  {
    title: "MODULE 6: Building on the Basics: Assets",
    lessons: [
      "Checkpoint: What We’ve Learned So Far",
      "Lesson 1: Bank Accounts",
      "Lesson 2: Other Current Assets - Inventory",
      "Lesson 3: Other Current Assets - Prepaid Expenses",
      "Lesson 4: Introduction to Journal Entries",
      "Lesson 5: Fixed Assets - Buying",
      "Lesson 6: Fixed Assets - Depreciation",
      "Lesson 7: Fixed Assets - Selling",
    ],
  },
  {
    title: "MODULE 7: Building on the Basics: Liabilities",
    lessons: [
      "Lesson 1: Credit Cards",
      "Lesson 2: Corporate Credit Cards",
      "Lesson 3: Other Current Liabilities - Basic Sales Tax",
      "Lesson 4: Other Current Liabilities - Advanced Sales Tax",
      "Lesson 5: Other Current Liabilities - Payroll Considerations",
      "Lesson 6: Other Current Liabilities - Payroll Accounts",
      "Lesson 7: Other Current Liabilities - Payroll Step 1, Part 1",
      "Lesson 8: Other Current Liabilities - Payroll, Step 1, Part 2",
      "Lesson 9: Other Current Liabilities - Payroll, Step 2",
      "Lesson 10: Other Current Liabilities - Unearned Income",
      "Lesson 11: Loans",
    ],
  },
  {
    title: "MODULE 8: Building on the Basics: Equity",
    lessons: [
      "Lesson 1: Introduction to Equity",
      "Lesson 2: Sole Proprietor Equity, Contributions",
      "Lesson 3: Sole Proprietor Equity, Draws",
      "Lesson 4: Partnership Equity",
      "Lesson 5: Corporation Equity",
      "Lesson 6: LLC Equity",
      "Lesson 7: Net Income & Retained Earnings",
      "Lesson 8: Understanding Basis",
      "Lesson 9: Opening Balance Equity",
    ],
  },
  {
    title: "MODULE 9: Wrapping Up: Review and Resolution",
    lessons: [
      "Lesson 1: Ongoing Tasks",
      "Lesson 2: Month End Tasks",
      "Lesson 3: Year End Tasks, Workers",
      "Lesson 4: Year End Tasks, Prep for Taxes",
      "Lesson 5: Year End Tasks, After Taxes",
      "Lesson 6: Becoming the CPA's Best Friend",
    ],
  },
  {
    title: "MODULE 10: Wrapping Up: Financial Conversations",
    lessons: [
      "Lesson 1: The Conversation Your Clients are Starving For",
      "Lesson 2: A Simple Dashboard",
      "Lesson 3: The Initial Conversation",
      "Lesson 4: Building the Dashboard, Part 1",
      "Lesson 5: Building the Dashboard, Part 2",
      "Lesson 6: Numbers in Context",
      "Lesson 7: Statement of Cash Flows",
      "Lesson 8: Going Deeper",
    ],
  },
  {
    title: "MODULE 11: Final Thoughts: Ethical Considerations",
    lessons: [
      "Lesson 1: Introduction & Honesty",
      "Lesson 2: Objectivity",
      "Lesson 3: Professionalism",
      "Lesson 4: Confidentiality & Conclusion",
    ],
  },
  {
    title: "FAST TRACK PLUS BONUS: Pass the Intuit Bookkeeper Exam",
    lessons: [
      "Welcome!",
      "Lesson 1: What to Expect",
      "Lesson 2: Accounting Equation Review",
      "Lesson 3: Cash vs. Accrual Review",
      "Lesson 4: GAAP Terminology Review",
      "Lesson 5: Accounting Cycle Review",
      "Lesson 6: Reconciliation Errors",
      "Lesson 7: Adjustments",
      "Lesson 8: Money Movement Review",
      "Lesson 9: Analysis and Advisory Review",
      "Lesson 10: Ethics Review",
    ],
  },
];

const templates: ResourceLink[] = [
  { label: "Client Intake Checklist", href: "#" },
  { label: "Month-End Close Checklist", href: "#" },
  { label: "Year-End Prep Checklist", href: "#" },
  { label: "Chart of Accounts Starter", href: "#" },
  { label: "Bank Reconciliation Worksheet", href: "#" },
  { label: "Expense Documentation Policy", href: "#" },
];

export default function QuickBooksFastTrack() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Helmet>
        <title>Bookkeeping Fast Track™ — Elite Bookkeeper Training</title>
        <meta name="description" content="Designed with CPAs so you learn what actually matters." />
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
          <span className="text-foreground">Fast Track</span>
        </nav>

        {/* Hero */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">Bookkeeping Fast Track™</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Designed with CPAs so you learn what actually matters.
          </p>
        </header>

        {/* Program Promise */}
        <section className="max-w-4xl mx-auto">
          <Card className="rounded-2xl border bg-card/90 shadow-sm">
            <CardContent className="p-6 md:p-8">
              <p className="text-lg leading-relaxed">
                The <strong>Bookkeeping Fast Track™</strong> is a comprehensive transformation program that takes you
                beyond basic QuickBooks into the principles CPAs actually care about. You'll learn the <em>why</em>{" "}
                behind the work, practice with real scenarios, and master how to present clean, review-ready books—so
                CPAs trust you, clients rely on you, and premium rates make sense.
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
                  Teaches exactly what CPAs need from bookkeepers—built alongside former Big 4 and Enrolled Agents.
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
                  Master the <em>why</em>, not just the clicks—understand the principles behind every transaction.
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
                  Hands-on scenarios and practice—not theory—so you're ready for anything clients throw at you.
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
                  Present work like a partner, not a vendor—communicate with confidence and professionalism.
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

            {/* Templates & Checklists */}
            <Card className="rounded-2xl border bg-card/90 shadow-sm">
              <CardHeader>
                <CardTitle>Templates & Checklists</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {templates.map((r, i) => (
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
          </div>
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
