import { Link } from "react-router-dom";
import { Home, Search, HelpCircle, Phone, MessageCircle, MapPin, AlertTriangle, Zap } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const NotFound = () => {
  useSEO({
    title: 'Página não encontrada | Serviços no Bairro',
    description: 'A página que você procura não existe. Encontre desentupidoras e encanadores em Curitiba e região.',
    canonical: '/404',
  });

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16">
      <div className="text-center px-4 max-w-2xl mx-auto">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>

        <h1 className="text-6xl font-black text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-2">Página não encontrada</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          A página que você procura não existe ou foi movida. Use os links abaixo para encontrar o que precisa.
        </p>

        {/* Links Rápidos */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
          >
            <Home className="h-4 w-4" /> Início
          </Link>
          <Link
            to="/busca"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Search className="h-4 w-4" /> Buscar Empresas
          </Link>
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-lg border-2 border-muted-foreground/30 text-foreground font-bold hover:bg-muted transition-colors"
          >
            <HelpCircle className="h-4 w-4" /> FAQ
          </Link>
        </div>

        {/* Bairros populares */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-muted-foreground mb-3 flex items-center justify-center gap-1">
            <MapPin className="h-4 w-4" /> Bairros mais procurados
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['centro', 'agua-verde', 'batel', 'boqueirao', 'cajuru', 'portao', 'xaxim', 'pinheirinho'].map(b => (
              <Link
                key={b}
                to={`/curitiba/${b}`}
                className="text-sm px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 text-foreground hover:text-primary transition-colors"
              >
                {b.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </Link>
            ))}
          </div>
        </div>

        {/* Contato direto */}
        <div className="border-t pt-6">
          <p className="text-sm text-muted-foreground mb-4">Precisa de atendimento urgente?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/5541985171966?text=Ol%C3%A1%2C%20preciso%20de%20um%20or%C3%A7amento%20urgente"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-accent text-accent-foreground font-bold hover:bg-accent/90 transition-colors"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp (41) 98517-1966
            </a>
            <a
              href="tel:+554133451194"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-lg border-2 border-destructive text-destructive font-bold hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <Phone className="h-4 w-4" /> Ligar (41) 3345-1194
            </a>
            <Link
              to="/servicos/emergencia-24h"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-secondary text-secondary-foreground font-bold hover:bg-secondary/80 transition-colors"
            >
              <Zap className="h-4 w-4" /> Emergência 24h
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;