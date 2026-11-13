import { Link, useLocation } from "react-router-dom";
import { NEWSLETTER_NAME } from "@/data/newsletter";

type NextLink = { label: string; to: string };

const CALENDLY = "https://calendly.com/zkadtani";

const STEPS: Record<string, { title: string; links: NextLink[] }> = {
  "/": {
    title: "Three useful next steps",
    links: [
      { label: "Free AI Checkup", to: "/ai-checkup" },
      { label: "My books", to: "/#books" },
      { label: "Today's Note archive", to: "/lifenotes" },
    ],
  },
  "/services": {
    title: "If you are not sure yet",
    links: [
      { label: "Free AI Checkup", to: "/ai-checkup" },
      { label: "Book a call", to: CALENDLY },
      { label: "My books", to: "/#books" },
    ],
  },
  "/ai-checkup": {
    title: "More for a local business",
    links: [
      { label: "Missed Call Calculator", to: "/missed-call-calculator" },
      { label: "Owner Stress Test", to: "/owner-stress-test" },
      { label: "Book a call", to: CALENDLY },
    ],
  },
  "/missed-call-calculator": {
    title: "Keep going",
    links: [
      { label: "Owner Stress Test", to: "/owner-stress-test" },
      { label: "Free AI Checkup", to: "/ai-checkup" },
      { label: "Services", to: "/services" },
    ],
  },
  "/owner-stress-test": {
    title: "What to look at next",
    links: [
      { label: "Missed Call Calculator", to: "/missed-call-calculator" },
      { label: "Family protection", to: "/family-protection-gap" },
      { label: "Book a call", to: CALENDLY },
    ],
  },
  "/books": {
    title: "After the reading list",
    links: [
      { label: "Books I wrote", to: "/#books" },
      { label: "The Family Protection Gap", to: "/family-protection-gap" },
      { label: NEWSLETTER_NAME, to: "/#z-letter" },
    ],
  },
  "/about": {
    title: "Where to go from here",
    links: [
      { label: "How I can help", to: "/#start" },
      { label: "Services", to: "/services" },
      { label: NEWSLETTER_NAME, to: "/#z-letter" },
    ],
  },
  "/family-protection-gap": {
    title: "Talk it through",
    links: [
      { label: "Connect", to: "/connect" },
      { label: "Book a call", to: CALENDLY },
      { label: "My books", to: "/#books" },
    ],
  },
  "/connect": {
    title: "Or start with something you can read",
    links: [
      { label: "Family protection guide", to: "/family-protection-gap" },
      { label: "Services", to: "/services" },
      { label: NEWSLETTER_NAME, to: "/#z-letter" },
    ],
  },
  "/lifenotes": {
    title: "These are the daily lines",
    links: [
      { label: "Searchable Life Notes", to: "/life-notes" },
      { label: "My books", to: "/#books" },
      { label: "Home", to: "/" },
    ],
  },
  "/life-notes": {
    title: "A different set of notes",
    links: [
      { label: "Today's Note archive", to: "/lifenotes" },
      { label: "Resources", to: "/resources" },
      { label: NEWSLETTER_NAME, to: "/#z-letter" },
    ],
  },
  "/resources": {
    title: "Jump to a tool",
    links: [
      { label: "Free AI Checkup", to: "/ai-checkup" },
      { label: "Missed Call Calculator", to: "/missed-call-calculator" },
      { label: "How I can help", to: "/#start" },
    ],
  },
  "/projects": {
    title: "More to poke around",
    links: [
      { label: "The Lab", to: "/lab" },
      { label: "iPhone apps", to: "/#apps" },
      { label: "Home", to: "/" },
    ],
  },
  "/lab": {
    title: "The other project shelf",
    links: [
      { label: "Fun projects", to: "/projects" },
      { label: "iPhone apps", to: "/#apps" },
      { label: "Home", to: "/" },
    ],
  },
  "/investing": {
    title: "A playful way to keep going",
    links: [
      { label: "Roth IRA Game", to: "/roth-ira-game" },
      { label: "Resources", to: "/resources" },
      { label: NEWSLETTER_NAME, to: "/#z-letter" },
    ],
  },
  "/prompts": {
    title: "Want the longer library?",
    links: [
      { label: "AI Prompt Library", to: "/ai-prompts" },
      { label: "Resources", to: "/resources" },
      { label: "Services", to: "/services" },
    ],
  },
  "/ai-prompts": {
    title: "A shorter start",
    links: [
      { label: "10 starter prompts", to: "/prompts" },
      { label: "Services", to: "/services" },
      { label: NEWSLETTER_NAME, to: "/#z-letter" },
    ],
  },
};

const FALLBACK = {
  title: "Keep exploring",
  links: [
    { label: "How I can help", to: "/#start" },
    { label: "Services", to: "/services" },
    { label: NEWSLETTER_NAME, to: "/#z-letter" },
  ],
};

function stepsFor(pathname: string) {
  if (STEPS[pathname]) return STEPS[pathname];
  if (pathname.startsWith("/lifenotes/")) {
    return {
      title: "More notes",
      links: [
        { label: "All of Today's Notes", to: "/lifenotes" },
        { label: "Searchable Life Notes", to: "/life-notes" },
        { label: "Home", to: "/" },
      ],
    };
  }
  return FALLBACK;
}

export function PageNext() {
  const { pathname } = useLocation();
  const step = stepsFor(pathname);
  return (
    <nav aria-label="Continue" className="border-t border-[#447BBE]/15 bg-[hsl(45,82%,96%)]">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-[#2F5C90]">Next</p>
        <p className="mt-1 font-display text-[22px] leading-tight text-[#0A0F1A]">{step.title}</p>
        <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
          {step.links.map((link) => (
            <li key={link.label}>
              {link.to.startsWith("http") ? (
                <a
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[16px] font-semibold text-[#2F5C90] underline underline-offset-4 hover:text-[#DD5013] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#447BBE] rounded"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  to={link.to}
                  className="font-sans text-[16px] font-semibold text-[#2F5C90] underline underline-offset-4 hover:text-[#DD5013] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#447BBE] rounded"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
