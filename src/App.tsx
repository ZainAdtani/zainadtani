import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import Investing from "./pages/Investing";
import DigitalProductsPage from "./pages/DigitalProductsPage";
import SecretVault from "./pages/SecretVault";
import VaultSubscriptions from "./pages/VaultSubscriptions";
import Tools from "./pages/Tools";
import EnrolledAgent from "./pages/EnrolledAgent";
import Sports from "./pages/Sports";
import Waez from "./pages/Waez";
import { Navigate } from "react-router-dom";
import BooksHQ from "./pages/BooksHQ";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import ProjectPokedex from "./pages/ProjectPokedex";
import AiAvatars from "./pages/projects/AiAvatars";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/investing" element={<Investing />} />
            <Route path="/digital-products" element={<DigitalProductsPage />} />
            <Route path="/vault" element={<SecretVault />} />
            <Route path="/vault/subscriptions" element={<VaultSubscriptions />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/enrolled-agent" element={<EnrolledAgent />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/nba" element={<Navigate to="/sports#nba" replace />} />
            <Route path="/waez" element={<Waez />} />
            <Route path="/books" element={<BooksHQ />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/pokedex" element={<ProjectPokedex />} />
            <Route path="/projects/ai-avatars" element={<AiAvatars />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
