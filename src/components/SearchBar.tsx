import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { servicos } from '@/data/servicos';
import { todosBairros } from '@/data/bairros';
import { cidadesRMC } from '@/data/cidades-rmc';

export function SearchBar() {
  const navigate = useNavigate();
  const [servico, setServico] = useState('');
  const [local, setLocal] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (servico) params.set('servico', servico);
    if (local) params.set('local', local);
    navigate(`/busca?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row bg-card rounded-xl shadow-lg border overflow-hidden">
        {/* Service Select */}
        <div className="flex-1 relative border-b sm:border-b-0 sm:border-r">
          <select
            aria-label="Filtrar por tipo de serviço"
            value={servico}
            onChange={e => setServico(e.target.value)}
            className="w-full h-12 sm:h-14 pl-10 pr-4 bg-transparent text-foreground text-sm appearance-none cursor-pointer focus:outline-none"
          >
            <option value="">Tipo de Serviço</option>
            {servicos.map(s => (
              <option key={s.slug} value={s.slug}>{s.icone} {s.nome}</option>
            ))}
          </select>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        {/* Location Input */}
        <div className="flex-1 relative border-b sm:border-b-0 sm:border-r">
          <input
            type="text"
            aria-label="Buscar por cidade ou bairro"
            value={local}
            onChange={e => setLocal(e.target.value)}
            placeholder="Cidade ou Bairro"
            list="locations-list"
            className="w-full h-12 sm:h-14 pl-10 pr-4 bg-transparent text-foreground text-sm placeholder:text-muted-foreground focus:outline-none"
          />
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <datalist id="locations-list">
            {todosBairros.map(b => (
              <option key={b.slug} value={b.nome} />
            ))}
            {cidadesRMC.map(c => (
              <option key={c.slug} value={c.nome} />
            ))}
          </datalist>
        </div>

        {/* Submit */}
        <Button type="submit" className="h-12 sm:h-14 px-8 rounded-none sm:rounded-r-xl bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base font-bold">
          BUSCAR AGORA
        </Button>
      </div>
    </form>
  );
}
