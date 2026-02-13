import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { BackToTop } from "@/components/BackToTop";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Shield,
  Layout,
  MousePointerClick,
  Zap,
  Smartphone,
  Send,
  MessageSquare,
  Wrench,
  ChevronDown,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import "@/styles/starter-lab.css";

const GOALS = ["New website", "Redesign", "Fix issues", "Not sure"] as const;

const WHY_POINTS = [
  {
    icon: Shield,
    title: "Trust",
    text: "People look you up before they buy. A clean site builds instant credibility.",
  },
  {
    icon: Layout,
    title: "Clarity",
    text: "One clear page beats scattered links across five platforms.",
  },
  {
    icon: MousePointerClick,
    title: "Sales",
    text: "A clear call to action turns visitors into real inquiries.",
  },
  {
    icon: Zap,
    title: "Speed",
    text: "Slow sites lose people. Fast sites keep them.",
  },
  {
    icon: Smartphone,
    title: "Mobile",
    text: "Most visits come from phones. Your site needs to look good on every screen.",
  },
];

const STEPS = [
  {
    icon: Send,
    num: "01",
    title: "Send your site and goal",
    text: "Fill out the form with your URL and what you want to improve.",
  },
  {
    icon: MessageSquare,
    num: "02",
    title: "I review and reply",
    text: "I look at your site and send you clear next steps by email.",
  },
  {
    icon: Wrench,
    num: "03",
    title: "We build or improve",
    text: "We work together to make your site something you're proud of.",
  },
];

const FAQS = [
  {
    q: "How fast do you reply?",
    a: "Usually within 24 to 48 hours. I read every submission personally.",
  },
  {
    q: "What if I don't have a website yet?",
    a: "That's perfectly fine. Select 'New website' as your goal and tell me what you need. We'll figure it out together.",
  },
  {
    q: "Do you work with small budgets?",
    a: "Yes. I focus on simple, effective sites. We can scope something that fits your budget.",
  },
  {
    q: "What do you need from me?",
    a: "Just your name, email, and a rough idea of what you want. The form takes about two minutes.",
  },
];

export default function WebsiteLab() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [goal, setGoal] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !goal || !message.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!emailValid) {
      setError("Please enter a valid email address.");
      return;
    }
    if (name.length > 100 || email.length > 255 || message.length > 2000) {
      setError("One or more fields exceed the maximum length.");
      return;
    }

    setSubmitting(true);
    const { error: dbError } = await supabase.from("leads").insert({
      name: name.trim().slice(0, 100),
      email: email.trim().slice(0, 255),
      website_url: websiteUrl.trim().slice(0, 500) || null,
      goal,
      message: message.trim().slice(0, 2000),
    });

    setSubmitting(false);
    if (dbError) {
      setError("Something went wrong. Please try again.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="starter-lab-page">
      <Helmet>
        <title>Website Starter Lab | Zain Adtani</title>
        <meta
          name="description"
          content="Simple website help for people and small businesses. Get a clean site that fits your story."
        />
      </Helmet>

      {/* Jump Nav */}
      <div className="sticky top-4 z-40 flex justify-center px-4 pt-4">
        <nav className="sl-jump-nav inline-flex items-center gap-1 px-3 py-2">
          <a href="#get-started">Get started</a>
          <a href="#why">Why it matters</a>
          <a href="#process">Process</a>
          <a href="#faq">FAQ</a>
        </nav>
      </div>

      {/* Hero */}
      <section className="sl-hero px-4 pt-20 pb-24 md:pt-28 md:pb-32 text-center relative">
        <div className="max-w-2xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-normal mb-6 leading-tight">
            Website Starter Lab
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-lg mx-auto" style={{ color: "hsl(var(--sl-green-600))" }}>
            Simple website help for people and small businesses who want a clean site that fits their story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#get-started" className="sl-btn-primary inline-block text-center">
              Get started
            </a>
            <a href="#why" className="sl-btn-secondary inline-block text-center">
              Why a website matters
            </a>
          </div>
        </div>
        <div className="mt-12 flex justify-center sl-scroll-hint">
          <ChevronDown className="w-6 h-6" style={{ color: "hsl(var(--sl-green-400))" }} />
        </div>
      </section>

      {/* Form Card */}
      <section id="get-started" className="sl-section max-w-xl mx-auto scroll-mt-20">
        <div className="sl-card p-8 md:p-10 transition-shadow duration-300">
          {submitted ? (
            <div className="sl-success p-8 text-center">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color: "hsl(var(--sl-green-500))" }} />
              <h2 className="text-2xl mb-2">Thank you!</h2>
              <p className="text-base" style={{ color: "hsl(var(--sl-green-600))" }}>
                Congratulations, we will be in contact with you.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl mb-2 text-center">Tell me about your website</h2>
              <p className="text-center text-sm mb-8" style={{ color: "hsl(var(--sl-green-400))" }}>
                All fields required unless marked optional.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="sl-name" className="block text-sm font-medium mb-1.5">Name</label>
                  <input
                    id="sl-name"
                    className="sl-input"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="sl-email" className="block text-sm font-medium mb-1.5">Email</label>
                  <input
                    id="sl-email"
                    type="email"
                    className="sl-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="sl-url" className="block text-sm font-medium mb-1.5">
                    Website URL <span className="text-xs font-normal" style={{ color: "hsl(var(--sl-green-400))" }}>(optional)</span>
                  </label>
                  <input
                    id="sl-url"
                    type="url"
                    className="sl-input"
                    placeholder="https://yoursite.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    maxLength={500}
                  />
                </div>

                <div>
                  <label htmlFor="sl-goal" className="block text-sm font-medium mb-1.5">Goal</label>
                  <select
                    id="sl-goal"
                    className="sl-input"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select your goal</option>
                    {GOALS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="sl-message" className="block text-sm font-medium mb-1.5">What do you want to improve?</label>
                  <textarea
                    id="sl-message"
                    className="sl-input"
                    style={{ minHeight: "120px", resize: "vertical" }}
                    placeholder="Tell me about your site or idea…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={2000}
                    required
                  />
                </div>

                {error && (
                  <p className="text-sm font-medium" style={{ color: "hsl(0, 70%, 50%)" }}>{error}</p>
                )}

                <button
                  type="submit"
                  className="sl-btn-primary w-full flex items-center justify-center gap-2"
                  disabled={submitting}
                >
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                  ) : (
                    "Send"
                  )}
                </button>

                <p className="text-center text-xs" style={{ color: "hsl(var(--sl-green-400))" }}>
                  I reply by email.
                </p>
              </form>
            </>
          )}
        </div>
      </section>

      {/* Why Websites Matter */}
      <section id="why" className="sl-section sl-section-alt scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-4">Why your website matters</h2>
          <p className="text-center text-base mb-12" style={{ color: "hsl(var(--sl-green-600))" }}>
            Your website is the first thing people see. Make it count.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_POINTS.map((point) => (
              <div key={point.title} className="sl-card p-6 text-center">
                <div
                  className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ background: "hsl(var(--sl-green-100))" }}
                >
                  <point.icon className="w-5 h-5" style={{ color: "hsl(var(--sl-green-600))" }} />
                </div>
                <h3 className="text-lg mb-2 font-normal">{point.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--sl-green-600))" }}>
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="sl-section scroll-mt-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-12">How it works</h2>
          <div className="space-y-8">
            {STEPS.map((step) => (
              <div key={step.num} className="flex gap-5 items-start">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{
                    background: "hsl(var(--sl-green-600))",
                    color: "white",
                    fontFamily: "'DM Sans', system-ui",
                  }}
                >
                  {step.num}
                </div>
                <div>
                  <h3 className="text-xl mb-1 font-normal">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--sl-green-600))" }}>
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="sl-section sl-section-alt scroll-mt-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-10">Questions</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="sl-card px-6 border-none">
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline" style={{ color: "hsl(var(--sl-green-800))" }}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm leading-relaxed pb-2" style={{ color: "hsl(var(--sl-green-600))" }}>
                    {faq.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="sl-section text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl md:text-3xl mb-4">Ready to get started?</h2>
          <a href="#get-started" className="sl-btn-primary inline-block">
            Send your site
          </a>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
