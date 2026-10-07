import { Link } from 'react-router-dom';
import { ArrowUp, Mail, Phone, MessageCircle } from 'lucide-react';
import { servicos } from '@/data/servicos';

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#14231E] text-[#F3EEE4] mt-20">
      {/* Top CTA Strip */}
      <div className="bg-[#1F5E4B] text-[#FBF7F0]">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="font-['Fraunces',serif] text-2xl font-semibold">Precisa de ajuda para encontrar um serviço?</h3>
          <div className="flex gap-4">
            <a
              href="https://wa.me/5541992721004?text=Olá! Vim pelo site servicosnobairro.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#A8461F] hover:bg-[#8e3b1a] text-white px-8 py-3 rounded-lg font-semibold transition-colors text-lg"
            >
              Falar no WhatsApp
            </a>
            <a
              href="tel:5541987001004"
              className="bg-transparent border-2 border-[#FBF7F0] hover:bg-[#FBF7F0] hover:text-[#1F5E4B] text-[#FBF7F0] px-8 py-3 rounded-lg font-semibold transition-colors text-lg"
            >
              Ligar agora
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Bairros Curitiba */}
          <div>
            <h3 className="font-['Fraunces',serif] text-xl font-semibold mb-6">Bairros de Curitiba</h3>
            <ul className="space-y-3 text-[17px] text-[#F3EEE4]/80">
              {[
                { nome: 'Centro', slug: 'centro' },
                { nome: 'Batel', slug: 'batel' },
                { nome: 'Água Verde', slug: 'agua-verde' },
                { nome: 'Boa Vista', slug: 'boa-vista' },
                { nome: 'Portão', slug: 'portao' },
              ].map(b => (
                <li key={b.slug}>
                  <Link to={`/curitiba/${b.slug}`} className="hover:text-white transition-colors">
                    {b.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Região Metropolitana */}
          <div>
            <h3 className="font-['Fraunces',serif] text-xl font-semibold mb-6">Região Metropolitana</h3>
            <ul className="space-y-3 text-[17px] text-[#F3EEE4]/80">
              {[
                { nome: 'São José dos Pinhais', to: '/rmc/sao-jose-dos-pinhais' },
                { nome: 'Colombo', to: '/rmc/colombo' },
                { nome: 'Pinhais', to: '/rmc/pinhais' },
                { nome: 'Araucária', to: '/rmc/araucaria' },
              ].map(c => (
                <li key={c.nome}>
                  <Link to={c.to} className="hover:text-white transition-colors">
                    {c.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Serviços Populares */}
          <div>
            <h3 className="font-['Fraunces',serif] text-xl font-semibold mb-6">Serviços Populares</h3>
            <ul className="space-y-3 text-[17px] text-[#F3EEE4]/80">
              <li><Link to="/servicos/desentupimento-curitiba" className="hover:text-white transition-colors">Desentupimento de Esgoto</Link></li>
              <li><Link to="/servicos/encanador-curitiba" className="hover:text-white transition-colors">Encanador 24h</Link></li>
              <li><Link to="/servicos/limpa-fossa-curitiba" className="hover:text-white transition-colors">Limpa Fossa</Link></li>
              <li><Link to="/servicos/hidrojateamento-curitiba" className="hover:text-white transition-colors">Hidrojateamento</Link></li>
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="font-['Fraunces',serif] text-xl font-semibold mb-6">Institucional</h3>
            <ul className="space-y-3 text-[17px] text-[#F3EEE4]/80">
              <li><Link to="/quem-somos" className="hover:text-white transition-colors">Quem Somos</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Perguntas Frequentes</Link></li>
              <li><Link to="/anuncie-aqui" className="hover:text-white transition-colors">Anunciar Empresa</Link></li>
              <li><Link to="/contato" className="hover:text-white transition-colors">Fale Conosco</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#F3EEE4]/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[15px] leading-relaxed text-[#F3EEE4]/70 max-w-2xl">
            Aviso Legal: O Serviços no Bairro é uma plataforma independente. A responsabilidade técnica, execução, garantia dos serviços e valores são de inteira responsabilidade dos prestadores.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 bg-[#FBF7F0] text-[#14231E] px-6 py-3 rounded-lg font-semibold hover:bg-white transition-colors"
          >
            Voltar ao topo <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
