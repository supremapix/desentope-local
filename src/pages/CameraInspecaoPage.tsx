import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Camera,
  Video,
  MapPin,
  FileText,
  Wrench,
  Route as RouteIcon,
  ShieldCheck,
  Clock,
  Phone,
  CheckCircle2,
  AlertTriangle,
  Search,
  Lightbulb,
} from 'lucide-react';
import { useSEO, buildBreadcrumbSchema, buildFAQSchema, buildServiceSchema } from '@/hooks/useSEO';
import { FaqPremium } from '@/components/FaqPremium';
import { RelatedLinks } from '@/components/RelatedLinks';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import {
  antesDepois,
  beneficios,
  comoFunciona,
  faqCameraInspecao,
  getLocalInspecao,
  locaisInspecao,
  problemasEncontrados,
  processo,
  publicosAtendidos,
  quandoUtilizar,
  tabelaPrecos,
  tecnologia,
} from '@/data/camera-inspecao';
import { todosBairros } from '@/data/bairros';

const etapaIcons = [Camera, RouteIcon, Video, MapPin, FileText, Wrench];
const processoIcons = [Search, Camera, MapPin, FileText, Wrench];

const WHATSAPP = '5541992721004';

const CameraInspecaoPage = () => {
  const { local: localParam } = useParams<{ local: string }>();
  const local = getLocalInspecao(localParam || 'curitiba') || getLocalInspecao('curitiba')!;
  const isPilar = local.slug === 'curitiba';

  const canonical = isPilar
    ? '/servicos/camera-inspecao-esgoto-curitiba'
    : `/camera-inspecao-esgoto/${local.slug}`;

  const nomeLocal = local.nome;
  const preposicao = local.tipo === 'bairro' ? 'no' : 'em';

  const h1 = isPilar
    ? 'Câmera de Inspeção de Esgoto em Curitiba com Diagnóstico Preciso e Sem Quebra-Quebra'
    : `Câmera de Inspeção de Esgoto ${preposicao} ${nomeLocal} — Diagnóstico sem Quebrar Piso`;

  const heroSubtitle = isPilar
    ? 'Câmeras robotizadas de alta resolução identificam entupimentos, rachaduras, infiltrações, raízes, afundamentos, conexões danificadas e qualquer problema interno da tubulação sem necessidade de quebrar pisos ou paredes.'
    : `Vídeo inspeção de tubulação ${preposicao} ${nomeLocal} com câmera HD e localização eletrônica do ponto exato do defeito. Diagnóstico de esgoto, rede pluvial e caixa de gordura sem obra e sem quebra-quebra.`;

  const breadcrumb = isPilar
    ? [
        { name: 'Início', url: '/' },
        { name: 'Serviços', url: '/busca' },
        { name: 'Câmera de Inspeção de Esgoto em Curitiba', url: canonical },
      ]
    : [
        { name: 'Início', url: '/' },
        { name: 'Câmera de Inspeção de Esgoto', url: '/servicos/camera-inspecao-esgoto-curitiba' },
        { name: `${nomeLocal}`, url: canonical },
      ];

  const jsonLd = useMemo(
    () => [
      buildBreadcrumbSchema(breadcrumb),
      buildServiceSchema(
        `Câmera de Inspeção de Esgoto ${preposicao} ${nomeLocal}`,
        `Vídeo inspeção de tubulação ${preposicao} ${nomeLocal}: diagnóstico por câmera HD de entupimentos, raízes, trincas e afundamentos, sem quebrar piso ou parede.`,
        'R$ 200 - R$ 1.200',
      ),
      buildFAQSchema(faqCameraInspecao),
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: h1,
        inLanguage: 'pt-BR',
        url: `https://desentupa-agora-pr.lovable.app${canonical}`,
        description: local.respostaDireta,
        about: 'Câmera de inspeção de esgoto',
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: 'https://desentupa-agora-pr.lovable.app/og-image.png',
          caption: `Câmera de inspeção de esgoto ${preposicao} ${nomeLocal}`,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `Como é feita a inspeção de esgoto por câmera ${preposicao} ${nomeLocal}`,
        description: 'Etapas do diagnóstico por vídeo inspeção de tubulação, do acesso ao relatório técnico.',
        inLanguage: 'pt-BR',
        step: processo.map((p, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: p.titulo,
          text: p.descricao,
        })),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [local.slug],
  );

  useSEO({
    title: isPilar
      ? 'Câmera de Inspeção de Esgoto em Curitiba — Sem Quebrar'
      : `Câmera de Inspeção de Esgoto ${preposicao} ${nomeLocal} — Sem Quebrar`.slice(0, 60),
    description: isPilar
      ? 'Câmera de inspeção de esgoto em Curitiba: vídeo inspeção HD que localiza entupimento, raiz, trinca e afundamento sem quebrar piso. Preços, laudo e atendimento 24h.'
      : `Câmera de inspeção de esgoto ${preposicao} ${nomeLocal}: vídeo inspeção de tubulação com localização exata do defeito, sem quebrar piso. Preços, relatório técnico e atendimento 24h.`,
    canonical,
    jsonLd,
    geoPlacename: local.tipo === 'bairro' ? `${nomeLocal}, Curitiba, PR` : `${nomeLocal}, PR`,
  });

  const relatedLinks = [
    { label: 'Desentupimento em Curitiba', to: '/servicos/desentupimento-curitiba', hint: 'Desobstrução 24h após o diagnóstico' },
    { label: 'Hidrojateamento em Curitiba', to: '/servicos/hidrojateamento-curitiba', hint: 'Limpeza de tubulação com alta pressão' },
    { label: 'Limpeza de caixa de gordura', to: '/blog/limpeza-caixa-de-gordura', hint: 'Frequência e preços reais' },
    { label: 'Detecção de vazamento oculto', to: '/servicos/deteccao-vazamento-oculto', hint: 'Caça-vazamentos com geofone' },
    { label: 'Limpa fossa — guia completo', to: '/servicos/guia-limpa-fossa', hint: 'Quando e como limpar a fossa' },
    { label: 'Blog técnico', to: '/blog', hint: 'Guias de hidráulica e esgoto' },
    { label: 'Fale conosco', to: '/contato', hint: 'Tire dúvidas com a equipe editorial' },
    ...(isPilar
      ? [
          { label: 'Inspeção no CIC', to: '/camera-inspecao-esgoto/cic', hint: 'Cidade Industrial de Curitiba' },
          { label: 'Inspeção no Batel', to: '/camera-inspecao-esgoto/batel', hint: 'Prédios e prumadas' },
        ]
      : [
          { label: 'Câmera de inspeção em Curitiba', to: '/servicos/camera-inspecao-esgoto-curitiba', hint: 'Guia completo do serviço' },
        ]),
  ];

  const outrosLocais = locaisInspecao.filter((l) => l.slug !== local.slug);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <nav aria-label="Trilha de navegação" className="bg-muted border-b">
        <div className="container mx-auto px-4 py-3 text-sm text-muted-foreground">
          {breadcrumb.map((item, i) => (
            <span key={item.url}>
              {i > 0 && <span className="mx-2">›</span>}
              {i < breadcrumb.length - 1 ? (
                <Link to={item.url} className="hover:text-primary">{item.name}</Link>
              ) : (
                <span className="text-foreground font-medium">{item.name}</span>
              )}
            </span>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-primary text-primary-foreground py-14 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-1.5 text-sm font-semibold mb-5">
            <Camera className="h-4 w-4" aria-hidden="true" /> Vídeo inspeção com câmera robotizada
          </p>
          <h1 className="text-3xl md:text-5xl font-black mb-5 leading-tight max-w-5xl mx-auto">{h1}</h1>
          <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto">{heroSubtitle}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link
              to={`/busca?servico=camera-inspecao-esgoto&cidade=${local.tipo === 'cidade' ? local.slug : 'curitiba'}`}
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-secondary text-secondary-foreground font-bold hover:bg-secondary/90 transition-colors text-lg"
            >
              Solicitar Diagnóstico →
            </Link>
            <WhatsAppButton
              whatsapp={WHATSAPP}
              size="lg"
              label="WhatsApp — Orçamento Grátis"
              mensagem={`Olá! Preciso de câmera de inspeção de esgoto ${preposicao} ${nomeLocal}. [via página de inspeção]`}
            />
          </div>

          <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <li className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" aria-hidden="true" /> Sem quebrar piso</li>
            <li className="flex items-center gap-1.5"><Video className="h-4 w-4" aria-hidden="true" /> Vídeo e relatório entregues</li>
            <li className="flex items-center gap-1.5"><MapPin className="h-4 w-4" aria-hidden="true" /> Ponto exato localizado</li>
            <li className="flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" /> Atendimento 24h</li>
          </ul>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* RESPOSTA DIRETA — AEO/GEO */}
        <section aria-labelledby="resposta-rapida" className="mb-14">
          <div className="rounded-xl border-l-4 border-primary bg-muted p-6">
            <h2 id="resposta-rapida" className="text-lg font-bold mb-2">Resposta rápida</h2>
            <p className="text-base leading-relaxed">{local.respostaDireta}</p>
          </div>
        </section>

        {/* CONTEXTO LOCAL */}
        <section aria-labelledby="contexto-local" className="mb-14">
          <h2 id="contexto-local" className="text-2xl font-bold mb-4">
            Inspeção de tubulação {preposicao} {nomeLocal}: o que muda na prática
          </h2>
          {local.contexto.map((p) => (
            <p key={p.slice(0, 40)} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
          ))}
          <h3 className="text-lg font-bold mt-6 mb-3">Problemas mais encontrados {preposicao} {nomeLocal}</h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {local.problemasComuns.map((p) => (
              <li key={p} className="flex items-start gap-2 rounded-lg border bg-card px-4 py-3 text-sm">
                <AlertTriangle className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* COMO FUNCIONA */}
        <section aria-labelledby="como-funciona" className="mb-14">
          <h2 id="como-funciona" className="text-2xl font-bold mb-2">Como funciona a câmera de inspeção de esgoto</h2>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            A vídeo inspeção é um exame por imagem do interior da tubulação. Em vez de abrir o piso para procurar o defeito,
            o técnico envia a câmera pelo próprio cano e observa a rede por dentro, do ponto de acesso até o coletor.
          </p>
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {comoFunciona.map((etapa, i) => {
              const Icon = etapaIcons[i % etapaIcons.length];
              return (
                <li key={etapa.titulo} className="rounded-xl border bg-card p-5 h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </span>
                    <h3 className="font-bold">{i + 1}. {etapa.titulo}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{etapa.descricao}</p>
                </li>
              );
            })}
          </ol>
        </section>

        {/* QUANDO UTILIZAR */}
        <section aria-labelledby="quando-utilizar" className="mb-14">
          <h2 id="quando-utilizar" className="text-2xl font-bold mb-2">Quando utilizar a vídeo inspeção</h2>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            Sempre que o sintoma se repete, quando a causa não é visível ou quando a decisão seguinte envolve obra.
            Nesses casos, inspecionar antes custa menos do que quebrar para descobrir.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quandoUtilizar.map((card) => (
              <li key={card.titulo} className="rounded-xl border bg-card p-5">
                <h3 className="font-bold mb-1.5">{card.titulo}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.descricao}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* BENEFÍCIOS */}
        <section aria-labelledby="beneficios" className="mb-14">
          <h2 id="beneficios" className="text-2xl font-bold mb-6">Benefícios do diagnóstico por câmera</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {beneficios.map((b) => (
              <li key={b.titulo} className="flex items-start gap-3 rounded-xl border bg-card p-5">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  <span className="font-bold block">{b.titulo}</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{b.descricao}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* PREÇOS */}
        <section aria-labelledby="precos" className="mb-14">
          <h2 id="precos" className="text-2xl font-bold mb-2">Quanto custa a câmera de inspeção de esgoto {preposicao} {nomeLocal}</h2>
          <p className="text-muted-foreground mb-4 max-w-3xl">
            Valores médios praticados em Curitiba e Região Metropolitana em 2026. O preço final depende da metragem
            percorrida, do ponto de acesso disponível, da entrega de relatório técnico e do horário do atendimento.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-card rounded-xl overflow-hidden border">
              <caption className="sr-only">Tabela de preços médios de vídeo inspeção de tubulação em Curitiba e RMC</caption>
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th scope="col" className="text-left px-4 py-3 font-bold">Tipo de inspeção</th>
                  <th scope="col" className="text-right px-4 py-3 font-bold">Preço médio</th>
                </tr>
              </thead>
              <tbody>
                {tabelaPrecos.map((row) => (
                  <tr key={row.servico} className="border-t border-border hover:bg-muted/50">
                    <td className="px-4 py-3">{row.servico}</td>
                    <td className="px-4 py-3 text-right font-semibold text-primary">{row.preco}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Valores de referência coletados junto a prestadores da região. Sempre confirme o orçamento por escrito antes do serviço.
          </p>
        </section>

        {/* PROBLEMAS ENCONTRADOS */}
        <section aria-labelledby="problemas" className="mb-14">
          <h2 id="problemas" className="text-2xl font-bold mb-2">Problemas que a inspeção encontra dentro da tubulação</h2>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            Cada material — PVC, concreto, ferro fundido ou barro — falha de um jeito diferente. A leitura da imagem
            é o que separa sujeira temporária de dano estrutural que exige reparo.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problemasEncontrados.map((p) => (
              <li key={p.titulo} className="rounded-xl border bg-card p-5">
                <h3 className="font-bold mb-1.5">{p.titulo}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.descricao}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* TECNOLOGIA */}
        <section aria-labelledby="tecnologia" className="mb-14">
          <h2 id="tecnologia" className="text-2xl font-bold mb-6">Tecnologia usada na inspeção</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tecnologia.map((t) => (
              <li key={t.titulo} className="rounded-xl border bg-card p-5">
                <Lightbulb className="h-5 w-5 text-primary mb-2" aria-hidden="true" />
                <h3 className="font-bold mb-1.5 text-sm">{t.titulo}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.descricao}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ANTES E DEPOIS */}
        <section aria-labelledby="antes-depois" className="mb-14">
          <h2 id="antes-depois" className="text-2xl font-bold mb-2">Antes e depois: exemplos ilustrativos</h2>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            Casos típicos registrados em inspeções na região, descritos para ilustrar o que a imagem revela antes
            e depois da solução aplicada.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {antesDepois.map((caso) => (
              <article key={caso.titulo} className="rounded-xl border bg-card p-5">
                <h3 className="font-bold mb-3">{caso.titulo}</h3>
                <p className="text-sm mb-3">
                  <span className="inline-block rounded bg-muted px-2 py-0.5 font-semibold mb-1">Antes</span>
                  <span className="block text-muted-foreground leading-relaxed">{caso.antes}</span>
                </p>
                <p className="text-sm">
                  <span className="inline-block rounded bg-muted px-2 py-0.5 font-semibold mb-1">Depois</span>
                  <span className="block text-muted-foreground leading-relaxed">{caso.depois}</span>
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* PROCESSO */}
        <section aria-labelledby="processo" className="mb-14">
          <h2 id="processo" className="text-2xl font-bold mb-6">O processo em 5 etapas</h2>
          <ol className="grid gap-4 md:grid-cols-5">
            {processo.map((etapa, i) => {
              const Icon = processoIcons[i % processoIcons.length];
              return (
                <li key={etapa.titulo} className="rounded-xl border bg-card p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted mb-2">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </span>
                  <h3 className="font-bold mb-1.5 text-sm">{i + 1}. {etapa.titulo}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{etapa.descricao}</p>
                </li>
              );
            })}
          </ol>
        </section>

        {/* CTA intermediário */}
        <section className="bg-muted rounded-xl p-6 md:p-8 text-center mb-14">
          <h2 className="text-xl font-bold mb-2">Quer saber o que está acontecendo dentro do seu cano?</h2>
          <p className="text-muted-foreground mb-5 max-w-2xl mx-auto">
            Descreva o sintoma no WhatsApp e receba orientação e orçamento de inspeção sem compromisso — resposta em até 15 minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <WhatsAppButton
              whatsapp={WHATSAPP}
              size="lg"
              label="Falar no WhatsApp"
              mensagem={`Olá! Quero orçamento de vídeo inspeção de tubulação ${preposicao} ${nomeLocal}.`}
            />
            <a
              href="tel:+5541992721004"
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors gap-2"
            >
              <Phone className="h-5 w-5" aria-hidden="true" /> Ligar (41) 99272-1004
            </a>
          </div>
        </section>

        {/* ONDE ATENDEMOS */}
        <section aria-labelledby="onde-atendemos" className="mb-14">
          <h2 id="onde-atendemos" className="text-2xl font-bold mb-2">Onde atendemos</h2>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            A inspeção por câmera atende residências, condomínios, empresas, indústrias, comércios, hospitais, escolas,
            restaurantes e shopping centers em Curitiba e em toda a Região Metropolitana.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {publicosAtendidos.map((p) => (
              <li key={p.titulo} className="rounded-xl border bg-card p-4">
                <h3 className="font-bold text-sm mb-1">{p.titulo}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.descricao}</p>
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-bold mb-3">Cidades atendidas com página própria</h3>
          <ul className="flex flex-wrap gap-2 mb-8">
            {outrosLocais.map((l) => (
              <li key={l.slug}>
                <Link
                  to={`/camera-inspecao-esgoto/${l.slug}`}
                  className="inline-block text-sm bg-muted px-3 py-1.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Inspeção {l.tipo === 'bairro' ? 'no' : 'em'} {l.nome}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-bold mb-3">Bairros de Curitiba com profissionais cadastrados</h3>
          <ul className="flex flex-wrap gap-1.5">
            {todosBairros.map((b) => (
              <li key={b.slug}>
                <Link
                  to={`/curitiba/${b.slug}`}
                  className="inline-block text-xs bg-muted px-2.5 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {b.nome}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq" className="mb-14">
          <h2 id="faq" className="sr-only">Perguntas frequentes sobre câmera de inspeção de esgoto</h2>
          <FaqPremium
            perguntas={faqCameraInspecao}
            titulo="Perguntas frequentes sobre câmera de inspeção"
            subtitulo={`${faqCameraInspecao.length} dúvidas reais sobre vídeo inspeção de tubulação ${preposicao} ${nomeLocal}`}
          />
        </section>

        {/* LINKS INTERNOS */}
        <RelatedLinks links={relatedLinks} />

        {/* CTA FINAL */}
        <section className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            Diagnóstico antes da obra: economize a quebra desnecessária
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Profissionais verificados, vídeo do percurso entregue ao cliente e relatório técnico com a solução recomendada.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <WhatsAppButton
              whatsapp={WHATSAPP}
              size="lg"
              label="WhatsApp (41) 99272-1004"
              mensagem={`Olá! Preciso de câmera de inspeção de esgoto ${preposicao} ${nomeLocal}.`}
            />
            <Link
              to="/busca?servico=camera-inspecao-esgoto"
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-secondary text-secondary-foreground font-bold hover:bg-secondary/90 transition-colors"
            >
              Ver empresas de inspeção →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CameraInspecaoPage;
