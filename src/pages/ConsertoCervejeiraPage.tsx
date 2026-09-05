import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Beer,
  Thermometer,
  Wrench,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MessageCircle,
} from 'lucide-react';
import { useSEO, buildBreadcrumbSchema, buildFAQSchema } from '@/hooks/useSEO';
import { FaqPremium } from '@/components/FaqPremium';
import { RelatedLinks } from '@/components/RelatedLinks';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import {
  EMPRESA_CERVEJEIRA_SLUG,
  MSG_WHATSAPP_CERVEJEIRA,
  TELEFONE_CERVEJEIRA,
  WHATSAPP_CERVEJEIRA,
  cidadesAtendimento,
  faqCervejeira,
  passosSolicitacao,
  problemasCervejeira,
  publicoCervejeira,
  servicosCervejeira,
} from '@/data/cervejeira';

const CANONICAL = '/servicos/conserto-cervejeira-navegantes';
const SITE = 'https://www.servicosnobairro.com.br';
const LOGO = 'https://img.supremasite.com.br/sc.webp';
const HERO_IMG = 'https://assistencia.santacatarinarefrigeracao.com.br/assets/hero-equip-BLoXzlRJ.png';
const VIDEO = 'https://img.supremasite.com.br/santa-catarina.mp4';
const MAPS =
  'https://www.google.com/maps/search/?api=1&query=R.%20Ver.%20Nereu%20Liberato%20Nunes%2C%20191%2C%20Centro%2C%20Navegantes%2C%20SC%2C%2088370-232';

const H1 = 'Conserto de Cervejeira em Navegantes, Penha e Região';
const RESPOSTA_DIRETA =
  'Assistência técnica, diagnóstico e conserto de cervejeiras residenciais e comerciais em Navegantes, Penha e região. Atendimento para cervejeira que não gela, apresenta erro, faz barulho, vaza água ou oscila a temperatura. Consulte disponibilidade pelo WhatsApp.';

const ConsertoCervejeiraPage = () => {
  const jsonLd = useMemo(
    () => [
      buildBreadcrumbSchema([
        { name: 'Início', url: '/' },
        { name: 'Serviços', url: '/busca' },
        { name: 'Conserto de Cervejeira em Navegantes', url: CANONICAL },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${SITE}${CANONICAL}#service`,
        name: 'Assistência técnica e conserto de cervejeiras',
        serviceType: 'Conserto de cervejeira',
        inLanguage: 'pt-BR',
        description: RESPOSTA_DIRETA,
        provider: {
          '@id': `${SITE}/empresa/${EMPRESA_CERVEJEIRA_SLUG}#business`,
          '@type': 'HVACBusiness',
          name: 'Santa Catarina Refrigeração',
          telephone: '+55-47-99224-5172',
          image: LOGO,
        },
        areaServed: ['Navegantes', 'Penha', ...cidadesAtendimento].map((c) => ({
          '@type': 'City',
          name: `${c}, SC`,
        })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Serviços em cervejeiras',
          itemListElement: servicosCervejeira.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.titulo, description: s.descricao },
          })),
        },
      },
      buildFAQSchema(faqCervejeira),
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${SITE}${CANONICAL}#webpage`,
        name: H1,
        url: `${SITE}${CANONICAL}`,
        inLanguage: 'pt-BR',
        description: RESPOSTA_DIRETA,
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: HERO_IMG,
          caption: 'Assistência técnica em cervejeiras em Navegantes e região',
        },
      },
    ],
    [],
  );

  useSEO({
    title: 'Conserto de Cervejeira em Navegantes e Penha | Assistência',
    description:
      'Assistência técnica e conserto de cervejeira em Navegantes, Penha e região: não gela, congela bebidas, erro no painel, barulho ou vazamento. Fale no WhatsApp.',
    canonical: CANONICAL,
    ogImage: HERO_IMG,
    jsonLd,
    geoPosition: { lat: -26.8986, lng: -48.6541 },
    geoPlacename: 'Navegantes, SC',
  });

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <header className="bg-gradient-to-b from-primary/10 to-background border-b">
        <div className="container mx-auto px-4 py-12 grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <nav aria-label="Localização" className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span>Navegantes/SC · Penha e cidades da região</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{H1}</h1>
            <p className="text-lg text-foreground/90 mb-6">{RESPOSTA_DIRETA}</p>
            <div className="flex flex-wrap gap-3">
              <WhatsAppButton
                whatsapp={WHATSAPP_CERVEJEIRA}
                mensagem={MSG_WHATSAPP_CERVEJEIRA}
                size="lg"
                label="Solicitar assistência para cervejeira"
              />
              <a
                href={`tel:+55${WHATSAPP_CERVEJEIRA.slice(2)}`}
                className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold hover:border-primary transition-colors"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                {TELEFONE_CERVEJEIRA}
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Santa Catarina Refrigeração — Santa Catarina Refrigeração Assistência Técnica Ltda. Atendimento
              multimarcas, sem vínculo de assistência autorizada pelas fabricantes.
            </p>
          </div>
          <figure className="rounded-2xl overflow-hidden border bg-card">
            <img
              src={HERO_IMG}
              alt="Técnico em refrigeração avaliando equipamento de refrigeração de bebidas"
              width={1200}
              height={800}
              loading="eager"
              className="w-full h-auto"
            />
            <figcaption className="text-sm text-muted-foreground p-3">
              Diagnóstico de cervejeiras residenciais e comerciais em Navegantes, Penha e região.
            </figcaption>
          </figure>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* PROBLEMAS */}
        <section className="mb-14" aria-labelledby="problemas">
          <h2 id="problemas" className="text-2xl font-bold mb-4">
            Problemas atendidos em cervejeiras
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {problemasCervejeira.map((p) => (
              <li key={p} className="flex items-start gap-2 bg-card border rounded-lg p-3">
                <AlertTriangle className="h-4 w-4 text-primary mt-1 shrink-0" aria-hidden="true" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* TEXTO PRINCIPAL */}
        <section className="mb-14" aria-labelledby="sobre-servico">
          <h2 id="sobre-servico" className="text-2xl font-bold mb-4">
            Assistência técnica para cervejeiras em Navegantes e região
          </h2>
          <div className="space-y-4 text-foreground/90">
            <p>
              Sua cervejeira não está gelando, demora para atingir a temperatura, congela as bebidas ou apresenta erro
              no painel? A Santa Catarina Refrigeração recebe solicitações de assistência técnica para cervejeiras
              residenciais e comerciais em Navegantes, Penha e cidades da região.
            </p>
            <p>
              O diagnóstico pode incluir a verificação do termostato, sensores de temperatura, placa eletrônica,
              ventiladores, sistema de degelo, vedação da porta, dreno, condensador, sistema de partida e compressor.
            </p>
            <p>
              A falta de refrigeração nem sempre significa falta de gás. Antes de realizar uma recarga, é necessário
              identificar se existe vazamento ou se o problema está em outro componente. A substituição de peças ou
              qualquer intervenção deve ser definida somente depois do diagnóstico.
            </p>
            <p>
              Atendemos solicitações de residências, bares, restaurantes, lanchonetes, mercados, conveniências, hotéis,
              pousadas, empresas e outros estabelecimentos que utilizam cervejeiras. Marca, modelo, cidade e
              disponibilidade precisam ser confirmados antes do agendamento.
            </p>
          </div>
        </section>

        {/* VÍDEO */}
        <section className="mb-14" aria-labelledby="video">
          <h2 id="video" className="text-2xl font-bold mb-4">
            Conheça a Santa Catarina Refrigeração
          </h2>
          <video
            className="w-full rounded-2xl border bg-black"
            controls
            preload="none"
            playsInline
            poster={HERO_IMG}
          >
            <source src={VIDEO} type="video/mp4" />
            Seu navegador não suporta a exibição de vídeo.
          </video>
        </section>

        {/* SERVIÇOS */}
        <section className="mb-14" aria-labelledby="servicos">
          <h2 id="servicos" className="text-2xl font-bold mb-4">
            Serviços em cervejeiras
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {servicosCervejeira.map((s) => (
              <article key={s.titulo} className="bg-card border rounded-xl p-4">
                <h3 className="font-semibold flex items-center gap-2 mb-1">
                  <Wrench className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                  {s.titulo}
                </h3>
                <p className="text-sm text-muted-foreground">{s.descricao}</p>
              </article>
            ))}
          </div>
        </section>

        {/* PÚBLICO */}
        <section className="mb-14" aria-labelledby="publico">
          <h2 id="publico" className="text-2xl font-bold mb-4">
            Quem pode solicitar atendimento
          </h2>
          <ul className="flex flex-wrap gap-2">
            {publicoCervejeira.map((p) => (
              <li key={p} className="border rounded-full px-4 py-1.5 text-sm bg-card">
                {p}
              </li>
            ))}
          </ul>
        </section>

        {/* COMO SOLICITAR */}
        <section className="mb-14" aria-labelledby="como-solicitar">
          <h2 id="como-solicitar" className="text-2xl font-bold mb-4">
            Como solicitar atendimento
          </h2>
          <ol className="space-y-3">
            {passosSolicitacao.map((passo, i) => (
              <li key={passo} className="flex items-start gap-3 bg-card border rounded-xl p-4">
                <span className="h-7 w-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span>{passo}</span>
              </li>
            ))}
          </ol>
          <div className="mt-5 flex flex-wrap gap-3">
            <WhatsAppButton
              whatsapp={WHATSAPP_CERVEJEIRA}
              mensagem={MSG_WHATSAPP_CERVEJEIRA}
              size="lg"
              label="Enviar modelo da cervejeira"
            />
            <a
              href={`https://wa.me/${WHATSAPP_CERVEJEIRA}?text=${encodeURIComponent('Olá! Gostaria de consultar o atendimento para cervejeira na minha cidade.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold hover:border-primary transition-colors"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Consultar atendimento na minha cidade
            </a>
          </div>
        </section>

        {/* COBERTURA */}
        <section className="mb-14" aria-labelledby="cobertura">
          <h2 id="cobertura" className="text-2xl font-bold mb-2">
            Cidades atendidas
          </h2>
          <p className="text-muted-foreground mb-4">
            Atendimento prioritário em <strong>Navegantes</strong> e <strong>Penha</strong>. As demais cidades são
            áreas de atendimento — não são endereços nem filiais da empresa. A cobertura e a disponibilidade devem ser
            confirmadas pelo WhatsApp.
          </p>
          <ul className="flex flex-wrap gap-2">
            {['Navegantes', 'Penha', ...cidadesAtendimento].map((c) => (
              <li key={c} className="border rounded-full px-4 py-1.5 text-sm bg-card">
                {c}
              </li>
            ))}
          </ul>
        </section>

        {/* CONTATO / NAP */}
        <section className="mb-14" aria-labelledby="contato">
          <h2 id="contato" className="text-2xl font-bold mb-4">
            Contato e endereço comercial
          </h2>
          <div className="bg-card border rounded-2xl p-6 grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <img src={LOGO} alt="Logo Santa Catarina Refrigeração" width={56} height={56} loading="lazy" className="h-14 w-14 object-contain rounded-lg" />
              <div>
                <p className="font-semibold">Santa Catarina Refrigeração</p>
                <p className="text-sm text-muted-foreground">Assistência técnica e conserto de cervejeiras</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-primary mt-0.5" aria-hidden="true" />
                <a href={`tel:+55${WHATSAPP_CERVEJEIRA.slice(2)}`} className="hover:underline">
                  {TELEFONE_CERVEJEIRA} (telefone e WhatsApp)
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-primary mt-0.5" aria-hidden="true" />
                <span>
                  <a href="mailto:contato@santacatarina.com.br" className="hover:underline">contato@santacatarina.com.br</a>
                  {' · '}
                  <a href="mailto:sagazorcamento@gmail.com" className="hover:underline">sagazorcamento@gmail.com</a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" aria-hidden="true" />
                <a href={MAPS} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  R. Ver. Nereu Liberato Nunes, 191 — Centro, Navegantes/SC, CEP 88370-232
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-primary mt-0.5" aria-hidden="true" />
                <span>Segunda a sábado, 7h às 20h · Domingo, 7h às 12h</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-primary mt-0.5" aria-hidden="true" />
                <a
                  href="https://assistenciarefrigeracaosc.servicosnobairro.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Site da empresa
                </a>
                {' · '}
                <Link to={`/empresa/${EMPRESA_CERVEJEIRA_SLUG}`} className="hover:underline">
                  Perfil completo no portal
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14" aria-labelledby="faq">
          <h2 id="faq" className="text-2xl font-bold mb-4">
            Perguntas frequentes sobre conserto de cervejeira
          </h2>
          <FaqPremium perguntas={faqCervejeira} mostrarAbas={false} mostrarBusca={false} />
        </section>

        <RelatedLinks
          title="Continue navegando"
          links={[
            { label: 'Perfil da Santa Catarina Refrigeração', to: `/empresa/${EMPRESA_CERVEJEIRA_SLUG}`, hint: 'Serviços, contatos e áreas atendidas' },
            { label: 'Assistência técnica em refrigeração', to: '/servicos/assistencia-tecnica-refrigeracao', hint: 'Equipamentos comerciais e residenciais' },
            { label: 'Manutenção de freezer', to: '/servicos/manutencao-freezer', hint: 'Freezer vertical e horizontal' },
            { label: 'Conserto de balcão refrigerado', to: '/servicos/conserto-balcao-refrigerado', hint: 'Expositores e balcões comerciais' },
            { label: 'Manutenção de adega climatizada', to: '/servicos/manutencao-adega-climatizada', hint: 'Controle de temperatura de bebidas' },
            { label: 'Como funciona o portal', to: '/como-funciona', hint: 'Serviços no Bairro é um diretório de empresas' },
          ]}
        />

        {/* CTA FINAL */}
        <section className="rounded-2xl border bg-primary/5 p-8 text-center" aria-labelledby="cta-final">
          <Beer className="h-10 w-10 text-primary mx-auto mb-3" aria-hidden="true" />
          <h2 id="cta-final" className="text-2xl font-bold mb-2">
            Cervejeira não gela? Fale com a equipe
          </h2>
          <p className="text-foreground/90 mb-5 max-w-2xl mx-auto">
            Envie pelo WhatsApp a marca, o modelo e o defeito da sua cervejeira, junto com a cidade e o bairro, para
            confirmar a disponibilidade de atendimento.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <WhatsAppButton
              whatsapp={WHATSAPP_CERVEJEIRA}
              mensagem={MSG_WHATSAPP_CERVEJEIRA}
              size="lg"
              label="Chamar no WhatsApp"
            />
            <a
              href={`tel:+55${WHATSAPP_CERVEJEIRA.slice(2)}`}
              className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold hover:border-primary transition-colors"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              {TELEFONE_CERVEJEIRA}
            </a>
          </div>
          <p className="text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            <Thermometer className="h-4 w-4" aria-hidden="true" />
            Diagnóstico antes de qualquer troca de peça ou recarga de fluido refrigerante.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ConsertoCervejeiraPage;
