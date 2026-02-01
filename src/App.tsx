import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import SecretVault from "./pages/SecretVault";
import EnrolledAgent from "./pages/EnrolledAgent";
import AIPrompts from "./pages/AIPrompts";
import WebsiteLab from "./pages/WebsiteLab";
import BooksHQ from "./pages/BooksHQ";
import Investing from "./pages/Investing";
import QuickBooks from "./pages/QuickBooks";
import MyPodcast from "./pages/MyPodcast";
import Thanks from "./pages/Thanks";
import DigitalProductsPage from "./pages/DigitalProductsPage";
import LifeNotes from "./pages/LifeNotes";
import VaultSubscriptions from "./pages/VaultSubscriptions";
import PersonalLearningVault from "./pages/PersonalLearningVault";
import QuickBooksCleanup from "./pages/QuickBooksCleanup";
import QuickBooksFastTrack from "./pages/QuickBooksFastTrack";
import Sports from "./pages/Sports";
import Health from "./pages/Health";
import Archive from "./pages/Archive";
import FinancialTreasureMap from "./pages/FinancialTreasureMap";
import Waez from "./pages/Waez";
import Services from "./pages/Services";
import TaxQuest from "./pages/TaxQuest";

// Project sub-pages
import HarryPotterWorld from "./pages/projects/HarryPotterWorld";
import AiAvatars from "./pages/projects/AiAvatars";
import TalkToAI from "./pages/projects/TalkToAI";
import AiSongs from "./pages/projects/AiSongs";
import EAStudyChatbot from "./pages/projects/EAStudyChatbot";

// USA Visit 2025 sub-pages
import DevotionalLiterature from "./pages/usa-visit-2025/DevotionalLiterature";
import Illuminate from "./pages/usa-visit-2025/Illuminate";

import Resume from "./pages/Resume";
import LegacyEATax from "./pages/LegacyEATax";

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
          <Route path="/projects/ea-study-chatbot" element={<EAStudyChatbot />} />
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
            <Route path="/health" element={<Health />} />
            <Route path="/workout" element={<Navigate to="/health" replace />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/services" element={<Services />} />
            <Route path="/my-podcast" element={<MyPodcast />} />
            <Route path="/tax-quest" element={<TaxQuest />} />
            <Route path="/financial-treasure-map" element={<FinancialTreasureMap />} />
            <Route path="/personal-learning-vault" element={<PersonalLearningVault />} />
            <Route path="/website-lab" element={<WebsiteLab />} />
            <Route path="/resume" element={<Resume />} />
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
