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
        </div>
      </div>
      {/* Global Back to Top button */}
      <BackToTop />
    </SidebarProvider>
  );
}
