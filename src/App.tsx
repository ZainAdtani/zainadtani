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
import Resources from "./pages/Resources";
import AIPrompts from "./pages/AIPrompts";
import LifeNotes from "./pages/LifeNotes";
import QuickBooks from "./pages/QuickBooks";
import QuickBooksFastTrack from "./pages/QuickBooksFastTrack";
import QuickBooksCleanup from "./pages/QuickBooksCleanup";
import Thanks from "./pages/Thanks";
import TalkToAI from "./pages/projects/TalkToAI";
import HarryPotterWorld from "./pages/projects/HarryPotterWorld";
import AiSongs from "./pages/projects/AiSongs";
import DevotionalLiterature from "./pages/usa-visit-2025/DevotionalLiterature";
import Illuminate from "./pages/usa-visit-2025/Illuminate";
import Workout from "./pages/Workout";
import Services from "./pages/Services";
import MyPodcast from "./pages/MyPodcast";
import TaxQuest from "./pages/TaxQuest";
import FinancialTreasureMap from "./pages/FinancialTreasureMap";
import PersonalLearningVault from "./pages/PersonalLearningVault";
import WebsiteLab from "./pages/WebsiteLab";

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
          <Route path="/projects/ai" element={<TalkToAI />} />
          <Route path="/projects/harry-potter-world" element={<HarryPotterWorld />} />
          <Route path="/projects/ai-songs" element={<AiSongs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/ai-prompts" element={<AIPrompts />} />
            <Route path="/life-notes" element={<LifeNotes />} />
            <Route path="/quickbooks" element={<QuickBooks />} />
            <Route path="/quickbooks/fast-track" element={<QuickBooksFastTrack />} />
            <Route path="/quickbooks/cleanup" element={<QuickBooksCleanup />} />
            <Route path="/usa-visit-2025/devotional-literature" element={<DevotionalLiterature />} />
            <Route path="/usa-visit-2025/illuminate" element={<Illuminate />} />
            <Route path="/workout" element={<Workout />} />
            <Route path="/services" element={<Services />} />
            <Route path="/my-podcast" element={<MyPodcast />} />
            <Route path="/tax-quest" element={<TaxQuest />} />
            <Route path="/financial-treasure-map" element={<FinancialTreasureMap />} />
            <Route path="/personal-learning-vault" element={<PersonalLearningVault />} />
            <Route path="/website-lab" element={<WebsiteLab />} />
            <Route path="/thanks" element={<Thanks />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
