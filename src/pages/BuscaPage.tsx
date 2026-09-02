import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getEmpresasPorBairro, empresas as empresasReais } from '@/data/empresas';
import { servicos } from '@/data/servicos';
import { todosBairros } from '@/data/bairros';
import { CompanyCard } from '@/components/CompanyCard';
import { SearchBar } from '@/components/SearchBar';
import { Empresa } from '@/types';
import { SlidersHorizontal, X } from 'lucide-react';
import { useSEO, buildBreadcrumbSchema } from '@/hooks/useSEO';

const POPULAR_BAIRROS = ['centro', 'batel', 'agua-verde', 'boqueirao', 'portao', 'cajuru', 'boa-vista', 'santa-felicidade', 'bacacheri', 'pinheirinho'];

const BuscaPage = () => {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState<string>('');
  const [filtro24h, setFiltro24h] = useState(searchParams.get('24h') === 'true');
  const [filtroVerificada, setFiltroVerificada] = useState(false);
  const [filtroServico, setFiltroServico] = useState(searchParams.get('servico') || '');
  const [ordenar, setOrdenar] = useState('relevante');

  const localParam = searchParams.get('local') || '';

  useSEO({
    title: 'Buscar Empresas de Serviços em Curitiba | Serviços no Bairro',
    description: 'Encontre e compare empresas e profissionais que prestam serviços em Curitiba e na RMC: desentupimento, hidráulica, motofrete e mais. Filtre por bairro, categoria, 24h e avaliação.',
    canonical: '/busca',
    jsonLd: buildBreadcrumbSchema([
      { name: 'Início', url: '/' },
      { name: 'Buscar', url: '/busca' },
    ]),
  });

  // Generate empresas from popular bairros + real registered companies
  const todasEmpresas = useMemo(() => {
    const map = new Map<string, Empresa>();
    for (const e of empresasReais) {
      map.set(e.slug, e);
    }
    for (const bSlug of POPULAR_BAIRROS) {
      const empresas = getEmpresasPorBairro(bSlug);
      for (const e of empresas) {
        // Use template prefix as dedup key
        const key = e.nome.split(' ').slice(0, 2).join(' ');
        if (!map.has(key) && !map.has(e.slug)) {
          map.set(key, e);
        }
      }
    }
    return Array.from(map.values());
  }, []);

  const resultado = useMemo(() => {
    let filtered = [...todasEmpresas];

    if (filtroTipo) {
      filtered = filtered.filter(e => e.tipoServico.includes(filtroTipo as any));
    }
    if (filtro24h) {
      filtered = filtered.filter(e => e.atende24h);
    }
    if (filtroVerificada) {
      filtered = filtered.filter(e => e.verificada);
    }
    if (filtroServico) {
      filtered = filtered.filter(e => e.servicosOferecidos.includes(filtroServico));
    }
    if (localParam) {
      // "Sé — São Paulo" -> ["se", "sao", "paulo"] ; matches bairro/cidade slugs (inclusive "sp-se")
      const tokens = localParam
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim()
        .split(' ')
        .filter(Boolean);
      const slug = tokens.join('-');
      const matches = (v: string) =>
        v.includes(slug) || slug.includes(v) || tokens.every(t => v.includes(t));
      filtered = filtered.filter(e =>
        e.bairrosAtendidos.some(matches) || e.cidadesAtendidas.some(matches)
      );
    }

    switch (ordenar) {
      case 'avaliacao':
        filtered.sort((a, b) => b.notaMedia - a.notaMedia);
        break;
      case 'avaliacoes':
        filtered.sort((a, b) => b.totalAvaliacoes - a.totalAvaliacoes);
        break;
      default:
        filtered.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));
    }

    return filtered;
  }, [todasEmpresas, filtroTipo, filtro24h, filtroVerificada, filtroServico, localParam, ordenar]);

  return (
    <div className="min-h-screen">
      <div className="bg-muted border-b">
        <div className="container mx-auto px-4 py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Início</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground font-medium">Buscar</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-black">Buscar Empresas de Serviços em Curitiba e Região</h1>
          <p className="mt-2 text-muted-foreground max-w-3xl">
            Compare empresas e profissionais verificados que prestam serviços no seu bairro — desentupimento,
            hidráulica, motofrete e entregas — com atendimento 24h e orçamento gratuito pelo WhatsApp.
          </p>
        </header>
        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters toggle mobile */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            aria-controls="filtros-busca"
            className="lg:hidden flex items-center gap-2 h-10 px-4 rounded-lg border font-medium text-sm"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filtros
            {showFilters && <X className="h-4 w-4 ml-auto" aria-hidden="true" />}
          </button>

          {/* Sidebar Filters */}
          <aside
            id="filtros-busca"
            aria-label="Filtros de busca de empresas"
            className={`lg:w-64 flex-shrink-0 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <form className="bg-card rounded-xl border p-5 space-y-5" onSubmit={e => e.preventDefault()}>
              <h2 className="font-bold text-base">Filtrar Resultados</h2>

              <fieldset>
                <legend className="text-sm font-medium mb-2">Categoria de serviço</legend>
                <div className="space-y-1">
                  {[
                    { value: '', label: 'Todas as categorias' },
                    { value: 'desentupimento', label: 'Desentupidora' },
                    { value: 'encanamento', label: 'Encanador e hidráulica' },
                    { value: 'motofrete', label: 'Motofrete e entregas' },
                  ].map(opt => (
                    <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="tipo"
                        value={opt.value}
                        checked={filtroTipo === opt.value}
                        onChange={() => setFiltroTipo(opt.value)}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-medium mb-2">Disponibilidade</legend>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={filtro24h} onChange={e => setFiltro24h(e.target.checked)} />
                  Atende 24 horas
                </label>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-medium mb-2">Verificação</legend>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={filtroVerificada} onChange={e => setFiltroVerificada(e.target.checked)} />
                  Somente empresas verificadas
                </label>
              </fieldset>

              <div>
                <label htmlFor="filtro-servico" className="block text-sm font-medium mb-2">Serviço específico</label>
                <select
                  id="filtro-servico"
                  value={filtroServico}
                  onChange={e => setFiltroServico(e.target.value)}
                  className="w-full h-9 px-2 rounded-md border bg-background text-sm"
                >
                  <option value="">Todos os serviços</option>
                  {servicos.map(s => (
                    <option key={s.slug} value={s.slug}>{s.nome}</option>
                  ))}
                </select>
              </div>
            </form>
          </aside>

          {/* Results */}
          <section className="flex-1" aria-label="Resultados da busca">
            <div className="flex items-center justify-between mb-4">
              <p aria-live="polite" className="text-sm text-muted-foreground">
                {resultado.length} empresa{resultado.length !== 1 ? 's' : ''} encontrada{resultado.length !== 1 ? 's' : ''}
              </p>
              <div className="flex items-center gap-2">
                <label htmlFor="ordenar-resultados" className="sr-only">Ordenar resultados</label>
                <select
                  id="ordenar-resultados"
                  value={ordenar}
                  onChange={e => setOrdenar(e.target.value)}
                  className="h-9 px-3 rounded-md border bg-background text-sm"
                >
                  <option value="relevante">Mais Relevante</option>
                  <option value="avaliacao">Melhor Avaliado</option>
                  <option value="avaliacoes">Mais Avaliações</option>
                </select>
              </div>
            </div>

            <ul className="space-y-4 list-none p-0 m-0">
              {resultado.map(e => (
                <li key={e.slug}>
                  <CompanyCard empresa={e} />
                </li>
              ))}
            </ul>

            {resultado.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg font-medium mb-2">Nenhuma empresa encontrada</p>
                <p>Tente ajustar os filtros ou buscar em outra região.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default BuscaPage;
