import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Search, ShieldCheck, MessageCircle } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { ServiceIcon } from '@/components/ServiceIcon';
import { regionais } from '@/data/bairros';
import { cidadesRMC } from '@/data/cidades-rmc';
import { categoriasRapidas, servicos } from '@/data/servicos';
import {
  useSEO,
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildCollectionPageSchema,
} from '@/hooks/useSEO';

function toSlug(nome: string): string {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

const regionaisNomes = Object.keys(regionais);
const totalRegionais = regionaisNomes.length;

/** Perguntas respondidas de forma direta — formato pensado para AI Overviews,
 *  Gemini, ChatGPT, Copilot e Perplexity (resposta factual antes do detalhe). */
const perguntas = [
  {
    pergunta: 'Onde encontrar prestadores de serviços em Curitiba?',
    resposta:
      'No Serviços no Bairro você encontra desentupidoras e encanadores organizados por bairro de Curitiba. A navegação segue as regionais oficiais da cidade: escolha a regional, depois o bairro, e veja as empresas que atendem aquele endereço com contato direto por WhatsApp.',
  },
  {
    pergunta: 'Quais serviços estão disponíveis em Curitiba pelo diretório?',
    resposta:
      'O diretório cobre duas categorias: desentupimento (vaso sanitário, pia de cozinha e banheiro, ralo, esgoto residencial e comercial, caixa de gordura, hidrojateamento, câmera de inspeção, limpa fossa, desentupimento industrial e emergência 24h) e encanamento (encanador residencial e comercial, conserto de vazamento, instalação hidráulica, troca de tubulação, instalação de caixa d’água, conserto de torneira e chuveiro, instalação de aquecedor, hidráulica de reforma de banheiro e detecção de vazamento oculto).',
  },
  {
    pergunta: 'O Serviços no Bairro executa os serviços?',
    resposta:
      'Não. O Serviços no Bairro é um diretório: reúne e organiza empresas prestadoras por localidade e categoria. A contratação, a execução e o pagamento acontecem diretamente entre você e a empresa escolhida.',
  },
  {
    pergunta: 'Como funciona a busca por bairro em Curitiba?',
    resposta:
      `Os bairros estão agrupados nas ${totalRegionais} regionais usadas nesta plataforma. Cada página de bairro reúne as empresas que atendem a região, as características hidráulicas típicas do local, os problemas mais frequentes ali e perguntas específicas daquele bairro.`,
  },
  {
    pergunta: 'Atende a Região Metropolitana de Curitiba?',
    resposta:
      `Sim. Além de Curitiba, há páginas por cidade da Região Metropolitana, entre elas ${cidadesRMC
        .slice(0, 8)
        .map((c) => c.nome)
        .join(', ')} e outras. Cada cidade tem sua própria página com as empresas que declaram atender aquela localidade.`,
  },
];

const CuritibaHubPage = () => {
  useSEO({
    title: 'Serviços em Curitiba: Profissionais por Bairro | Serviços no Bairro',
    description:
      'Encontre desentupidoras e encanadores em Curitiba por bairro e regional. Navegue por categoria de serviço, veja empresas que atendem seu endereço e peça orçamento grátis.',
    canonical: '/curitiba',
    geoPlacename: 'Curitiba, Paraná',
    jsonLd: [
      buildBreadcrumbSchema([
        { name: 'Início', url: '/' },
        { name: 'Curitiba', url: '/curitiba' },
      ]),
      buildCollectionPageSchema({
        name: 'Serviços em Curitiba',
        description:
          'Diretório de desentupidoras e encanadores em Curitiba, organizado por bairro, regional e categoria de serviço.',
        url: '/curitiba',
        about: { '@type': 'City', name: 'Curitiba', addressRegion: 'PR', addressCountry: 'BR' },
        items: regionaisNomes.flatMap((regional) =>
          regionais[regional].map((b) => ({ name: b, url: `/curitiba/${toSlug(b)}` })),
        ),
      }),
      buildFAQSchema(perguntas),
    ],
  });

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-muted border-b">
        <div className="container mx-auto px-4 py-3">
          <nav aria-label="Trilha de navegação" className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Início</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-medium text-foreground" aria-current="page">Curitiba</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-14 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            Serviços em Curitiba:<br className="hidden md:block" /> Encontre Profissionais no Seu Bairro
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Desentupidoras e encanadores organizados por bairro e regional da capital paranaense
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Resposta curta — bloco GEO/AIO */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="rounded-xl border bg-card p-5 md:p-6">
            <h2 className="text-xl font-bold mb-3">Onde encontrar prestadores de serviços em Curitiba?</h2>
            <p className="text-muted-foreground">
              O Serviços no Bairro organiza desentupidoras e encanadores pelos bairros de Curitiba, agrupados
              nas {totalRegionais} regionais usadas nesta plataforma. Escolha a regional, depois o bairro, e veja
              as empresas que atendem aquele endereço. O diretório não executa os serviços: ele conecta você
              diretamente à empresa, por WhatsApp, sem custo para o morador.
            </p>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">Categorias de serviço em Curitiba</h2>
          <p className="text-center text-muted-foreground mb-8">
            {servicos.length} serviços cadastrados em desentupimento e encanamento
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categoriasRapidas.map((s) => (
              <Link
                key={s.slug}
                to={`/servicos/${s.slug}`}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border hover:border-primary hover:shadow-md transition-all text-center group"
              >
                <ServiceIcon name={s.icone} className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-foreground group-hover:text-primary leading-tight">{s.nome}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bairros por regional */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">Bairros de Curitiba por regional</h2>
          <p className="text-center text-muted-foreground mb-8">
            Navegue pela regional para chegar ao seu bairro
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionaisNomes.map((regional) => (
              <div key={regional} className="bg-card rounded-xl p-5 border">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" aria-hidden="true" /> Regional {regional}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {regionais[regional].map((b) => (
                    <Link
                      key={b}
                      to={`/curitiba/${toSlug(b)}`}
                      className="text-xs bg-muted px-2.5 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {b}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">Como contratar em Curitiba</h2>
          <p className="text-center text-muted-foreground mb-8">3 passos, sem custo para o morador</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card border hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Search className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Escolha o bairro</h3>
              <p className="text-sm text-muted-foreground">Encontre seu bairro na regional correspondente ou use a busca.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card border hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <ShieldCheck className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-bold text-lg mb-2">Compare as empresas</h3>
              <p className="text-sm text-muted-foreground">Veja categoria, serviços oferecidos, horários e área de atendimento.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card border hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <MessageCircle className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-bold text-lg mb-2">Peça orçamento</h3>
              <p className="text-sm text-muted-foreground">Fale direto com a empresa pelo WhatsApp e combine o atendimento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Perguntas frequentes — GEO/AIO */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-8">Perguntas frequentes sobre serviços em Curitiba</h2>
          <div className="space-y-4">
            {perguntas.map((p) => (
              <div key={p.pergunta} className="rounded-xl border bg-card p-5">
                <h3 className="font-bold mb-2">{p.pergunta}</h3>
                <p className="text-sm text-muted-foreground">{p.resposta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Região Metropolitana */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">Fora de Curitiba? Veja a Região Metropolitana</h2>
          <p className="text-center text-muted-foreground mb-8">Cidades da RMC com página própria</p>
          <div className="flex flex-wrap justify-center gap-2">
            {cidadesRMC.slice(0, 12).map((c) => (
              <Link
                key={c.slug}
                to={`/rmc/${c.slug}`}
                className="bg-card border rounded-lg px-4 py-2.5 hover:border-primary hover:shadow-sm transition-all text-sm"
              >
                <span className="font-medium">{c.nome}</span>
                <span className="text-muted-foreground ml-1.5 text-xs">({c.distanciaKm}km)</span>
              </Link>
            ))}
            <Link to="/busca" className="bg-primary text-primary-foreground rounded-lg px-4 py-2.5 text-sm font-bold hover:bg-primary/90 transition-colors">
              Ver todas →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CuritibaHubPage;
