import { Link } from 'react-router-dom';
import { Droplets } from 'lucide-react';
import { regionais } from '@/data/bairros';
import { servicos } from '@/data/servicos';

function toSlug(nome: string): string {
  return nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function Footer() {
  const mainRegionais = Object.keys(regionais).slice(0, 4);
  const mainServicos = servicos.slice(0, 6);

  return (
    <footer className="bg-foreground text-background mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 font-black text-xl mb-4">
              <Droplets className="h-6 w-6" />
              Serviços no Bairro
            </Link>
            <p className="text-sm text-background/70">
              O maior diretório de desentupidoras e encanadores de Curitiba e Região Metropolitana.
            </p>
          </div>

          {/* Bairros */}
          <div>
            <h3 className="font-bold mb-3">Bairros Populares</h3>
            <ul className="space-y-1 text-sm text-background/70">
              {['Centro', 'Batel', 'Água Verde', 'Boa Vista', 'Portão', 'CIC'].map(b => (
                <li key={b}><Link to={`/curitiba/${toSlug(b)}`} className="hover:text-background">{b}</Link></li>
              ))}
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="font-bold mb-3">Serviços</h3>
            <ul className="space-y-1 text-sm text-background/70">
              {mainServicos.map(s => (
                <li key={s.slug}><Link to={`/servicos/${s.slug}`} className="hover:text-background">{s.nome}</Link></li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-3">Links</h3>
            <ul className="space-y-1 text-sm text-background/70">
              <li><Link to="/busca" className="hover:text-background">Buscar Empresas</Link></li>
              <li><Link to="/faq" className="hover:text-background">Perguntas Frequentes</Link></li>
              <li><Link to="/cadastrar-empresa" className="hover:text-background">Cadastrar Empresa</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-6 text-center text-sm text-background/50">
          <p>© {new Date().getFullYear()} servicosnobairro.com.br — Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
