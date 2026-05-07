import { Helmet } from "react-helmet-async";

const CALENDLY_URL = "https://calendly.com/zkadtani";

const websiteCards = [
  { icon: "⚡", title: "Fast Delivery", body: "From first call to live site in days. Not weeks. Not months. Days." },
  { icon: "📱", title: "Mobile First", body: "Over 60% of your visitors are on a phone. Your site works perfectly on all of them." },
  { icon: "🤖", title: "Built with AI", body: "I use the best AI tools available to build faster and smarter than traditional agencies." },
  { icon: "🎓", title: "You Own It", body: "Full walkthrough when done. You know how to update it yourself. No dependency on me." },
];

const websiteBullets = [
  "Discovery call to map your pages and goals",
  "Custom-built, mobile-first design",
  "Copy written for your audience",
  "SEO basics, contact forms, and CTAs",
  "Live in under two weeks",
  "Walkthrough so you can manage it yourself",
];

const bookCards = [
  { icon: "✍️", title: "Writing Support", body: "Stuck on chapter one? I help you get the ideas out of your head and onto the page." },
  { icon: "📐", title: "Professional Formatting", body: "Kindle, paperback, and PDF. Formatted exactly to Amazon's specs so it passes every time." },
  { icon: "🚀", title: "Amazon Launch", body: "I walk you through your KDP account, your listing, your cover, and your launch strategy." },
  { icon: "🎙️", title: "Audiobook Ready", body: "Want an audiobook version too? I'll show you how to record and distribute it yourself." },
];

const bookBullets = [
  "Concept clarity and outline session",
  "Writing plan with milestones that fit your schedule",
  "Cover design guidance",
  "KDP setup and listing optimization",
  "Launch week strategy",
  "Ongoing support until you're live",
];

const workflowCards = [
  { icon: "🔍", title: "Audit First", body: "I don't guess. I look at your actual workflow before suggesting anything." },
  { icon: "🧠", title: "Built Around Claude", body: "Claude is the most capable AI assistant available. I'll show you how to use it like a pro." },
  { icon: "📋", title: "You Get the Playbook", body: "Everything documented. You know what to run, when, and why. No black boxes." },
  { icon: "📞", title: "Follow-Up Included", body: "One 30-day check-in call included. We fine-tune what's working and fix what isn't." },
];

const workflowBullets = [
  "Workflow audit — find what's stealing your time",
  "Custom AI prompt library built for your role",
  "Automation setup using Claude and Notion",
  "System walkthrough and documentation",
  "30-day follow-up check-in included",
];

const ctaClass =
  "inline-block bg-[#00D4AA] text-[#0A0F1A] font-display font-semibold text-[15px] px-7 py-3.5 rounded-[10px] hover:opacity-90 transition-opacity w-fit";

function FeatureCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="bg-[#0F2340] border border-[#1E3A5F] rounded-2xl p-6 flex gap-4 items-start hover:border-[#00D4AA]/40 transition-colors">
      <span className="text-2xl shrink-0">{icon}</span>
      <div>
        <h4 className="font-display font-bold text-[16px] text-[#F1F5F9] mb-1">{title}</h4>
        <p className="font-sans text-[14px] text-[#94A3B8] leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-[#00D4AA] mt-0.5 text-[16px] shrink-0">✓</span>
      <span className="font-sans text-[15px] text-[#94A3B8]">{children}</span>
    </div>
  );
}

export default function Services() {
  return (
    <div className="min-h-screen bg-[#0A0F1A]">
      <Helmet>
        <title>Services | Zain Adtani</title>
        <meta
          name="description"
          content="AI websites, book publishing, and AI workflow consulting — real work, real results."
        />
      </Helmet>

      {/* Section 1: Hero */}
      <section className="bg-[#0A0F1A] pt-16 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="inline-block text-[11px] font-medium tracking-widest uppercase text-[#00D4AA] bg-[#00D4AA]/10 border border-[#00D4AA]/20 rounded-full px-4 py-1.5 mb-6">
            REAL WORK. REAL RESULTS.
          </span>
          <h1 className="font-display font-extrabold text-[48px] md:text-[64px] leading-[1.05] text-[#F1F5F9] mb-6">
            Let's Build<br />
            <span className="text-[#00D4AA]">Something Real.</span>
          </h1>
          <p className="font-sans text-[18px] text-[#94A3B8] max-w-2xl mx-auto mb-10 leading-relaxed">
            I work with small businesses and creators who are done waiting. Whether it's a website, a book, or a smarter workflow — I get it done fast and I get it done right.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#00D4AA] text-[#0A0F1A] font-display font-semibold text-[16px] px-8 py-4 rounded-[12px] hover:opacity-90 transition-opacity"
          >
            Book a Free Call →
          </a>
          <p className="font-sans text-[13px] text-[#6B7280] mt-4">
            No pitch. No pressure. 30 minutes. That's it.
          </p>
        </div>
      </section>

      {/* Section 2: Service 01 — AI Websites */}
      <section className="bg-[#0A0F1A] py-24 border-t border-[#1E3A5F]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <span className="text-[11px] font-medium tracking-widest uppercase text-[#00D4AA] font-sans">
              SERVICE 01
            </span>
            <h2 className="font-display font-extrabold text-[40px] md:text-[48px] leading-[1.1] text-[#F1F5F9]">
              Your Website.<br />Built in Two Weeks.<br />
              <span className="text-[#00D4AA]">Not Two Months.</span>
            </h2>
            <p className="font-sans text-[16px] text-[#94A3B8] leading-relaxed max-w-md">
              Most small businesses are running on outdated sites or no site at all. I fix that. Fast. I use AI tools and modern design to build you a clean, mobile-first website that actually converts. You show up with the vision. I handle everything else.
            </p>
            <div className="flex flex-col gap-3">
              {websiteBullets.map((item) => <Bullet key={item}>{item}</Bullet>)}
            </div>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={`mt-2 ${ctaClass}`}>
              Get Started →
            </a>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {websiteCards.map((c) => <FeatureCard key={c.title} {...c} />)}
          </div>
        </div>
      </section>

      {/* Section 3: Service 02 — Publish Your Book */}
      <section className="bg-[#070C14] py-24 border-t border-[#1E3A5F]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-1 gap-4 order-2 md:order-1">
            {bookCards.map((c) => <FeatureCard key={c.title} {...c} />)}
          </div>
          <div className="flex flex-col gap-6 order-1 md:order-2">
            <span className="text-[11px] font-medium tracking-widest uppercase text-[#00D4AA] font-sans">
              SERVICE 02
            </span>
            <h2 className="font-display font-extrabold text-[40px] md:text-[48px] leading-[1.1] text-[#F1F5F9]">
              Your Story<br />Belongs on<br />
              <span className="text-[#00D4AA]">Amazon.</span>
            </h2>
            <p className="font-sans text-[16px] text-[#94A3B8] leading-relaxed max-w-md">
              You have a book inside you. You just haven't finished it yet. I help everyday people write, format, and publish their first book on Amazon — Kindle, paperback, and audiobook. Done with you, not just for you. I've done it. I'll show you exactly how.
            </p>
            <div className="flex flex-col gap-3">
              {bookBullets.map((item) => <Bullet key={item}>{item}</Bullet>)}
            </div>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={`mt-2 ${ctaClass}`}>
              Start Your Book →
            </a>
          </div>
        </div>
      </section>

      {/* Section 4: Service 03 — AI Workflow Consulting */}
      <section className="bg-[#0A0F1A] py-24 border-t border-[#1E3A5F]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <span className="text-[11px] font-medium tracking-widest uppercase text-[#00D4AA] font-sans">
              SERVICE 03
            </span>
            <h2 className="font-display font-extrabold text-[40px] md:text-[48px] leading-[1.1] text-[#F1F5F9]">
              Stop Doing<br />What AI Can<br />
              <span className="text-[#00D4AA]">Do Better.</span>
            </h2>
            <p className="font-sans text-[16px] text-[#94A3B8] leading-relaxed max-w-md">
              You're spending hours every week on tasks that could be automated in an afternoon. I come in, audit your workflow, identify the leaks, and build you a custom AI system using Claude, Notion, and automation tools. One session can realistically save you 5 to 10 hours every week.
            </p>
            <div className="flex flex-col gap-3">
              {workflowBullets.map((item) => <Bullet key={item}>{item}</Bullet>)}
            </div>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={`mt-2 ${ctaClass}`}>
              Book a Workflow Audit →
            </a>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {workflowCards.map((c) => <FeatureCard key={c.title} {...c} />)}
          </div>
        </div>
      </section>

      {/* Section 5: Not sure strip */}
      <section className="bg-[#0F2340] py-16 border-t border-[#1E3A5F]">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3 className="font-display font-bold text-[28px] text-[#F1F5F9] mb-2">
              Not sure which service fits?
            </h3>
            <p className="font-sans text-[16px] text-[#94A3B8]">
              Book a 30-minute call and we'll figure it out together. First call is always free.
            </p>
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#00D4AA] text-[#0A0F1A] font-display font-semibold text-[16px] px-8 py-4 rounded-[12px] hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Schedule a Free Call →
          </a>
        </div>
      </section>
    </div>
  );
}
