import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-black text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-2">Página não encontrada</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          A página que você procura não existe ou foi movida. Tente buscar o que precisa.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
          >
            <Home className="h-4 w-4" /> Página Inicial
          </Link>
          <Link
            to="/busca"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Search className="h-4 w-4" /> Buscar Empresas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
