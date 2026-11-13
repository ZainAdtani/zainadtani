import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Services from "./pages/Services";
import Connect from "./pages/Connect";
import FamilyProtectionGap from "./pages/FamilyProtectionGap";
import MissedCallCalculator from "./pages/MissedCallCalculator";
import AICheckup from "./pages/AICheckup";
import BuzzerBlockPrivacy from "./pages/BuzzerBlockPrivacy";
import DailyLifeNotes, { LifeNotePage } from "./pages/DailyLifeNotes";

const Projects = lazy(() => import("./pages/Projects"));
const Tools = lazy(() => import("./pages/Tools"));
const Resources = lazy(() => import("./pages/Resources"));
const AIPrompts = lazy(() => import("./pages/AIPrompts"));
const BooksHQ = lazy(() => import("./pages/BooksHQ"));
const Investing = lazy(() => import("./pages/Investing"));
const DigitalProductsPage = lazy(() => import("./pages/DigitalProductsPage"));
const LifeNotes = lazy(() => import("./pages/LifeNotes"));
const Prompts = lazy(() => import("./pages/Prompts"));
const HarryPotter = lazy(() => import("./pages/HarryPotter"));
const PokemonDex = lazy(() => import("./pages/PokemonDex"));
const LabelIQ = lazy(() => import("./pages/LabelIQ"));
const Lab = lazy(() => import("./pages/Lab"));
const KDPCopilot = lazy(() => import("./pages/KDPCopilot"));
const RothIRAGame = lazy(() => import("./pages/RothIRAGame"));
const LifeInsuranceCalculator = lazy(() => import("./pages/LifeInsuranceCalculator"));
const FinalExpenseEstimator = lazy(() => import("./pages/FinalExpenseEstimator"));
const TermVsWholeLifeQuiz = lazy(() => import("./pages/TermVsWholeLifeQuiz"));
const OwnerStressTest = lazy(() => import("./pages/OwnerStressTest"));
const AINewsSongs = lazy(() => import("./pages/AINewsSongs"));
const AiSongs = lazy(() => import("./pages/projects/AiSongs"));

function PageFallback() {
  return (
    <div className="hero-warm min-h-[50vh]" role="status" aria-live="polite">
      <span className="sr-only">Loading</span>
    </div>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/kdp-copilot" element={<Suspense fallback={<PageFallback />}><KDPCopilot /></Suspense>} />
          <Route
            path="*"
            element={
              <AppLayout>
                <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/investing" element={<Investing />} />
                  <Route path="/resources/investing" element={<Navigate to="/investing" replace />} />
                  <Route path="/lab" element={<Lab />} />
                  <Route path="/digital-products" element={<DigitalProductsPage />} />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="/books" element={<BooksHQ />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/ai-songs" element={<AiSongs />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/ai-prompts" element={<AIPrompts />} />
                  <Route path="/life-notes" element={<LifeNotes />} />
                  
                  <Route path="/services" element={<Services />} />
                  <Route path="/connect" element={<Connect />} />
                  <Route path="/prompts" element={<Prompts />} />
                  <Route path="/harry-potter" element={<HarryPotter />} />
                  <Route path="/pokedex" element={<PokemonDex />} />
                  
                  <Route path="/resources/label-iq" element={<LabelIQ />} />
                  <Route path="/family-protection-gap" element={<FamilyProtectionGap />} />
                  <Route path="/roth-ira-game" element={<RothIRAGame />} />
                  <Route path="/resources/life-insurance-calculator" element={<LifeInsuranceCalculator />} />
                  <Route path="/resources/final-expense-estimator" element={<FinalExpenseEstimator />} />
                  <Route path="/resources/term-vs-whole-life-quiz" element={<TermVsWholeLifeQuiz />} />
                  <Route path="/missed-call-calculator" element={<MissedCallCalculator />} />
                  <Route path="/owner-stress-test" element={<OwnerStressTest />} />
                  <Route path="/ai-checkup" element={<AICheckup />} />
                  <Route path="/resources/ai-news-songs" element={<AINewsSongs />} />
                  <Route path="/buzzerblock-privacy" element={<BuzzerBlockPrivacy />} />
                  <Route path="/lifenotes" element={<DailyLifeNotes />} />
                  <Route path="/lifenotes/:noteId" element={<LifeNotePage />} />
                  <Route path="/label-iq" element={<Navigate to="/resources/label-iq" replace />} />
                  <Route path="/archive" element={<Navigate to="/lifenotes" replace />} />
                  <Route path="/projects/pokedex" element={<Navigate to="/pokedex" replace />} />
                  <Route path="/projects/harry-potter-world" element={<Navigate to="/harry-potter" replace />} />
                  <Route path="/newsletter" element={<Navigate to="/#z-letter" replace />} />
                  <Route path="/the-z-letter" element={<Navigate to="/#z-letter" replace />} />
                  <Route path="/thezletter" element={<Navigate to="/#z-letter" replace />} />
                  <Route path="/start" element={<Navigate to="/#start" replace />} />
                  <Route path="/start-here" element={<Navigate to="/#start" replace />} />
                  <Route path="/apps" element={<Navigate to="/#apps" replace />} />

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                </Suspense>
              </AppLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
