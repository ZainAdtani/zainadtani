import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { BackToTop } from "./BackToTop";
import { ReadingProgressBar } from "./ReadingProgressBar";
import { Header } from "./Header";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { pathname } = useLocation();

  return (
    <SidebarProvider defaultOpen={false}>
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
          <footer className="bg-background border-t border-border py-8">
            <div className="container mx-auto px-4 max-w-6xl text-center space-y-2">
              <a
                href="https://buymeacoffee.com/curiouszen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="Buy me a coffee"
              >
                ☕ Support my work
              </a>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Zain Education Ventures. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
      {/* Global Back to Top button */}
      <BackToTop />
    </SidebarProvider>
  );
}
