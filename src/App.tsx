
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VisionMission from "./pages/VisionMission";
import Actions from "./pages/Actions";
import Temoignages from "./pages/Temoignages";
import Equipe from "./pages/Equipe";
import FaireUnDon from "./pages/FaireUnDon";
import PrierAvecNous from "./pages/PrierAvecNous";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import MediaLibrary from "./pages/MediaLibrary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/actions" element={<Actions />} />
          <Route path="/temoignages" element={<Temoignages />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/faire-un-don" element={<FaireUnDon />} />
          <Route path="/prier-avec-nous" element={<PrierAvecNous />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/media-library" element={<MediaLibrary />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
