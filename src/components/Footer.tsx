import { Link } from 'react-router-dom';
import { Droplets, Heart, ShieldCheck, ThumbsUp, Award, Mail, Phone, MessageCircle, Star, CheckCircle } from 'lucide-react';
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 font-black text-xl mb-4 group">
              <Droplets className="h-6 w-6 transition-transform duration-500 group-hover:rotate-12 animate-[pulse_3s_ease-in-out_infinite]" />
              <span className="transition-all duration-300 group-hover:tracking-wider">Serviços no Bairro</span>
            </Link>
            <p className="text-sm text-background/70 mb-4">
              O maior diretório de desentupidoras e encanadores de Curitiba e Região Metropolitana.
            </p>
            <div className="space-y-2 text-sm text-background/70">
              <a href="https://wa.me/5541992721004?text=Olá! Vim pelo site servicosnobairro.com.br (rodapé)" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-background transition-all hover:translate-x-1">
                <MessageCircle className="h-4 w-4" /> (41) 99272-1004
              </a>
              <a href="tel:5541987001004" className="flex items-center gap-2 hover:text-background transition-all hover:translate-x-1">
                <Phone className="h-4 w-4" /> (41) 98700-1004
              </a>
              <a href="mailto:sac@aloanuncio.com.br" className="flex items-center gap-2 hover:text-background transition-all hover:translate-x-1">
                <Mail className="h-4 w-4" /> sac@aloanuncio.com.br
              </a>
            </div>
          </div>

          {/* Bairros */}
          <div>
            <h3 className="font-bold mb-3">Bairros Populares</h3>
            <ul className="space-y-1 text-sm text-background/70">
              {['Centro', 'Batel', 'Água Verde', 'Boa Vista', 'Portão', 'CIC', 'Cajuru', 'Boqueirão', 'Santa Felicidade', 'Pinheirinho', 'Rebouças', 'Cabral', 'Juvevê', 'São Francisco', 'Hugo Lange', 'Jardim Botânico', 'Xaxim', 'Hauer', 'Uberaba', 'Campo Comprido'].map(b => (
                <li key={b}><Link to={`/curitiba/${toSlug(b)}`} className="hover:text-background transition-all hover:translate-x-1 inline-block">{b}</Link></li>
              ))}
            </ul>
          </div>

          {/* Cidades RMC */}
          <div>
            <h3 className="font-bold mb-3">Cidades da RMC</h3>
            <ul className="space-y-1 text-sm text-background/70">
              {[
                { nome: 'São José dos Pinhais', to: '/sao-jose-dos-pinhais' },
                { nome: 'Colombo', to: '/colombo' },
                { nome: 'Pinhais', to: '/pinhais' },
                { nome: 'Araucária', to: '/rmc/araucaria' },
                { nome: 'Fazenda Rio Grande', to: '/rmc/fazenda-rio-grande' },
                { nome: 'Campo Largo', to: '/rmc/campo-largo' },
                { nome: 'Almirante Tamandaré', to: '/rmc/almirante-tamandare' },
              ].map(c => (
                <li key={c.nome}><Link to={c.to} className="hover:text-background transition-all hover:translate-x-1 inline-block">{c.nome}</Link></li>
              ))}
            </ul>

            <h3 className="font-bold mb-3 mt-6">Serviços</h3>
            <ul className="space-y-1 text-sm text-background/70">
              <li><Link to="/servicos/desentupimento-curitiba" className="hover:text-background transition-all hover:translate-x-1 inline-block">Desentupimento de Esgoto Curitiba</Link></li>
              <li><Link to="/servicos/encanador-curitiba" className="hover:text-background transition-all hover:translate-x-1 inline-block">Encanador 24h Curitiba</Link></li>
              <li><Link to="/servicos/limpa-fossa-curitiba" className="hover:text-background transition-all hover:translate-x-1 inline-block">Limpa Fossa Curitiba</Link></li>
              <li><Link to="/servicos/hidrojateamento-curitiba" className="hover:text-background transition-all hover:translate-x-1 inline-block">Hidrojateamento Curitiba</Link></li>
              <li><Link to="/servicos/camera-inspecao-esgoto" className="hover:text-background transition-all hover:translate-x-1 inline-block">Câmera de Inspeção de Esgoto</Link></li>
              <li><Link to="/servicos/desentupidora-24h-curitiba" className="hover:text-background transition-all hover:translate-x-1 inline-block">Emergência 24h</Link></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-3">Links</h3>
            <ul className="space-y-1 text-sm text-background/70">
              <li><Link to="/busca" className="hover:text-background transition-all hover:translate-x-1 inline-block">Buscar Empresas</Link></li>
              <li><Link to="/faq" className="hover:text-background transition-all hover:translate-x-1 inline-block">Perguntas Frequentes</Link></li>
              <li><Link to="/anuncie-aqui" className="hover:text-background transition-all hover:translate-x-1 inline-block">Anuncie Aqui</Link></li>
              <li><Link to="/cadastrar-empresa" className="hover:text-background transition-all hover:translate-x-1 inline-block">Cadastrar Empresa</Link></li>
              <li><Link to="/quem-somos" className="hover:text-background transition-all hover:translate-x-1 inline-block">Quem Somos</Link></li>
              <li><Link to="/como-funciona" className="hover:text-background transition-all hover:translate-x-1 inline-block">Como Funciona</Link></li>
              <li><Link to="/como-selecionamos-profissionais" className="hover:text-background transition-all hover:translate-x-1 inline-block">Como Selecionamos Profissionais</Link></li>
              <li><Link to="/contato" className="hover:text-background transition-all hover:translate-x-1 inline-block">Contato</Link></li>
            </ul>
          </div>
        </div>

        {/* Trust Seals - Premium Design */}
        <div className="border-t border-background/20 mt-8 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 bg-background/10 rounded-xl px-5 py-4 border border-background/20 hover:bg-background/15 transition-all hover:scale-[1.02] group">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="font-bold text-sm">Empresa Verificada</div>
                <div className="text-xs text-background/60">Dados e CNPJ conferidos</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-background/10 rounded-xl px-5 py-4 border border-background/20 hover:bg-background/15 transition-all hover:scale-[1.02] group">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <div className="font-bold text-sm">Selo de Confiança</div>
                <div className="text-xs text-background/60">Profissionais qualificados</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-background/10 rounded-xl px-5 py-4 border border-background/20 hover:bg-background/15 transition-all hover:scale-[1.02] group">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ThumbsUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="font-bold text-sm">Zero Reclamações</div>
                <div className="text-xs text-background/60">Reclame Aqui limpo</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-background/10 rounded-xl px-5 py-4 border border-background/20 hover:bg-background/15 transition-all hover:scale-[1.02] group">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Star className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <div className="font-bold text-sm">4.8+ Avaliação</div>
                <div className="text-xs text-background/60">Média geral das empresas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/20 mt-8 pt-6 text-center space-y-3">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-background/50 mb-3">
            <Link to="/privacidade" className="hover:text-background transition-colors">Política de Privacidade</Link>
            <span>·</span>
            <Link to="/termos" className="hover:text-background transition-colors">Termos de Uso</Link>
          </div>
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
                src="/favicon.png"
                alt="Suprema Sites Express — Desenvolvimento Web"
                className="h-10 opacity-60 hover:opacity-100 transition-all hover:scale-105"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
