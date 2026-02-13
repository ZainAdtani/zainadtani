import { useState, useEffect } from "react";
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
  Leaf,
} from "lucide-react";
import "@/styles/starter-lab.css";

type LeadType = "improve_existing" | "new_website" | null;

const IMPROVEMENT_OPTIONS = [
  "Design and layout",
  "Speed and performance",
  "SEO and Google ranking",
  "Copy and messaging",
  "Mobile experience",
  "Conversions and leads",
];

const WEBSITE_GOAL_OPTIONS = [
  "Get inquiries",
  "Book calls",
  "Sell products",
  "Show work or portfolio",
  "Build trust",
];

const PAGE_OPTIONS = [
  "Home",
  "About",
  "Services",
  "Contact",
  "Portfolio",
  "Blog",
  "Not sure, guide me",
];

const STYLE_VIBES = [
  "Clean and modern",
  "Warm and friendly",
  "Bold and creative",
  "Minimal",
];

const WHY_POINTS = [
  { icon: Shield, title: "Trust", text: "People look you up before they buy. A clean site builds instant credibility." },
  { icon: Layout, title: "Clarity", text: "One clear page beats scattered links across five platforms." },
  { icon: MousePointerClick, title: "Sales", text: "A clear call to action turns visitors into real inquiries." },
  { icon: Zap, title: "Speed", text: "Slow sites lose people. Fast sites keep them." },
  { icon: Smartphone, title: "Mobile", text: "Most visits come from phones. Your site needs to look good on every screen." },
];

const STEPS = [
  { num: "01", title: "Send your site and goal", text: "Fill out the form with your URL and what you want to improve." },
  { num: "02", title: "I review and reply", text: "I look at your site and send you clear next steps by email." },
  { num: "03", title: "We build or improve", text: "We work together to make your site something you're proud of." },
];

const FAQS = [
  { q: "How fast do you reply?", a: "Usually within 24 to 48 hours. I read every submission personally." },
  { q: "What if I don't have a website yet?", a: "That's perfectly fine. Pick 'No' and tell me what you need. We'll figure it out together." },
  { q: "Do you work with small budgets?", a: "Yes. I focus on simple, effective sites. We can scope something that fits your budget." },
  { q: "What do you need from me?", a: "Just your name, email, and a rough idea of what you want. The form takes about two minutes." },
];

function ChipSelect({ options, selected, onToggle, max }: {
  options: string[];
  selected: string[];
  onToggle: (val: string) => void;
  max?: number;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isSelected = selected.includes(opt);
        const disabled = !isSelected && max !== undefined && selected.length >= max;
        return (
          <button
            key={opt}
            type="button"
            className={`sl-chip ${isSelected ? "selected" : ""}`}
            onClick={() => !disabled && onToggle(opt)}
            style={{ opacity: disabled ? 0.5 : 1 }}
            aria-pressed={isSelected}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export default function WebsiteLab() {
  const [leadType, setLeadType] = useState<LeadType>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Improve existing fields
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [improvements, setImprovements] = useState<string[]>([]);
  const [mainGoal, setMainGoal] = useState("");

  // New website fields
  const [businessName, setBusinessName] = useState("");
  const [businessDesc, setBusinessDesc] = useState("");
  const [websiteGoals, setWebsiteGoals] = useState<string[]>([]);
  const [pagesWanted, setPagesWanted] = useState<string[]>([]);
  const [styleVibe, setStyleVibe] = useState("");
  const [exampleLinks, setExampleLinks] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleChip = (list: string[], setter: (v: string[]) => void) => (val: string) => {
    setter(list.includes(val) ? list.filter((v) => v !== val) : [...list, val]);
  };

  const selectPath = (type: LeadType) => {
    setLeadType(type);
    setTimeout(() => {
      document.getElementById("get-started")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !leadType) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!emailValid) {
      setError("Please enter a valid email address.");
      return;
    }
    if (leadType === "improve_existing" && !websiteUrl.trim()) {
      setError("Please enter your website URL.");
      return;
    }
    if (leadType === "new_website" && !businessName.trim()) {
      setError("Please enter your business or project name.");
      return;
    }

    const links = exampleLinks
      .split(/[\n,]+/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .slice(0, 3);

    setSubmitting(true);
    const { error: dbError } = await supabase.from("leads" as any).insert({
      name: name.trim().slice(0, 100),
      email: email.trim().slice(0, 255),
      lead_type: leadType,
      website_url: leadType === "improve_existing" ? websiteUrl.trim().slice(0, 500) : null,
      goal: leadType === "improve_existing" ? mainGoal.trim().slice(0, 500) || null : null,
      message: message.trim().slice(0, 2000) || null,
      improvements: leadType === "improve_existing" ? improvements : null,
      business_name: leadType === "new_website" ? businessName.trim().slice(0, 200) : null,
      business_description: leadType === "new_website" ? businessDesc.trim().slice(0, 500) || null : null,
      website_goals: leadType === "new_website" ? websiteGoals : null,
      pages_wanted: leadType === "new_website" ? pagesWanted : null,
      style_vibe: leadType === "new_website" ? styleVibe || null : null,
      example_links: leadType === "new_website" && links.length > 0 ? links : null,
    } as any);

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
        <meta name="description" content="Simple website help for people and small businesses. Get a clean site that fits your story." />
      </Helmet>

      {/* Progress bar */}
      <div className="sl-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Jump Nav */}
      <div className="sticky top-4 z-40 flex justify-center px-4 pt-4">
        <nav className="sl-jump-nav inline-flex items-center gap-1 px-3 py-2 flex-wrap justify-center">
          <a href="#get-started">Get started</a>
          <a href="#why">Why it matters</a>
          <a href="#process">Process</a>
          <a href="#faq">FAQ</a>
          <a href="#why-works">Why this works</a>
        </nav>
      </div>

      {/* Hero */}
      <section className="sl-hero px-4 pt-20 pb-24 md:pt-28 md:pb-32 text-center relative">
        <div className="max-w-2xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-normal mb-6 leading-tight">
            Website Starter Lab
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-lg mx-auto" style={{ color: "hsl(var(--sl-green-600))" }}>
            Simple website help for people and small businesses who want a clean site that fits their story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="#get-started" className="sl-btn-primary inline-block text-center">
              Get started
            </a>
            <a href="#why" className="sl-btn-secondary inline-block text-center">
              Why a website matters
            </a>
          </div>

          {/* Path toggle */}
          <div className="sl-path-toggle">
            <button
              className={leadType === "improve_existing" ? "active" : ""}
              onClick={() => selectPath("improve_existing")}
            >
              Improve my website
            </button>
            <button
              className={leadType === "new_website" ? "active" : ""}
              onClick={() => selectPath("new_website")}
            >
              Build me a website
            </button>
          </div>
        </div>
        <div className="mt-10 flex justify-center sl-scroll-hint">
          <ChevronDown className="w-6 h-6" style={{ color: "hsl(var(--sl-green-400))" }} />
        </div>
      </section>

      {/* Form Card */}
      <section id="get-started" className="sl-section max-w-xl mx-auto scroll-mt-20">
        <div className="sl-card p-8 md:p-10">
          {submitted ? (
            <div className="sl-success p-8 text-center">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color: "hsl(var(--sl-green-500))" }} />
              <h2 className="text-2xl mb-2">Sent ✅</h2>
              <p className="text-base mb-6" style={{ color: "hsl(var(--sl-green-600))" }}>
                Congratulations, we will be in contact with you.
              </p>
              <button className="sl-btn-link" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Back to top
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl mb-2 text-center">Tell me about your website</h2>
              <p className="text-center text-sm mb-8" style={{ color: "hsl(var(--sl-green-400))" }}>
                If you don't have a website, pick "No" and tell me what you want. If you have one, share the URL and what to fix.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Path question */}
                <div>
                  <label className="block text-sm font-medium mb-2">Do you already have a website?</label>
                  <div className="sl-path-toggle w-full flex">
                    <button
                      type="button"
                      className={`flex-1 ${leadType === "improve_existing" ? "active" : ""}`}
                      onClick={() => setLeadType("improve_existing")}
                    >
                      Yes, I have a website
                    </button>
                    <button
                      type="button"
                      className={`flex-1 ${leadType === "new_website" ? "active" : ""}`}
                      onClick={() => setLeadType("new_website")}
                    >
                      No, I don't
                    </button>
                  </div>
                </div>

                {/* Shared: Name */}
                <div>
                  <label htmlFor="sl-name" className="block text-sm font-medium mb-1.5">Name</label>
                  <input id="sl-name" className="sl-input" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required />
                </div>

                {/* Shared: Email */}
                <div>
                  <label htmlFor="sl-email" className="block text-sm font-medium mb-1.5">Email</label>
                  <input id="sl-email" type="email" className="sl-input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} required />
                </div>

                {/* ===== PATH: Improve Existing ===== */}
                {leadType === "improve_existing" && (
                  <>
                    <div>
                      <label htmlFor="sl-url" className="block text-sm font-medium mb-1.5">Website URL</label>
                      <input id="sl-url" type="url" className="sl-input" placeholder="https://yoursite.com" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} maxLength={500} required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">What do you want to improve? <span className="text-xs font-normal" style={{ color: "hsl(var(--sl-green-400))" }}>Choose up to 3</span></label>
                      <ChipSelect options={IMPROVEMENT_OPTIONS} selected={improvements} onToggle={toggleChip(improvements, setImprovements)} max={3} />
                    </div>

                    <div>
                      <label htmlFor="sl-main-goal" className="block text-sm font-medium mb-1.5">What is your main goal?</label>
                      <input id="sl-main-goal" className="sl-input" placeholder="e.g. Get more leads from Google" value={mainGoal} onChange={(e) => setMainGoal(e.target.value)} maxLength={500} />
                    </div>
                  </>
                )}

                {/* ===== PATH: New Website ===== */}
                {leadType === "new_website" && (
                  <>
                    <div>
                      <label htmlFor="sl-biz" className="block text-sm font-medium mb-1.5">Business or project name</label>
                      <input id="sl-biz" className="sl-input" placeholder="Your business name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} maxLength={200} required />
                    </div>

                    <div>
                      <label htmlFor="sl-biz-desc" className="block text-sm font-medium mb-1.5">What do you do? <span className="text-xs font-normal" style={{ color: "hsl(var(--sl-green-400))" }}>(one sentence)</span></label>
                      <input id="sl-biz-desc" className="sl-input" placeholder="e.g. I run a local bakery in Houston" value={businessDesc} onChange={(e) => setBusinessDesc(e.target.value)} maxLength={500} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">What do you want the website to do? <span className="text-xs font-normal" style={{ color: "hsl(var(--sl-green-400))" }}>Choose up to 2</span></label>
                      <ChipSelect options={WEBSITE_GOAL_OPTIONS} selected={websiteGoals} onToggle={toggleChip(websiteGoals, setWebsiteGoals)} max={2} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Pages you want</label>
                      <ChipSelect options={PAGE_OPTIONS} selected={pagesWanted} onToggle={toggleChip(pagesWanted, setPagesWanted)} />
                    </div>

                    <div>
                      <label htmlFor="sl-style" className="block text-sm font-medium mb-1.5">Style vibe</label>
                      <select id="sl-style" className="sl-input" value={styleVibe} onChange={(e) => setStyleVibe(e.target.value)}>
                        <option value="">Select a style</option>
                        {STYLE_VIBES.map((v) => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="sl-examples" className="block text-sm font-medium mb-1.5">
                        Examples you like <span className="text-xs font-normal" style={{ color: "hsl(var(--sl-green-400))" }}>(optional, 1–3 links)</span>
                      </label>
                      <textarea id="sl-examples" className="sl-input" style={{ minHeight: "70px", resize: "vertical" }} placeholder="https://example1.com&#10;https://example2.com" value={exampleLinks} onChange={(e) => setExampleLinks(e.target.value)} maxLength={1000} />
                    </div>
                  </>
                )}

                {/* Shared: Message */}
                {leadType && (
                  <div>
                    <label htmlFor="sl-message" className="block text-sm font-medium mb-1.5">
                      Anything else? <span className="text-xs font-normal" style={{ color: "hsl(var(--sl-green-400))" }}>(optional)</span>
                    </label>
                    <textarea id="sl-message" className="sl-input" style={{ minHeight: "100px", resize: "vertical" }} placeholder="Tell me more…" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={2000} />
                  </div>
                )}

                {error && <p className="text-sm font-medium" style={{ color: "hsl(0, 70%, 50%)" }}>{error}</p>}

                <button type="submit" className="sl-btn-primary w-full flex items-center justify-center gap-2" disabled={submitting || !leadType}>
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : "Send"}
                </button>

                <p className="text-center text-xs" style={{ color: "hsl(var(--sl-green-400))" }}>
                  I reply by email.
                </p>
              </form>
            </>
          )}
        </div>
      </section>

      {/* Separator */}
      <div className="sl-separator"><Leaf className="w-3.5 h-3.5" /></div>

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
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--sl-green-100))" }}>
                  <point.icon className="w-5 h-5" style={{ color: "hsl(var(--sl-green-600))" }} />
                </div>
                <h3 className="text-lg mb-2 font-normal">{point.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--sl-green-600))" }}>{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sl-separator">•••</div>

      {/* Process */}
      <section id="process" className="sl-section scroll-mt-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-12">How it works</h2>
          <div className="space-y-8">
            {STEPS.map((step) => (
              <div key={step.num} className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold" style={{ background: "hsl(var(--sl-green-600))", color: "white", fontFamily: "'DM Sans', system-ui" }}>
                  {step.num}
                </div>
                <div>
                  <h3 className="text-xl mb-1 font-normal">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--sl-green-600))" }}>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sl-separator"><Leaf className="w-3.5 h-3.5" /></div>

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
                  <p className="text-sm leading-relaxed pb-2" style={{ color: "hsl(var(--sl-green-600))" }}>{faq.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <div className="sl-separator">•••</div>

      {/* ===== Why This Works — Crafted Section ===== */}
      <section id="why-works" className="sl-section sl-crafted scroll-mt-20 relative">
        <span className="sl-doodle-left">🍃</span>
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl text-center mb-12">
            <span className="sl-hand-underline">Why this works</span>
          </h2>

          {/* Block 1: The Problem */}
          <div className="mb-10">
            <p className="sl-micro-label">THE PROBLEM</p>
            <p className="text-base leading-relaxed mb-3" style={{ color: "hsl(var(--sl-green-700))" }}>
              People search you before they trust you. If your site looks old, slow, or confusing, they leave.
            </p>
            <p className="text-lg font-semibold" style={{ color: "hsl(var(--sl-green-800))" }}>
              <span className="sl-marker">People judge fast.</span>
            </p>
          </div>

          {/* Block 2: Existing Sites */}
          <div className="sl-sketched-frame p-6 mb-8">
            <p className="sl-micro-label">FOR EXISTING SITES</p>
            <h3 className="text-xl mb-3 font-normal">If you already have a site</h3>
            <p className="text-sm mb-3" style={{ color: "hsl(var(--sl-green-600))" }}>
              We improve what matters most:
            </p>
            <ul className="text-sm space-y-1.5" style={{ color: "hsl(var(--sl-green-700))" }}>
              <li>• <span className="sl-marker">Clear message</span></li>
              <li>• Faster load</li>
              <li>• Better mobile</li>
              <li>• Better calls to action</li>
            </ul>
          </div>

          {/* Block 3: New Sites */}
          <div className="sl-sketched-frame p-6 mb-8">
            <p className="sl-micro-label">FOR NEW SITES</p>
            <h3 className="text-xl mb-3 font-normal">If you don't have a site</h3>
            <p className="text-sm mb-3" style={{ color: "hsl(var(--sl-green-600))" }}>
              We build the first version the smart way:
            </p>
            <ul className="text-sm space-y-1.5" style={{ color: "hsl(var(--sl-green-700))" }}>
              <li>• Simple pages</li>
              <li>• <span className="sl-marker">Clear goal</span></li>
              <li>• Easy edits later</li>
            </ul>
          </div>

          {/* Block 4: What You Get */}
          <div className="mb-8">
            <p className="sl-micro-label">WHAT YOU GET NEXT</p>
            <h3 className="text-xl mb-3 font-normal">After you submit</h3>
            <p className="text-sm mb-3" style={{ color: "hsl(var(--sl-green-600))" }}>
              I reply with:
            </p>
            <ul className="text-sm space-y-1.5" style={{ color: "hsl(var(--sl-green-700))" }}>
              <li>• A short plan</li>
              <li>• What I need from you</li>
              <li>• A <span className="sl-marker">simple next step</span></li>
            </ul>
          </div>

          {/* Handwritten note */}
          <div className="text-center mt-10 mb-6">
            <p className="sl-handwritten">
              No fluff. No ghosting. I reply like a normal human. 😄
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="sl-section text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl md:text-3xl mb-4">Ready to get started?</h2>
          <div className="flex flex-col items-center gap-3">
            <a href="#get-started" className="sl-btn-primary inline-block">
              Send your site
            </a>
            <button className="sl-btn-link" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Back to top
            </button>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
