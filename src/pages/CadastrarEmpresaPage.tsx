import { Link } from 'react-router-dom';
import { Check, MessageCircle } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

const CadastrarEmpresaPage = () => {
  useSEO({
    title: 'Cadastrar Empresa Grátis | Serviços no Bairro',
    description: 'Cadastre sua empresa de desentupimento ou encanamento em Curitiba e RMC. Receba clientes pelo WhatsApp com cadastro rápido e plano gratuito.',
    canonical: '/cadastrar-empresa',
  });

  return (
    <div className="min-h-screen">
      <div className="bg-muted border-b">
        <div className="container mx-auto px-4 py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Início</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground font-medium">Cadastrar Empresa</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-black mb-4">Cadastre sua Empresa</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Aumente sua visibilidade e receba mais clientes pelo WhatsApp. Cadastro rápido, pagamento único.
          </p>

          {/* Plans */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-12">
            {[
              { nome: 'Essencial', preco: 'R$ 19', features: ['1 bairro', 'Perfil básico', 'Contato WhatsApp'] },
              { nome: 'Básico', preco: 'R$ 49', features: ['5 bairros', 'Perfil completo', 'Selo verificado'] },
              { nome: 'Profissional', preco: 'R$ 99', features: ['15 bairros', 'Destaque básico', 'Analytics'], destaque: true },
              { nome: 'Premium', preco: 'R$ 199', features: ['Todos bairros', 'Topo listagem', 'Relatórios', 'Vídeo/Galeria'] },
            ].map(plan => (
              <div key={plan.nome} className={`rounded-xl p-6 border-2 ${plan.destaque ? 'border-[#E3A93B] bg-[#E3A93B]/5' : 'border-[#E6DFD2] bg-card'}`}>
                {plan.destaque && <div className="text-xs font-bold text-[#1C2B26] bg-[#E3A93B] rounded-full px-2 py-0.5 mb-2 inline-block">MAIS POPULAR</div>}
                <h3 className="font-bold text-lg">{plan.nome}</h3>
                <div className="text-3xl font-black text-[#1F5E4B] mt-1 mb-1">{plan.preco}</div>
                <div className="text-[14px] text-[#A8461F] font-semibold mb-4">taxa única de cadastro</div>
                <ul className="text-sm text-muted-foreground space-y-1.5 text-left">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#A8461F] flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-[#1F5E4B] text-white rounded-xl p-8">
            <h2 className="text-xl font-bold mb-2">Interessado?</h2>
            <p className="text-white/90 mb-4">Entre em contato pelo WhatsApp para iniciar seu cadastro com pagamento único.</p>
            <a
              href="https://wa.me/5541992721004?text=Olá! Gostaria de cadastrar minha empresa com pagamento único no Serviços no Bairro."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-[#A8461F] text-white font-bold hover:bg-[#8e3b1a] transition-colors"
            >
              <MessageCircle className="h-5 w-5" /> Cadastrar via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastrarEmpresaPage;
