import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Projects from "./pages/Projects";
import ProjectPokedex from "./pages/ProjectPokedex";
import Tools from "./pages/Tools";
import Resources from "./pages/Resources";
import AIPrompts from "./pages/AIPrompts";
import BooksHQ from "./pages/BooksHQ";
import Investing from "./pages/Investing";
import MyPodcast from "./pages/MyPodcast";
import DigitalProductsPage from "./pages/DigitalProductsPage";
import LifeNotes from "./pages/LifeNotes";
import Archive from "./pages/Archive";
import Waez from "./pages/Waez";
import Services from "./pages/Services";

// Project sub-pages
import HarryPotterWorld from "./pages/projects/HarryPotterWorld";
import AiAvatars from "./pages/projects/AiAvatars";
import TalkToAI from "./pages/projects/TalkToAI";
import AiSongs from "./pages/projects/AiSongs";

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
            <Route path="/tools" element={<Tools />} />
            <Route path="/waez" element={<Waez />} />
            <Route path="/books" element={<BooksHQ />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/pokedex" element={<ProjectPokedex />} />
            <Route path="/projects/ai-avatars" element={<AiAvatars />} />
            <Route path="/projects/ai" element={<TalkToAI />} />
            <Route path="/projects/harry-potter-world" element={<HarryPotterWorld />} />
            <Route path="/projects/ai-songs" element={<AiSongs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/ai-prompts" element={<AIPrompts />} />
            <Route path="/life-notes" element={<LifeNotes />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/services" element={<Services />} />
            <Route path="/my-podcast" element={<MyPodcast />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
