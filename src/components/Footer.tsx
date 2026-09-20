import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, MessageCircle, ShieldCheck, CheckCircle2, Building2 } from 'lucide-react';
import { servicos } from '@/data/servicos';

export function Footer() {
  const mainServicos = servicos.slice(0, 6);

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-850 mt-20">
      {/* Editorial Assurance Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/50">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-slate-800 text-emerald-400 shrink-0">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-200">Verificação Cadastral</p>
                <p className="text-slate-400">Checagem de dados públicos e CNPJ das empresas listadas</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-slate-800 text-amber-400 shrink-0">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-200">Sem Taxas ou Comissões</p>
                <p className="text-slate-400">Contato direto e negociação transparente com o prestador</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-slate-800 text-sky-400 shrink-0">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-200">Atendimento 24h & Plantão</p>
                <p className="text-slate-400">Identificação clara de empresas com plantão para urgências</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="flex items-center justify-center w-7 h-7 rounded bg-slate-800 text-white">
                <MapPin className="h-4 w-4" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">
                Serviços <span className="font-normal text-slate-400">no Bairro</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400 mb-5">
              Guia regional independente de empresas e profissionais de serviços em Curitiba, Região Metropolitana, São Paulo e Santa Catarina.
            </p>
            <div className="space-y-2 text-xs text-slate-300">
              <a
                href="https://wa.me/5541992721004?text=Olá! Vim pelo site servicosnobairro.com.br (rodapé)"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-400" /> (41) 99272-1004
              </a>
              <a
                href="tel:5541987001004"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-slate-400" /> (41) 98700-1004
              </a>
              <a
                href="mailto:sac@aloanuncio.com.br"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-slate-400" /> sac@aloanuncio.com.br
              </a>
            </div>
          </div>

          {/* Bairros Curitiba */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-200 mb-3">
              <Link to="/curitiba" className="hover:text-white transition-colors">Curitiba</Link>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {[
                { nome: 'Centro', slug: 'centro' },
                { nome: 'Batel', slug: 'batel' },
                { nome: 'Água Verde', slug: 'agua-verde' },
                { nome: 'Boa Vista', slug: 'boa-vista' },
                { nome: 'Portão', slug: 'portao' },
                { nome: 'CIC (Cidade Industrial)', slug: 'cidade-industrial' },
                { nome: 'Cajuru', slug: 'cajuru' },
                { nome: 'Boqueirão', slug: 'boqueirao' },
                { nome: 'Santa Felicidade', slug: 'santa-felicidade' },
                { nome: 'Cabral', slug: 'cabral' },
                { nome: 'Juvevê', slug: 'juveve' },
                { nome: 'Jardim Botânico', slug: 'jardim-botanico' },
              ].map(b => (
                <li key={b.slug}>
                  <Link to={`/curitiba/${b.slug}`} className="hover:text-white transition-colors">
                    {b.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cidades RMC & Regiões */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-200 mb-3">
              Região Metropolitana
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {[
                { nome: 'São José dos Pinhais', to: '/rmc/sao-jose-dos-pinhais' },
                { nome: 'Colombo', to: '/rmc/colombo' },
                { nome: 'Pinhais', to: '/rmc/pinhais' },
                { nome: 'Araucária', to: '/rmc/araucaria' },
                { nome: 'Fazenda Rio Grande', to: '/rmc/fazenda-rio-grande' },
                { nome: 'Campo Largo', to: '/rmc/campo-largo' },
                { nome: 'Almirante Tamandaré', to: '/rmc/almirante-tamandare' },
              ].map(c => (
                <li key={c.nome}>
                  <Link to={c.to} className="hover:text-white transition-colors">
                    {c.nome}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-200 mb-2 mt-5">
              Outras Praças
            </h3>
            <ul className="space-y-1 text-xs text-slate-400">
              <li><Link to="/sao-paulo" className="hover:text-white transition-colors">São Paulo — Capital</Link></li>
              <li><Link to="/santa-catarina" className="hover:text-white transition-colors">Santa Catarina — Litoral & Vale</Link></li>
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-200 mb-3">
              Serviços Populares
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><Link to="/servicos/desentupimento-curitiba" className="hover:text-white transition-colors">Desentupimento de Esgoto</Link></li>
              <li><Link to="/servicos/encanador-curitiba" className="hover:text-white transition-colors">Encanador 24h</Link></li>
              <li><Link to="/servicos/limpa-fossa-curitiba" className="hover:text-white transition-colors">Limpa Fossa</Link></li>
              <li><Link to="/servicos/hidrojateamento-curitiba" className="hover:text-white transition-colors">Hidrojateamento</Link></li>
              <li><Link to="/servicos/camera-inspecao-esgoto" className="hover:text-white transition-colors">Câmera de Inspeção</Link></li>
              <li><Link to="/servicos/desentupidora-24h-curitiba" className="hover:text-white transition-colors">Plantão 24h</Link></li>
            </ul>
          </div>

          {/* Institucional & Ajuda */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-200 mb-3">
              Institucional
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><Link to="/quem-somos" className="hover:text-white transition-colors">Quem Somos</Link></li>
              <li><Link to="/como-funciona" className="hover:text-white transition-colors">Como Funciona o Guia</Link></li>
              <li><Link to="/como-selecionamos-profissionais" className="hover:text-white transition-colors">Critérios de Seleção</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Perguntas Frequentes (FAQ)</Link></li>
              <li><Link to="/anuncie-aqui" className="hover:text-white transition-colors">Anunciar Empresa</Link></li>
              <li><Link to="/cadastrar-empresa" className="hover:text-white transition-colors">Cadastrar Perfil</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Artigos e Orientações</Link></li>
              <li><Link to="/contato" className="hover:text-white transition-colors">Fale Conosco</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Legal */}
        <div className="border-t border-slate-850 mt-10 pt-6">
          <p className="text-[11px] leading-relaxed text-slate-400 mb-4 max-w-4xl">
            Aviso Legal: O Serviços no Bairro é uma plataforma de catálogo e diretório independente. A responsabilidade técnica, execução, garantia dos serviços e valores acordados são de inteira responsabilidade dos prestadores e clientes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex flex-wrap gap-4">
              <Link to="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
              <span>·</span>
              <Link to="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
              <span>·</span>
              <Link to="/politica-editorial" className="hover:text-white transition-colors">Política Editorial</Link>
            </div>
            <p>
              © {new Date().getFullYear()} servicosnobairro.com.br — Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
