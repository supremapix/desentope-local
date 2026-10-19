import { Link, useSearchParams } from 'react-router-dom';
import { getHubCuritiba } from '@/data/hubs-curitiba';
import { Check, Search, ClipboardList, MapPin, MessageCircle } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

const AnuncieAquiPage = () => {
  const [searchParams] = useSearchParams();
  const hub = getHubCuritiba(searchParams.get('categoria') || '');
  const contexto = hub && searchParams.get('cidade') === 'curitiba'
    ? `Categoria: ${hub.nome}. Cidade de atendimento: Curitiba.`
    : 'Categoria: [informe seu ramo]. Cidade de atendimento: [informe sua cidade].';
  useSEO({
    title: 'Anuncie sua Empresa | Serviços no Bairro',
    description: 'Divulgue sua empresa por categoria e cidade. Consulte planos, recursos e condições de cadastro no diretório Serviços no Bairro.',
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
            Apresente sua Empresa<br className="hidden md:block" /> por Categoria e Cidade
          </h1>
          <p className="text-lg md:text-xl text-[#FBF7F0]/90 mb-6 max-w-2xl mx-auto">
            Divulgue seus serviços, contatos e área de atendimento em um diretório multissetorial. Mudanças, transportes, entregas e outros ramos têm espaço no guia.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-[#FBF7F0]/90">
            <span className="flex items-center gap-1.5"><Search className="h-4 w-4 text-[#E3A93B]" /> Navegação por categoria</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#E3A93B]" /> Área de atendimento declarada</span>
            <span className="flex items-center gap-1.5"><ClipboardList className="h-4 w-4 text-[#E3A93B]" /> Perfil com serviços e contatos</span>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">Escolha seu Plano</h2>
          <p className="text-center text-muted-foreground mb-4">Comece com R$ 19 e cresça conforme sua demanda</p>
          <p className="text-center text-sm text-muted-foreground max-w-3xl mx-auto mb-12">Os planos são opções de divulgação comercial. Destaque de anúncio não é avaliação de qualidade nem recomendação editorial. Consulte as condições e os recursos antes de contratar.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {planos.map(plan => (
              <div key={plan.nome} className={`rounded-2xl p-6 border-2 ${plan.cor} bg-card relative transition-all hover:scale-[1.02] hover:shadow-lg ${plan.destaque ? 'ring-2 ring-secondary shadow-xl' : ''}`}>
                {plan.destaque && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E3A93B] text-[#1C2B26] text-xs font-bold px-4 py-1 rounded-full">
                    PLANO PROFISSIONAL
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
                  href={`https://wa.me/5541992721004?text=${encodeURIComponent(`Olá! Quero anunciar minha empresa no plano ${plan.nome} (${plan.preco} taxa única) do Serviços no Bairro. ${contexto}`)}`}
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
              { icon: Search, title: 'Organização por serviço', desc: 'Apresente os serviços que sua empresa realmente oferece, para ajudar o visitante a entender se ela atende à sua necessidade.' },
              { icon: MapPin, title: 'Cobertura clara', desc: 'Informe cidades, bairros ou trajetos atendidos. O consumidor confirma disponibilidade e condições diretamente com a empresa.' },
              { icon: ClipboardList, title: 'Perfil da empresa', desc: 'Organize descrição, contatos e dados de atendimento. Consulte os recursos incluídos e as condições do plano antes de contratar.' },
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
          <h2 className="font-['Fraunces',serif] text-2xl md:text-3xl font-semibold mb-4">Quer apresentar sua empresa no guia?</h2>
          <p className="text-[#FBF7F0]/90 mb-6 max-w-xl mx-auto">
            Converse sobre sua categoria, cidade de atendimento e plano de cadastro. A publicação não garante posição no Google, volume de visitas ou contatos.
          </p>
          <a
            href={`https://wa.me/5541992721004?text=${encodeURIComponent(`Olá! Quero conhecer as opções de anúncio no Serviços no Bairro. ${contexto} Como funciona?`)}`}
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
