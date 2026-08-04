import { lazy, Suspense } from "react";
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
import Index from "./pages/Index";

// Code splitting: só a home entra no bundle inicial (LCP mais rápido).
const BairroPage = lazy(() => import("./pages/BairroPage"));
const EmpresaPage = lazy(() => import("./pages/EmpresaPage"));
const ServicoPage = lazy(() => import("./pages/ServicoPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const BuscaPage = lazy(() => import("./pages/BuscaPage"));
const CadastrarEmpresaPage = lazy(() => import("./pages/CadastrarEmpresaPage"));
const AnuncieAquiPage = lazy(() => import("./pages/AnuncieAquiPage"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const PrivacidadePage = lazy(() => import("./pages/PrivacidadePage"));
const TermosPage = lazy(() => import("./pages/TermosPage"));
const QuemSomosPage = lazy(() => import("./pages/QuemSomosPage"));
const ComoFuncionaPage = lazy(() => import("./pages/ComoFuncionaPage"));
const ComoSelecionamosPage = lazy(() => import("./pages/ComoSelecionamosPage"));
const PoliticaEditorialPage = lazy(() => import("./pages/PoliticaEditorialPage"));
const ContatoPage = lazy(() => import("./pages/ContatoPage"));
const GuiaLimpaFossaPage = lazy(() => import("./pages/GuiaLimpaFossaPage"));
const CameraInspecaoPage = lazy(() => import("./pages/CameraInspecaoPage"));
const BlogIndexPage = lazy(() => import("./pages/BlogIndexPage"));
const BlogCategoriaPage = lazy(() => import("./pages/BlogCategoriaPage"));
const BlogArtigoPage = lazy(() => import("./pages/BlogArtigoPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-live="polite">
    <span className="sr-only">Carregando conteúdo</span>
    <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

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
          <main id="conteudo">
          <Suspense fallback={<RouteFallback />}>

            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/curitiba/:bairro" element={<BairroPage />} />
              <Route path="/rmc/:bairro" element={<BairroPage />} />
              <Route path="/empresa/:slug" element={<EmpresaPage />} />
              <Route path="/servicos/guia-limpa-fossa" element={<GuiaLimpaFossaPage />} />
              <Route path="/servicos/desentupimento-curitiba" element={<LandingPage />} />
              <Route path="/servicos/encanador-curitiba" element={<LandingPage />} />
              <Route path="/servicos/desentupidora-24h-curitiba" element={<LandingPage />} />
              <Route path="/servicos/limpa-fossa-curitiba" element={<LandingPage />} />
              <Route path="/servicos/hidrojateamento-curitiba" element={<LandingPage />} />
              <Route path="/sao-jose-dos-pinhais" element={<LandingPage />} />
              <Route path="/colombo" element={<LandingPage />} />
              <Route path="/pinhais" element={<LandingPage />} />
              <Route path="/servicos/:slug" element={<ServicoPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/busca" element={<BuscaPage />} />
              <Route path="/blog" element={<BlogIndexPage />} />
              <Route path="/blog/categoria/:categoria" element={<BlogCategoriaPage />} />
              <Route path="/blog/:slug" element={<BlogArtigoPage />} />
              <Route path="/cadastrar-empresa" element={<CadastrarEmpresaPage />} />
              <Route path="/anuncie-aqui" element={<AnuncieAquiPage />} />
              <Route path="/quem-somos" element={<QuemSomosPage />} />
              <Route path="/como-funciona" element={<ComoFuncionaPage />} />
              <Route path="/como-selecionamos-profissionais" element={<ComoSelecionamosPage />} />
              <Route path="/politica-editorial" element={<PoliticaEditorialPage />} />
              <Route path="/contato" element={<ContatoPage />} />
              <Route path="/privacidade" element={<PrivacidadePage />} />
              <Route path="/termos" element={<TermosPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          </main>
        </PageTransition>

        <Footer />
        <WhatsAppFloating />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
