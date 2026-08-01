import { Link } from 'react-router-dom';
import { Clock, ShieldCheck, Truck, Wrench, Wallet, Users, ArrowRight } from 'lucide-react';
import type { PerfilLocal } from '@/data/perfis-locais';
import { nomeServico } from '@/data/perfis-locais';

interface PerfilLocalSectionProps {
  perfil: PerfilLocal;
  localNome: string;
  isCidade: boolean;
}

const BENEFICIOS = [
  { icone: Clock, titulo: 'Atendimento 24 horas', texto: 'Equipes de plantão em madrugadas, fins de semana e feriados, com prioridade para emergências.' },
  { icone: Truck, titulo: 'Chegada rápida', texto: 'Tempo médio de 40 a 90 minutos conforme a distância e o horário do chamado.' },
  { icone: Wrench, titulo: 'Equipamentos modernos', texto: 'Hidrojato de alta pressão, câmera de inspeção, geofone e rotosonda de diâmetros variados.' },
  { icone: ShieldCheck, titulo: 'Garantia por escrito', texto: 'Serviços executados com garantia informada no orçamento antes do início do trabalho.' },
  { icone: Users, titulo: 'Equipe especializada', texto: 'Profissionais com CNPJ ativo verificado e avaliações reais publicadas no perfil.' },
  { icone: Wallet, titulo: 'Orçamento imediato', texto: 'Estimativa gratuita por WhatsApp e pagamento em dinheiro, PIX, débito ou cartão parcelado.' },
];

const PASSOS = [
  { n: 1, titulo: 'Contato', texto: 'Você descreve o problema por WhatsApp ou telefone e informa o endereço. O orçamento inicial sai em minutos.' },
  { n: 2, titulo: 'Diagnóstico', texto: 'No local, o profissional identifica o ponto da obstrução ou do vazamento, com câmera de inspeção quando necessário.' },
  { n: 3, titulo: 'Execução', texto: 'O serviço é feito com o equipamento adequado ao diâmetro e ao tipo de tubulação, sem quebra desnecessária.' },
  { n: 4, titulo: 'Garantia', texto: 'Teste de escoamento na sua frente, limpeza da área e prazo de garantia registrado no comprovante.' },
];

/**
 * Bloco de conteúdo local exclusivo (perfil, problemas, serviços, benefícios,
 * processo e EEAT) reaproveitado por páginas de bairro e de cidade.
 */
export function PerfilLocalSection({ perfil, localNome, isCidade }: PerfilLocalSectionProps) {
  const prep = isCidade ? 'em' : 'no';

  return (
    <>
      {/* Resposta direta — bloco AEO/GEO */}
      <section aria-labelledby="resposta-rapida" className="mb-12">
        <div className="rounded-xl border-l-4 border-primary bg-muted p-6">
          <h2 id="resposta-rapida" className="text-lg font-bold mb-2">
            Resumo rápido: desentupidora {prep} {localNome}
          </h2>
          <p className="text-base leading-relaxed">{perfil.respostaDireta}</p>
        </div>
      </section>

      {/* Perfil da região */}
      <section aria-labelledby="perfil-local" className="mb-12">
        <h2 id="perfil-local" className="text-xl font-bold mb-4">
          Como é a estrutura hidráulica {prep} {localNome}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border bg-card p-5">
            <h3 className="font-bold mb-2">Perfil residencial</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{perfil.perfilResidencial}</p>
          </article>
          <article className="rounded-xl border bg-card p-5">
            <h3 className="font-bold mb-2">Perfil comercial</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{perfil.perfilComercial}</p>
          </article>
          <article className="rounded-xl border bg-card p-5">
            <h3 className="font-bold mb-2">Tipos de imóvel</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{perfil.imoveis}</p>
          </article>
          <article className="rounded-xl border bg-card p-5">
            <h3 className="font-bold mb-2">Infraestrutura de esgoto</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{perfil.infraestrutura}</p>
          </article>
        </div>
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
          <strong className="text-foreground">Demanda mais comum:</strong> {perfil.demanda}
        </p>
      </section>

      {/* Problemas frequentes */}
      <section aria-labelledby="problemas-locais" className="mb-12">
        <h2 id="problemas-locais" className="text-xl font-bold mb-4">
          Problemas de encanamento mais frequentes {prep} {localNome}
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {perfil.problemas.map((p) => (
            <li key={p.titulo} className="rounded-xl border bg-card p-5">
              <h3 className="font-bold mb-1">{p.titulo}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.texto}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Serviços mais buscados */}
      <section aria-labelledby="servicos-locais" className="mb-12">
        <h2 id="servicos-locais" className="text-xl font-bold mb-4">
          Serviços mais solicitados {prep} {localNome}
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {perfil.servicosDestaque.map((slug) => (
            <li key={slug}>
              <Link
                to={`/servicos/${slug}`}
                className="group flex items-center justify-between gap-2 rounded-lg border bg-card px-4 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
              >
                <span className="capitalize">{nomeServico(slug)}</span>
                <ArrowRight className="h-4 w-4 shrink-0 opacity-60 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Benefícios */}
      <section aria-labelledby="beneficios-locais" className="mb-12">
        <h2 id="beneficios-locais" className="text-xl font-bold mb-4">
          Por que contratar pelo Serviços no Bairro
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFICIOS.map(({ icone: Icone, titulo, texto }) => (
            <li key={titulo} className="rounded-xl border bg-card p-5">
              <Icone className="h-5 w-5 text-primary mb-2" aria-hidden="true" />
              <h3 className="font-bold mb-1">{titulo}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{texto}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Como funciona */}
      <section aria-labelledby="como-funciona-local" className="mb-12">
        <h2 id="como-funciona-local" className="text-xl font-bold mb-4">
          Como funciona o atendimento {prep} {localNome}
        </h2>
        <ol className="grid gap-4 md:grid-cols-4">
          {PASSOS.map((p) => (
            <li key={p.n} className="rounded-xl border bg-card p-5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold mb-2">
                {p.n}
              </span>
              <h3 className="font-bold mb-1">{p.titulo}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* EEAT */}
      <section aria-labelledby="experiencia-local" className="mb-12">
        <h2 id="experiencia-local" className="text-xl font-bold mb-4">
          Experiência e critérios de verificação
        </h2>
        <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground leading-relaxed space-y-3">
          <p>
            As empresas listadas {prep} {localNome} passam por checagem de CNPJ ativo, endereço, canais de
            atendimento e histórico de avaliações antes de aparecerem no diretório. Os critérios completos
            estão em <Link to="/como-selecionamos-profissionais" className="text-primary font-medium hover:underline">como selecionamos profissionais</Link>.
          </p>
          <p>
            As faixas de preço publicadas são médias de mercado observadas em Curitiba e Região
            Metropolitana, não uma tabela oficial: o valor final depende do diagnóstico no local, do
            diâmetro da tubulação e do horário do chamado. A metodologia está descrita na{' '}
            <Link to="/politica-editorial" className="text-primary font-medium hover:underline">política editorial</Link>.
          </p>
          <p>
            O Serviços no Bairro é um diretório: não executa os serviços e não cobra nada do morador. Saiba
            mais em <Link to="/quem-somos" className="text-primary font-medium hover:underline">quem somos</Link> e{' '}
            <Link to="/como-funciona" className="text-primary font-medium hover:underline">como funciona</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
