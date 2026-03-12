import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { WhatsAppFloating } from "@/components/WhatsAppButton";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageTransition } from "@/components/PageTransition";
import Index from "./pages/Index.tsx";
import BairroPage from "./pages/BairroPage.tsx";
import EmpresaPage from "./pages/EmpresaPage.tsx";
import ServicoPage from "./pages/ServicoPage.tsx";
import FAQPage from "./pages/FAQPage.tsx";
import BuscaPage from "./pages/BuscaPage.tsx";
import CadastrarEmpresaPage from "./pages/CadastrarEmpresaPage.tsx";
import AnuncieAquiPage from "./pages/AnuncieAquiPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <EmergencyBanner />
        <Header />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/curitiba/:bairro" element={<BairroPage />} />
            <Route path="/empresa/:slug" element={<EmpresaPage />} />
            <Route path="/servicos/:slug" element={<ServicoPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/busca" element={<BuscaPage />} />
            <Route path="/cadastrar-empresa" element={<CadastrarEmpresaPage />} />
            <Route path="/anuncie-aqui" element={<AnuncieAquiPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
        <Footer />
        <WhatsAppFloating />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
