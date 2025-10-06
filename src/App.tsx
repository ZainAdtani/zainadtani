import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Investing from "./pages/Investing";
import DigitalProductsPage from "./pages/DigitalProductsPage";
import SecretVault from "./pages/SecretVault";
import VaultSubscriptions from "./pages/VaultSubscriptions";
import Tools from "./pages/Tools";
import EnrolledAgent from "./pages/EnrolledAgent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/investing" element={<Investing />} />
          <Route path="/digital-products" element={<DigitalProductsPage />} />
          <Route path="/vault" element={<SecretVault />} />
          <Route path="/vault/subscriptions" element={<VaultSubscriptions />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/enrolled-agent" element={<EnrolledAgent />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
