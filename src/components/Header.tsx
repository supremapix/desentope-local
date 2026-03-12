import { Link, useLocation } from 'react-router-dom';
import { Droplets, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bg-primary text-primary-foreground sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'shadow-lg shadow-primary/20' : ''}`}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 font-black text-xl group">
          <Droplets className="h-7 w-7 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 animate-[pulse_3s_ease-in-out_infinite]" />
          <span className="transition-all duration-300 group-hover:tracking-wider">Serviços no Bairro</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/curitiba/centro" className="relative hover:text-primary-foreground/80 transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary-foreground after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Bairros</Link>
          <Link to="/busca" className="relative hover:text-primary-foreground/80 transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary-foreground after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Buscar</Link>
          <Link to="/faq" className="relative hover:text-primary-foreground/80 transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary-foreground after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">FAQ</Link>
          <Link to="/anuncie-aqui" className="relative hover:text-primary-foreground/80 transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary-foreground after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Anuncie Aqui</Link>
          <Link to="/cadastrar-empresa" className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-bold hover:bg-secondary/90 transition-all hover:scale-105 hover:shadow-lg">
            Cadastrar Empresa
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 transition-transform duration-200 active:scale-90"
          aria-label="Menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <nav className={`md:hidden border-t border-primary-foreground/20 px-4 overflow-hidden transition-all duration-300 ease-out ${menuOpen ? 'max-h-80 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
        <div className="space-y-3">
          <Link to="/curitiba/centro" className="block py-2 transition-transform hover:translate-x-2">Bairros</Link>
          <Link to="/busca" className="block py-2 transition-transform hover:translate-x-2">Buscar</Link>
          <Link to="/faq" className="block py-2 transition-transform hover:translate-x-2">FAQ</Link>
          <Link to="/anuncie-aqui" className="block py-2 transition-transform hover:translate-x-2">Anuncie Aqui</Link>
          <Link to="/cadastrar-empresa" className="block bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-bold text-center hover:bg-secondary/90 transition-colors">
            Cadastrar Empresa
          </Link>
        </div>
      </nav>
    </header>
  );
}
