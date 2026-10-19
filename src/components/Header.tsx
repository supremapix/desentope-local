import { Link, useLocation } from 'react-router-dom';
import { MapPin, Menu, X } from 'lucide-react';
import { useState, useEffect, useId, useRef } from 'react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuId = useId();
  const location = useLocation();
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 border-b ${
        scrolled
          ? 'bg-card/95 backdrop-blur-md border-border shadow-xs'
          : 'bg-card border-border/80'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground shadow-xs">
            <MapPin className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-base tracking-tight text-foreground">
              Serviços <span className="text-muted-foreground font-normal">no Bairro</span>
            </span>
            <span className="text-[10.5px] text-muted-foreground font-medium uppercase tracking-wider">
              Guia Regional de Serviços
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link
            to="/curitiba/centro"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Bairros
          </Link>
          <Link
            to="/busca"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Buscar Serviços
          </Link>
          <Link
            to="/faq"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Dúvidas & FAQ
          </Link>
          <Link
            to="/anuncie-aqui"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Para Empresas
          </Link>
          <Link
            to="/cadastrar-empresa"
            className="inline-flex items-center justify-center h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-xs"
          >
            Cadastrar Empresa
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
          aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          aria-expanded={menuOpen}
          aria-controls={mobileMenuId}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <nav
        id={mobileMenuId}
        aria-label="Navegação móvel"
        hidden={!menuOpen}
        className="md:hidden border-t border-border bg-card px-4 py-4 space-y-2 animate-in fade-in-50 duration-150"
      >
        <Link
          to="/curitiba/centro"
          onClick={closeMenu}
          className="block px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          Bairros de Curitiba
        </Link>
        <Link
          to="/busca"
          onClick={closeMenu}
          className="block px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          Buscar Serviços
        </Link>
        <Link
          to="/faq"
          onClick={closeMenu}
          className="block px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          Dúvidas Frequentes (FAQ)
        </Link>
        <Link
          to="/anuncie-aqui"
          onClick={closeMenu}
          className="block px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          Para Empresas e Anunciantes
        </Link>
        <div className="pt-2">
          <Link
            to="/cadastrar-empresa"
            onClick={closeMenu}
            className="block w-full text-center py-2.5 px-4 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
          >
            Cadastrar Empresa no Guia
          </Link>
        </div>
      </nav>
    </header>
  );
}
