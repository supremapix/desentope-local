import { Link } from 'react-router-dom';
import { Check, Star, Zap, BarChart3, MapPin, Shield, MessageCircle } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

const AnuncieAquiPage = () => {
  useSEO({
    title: 'Anuncie sua Empresa | Serviços no Bairro',
    description: 'Divulgue sua desentupidora ou serviço de encanador em Curitiba e RMC. Planos a partir de R$ 0, leads no WhatsApp e selo de empresa verificada.',
    canonical: '/anuncie-aqui',
  });

  const planos = [
    {
      nome: 'Essencial',
      preco: 'R$ 19',
      periodo: '',
      features: ['1 bairro de cobertura', 'Perfil básico', 'Sem destaque na listagem'],
      naoInclui: ['WhatsApp direto', 'Analytics', 'Selo verificado'],
      destaque: false,
      cor: 'border-[#E6DFD2]',
    },
    {
      nome: 'Básico',
      preco: 'R$ 49',
      periodo: '',
      features: ['5 bairros de cobertura', 'WhatsApp direto no perfil', 'Selo de empresa verificada', 'Suporte por email'],
      naoInclui: ['Analytics de cliques', 'Posição prioritária'],
      destaque: false,
      cor: 'border-[#1F5E4B]',
    },
    {
      nome: 'Profissional',
      preco: 'R$ 99',
      periodo: '',
      features: ['15 bairros de cobertura', 'Destaque na listagem', 'Analytics de cliques e leads', 'Selo verificado premium', 'Prioridade no ranking', 'Suporte prioritário'],
      naoInclui: [],
      destaque: true,
      cor: 'border-[#E3A93B]',
    },
    {
      nome: 'Premium',
      preco: 'R$ 199',
      periodo: '',
      features: ['Todos os bairros + RMC', 'Topo de todas as listagens', 'Perfil rico com vídeo e galeria', 'Redes sociais integradas', 'Relatório mensal de leads', 'Analytics completo em tempo real', 'Gerente de conta dedicado'],
      naoInclui: [],
      destaque: false,
      cor: 'border-[#A8461F]',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#1F5E4B] text-[#FBF7F0] py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-['Fraunces',serif] text-3xl md:text-5xl font-semibold mb-4 leading-tight">
            Seja Encontrado por Quem<br className="hidden md:block" /> Precisa de Você Agora
          </h1>
          <p className="text-lg md:text-xl text-[#FBF7F0]/90 mb-6 max-w-2xl mx-auto">
            Milhares de pessoas buscam desentupidoras e encanadores em Curitiba todos os meses. Apareça para elas.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-[#FBF7F0]/90">
            <span className="flex items-center gap-1.5"><BarChart3 className="h-4 w-4 text-[#E3A93B]" /> +<span data-count="3200">3.200</span> buscas/mês</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#A8461F]" /> <span data-count="75">75</span> bairros cobertos</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-[#E3A93B]" /> Leads qualificados</span>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">Escolha seu Plano</h2>
          <p className="text-center text-muted-foreground mb-12">Comece com R$ 19 e cresça conforme sua demanda</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {planos.map(plan => (
              <div key={plan.nome} className={`rounded-2xl p-6 border-2 ${plan.cor} bg-card relative transition-all hover:scale-[1.02] hover:shadow-lg ${plan.destaque ? 'ring-2 ring-secondary shadow-xl' : ''}`}>
                {plan.destaque && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E3A93B] text-[#1C2B26] text-xs font-bold px-4 py-1 rounded-full">
                    MAIS POPULAR
                  </div>
                )}
                <h3 className="font-bold text-lg mb-1">{plan.nome}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-black text-[#1F5E4B]">{plan.preco}</span>
                </div>
                <div className="text-[15px] text-[#A8461F] font-semibold mb-6">taxa única de cadastro</div>
                <ul className="space-y-2 text-sm mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#A8461F] mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                  {plan.naoInclui.map(f => (
                    <li key={f} className="flex items-start gap-2 text-muted-foreground line-through">
                      <span className="w-4 h-4 mt-0.5 flex-shrink-0 text-center">—</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/5541992721004?text=${encodeURIComponent(`Olá! Quero anunciar minha empresa no plano ${plan.nome} (${plan.preco} taxa única) do Serviços no Bairro.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full h-11 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors text-sm ${plan.destaque ? 'bg-[#E3A93B] text-[#1C2B26] hover:bg-[#E3A93B]/90' : 'bg-[#1F5E4B] text-white hover:bg-[#1F5E4B]/90'}`}
                >
                  <MessageCircle className="h-4 w-4" /> Quero este plano
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Por que anunciar no Serviços no Bairro?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Zap, title: 'Leads Quentes', desc: 'Clientes que buscam ativamente por desentupidora ou encanador agora — taxa de conversão altíssima.' },
              { icon: Shield, title: 'Credibilidade', desc: 'Selo de verificação, avaliações de clientes e perfil profissional que transmitem confiança.' },
              { icon: BarChart3, title: 'Analytics', desc: 'Saiba quantos cliques, ligações e mensagens seu anúncio gera — dados reais para medir seu ROI.' },
            ].map(b => (
              <div key={b.title} className="bg-card rounded-xl p-6 border text-center hover:shadow-md transition-all">
                <b.icon className="h-10 w-10 mx-auto mb-3 text-[#1F5E4B]" />
                <h3 className="font-bold mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-[#1F5E4B] text-[#FBF7F0]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-['Fraunces',serif] text-2xl md:text-3xl font-semibold mb-4">Pronto para receber mais clientes?</h2>
          <p className="text-[#FBF7F0]/90 mb-6 max-w-xl mx-auto">
            Entre em contato agora pelo WhatsApp e comece a aparecer para quem precisa dos seus serviços.
          </p>
          <a
            href="https://wa.me/5541992721004?text=Olá! Quero anunciar minha empresa de desentupimento/encanamento no Serviços no Bairro. Como funciona?"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center h-14 px-10 rounded-xl bg-[#A8461F] text-white font-bold text-lg hover:bg-[#8e3b1a] transition-all hover:scale-105 gap-2"
          >
            <MessageCircle className="h-6 w-6" /> Falar com Consultor
          </a>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/90">
            <a href="tel:5541987001004" className="hover:text-primary-foreground transition-colors">📞 (41) 98700-1004</a>
            <a href="mailto:sac@aloanuncio.com.br" className="hover:text-primary-foreground transition-colors">✉️ sac@aloanuncio.com.br</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnuncieAquiPage;
