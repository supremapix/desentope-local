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
    title: 'Buscar Desentupidoras e Encanadores — Curitiba | Serviços no Bairro',
    description: 'Busque e compare desentupidoras e encanadores em Curitiba e Região Metropolitana. Filtros por bairro, tipo, disponibilidade 24h e avaliação.',
    canonical: '/busca',
    jsonLd: buildBreadcrumbSchema([
      { name: 'Início', url: '/' },
      { name: 'Buscar', url: '/busca' },
    ]),
  });

  // Generate empresas from popular bairros
  const todasEmpresas = useMemo(() => {
    const map = new Map<string, Empresa>();
    for (const bSlug of POPULAR_BAIRROS) {
      const empresas = getEmpresasPorBairro(bSlug);
      for (const e of empresas) {
        // Use template prefix as dedup key
        const key = e.nome.split(' ').slice(0, 2).join(' ');
        if (!map.has(key)) {
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
      const slug = localParam.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
      filtered = filtered.filter(e =>
        e.bairrosAtendidos.some(b => b.includes(slug)) ||
        e.cidadesAtendidas.some(c => c.includes(slug))
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
        <h1 className="text-2xl font-black mb-6">Buscar Empresas</h1>
        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters toggle mobile */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 h-10 px-4 rounded-lg border font-medium text-sm"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
            {showFilters && <X className="h-4 w-4 ml-auto" />}
          </button>

          {/* Sidebar Filters */}
          <aside className={`lg:w-64 flex-shrink-0 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-card rounded-xl border p-5 space-y-5">
              <h3 className="font-bold">Filtrar Resultados</h3>

              <div>
                <div className="text-sm font-medium mb-2">Tipo</div>
                <div className="space-y-1">
                  {[{ value: '', label: 'Todos' }, { value: 'desentupimento', label: 'Desentupidora' }, { value: 'encanamento', label: 'Encanador' }].map(opt => (
                    <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="tipo" value={opt.value} checked={filtroTipo === opt.value} onChange={() => setFiltroTipo(opt.value)} />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Disponibilidade</div>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={filtro24h} onChange={e => setFiltro24h(e.target.checked)} />
                  Atende 24h
                </label>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Verificação</div>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={filtroVerificada} onChange={e => setFiltroVerificada(e.target.checked)} />
                  Empresa verificada
                </label>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Serviço</div>
                <select
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
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">{resultado.length} empresa{resultado.length !== 1 ? 's' : ''} encontrada{resultado.length !== 1 ? 's' : ''}</span>
              <select
                value={ordenar}
                onChange={e => setOrdenar(e.target.value)}
                className="h-9 px-3 rounded-md border bg-background text-sm"
              >
                <option value="relevante">Mais Relevante</option>
                <option value="avaliacao">Melhor Avaliado</option>
                <option value="avaliacoes">Mais Avaliações</option>
              </select>
            </div>

            <div className="space-y-4">
              {resultado.map(e => (
                <CompanyCard key={e.slug} empresa={e} />
              ))}
            </div>

            {resultado.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg font-medium mb-2">Nenhuma empresa encontrada</p>
                <p>Tente ajustar os filtros ou buscar em outra região.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuscaPage;
