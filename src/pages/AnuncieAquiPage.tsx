import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Check, Star, Zap, BarChart3, MapPin, Shield, MessageCircle } from 'lucide-react';

const AnuncieAquiPage = () => {
  useEffect(() => {
    document.title = 'Anuncie Aqui — Seja Encontrado por Quem Precisa | Serviços no Bairro';
  }, []);

  const planos = [
    {
      nome: 'Gratuito',
      preco: 'R$ 0',
      periodo: '/mês',
      features: ['1 bairro de cobertura', 'Perfil básico', 'Sem destaque na listagem'],
      naoInclui: ['WhatsApp direto', 'Analytics', 'Selo verificado'],
      destaque: false,
      cor: 'border-border',
    },
    {
      nome: 'Básico',
      preco: 'R$ 49',
      periodo: '/mês',
      features: ['5 bairros de cobertura', 'WhatsApp direto no perfil', 'Selo de empresa verificada', 'Suporte por email'],
      naoInclui: ['Analytics de cliques', 'Posição prioritária'],
      destaque: false,
      cor: 'border-primary',
    },
    {
      nome: 'Profissional',
      preco: 'R$ 99',
      periodo: '/mês',
      features: ['15 bairros de cobertura', 'Destaque na listagem', 'Analytics de cliques e leads', 'Selo verificado premium', 'Prioridade no ranking', 'Suporte prioritário'],
      naoInclui: [],
      destaque: true,
      cor: 'border-secondary',
    },
    {
      nome: 'Premium',
      preco: 'R$ 199',
      periodo: '/mês',
      features: ['Todos os bairros + RMC', 'Topo de todas as listagens', 'Perfil rico com vídeo e galeria', 'Redes sociais integradas', 'Relatório mensal de leads', 'Analytics completo em tempo real', 'Gerente de conta dedicado'],
      naoInclui: [],
      destaque: false,
      cor: 'border-accent',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            Seja Encontrado por Quem<br className="hidden md:block" /> Precisa de Você Agora
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            Milhares de pessoas buscam desentupidoras e encanadores em Curitiba todos os meses. Apareça para elas.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-primary-foreground/70">
            <span className="flex items-center gap-1.5"><BarChart3 className="h-4 w-4 text-secondary" /> +3.200 buscas/mês</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-accent" /> 75 bairros cobertos</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-secondary" /> Leads qualificados</span>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">Escolha seu Plano</h2>
          <p className="text-center text-muted-foreground mb-12">Comece grátis e cresça conforme sua demanda</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {planos.map(plan => (
              <div key={plan.nome} className={`rounded-2xl p-6 border-2 ${plan.cor} bg-card relative transition-all hover:scale-[1.02] hover:shadow-lg ${plan.destaque ? 'ring-2 ring-secondary shadow-xl' : ''}`}>
                {plan.destaque && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-bold px-4 py-1 rounded-full">
                    MAIS POPULAR
                  </div>
                )}
                <h3 className="font-bold text-lg mb-1">{plan.nome}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-black text-primary">{plan.preco}</span>
                  <span className="text-sm text-muted-foreground">{plan.periodo}</span>
                </div>
                <ul className="space-y-2 text-sm mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                  {plan.naoInclui.map(f => (
                    <li key={f} className="flex items-start gap-2 text-muted-foreground/50 line-through">
                      <span className="w-4 h-4 mt-0.5 flex-shrink-0 text-center">—</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/5541992721004?text=${encodeURIComponent(`Olá! Quero anunciar minha empresa no plano ${plan.nome} do Serviços no Bairro.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full h-11 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors text-sm ${plan.destaque ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
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
                <b.icon className="h-10 w-10 mx-auto mb-3 text-primary" />
                <h3 className="font-bold mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">Pronto para receber mais clientes?</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Entre em contato agora pelo WhatsApp e comece a aparecer para quem precisa dos seus serviços.
          </p>
          <a
            href="https://wa.me/5541985171966?text=Olá! Quero anunciar minha empresa de desentupimento/encanamento no Serviços no Bairro. Como funciona?"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center h-14 px-10 rounded-xl bg-accent text-accent-foreground font-bold text-lg hover:bg-accent/90 transition-all hover:scale-105 gap-2"
          >
            <MessageCircle className="h-6 w-6" /> Falar com Consultor
          </a>
        </div>
      </section>
    </div>
  );
};

export default AnuncieAquiPage;
