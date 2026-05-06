import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { BackToTop } from "./BackToTop";
import { ReadingProgressBar } from "./ReadingProgressBar";
import { Header } from "./Header";
import { AIChatWidget } from "./AIChatWidget";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: ReactNode;
}

const FOOTER_NAV = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Books", to: "/books" },
  { label: "Resources", to: "/prompts" },
  { label: "Products", to: "/digital-products" },
];

const FOOTER_CONNECT = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/zainadtani/" },
  { label: "YouTube", href: "https://youtube.com/@captainduaadventures?si=xPzuebAHwHZTl52V" },
  { label: "The Z Letter", href: "https://thezletter.beehiiv.com/subscribe" },
  { label: "Email", href: "mailto:zkadtani@gmail.com" },
];

const FOOTER_MORE = [
  { label: "About", to: "/about", internal: true },
  { label: "Book a Call", to: "https://calendly.com/zkadtani", internal: false },
];

export function AppLayout({ children }: AppLayoutProps) {
  const { pathname } = useLocation();

  return (
    <SidebarProvider defaultOpen={false}>
      {/* Brand accent line */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-gradient-to-r from-primary via-secondary to-primary" />
      {/* Global Reading Progress Bar */}
      <ReadingProgressBar />
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col w-full">
          {/* Global Header */}
          <Header />
          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div key={pathname} className="animate-fade-in">
              {children}
            </div>
          </main>
          {/* Global Footer */}
          <footer className="bg-background border-t border-border py-12 mt-8">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Navigate</h4>
                  <ul className="space-y-2">
                    {FOOTER_NAV.map((l) => (
                      <li key={l.to}>
                        <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Connect</h4>
                  <ul className="space-y-2">
                    {FOOTER_CONNECT.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                          rel={l.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">More</h4>
                  <ul className="space-y-2">
                    {FOOTER_MORE.map((l) =>
                      l.internal ? (
                        <li key={l.label}>
                          <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            {l.label}
                          </Link>
                        </li>
                      ) : (
                        <li key={l.label}>
                          <a
                            href={l.to}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {l.label}
                          </a>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>

              <div className="border-t border-border/60 pt-6 relative">
                <div className="flex flex-col items-center gap-2 text-center">
                  <a
                    href="https://buymeacoffee.com/curiouszen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    ☕ Support my work
                  </a>
                  <p className="text-xs text-muted-foreground">
                    © 2026 Zain Adtani · Adtani Education Ventures LLC · DFW, Texas
                  </p>
                </div>
                <Link
                  to="/z-hub"
                  aria-label="Z Hub"
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[11px] font-bold font-sans hover:scale-110 hover:shadow-[0_0_12px_rgba(0,212,170,0.6)] transition-all duration-300"
                >
                  Z
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
      {/* Global floating widgets */}
      <BackToTop />
      <AIChatWidget />
    </SidebarProvider>
  );
}
