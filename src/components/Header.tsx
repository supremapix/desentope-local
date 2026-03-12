import { Link } from 'react-router-dom';
import { Droplets, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 font-black text-xl">
          <Droplets className="h-7 w-7" />
          <span>Serviços no Bairro</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/curitiba/centro" className="hover:text-primary-foreground/80 transition-colors">Bairros</Link>
          <Link to="/busca" className="hover:text-primary-foreground/80 transition-colors">Buscar</Link>
          <Link to="/faq" className="hover:text-primary-foreground/80 transition-colors">FAQ</Link>
          <Link to="/cadastrar-empresa" className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-bold hover:bg-secondary/90 transition-colors">
            Cadastrar Empresa
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2"
          aria-label="Menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-primary-foreground/20 px-4 py-4 space-y-3">
          <Link to="/curitiba/centro" onClick={() => setMenuOpen(false)} className="block py-2">Bairros</Link>
          <Link to="/busca" onClick={() => setMenuOpen(false)} className="block py-2">Buscar</Link>
          <Link to="/faq" onClick={() => setMenuOpen(false)} className="block py-2">FAQ</Link>
          <Link to="/cadastrar-empresa" onClick={() => setMenuOpen(false)} className="block bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-bold text-center">
            Cadastrar Empresa
          </Link>
        </nav>
      )}
    </header>
  );
}
