import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { BackToTop } from "./BackToTop";
import { ReadingProgressBar } from "./ReadingProgressBar";
import { Header } from "./Header";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
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
            {children}
          </main>
        </div>
      </div>
      {/* Global Back to Top button */}
      <BackToTop />
    </SidebarProvider>
  );
}
