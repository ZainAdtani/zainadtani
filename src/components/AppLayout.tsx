import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { BackToTop } from "./BackToTop";
import { ReadingProgressBar } from "./ReadingProgressBar";
import { ScrollToHash } from "./ScrollToHash";
import { Header } from "./Header";
import { AIChatWidget } from "./AIChatWidget";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { Linkedin, Youtube, Mail, Instagram, CalendarDays } from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
}

const CALENDLY = "https://calendly.com/zkadtani";

const FOOTER_COLUMNS: { heading: string; links: { label: string; to: string }[] }[] = [
  {
    heading: "Start",
    links: [
      { label: "Home", to: "/" },
      { label: "How I can help", to: "/#start" },
      { label: "The Daily Z", to: "/#z-letter" },
      { label: "Book a Call", to: CALENDLY },
      { label: "About", to: "/about" },
    ],
  },
  {
    heading: "Work with me",
    links: [
      { label: "Services", to: "/services" },
      { label: "Free AI Checkup", to: "/ai-checkup" },
      { label: "Connect", to: "/connect" },
      { label: "The Family Protection Gap", to: "/family-protection-gap" },
    ],
  },
  {
    heading: "Read and learn",
    links: [
      { label: "My books", to: "/#books" },
      { label: "Reading library", to: "/books" },
      { label: "Resources", to: "/resources" },
      { label: "Tools", to: "/tools" },
      { label: "Investing", to: "/investing" },
      { label: "Life Notes", to: "/life-notes" },
      { label: "Life Notes (daily)", to: "/lifenotes" },
      { label: "AI Prompt Library", to: "/ai-prompts" },
      { label: "10 starter prompts", to: "/prompts" },
      { label: "Digital Product HQ", to: "/digital-products" },
    ],
  },
  {
    heading: "Play",
    links: [
      { label: "iPhone apps", to: "/#apps" },
      { label: "Fun projects", to: "/projects" },
      { label: "The Lab", to: "/lab" },
      { label: "Pokédex", to: "/pokedex" },
      { label: "Harry Potter World", to: "/harry-potter" },
      { label: "Roth IRA Game", to: "/roth-ira-game" },
    ],
  },
];

const FOOTER_SOCIALS = [
  { label: "LinkedIn: Zain Adtani", href: "https://www.linkedin.com/in/zainadtani", Icon: Linkedin },
  { label: "LinkedIn: Adtani Education Ventures", href: "https://www.linkedin.com/company/adtani-education-ventures", Icon: Linkedin },
  { label: "YouTube: Build Then Protect", href: "https://www.youtube.com/@BuildThenProtect", Icon: Youtube },
  { label: "YouTube: History You Missed Daily", href: "https://www.youtube.com/@HistoryYouMissedDaily", Icon: Youtube },
  { label: "YouTube: The AI You Missed", href: "https://www.youtube.com/@theaiyoumissed", Icon: Youtube },
  { label: "The Daily Z newsletter", href: "https://the-z-letter.beehiiv.com", Icon: Mail },
  { label: "@adtanieducationventures", href: "https://www.instagram.com/adtanieducationventures", Icon: Instagram },
  { label: "Book a Call (Calendly)", href: "https://calendly.com/zkadtani", Icon: CalendarDays },
];

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      <LayoutShell>{children}</LayoutShell>
    </SidebarProvider>
  );
}

function LayoutShell({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollToHash />
      <ReadingProgressBar />
      {/* Single document scroll — no nested scroll container, so reveal effects
          and full-page rendering always see real viewport intersections. */}
      <div className="min-h-screen flex flex-col w-full bg-white">
        <div className="hidden">
          <AppSidebar />
        </div>

        <Header />

        <main className="flex-1 w-full">{children}</main>

        <footer className="bg-[#0A0F1A] text-white">
          <div className="container mx-auto px-4 sm:px-6 py-10 max-w-6xl">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
              {/* Brand */}
              <div className="flex flex-col gap-3 max-w-sm">
                <Link to="/" aria-label="Home" className="inline-flex items-center gap-2 w-fit">
                  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                    <line x1="10" y1="12" x2="38" y2="12" stroke="#DD5013" strokeWidth="4" strokeLinecap="round" />
                    <line x1="38" y1="12" x2="10" y2="36" stroke="#DD5013" strokeWidth="4" strokeLinecap="round" />
                    <line x1="10" y1="36" x2="38" y2="36" stroke="#DD5013" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                  <span className="font-display font-extrabold text-[15px] text-white">Zain Adtani</span>
                </Link>
                <p className="font-sans text-[13px] leading-relaxed text-white/70">
                  Adtani Education Ventures LLC · DFW, Texas
                </p>
                <a
                  href="https://the-z-letter.beehiiv.com/subscribe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit inline-flex items-center justify-center rounded-lg border border-white/25 px-4 py-2 font-sans font-semibold text-[13px] text-white hover:border-[#E9E4A6] hover:text-[#E9E4A6] transition-colors"
                >
                  Join The Z Letter
                </a>
              </div>

              {/* Sitemap columns */}
              <nav className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 flex-1" aria-label="Footer">
                {FOOTER_COLUMNS.map((col) => (
                  <div key={col.heading}>
                    <p className="font-sans text-[12px] font-semibold tracking-[0.14em] uppercase text-white/50 mb-3">{col.heading}</p>
                    <ul className="flex flex-col gap-2">
                      {col.links.map((l) => {
                        const cls = "font-sans text-[14px] text-white/75 hover:text-[#E9E4A6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9E4A6] rounded";
                        return (
                          <li key={l.label}>
                            {l.to.startsWith("http") ? (
                              <a href={l.to} target="_blank" rel="noopener noreferrer" className={cls}>{l.label}</a>
                            ) : (
                              <Link to={l.to} className={cls}>{l.label}</Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>

              {/* Socials */}
              <div className="flex flex-col gap-3">
                <p className="font-sans text-[12px] font-semibold tracking-[0.14em] uppercase text-white/50">
                  Find me
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  {FOOTER_SOCIALS.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className="text-white/70 hover:text-[#E9E4A6] transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="font-sans text-[12px] text-white/60">
                © 2026 Zain Adtani · Adtani Education Ventures LLC · DFW, Texas
              </p>
              <p className="font-sans text-[12px] text-white/60">
                Licensed Financial Educator · NPN 20207668
              </p>
            </div>
          </div>
        </footer>
      </div>

      <BackToTop />
      <AIChatWidget />
    </>
  );
}
