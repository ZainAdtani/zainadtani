import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Shield,
  Youtube,
  Linkedin,
  Instagram,
  Mail,
  Wrench,
  Library,
  FolderGit2,
  User,
} from "lucide-react";

import { ScrollReveal } from "@/components/ScrollReveal";
import { TimeBar } from "@/components/TimeBar";
import { BOOKS } from "@/data/books";
import headshotImage from "@/assets/zain-headshot.png";
import pokemonImg from "@/assets/pokemon-pokedex.png";
import harryPotterImg from "@/assets/harry-potter-world.png";

const CALENDLY_URL = "https://calendly.com/zkadtani";
const BEEHIIV_URL = "https://the-z-letter.beehiiv.com/subscribe";
const BEEHIIV_MAGIC = "https://magic.beehiiv.com/v1/dd1643e2-f274-43e4-b193-62276e3e3b48";
const AMAZON_ZAP_REST = "https://www.amazon.com/dp/B0H51RJL7R";
const YOUTUBE_URL = "https://youtube.com/@zainadtani";

const VISITOR_PATHS = [
  {
    icon: Bot,
    title: "Run on AI",
    body: "Help small businesses save time using practical AI systems, websites, and workflows.",
    cta: "Explore AI Services",
    to: "/services#ai-consulting",
  },
  {
    icon: BookOpen,
    title: "Publish Your Book",
    body: "Help authors and creators turn an idea into a finished book.",
    cta: "See Publishing Help",
    to: "/services#book-publishing",
  },
  {
    icon: Shield,
    title: "Protect Your Family",
    body: "Education about life insurance, living benefits, wills, trusts, and family protection.",
    cta: "Learn About Family Protection",
    to: "/family-protection-gap",
  },
];

const DISCOVERY = [
  {
    label: "Featured Resources",
    title: "Resources",
    body: "Guides, prompt library, and a map of everything on this site.",
    to: "/resources",
    icon: Library,
    internal: true,
  },
  {
    label: "Books",
    title: "Reading Library",
    body: `Notes and covers from the books I actually read. ${BOOKS.length} and counting.`,
    to: "/books",
    icon: BookOpen,
    internal: true,
  },
  {
    label: "Built by Z",
    title: "Projects",
    body: "Real builds, experiments, and tools made with AI.",
    to: "/projects",
    icon: FolderGit2,
    internal: true,
  },
  {
    label: "Built by Z",
    title: "Tools I Use",
    body: "The apps, devices, and software behind the daily work.",
    to: "/tools",
    icon: Wrench,
    internal: true,
  },
  {
    label: "Watch and Learn",
    title: "YouTube",
    body: "Walkthroughs and build videos, in plain language.",
    to: YOUTUBE_URL,
    icon: Youtube,
    internal: false,
  },
  {
    label: "About",
    title: "Meet Zain",
    body: "Who I am, what I build, and why I do this work.",
    to: "/about",
    icon: User,
    internal: true,
  },
];

const FUN_PROJECTS = [
  {
    title: "Zain's Notion Pokédex",
    description:
      "All 151 original Pokémon. Every stat, type, height, weight, and HP. Filterable and built entirely in Notion.",
    image: pokemonImg,
    href: "/pokedex",
    badge: "151 Pokémon",
  },
  {
    title: "Harry Potter World",
    description:
      "A Hogwarts-themed hub built in Notion. Books, audiobooks, key story moments, and lore.",
    image: harryPotterImg,
    href: "/harry-potter",
    badge: "Hogwarts Built",
  },
];

const SOCIALS = [
  { label: "YouTube", href: YOUTUBE_URL, Icon: Youtube },
  { label: "LinkedIn — Zain Adtani", href: "https://linkedin.com/in/zainadtani", Icon: Linkedin },
  {
    label: "LinkedIn — Adtani Education Ventures",
    href: "https://linkedin.com/company/adtani-education-ventures",
    Icon: Linkedin,
  },
  { label: "Instagram", href: "https://instagram.com/adtanieducationventures", Icon: Instagram },
  { label: "The Z Letter", href: "https://the-z-letter.beehiiv.com", Icon: Mail },
];

const FINANCIAL_SITUATIONS = [
  {
    title: "Dying Too Soon",
    desc: "Your family keeps the house. Bills don't stop. Life insurance covers the gap.",
  },
  {
    title: "Living Too Long",
    desc: "Outliving your savings is a real risk. Retirement planning starts now, not at 60.",
  },
  {
    title: "Getting Sick and Not Dying",
    desc: "A serious illness can hurt your income and drain savings while you recover. The right protection helps cover the gap.",
  },
  {
    title: "No Will or Trust",
    desc: "Without one, the court decides what happens to everything you built. That's not a plan.",
  },
];

function Divider() {
  return <div className="hairline max-w-5xl mx-auto" />;
}

function SectionHead({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="font-display text-[30px] md:text-[40px] leading-[1.15] text-[#0A0F1A] mt-2">
        {title}
      </h2>
      {sub && <p className="font-sans text-[16px] leading-relaxed text-[#0A0F1A]/70 mt-3">{sub}</p>}
    </div>
  );
}

const Index = () => {
  // Handle in-page anchors arriving from other routes.
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="bg-white">
      <div id="top" />
      <Helmet>
        <title>Zain Adtani | AI Consultant · Author · Financial Educator</title>
        <meta
          name="description"
          content="AI Consultant, Author, and Financial Educator based in DFW Texas. I help small businesses run on AI, help creators publish books, and help families protect what they build."
        />
        <meta property="og:title" content="Zain Adtani | AI Consultant · Author · Financial Educator" />
        <meta
          property="og:description"
          content="AI Consultant, Author, and Financial Educator based in DFW Texas. I help small businesses run on AI, help creators publish books, and help families protect what they build."
        />
        <meta property="og:url" content="https://zainadtani.com" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://zainadtani.com" />
      </Helmet>

      <TimeBar />

      {/* 1 — HERO */}
      <section className="bg-gradient-hero">
        <div className="container mx-auto px-5 sm:px-6 max-w-6xl py-12 md:py-20">
          <div className="grid md:grid-cols-[1.15fr_1fr] gap-10 md:gap-14 items-center">
            <div className="flex flex-col gap-5 order-2 md:order-1">
              <span className="inline-flex w-fit items-center rounded-full bg-white border border-[#447BBE]/25 px-4 py-1.5 font-sans text-[12px] font-semibold tracking-[0.12em] uppercase text-[#2F5C90]">
                AI Consultant · Author · Financial Educator
              </span>
              <h1 className="font-display text-[34px] sm:text-[44px] md:text-[54px] leading-[1.08] text-[#0A0F1A]">
                <span className="block">Build with AI.</span>
                <span className="block">Publish your book.</span>
                <span className="block">Protect your family.</span>
              </h1>
              <p className="font-sans text-[16px] md:text-[18px] leading-relaxed text-[#0A0F1A]/75 max-w-[540px]">
                I'm Zain Adtani. I help businesses run on AI, help creators publish books, and help
                families protect what they build. One partner, three ways forward.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-1">
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">
                  Book a Call
                </a>
                <a
                  href={BEEHIIV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-outline"
                >
                  Join The Z Letter
                </a>
              </div>
              <a
                href="#how-i-help"
                className="font-sans text-[15px] text-[#2F5C90] underline-offset-4 hover:underline w-fit"
              >
                See how I help ↓
              </a>
            </div>

            {/* Portrait — 4:5 card, fully visible, never cropped */}
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <div className="w-full max-w-[300px] sm:max-w-[340px] rounded-2xl border border-[#447BBE]/20 bg-white p-3 shadow-[0_8px_28px_rgba(10,15,26,0.08)]">
                <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#F3F6FA] flex items-center justify-center">
                  <img
                    src={headshotImage}
                    alt="Zain Adtani, AI Consultant, Author, and Financial Educator"
                    className="w-full h-full object-contain object-center"
                    width={340}
                    height={425}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — VISITOR PATHS */}
      <section id="how-i-help" className="section-y bg-white scroll-mt-20">
        <div className="container mx-auto px-5 sm:px-6 max-w-6xl">
          <SectionHead
            eyebrow="Start here"
            title="How can I help you?"
            sub="One partner. Three ways forward."
          />
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
              {VISITOR_PATHS.map(({ icon: Icon, title, body, cta, to }) => (
                <div key={title} className="surface-card p-7 flex flex-col">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#447BBE]/10 text-[#447BBE]">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-[20px] text-[#0A0F1A] mt-4">{title}</h3>
                  <p className="font-sans text-[15px] leading-relaxed text-[#0A0F1A]/70 mt-2 flex-1">
                    {body}
                  </p>
                  <Link to={to} className="btn-cta mt-6 w-full">
                    {cta}
                  </Link>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* 3 — FEATURED BOOK */}
      <section className="section-y bg-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-5xl">
          <ScrollReveal>
            <div className="rounded-2xl surface-warm border border-[#D97706]/25 p-6 md:p-10">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-[170px] md:w-[200px] shrink-0">
                  <div className="w-full aspect-[2/3] rounded-xl bg-white p-2 shadow-[0_6px_20px_rgba(10,15,26,0.10)]">
                    <img
                      src="https://images-na.ssl-images-amazon.com/images/P/B0H51RJL7R.01.LZZZZZZZ.jpg"
                      alt="ZAP REST book cover by Zain Adtani"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <span className="inline-flex items-center rounded-full bg-white border border-[#D97706]/40 px-3 py-1 font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-[#A85B05]">
                      Now live on Amazon
                    </span>
                    <span className="inline-flex items-center rounded-full bg-white border border-[#447BBE]/30 px-3 py-1 font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-[#2F5C90]">
                      Kindle + Paperback
                    </span>
                  </div>
                  <h2 className="font-display text-[30px] md:text-[38px] leading-tight text-[#0A0F1A] mt-4">
                    ZAP REST
                  </h2>
                  <p className="font-sans text-[16px] leading-relaxed text-[#0A0F1A]/75 mt-3 max-w-xl">
                    Your first step to waking up without anxiety. A practical guide to building a
                    morning routine that fights anxiety before it starts. Written by Zain Adtani.
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                    <a
                      href={AMAZON_ZAP_REST}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cta"
                    >
                      Get It on Amazon — $9.99
                    </a>
                    <a
                      href={BEEHIIV_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary-outline"
                    >
                      Join The Z Letter
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* 4 — THE Z LETTER */}
      <section id="z-letter" className="section-y bg-white scroll-mt-20">
        <div className="container mx-auto px-5 sm:px-6 max-w-3xl">
          <SectionHead
            eyebrow="Free weekly newsletter"
            title="Subscribe to The Z Letter"
            sub="Every Sunday I send one practical AI tip, one tool worth your time, and one idea that makes you think. No fluff. Always free."
          />
          <form
            className="mt-8 max-w-md mx-auto flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              const input = (e.currentTarget.elements.namedItem("email") as HTMLInputElement);
              const email = input?.value?.trim();
              if (!email || !email.includes("@")) {
                input?.focus();
                return;
              }
              window.open(`${BEEHIIV_MAGIC}?email=${encodeURIComponent(email)}`, "_blank");
            }}
          >
            <label htmlFor="zletterEmail" className="sr-only">
              Email address
            </label>
            <input
              id="zletterEmail"
              name="email"
              type="email"
              placeholder="you@email.com"
              className="w-full rounded-xl border border-[#447BBE]/30 bg-white px-5 py-3.5 font-sans text-[16px] text-[#0A0F1A] placeholder:text-[#0A0F1A]/40 focus:outline-none focus:border-[#447BBE]"
            />
            <button type="submit" className="btn-cta w-full">
              Subscribe Free
            </button>
            <p className="text-center font-sans text-[13px] text-[#0A0F1A]/60">
              Sundays at 9AM Central. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </section>

      <Divider />

      {/* 5 — FEATURED CONTENT / DISCOVERY */}
      <section className="section-y bg-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-6xl">
          <SectionHead
            eyebrow="Explore"
            title="Featured content"
            sub="Everything here is real work you can read, use, or watch today."
          />
          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
              {DISCOVERY.map(({ label, title, body, to, icon: Icon, internal }) => {
                const inner = (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#447BBE]/10 text-[#447BBE]">
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <span className="font-sans text-[11px] font-semibold tracking-[0.14em] uppercase text-[#A85B05]">
                        {label}
                      </span>
                    </div>
                    <h3 className="font-display text-[18px] text-[#0A0F1A] mt-4">{title}</h3>
                    <p className="font-sans text-[14px] leading-relaxed text-[#0A0F1A]/70 mt-1.5 flex-1">
                      {body}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold text-[#2F5C90] mt-4">
                      Open <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </>
                );
                return internal ? (
                  <Link key={title} to={to} className="surface-card p-6 flex flex-col">
                    {inner}
                  </Link>
                ) : (
                  <a
                    key={title}
                    href={to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="surface-card p-6 flex flex-col"
                  >
                    {inner}
                  </a>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* 6 — MEET ZAIN */}
      <section className="section-y bg-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-4xl">
          <div className="rounded-2xl border border-[#447BBE]/18 bg-white p-7 md:p-10 shadow-[0_6px_22px_rgba(10,15,26,0.06)]">
            <p className="eyebrow">Meet Zain</p>
            <h2 className="font-display text-[28px] md:text-[36px] leading-tight text-[#0A0F1A] mt-2">
              Hi, I'm Z.
            </h2>
            <p className="font-sans text-[16px] md:text-[17px] leading-relaxed text-[#0A0F1A]/75 mt-4">
              Zain Adtani, and most people just call me Z. I'm the founder of Adtani Education
              Ventures LLC, based in Dallas–Fort Worth, Texas. I studied Mechanical Engineering at
              UTSA and graduated in 2022, and I'm an Eagle Scout. Today I work as an AI Consultant
              and author, and I'm a Licensed Texas Life and Health professional.
            </p>
            <p className="font-sans text-[16px] md:text-[17px] leading-relaxed text-[#0A0F1A]/75 mt-3">
              My mission is simple: teach useful ideas, help people, and build a better future for
              my family.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 font-sans font-semibold text-[15px] text-[#2F5C90] mt-6 underline-offset-4 hover:underline"
            >
              More about me <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <Divider />

      {/* 7 — CURRENT PROJECTS + SOCIAL */}
      <section className="section-y bg-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-6xl">
          <SectionHead
            eyebrow="Built by Z"
            title="Things I'm building"
            sub="Side builds and experiments. Same curiosity, less pressure."
          />
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
              {FUN_PROJECTS.map((p) => (
                <Link key={p.title} to={p.href} className="surface-card overflow-hidden flex flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#F3F6FA]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 font-sans text-[11px] font-semibold tracking-wide text-[#0A0F1A]">
                      {p.badge}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col gap-2 flex-1">
                    <h3 className="font-display text-[18px] text-[#0A0F1A]">{p.title}</h3>
                    <p className="font-sans text-[14px] leading-relaxed text-[#0A0F1A]/70 flex-1">
                      {p.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold text-[#2F5C90] mt-2">
                      Open <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-[#447BBE]/15 bg-[#F7F9FC] px-5 py-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-sans text-[13px] font-semibold text-[#0A0F1A]/70">
                Follow the build:
              </span>
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="text-[#447BBE] hover:text-[#2F5C90] transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/lab"
                className="font-sans text-[14px] text-[#2F5C90] underline-offset-4 hover:underline"
              >
                Explore the Lab
              </Link>
              <Link
                to="/resources/investing"
                className="font-sans text-[14px] text-[#2F5C90] underline-offset-4 hover:underline"
              >
                My Investing Stack
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* 8 — FINANCIAL EDUCATION */}
      <section className="section-y bg-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-4xl">
          <SectionHead
            eyebrow="Financial education"
            title="It's not about how much you earn. It's about how much you keep and grow."
            sub="Most families earn decent money and still feel behind. Not because of income. Because nobody taught them the four situations that either protect a family or break one."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            {FINANCIAL_SITUATIONS.map((c) => (
              <div key={c.title} className="surface-card p-6">
                <h3 className="font-display text-[17px] text-[#0A0F1A]">{c.title}</h3>
                <p className="font-sans text-[14px] leading-relaxed text-[#0A0F1A]/70 mt-2">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl surface-warm border border-[#D97706]/25 p-7 md:p-9 text-center">
            <p className="font-sans text-[11px] font-semibold tracking-[0.14em] uppercase text-[#A85B05]">
              Free resource
            </p>
            <h3 className="font-display text-[22px] md:text-[26px] leading-tight text-[#0A0F1A] mt-2">
              View the 30-Min Financial Education Deck
            </h3>
            <p className="font-sans text-[15px] leading-relaxed text-[#0A0F1A]/75 mt-3 max-w-xl mx-auto">
              A simple walkthrough of the four financial situations most families avoid: dying too
              soon, living too long, getting sick and not dying, and having no will or trust.
              Education only, at your own pace.
            </p>
            <a
              href="https://gamma.app/docs/Master-BOP-75tzizrns082stq"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta mt-6"
            >
              Open the Deck
            </a>
          </div>
        </div>
      </section>

      <Divider />

      {/* 9 — FINAL CTA */}
      <section id="contact" className="section-y bg-white scroll-mt-20">
        <div className="container mx-auto px-5 sm:px-6 max-w-2xl text-center">
          <h2 className="font-display text-[30px] md:text-[40px] leading-[1.15] text-[#0A0F1A]">
            Ready to build something useful?
          </h2>
          <p className="font-sans text-[16px] leading-relaxed text-[#0A0F1A]/70 mt-4">
            Whether it's a website, a book, or a smarter way to run your business, let's talk. First
            call is free.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">
              Book a Call
            </a>
            <a
              href={BEEHIIV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-outline"
            >
              Join The Z Letter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
