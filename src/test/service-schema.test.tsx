import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as empresasData from '@/data/empresas';
import * as servicosData from '@/data/servicos';
import * as faqData from '@/data/faq-servicos';
import { buildServiceSchema, useSEO } from '@/hooks/useSEO';
import ServicoPage from '@/pages/ServicoPage';

const servico = servicosData.getServicoBySlug('entrega-expressa-van')!;
const empresa = empresasData.getEmpresasPorServico(servico.slug)[0];

function renderServico(slug = servico.slug) {
  return render(
    <MemoryRouter initialEntries={[`/servicos/${slug}`]}>
      <Routes><Route path="/servicos/:slug" element={<ServicoPage />} /></Routes>
    </MemoryRouter>,
  );
}

function readSchema(type: string) {
  return [...document.querySelectorAll('script[data-seo-jsonld]')]
    .map(script => JSON.parse(script.textContent!))
    .find(schema => schema['@type'] === type);
}

function resposta24h() {
  return readSchema('FAQPage').mainEntity.find((item: { name: string }) => item.name.includes('24 horas')).acceptedAnswer.text;
}

beforeEach(() => {
  // Isola o FAQ de fallback, sem alterar o conteúdo editorial dos serviços.
  vi.spyOn(faqData, 'getAllFaqServico').mockReturnValue([]);
  vi.spyOn(faqData, 'getFaqServico').mockReturnValue(undefined);
  vi.spyOn(faqData, 'getDicasServico').mockReturnValue([]);
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('buildServiceSchema honesto e compatível', () => {
  it.each([undefined, 'Sob consulta', 'R$ 1.250,50 - R$ 2.000,75'])('não fabrica oferta para preço %s', (preco) => {
    const schema = buildServiceSchema('Refrigeração em Navegantes', 'Descrição editorial.', preco, 47);
    expect(schema).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Refrigeração em Navegantes',
      description: 'Descrição editorial.',
    });
    expect(JSON.stringify(schema)).not.toMatch(/AggregateOffer|lowPrice|highPrice|priceCurrency|availability|provider|Curitiba|offerCount/);
  });

  it('usa somente as regiões explícitas, sem presumir Curitiba', () => {
    const schema = buildServiceSchema('Lavagem', 'Descrição.', undefined, undefined, { regioes: ['Osasco', ' Osasco ', 'São Paulo', ''] });
    expect(schema).toHaveProperty('areaServed', [
      { '@type': 'Place', name: 'Osasco' },
      { '@type': 'Place', name: 'São Paulo' },
    ]);
  });

  it.each([0, 1])('conta %s cadastros reais, não disponibilidade ou ofertas', (quantidade) => {
    const listadas = [{ nome: empresa.nome, slug: empresa.slug }].slice(0, quantidade);
    const schema = buildServiceSchema(servico.nome, servico.descricao, 'Sob consulta', 47, {
      regioes: quantidade ? ['São Paulo', 'Curitiba'] : [],
      listagem: { url: `/servicos/${servico.slug}`, empresas: listadas },
    });
    expect(schema).toMatchObject({ '@type': 'CollectionPage', mainEntity: { '@type': 'ItemList', numberOfItems: quantidade } });
    expect(schema).toHaveProperty('mainEntity.itemListElement', listadas.map((item, index) => ({
      '@type': 'ListItem', position: index + 1, name: item.nome,
      url: `https://www.servicosnobairro.com.br/empresa/${item.slug}`,
    })));
    expect(JSON.stringify(schema)).not.toMatch(/AggregateOffer|lowPrice|highPrice|availability|provider|offerCount/);
    if (quantidade === 0) expect(schema).not.toHaveProperty('about.areaServed');
  });
});

describe('página de serviço baseada nos cadastros', () => {
  it('remove geometadados da rota anterior e preserva o comportamento padrão das outras páginas', () => {
    function PaginaLocal() {
      useSEO({ title: 'Página local', description: 'Descrição local.' });
      return null;
    }
    const local = render(<PaginaLocal />);
    expect(document.querySelector('meta[name="geo.region"]')).toHaveAttribute('content', 'BR-PR');
    local.unmount();
    const servicoRender = renderServico();
    for (const name of ['geo.region', 'geo.placename', 'geo.position', 'ICBM']) {
      expect(document.querySelector(`meta[name="${name}"]`)).toBeNull();
    }
    servicoRender.unmount();
    render(<PaginaLocal />);
    expect(document.querySelector('meta[name="geo.region"]')).toHaveAttribute('content', 'BR-PR');
  });

  it('não indexa um serviço desconhecido nem deixa schema ou canonical antigos', () => {
    const anterior = renderServico();
    anterior.unmount();
    renderServico('servico-inexistente');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Serviço não encontrado');
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.querySelectorAll('script[data-seo-jsonld]')).toHaveLength(0);
  });

  it('exibe zero cadastros sem prometer disponibilidade, cidade ou 24h', () => {
    vi.spyOn(empresasData, 'getEmpresasPorServico').mockReturnValue([]);
    renderServico();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(servico.nome);
    expect(screen.getByText('Nenhuma empresa cadastrada para este serviço ainda.')).toBeInTheDocument();
    expect(document.title).not.toMatch(/24h|Curitiba/);
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain('Nenhuma empresa cadastrada');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).not.toMatch(/disponíveis|grátis/);
    expect(readSchema('CollectionPage').mainEntity.numberOfItems).toBe(0);
    expect(readSchema('CollectionPage').about).not.toHaveProperty('areaServed');
    expect(resposta24h()).toContain('Não há confirmação de atendimento 24 horas');
  });

  it('um cadastro sem 24h não vira promessa de plantão e mantém Sob consulta', () => {
    vi.spyOn(empresasData, 'getEmpresasPorServico').mockReturnValue([{ ...empresa, atende24h: false, cidadesAtendidas: ['sao-paulo', 'curitiba'] }]);
    const { container } = renderServico();
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain('1 empresa cadastrada');
    expect(document.title).not.toMatch(/24h/);
    expect(container.textContent).toContain('Preço: Sob consulta');
    expect(container.textContent).not.toContain('Preço médio: Sob consulta');
    expect(container.textContent).toContain('A lista de localidades não significa atendimento em qualquer trajeto');
    expect(readSchema('CollectionPage').mainEntity.numberOfItems).toBe(1);
    expect(resposta24h()).toContain('Nenhuma das empresas cadastradas informa atendimento 24 horas');
    fireEvent.click(screen.getByRole('button', { name: /tem atendimento 24 horas/ }));
    expect(screen.getByText(resposta24h())).toBeInTheDocument();
  });

  it('atribui a declaração 24h à única empresa cadastrada e pede confirmação', () => {
    vi.spyOn(empresasData, 'getEmpresasPorServico').mockReturnValue([{ ...empresa, atende24h: true }]);
    renderServico();
    expect(resposta24h()).toContain('1 empresa cadastrada informa atendimento 24 horas');
    expect(resposta24h()).toContain('Confirme a disponibilidade');
    expect(resposta24h()).not.toContain('Diversas empresas');
    expect(document.title).not.toContain('24h');
  });

  it('mantém integralmente o preço informado sem convertê-lo em oferta', () => {
    const preco = 'R$ 1.250,50 - R$ 2.000,75';
    vi.spyOn(servicosData, 'getServicoBySlug').mockReturnValue({ ...servico, precoMedio: preco });
    const { container } = renderServico();
    expect(container.textContent).toContain(`Referência de preço: ${preco}`);
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain(preco);
    expect(JSON.stringify(readSchema('FAQPage'))).toContain(preco);
    expect(readSchema('CollectionPage').about).not.toHaveProperty('offers');
  });

  it('deduplica grafias das cidades e não infere cobertura da sede ou categoria', () => {
    vi.spyOn(empresasData, 'getEmpresasPorServico').mockReturnValue([{
      ...empresa, cidadeBase: 'Curitiba', cidadesAtendidas: ['sao-paulo', 'São Paulo', 'osasco'],
    }]);
    renderServico();
    expect(readSchema('CollectionPage').about.areaServed).toEqual([
      { '@type': 'Place', name: 'São Paulo' }, { '@type': 'Place', name: 'Osasco' },
    ]);
    expect(screen.getByRole('heading', { level: 1 })).not.toHaveTextContent('Curitiba');
  });

  it.each([
    ['lavanderia-profissional', 'Osasco', 'Curitiba'],
    ['refrigeracao-industrial', 'Navegantes', 'Curitiba'],
    ['manutencao-freezer', 'Curitiba', 'Osasco'],
  ])('usa as regiões reais dos cadastros em %s', (slug, cidadeEsperada, cidadeAusente) => {
    renderServico(slug);
    const regioes = readSchema('CollectionPage').about.areaServed.map((regiao: { name: string }) => regiao.name);
    expect(regioes).toContain(cidadeEsperada);
    expect(regioes).not.toContain(cidadeAusente);
    expect(screen.getByText(/Localidades citadas nos cadastros:/)).toHaveTextContent(cidadeEsperada);
  });
});
