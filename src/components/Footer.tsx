import { Link } from 'react-router-dom';
import { Droplets, Heart, ShieldCheck, ThumbsUp, Award, Mail, Phone, MessageCircle } from 'lucide-react';
import { regionais } from '@/data/bairros';
import { servicos } from '@/data/servicos';

function toSlug(nome: string): string {
  return nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function Footer() {
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
            <p className="text-sm text-background/70 mb-4">
              O maior diretório de desentupidoras e encanadores de Curitiba e Região Metropolitana.
            </p>
            <div className="space-y-2 text-sm text-background/70">
              <a href="https://wa.me/5541985171966?text=Olá! Vim pelo site servicosnobairro.com.br (rodapé)" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-background transition-colors">
                <MessageCircle className="h-4 w-4" /> (41) 98517-1966
              </a>
              <a href="tel:4133451194" className="flex items-center gap-2 hover:text-background transition-colors">
                <Phone className="h-4 w-4" /> (41) 3345-1194
              </a>
              <a href="mailto:adpencanadores@gmail.com" className="flex items-center gap-2 hover:text-background transition-colors">
                <Mail className="h-4 w-4" /> adpencanadores@gmail.com
              </a>
            </div>
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

        {/* Trust Seals */}
        <div className="border-t border-background/20 mt-8 pt-8">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 bg-background/10 rounded-xl px-5 py-3 border border-background/20">
              <ShieldCheck className="h-8 w-8 text-accent" />
              <div>
                <div className="font-bold text-sm">Empresa Verificada</div>
                <div className="text-xs text-background/60">Dados conferidos</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-background/10 rounded-xl px-5 py-3 border border-background/20">
              <Award className="h-8 w-8 text-secondary" />
              <div>
                <div className="font-bold text-sm">Selo de Confiança</div>
                <div className="text-xs text-background/60">Profissionais qualificados</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-background/10 rounded-xl px-5 py-3 border border-background/20">
              <ThumbsUp className="h-8 w-8 text-accent" />
              <div>
                <div className="font-bold text-sm">Zero Reclamações</div>
                <div className="text-xs text-background/60">Reclame Aqui</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/20 mt-8 pt-6 text-center space-y-3">
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} servicosnobairro.com.br — Todos os direitos reservados.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-background/40">
            <span>Desenvolvido com</span>
            <Heart className="h-4 w-4 text-destructive animate-heartbeat" fill="currentColor" />
            <span>por</span>
            <a
              href="https://supremasite.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-background/70 hover:text-background transition-colors"
            >
              Suprema Sites Express
            </a>
          </div>
          <div className="flex justify-center">
            <a href="https://supremasite.com.br" target="_blank" rel="noopener noreferrer">
              <img
                src="/suprema-img.png"
                alt="Suprema Sites Express — Desenvolvimento Web"
                className="h-10 opacity-60 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
