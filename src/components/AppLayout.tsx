import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { BackToTop } from "./BackToTop";
import { ReadingProgressBar } from "./ReadingProgressBar";
import { Header } from "./Header";
import { AIChatWidget } from "./AIChatWidget";
import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { Linkedin, Youtube, Mail } from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
}

const FOOTER_NAV = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Books", to: "/books" },
  { label: "Resources", to: "/resources" },
];

const FOOTER_SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/zainadtani", Icon: Linkedin },
  { label: "YouTube", href: "https://youtube.com/@zainadtani", Icon: Youtube },
  { label: "The Z Letter", href: "https://the-z-letter.beehiiv.com", Icon: Mail },
];

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      <LayoutShell>{children}</LayoutShell>
    </SidebarProvider>
  );
}

function LayoutShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  useSidebar();

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-gradient-to-r from-primary via-secondary to-primary" />
      <ReadingProgressBar />
      <div className="min-h-screen flex w-full">
        <div className="hidden">
          <AppSidebar />
        </div>
        <div className="flex-1 flex flex-col w-full">
          <Header />
          <main className="flex-1 overflow-auto">
            <div key={pathname} className="animate-fade-in">
              {children}
            </div>
          </main>
          <footer className="py-8 mt-8">
            {/* Gradient divider */}
            <div
              className="w-full h-px"
              style={{ background: "linear-gradient(90deg, transparent, #447BBE, transparent)" }}
            />
            <div className="container mx-auto px-4 max-w-6xl pt-8">
              {/* Z Logo */}
              <div className="flex justify-center mb-6">
                <Link
                  to="/"
                  aria-label="Home"
                  className="inline-block transition-transform duration-200 hover:rotate-[5deg] hover:scale-110"
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <line x1="10" y1="12" x2="38" y2="12" stroke="#DD5013" strokeWidth="3" strokeLinecap="round"
                      style={{ strokeDasharray: 28, strokeDashoffset: 28, animation: "drawZ 0.5s ease-out 0s forwards" }} />
                    <line x1="38" y1="12" x2="10" y2="36" stroke="#DD5013" strokeWidth="3" strokeLinecap="round"
                      style={{ strokeDasharray: 38, strokeDashoffset: 38, animation: "drawZ 0.6s ease-out 0.5s forwards" }} />
                    <line x1="10" y1="36" x2="38" y2="36" stroke="#DD5013" strokeWidth="3" strokeLinecap="round"
                      style={{ strokeDasharray: 28, strokeDashoffset: 28, animation: "drawZ 0.5s ease-out 1s forwards" }} />
                  </svg>
                </Link>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Left: copyright */}
                <div className="text-center md:text-left">
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    © 2026 Zain Adtani · Adtani Education Ventures LLC · DFW, Texas
                  </p>
                  <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                    HGI Associate · NPN 20207668
                  </p>
                </div>

                {/* Center: nav links */}
                <nav className="flex flex-wrap items-center justify-center gap-5">
                  {FOOTER_NAV.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="text-sm transition-colors duration-150"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#E9E4A6")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                    >
                      {l.label}
                    </Link>
                  ))}
                </nav>

                {/* Right: socials */}
                <div className="flex items-center gap-4">
                  {FOOTER_SOCIALS.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className="inline-block transition-all duration-150 hover:scale-110"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#447BBE")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </footer>

        </div>
      </div>
      <BackToTop />
      <AIChatWidget />
    </>
  );
}
