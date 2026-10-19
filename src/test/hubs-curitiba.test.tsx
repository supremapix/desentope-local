import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { empresas } from '@/data/empresas';
import { getEmpresasDoHubServico, getHubCuritiba, hubsCuritiba } from '@/data/hubs-curitiba';
import { getIndexableRoutes } from '@/data/routes-indexaveis';
import CategoriaCuritibaPage from '@/pages/CategoriaCuritibaPage';
import AnuncieAquiPage from '@/pages/AnuncieAquiPage';
import CadastrarEmpresaPage from '@/pages/CadastrarEmpresaPage';
import { CompanyCard } from '@/components/CompanyCard';
import { EmergencyBanner } from '@/components/EmergencyBanner';
import { readFileSync } from 'node:fs';

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

const logistica = empresas.find((empresa) => empresa.slug === 'motofrete-sao-paulo-curitiba')!;

describe('guias editoriais de Curitiba', () => {
  it('registra somente os três guias completos e sem duplicar URLs existentes', () => {
    const routes = getIndexableRoutes();
    expect(hubsCuritiba.map((hub) => hub.slug)).toEqual(['mudancas', 'transportes', 'entregas']);
    hubsCuritiba.forEach((hub) => {
      expect(routes.filter((route) => route === hub.path)).toHaveLength(1);
      expect(hub.servicos.length).toBeGreaterThan(1);
      expect(hub.perguntas.length).toBeGreaterThanOrEqual(5);
    });
    expect(routes).toContain('/empresa/motofrete-sao-paulo-curitiba');
    expect(routes).toContain('/servicos/entrega-expressa-van');
    expect(routes).not.toContain('/busca');
    expect(routes).not.toContain('/categorias/desconhecida/curitiba');
  });

  it('não aproveita logística SP–Curitiba para mudanças ou entregas urbanas', () => {
    for (const slug of ['mudancas', 'entregas']) {
      getHubCuritiba(slug)!.servicos.forEach((servico) => expect(getEmpresasDoHubServico(servico)).toEqual([]));
    }
    const transportes = getHubCuritiba('transportes')!;
    expect(transportes.servicos.flatMap((servico) => getEmpresasDoHubServico(servico).map((empresa) => empresa.slug)))
      .toEqual(['motofrete-sao-paulo-curitiba']);
  });

  it('exige curadoria, serviço compatível e Curitiba, sem fallback genérico', () => {
    const servico = getHubCuritiba('transportes')!.servicos[2];
    expect(getEmpresasDoHubServico(servico, [{ ...logistica, cidadesAtendidas: ['sao-paulo'] }])).toEqual([]);
    expect(getEmpresasDoHubServico(servico, [{ ...logistica, servicosOferecidos: ['encanador-residencial'] }])).toEqual([]);
    expect(getEmpresasDoHubServico(servico, [{ ...logistica, slug: 'outro-cadastro' }])).toEqual([]);
    expect(getEmpresasDoHubServico({ ...servico, servicosExigidos: [] })).toEqual([]);
  });

  it.each(hubsCuritiba)('renderiza título, metadados, âncoras, FAQ e cadastro de $nome', (hub) => {
    const { container } = render(<MemoryRouter><CategoriaCuritibaPage categoriaSlug={hub.slug} /></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(hub.titulo);
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', `https://www.servicosnobairro.com.br${hub.path}`);
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toMatch(/^index, follow/);
    hub.servicos.forEach((servico) => expect(container.querySelector(`#${servico.slug}`)).not.toBeNull());
    expect(container.querySelectorAll('details')).toHaveLength(hub.perguntas.length);
    expect(screen.getByRole('link', { name: 'Solicitar cadastro' })).toHaveAttribute('href', `/cadastrar-empresa?categoria=${hub.slug}&cidade=curitiba`);
    const schemas = [...document.querySelectorAll('script[data-seo-jsonld]')].map((script) => JSON.parse(script.textContent!));
    expect(schemas.map((schema) => schema['@type'])).toEqual(['BreadcrumbList', 'CollectionPage', 'FAQPage']);
    expect(schemas.find((schema) => schema['@type'] === 'CollectionPage').mainEntity.numberOfItems).toBe(hub.servicos.length);
    expect(JSON.stringify(schemas)).not.toMatch(/AggregateRating|AggregateOffer|"price"/);
    const summary = container.querySelector('summary')!;
    fireEvent.click(summary);
    expect(summary.parentElement).toHaveAttribute('open');
    fireEvent.click(summary);
    expect(summary.parentElement).not.toHaveAttribute('open');
  });

  it.each(['mudancas', 'entregas'])('mostra estado sem cadastro e não recomenda hidráulica em %s', (slug) => {
    const { container } = render(<MemoryRouter><CategoriaCuritibaPage categoriaSlug={slug} /></MemoryRouter>);
    expect(screen.getAllByText(/Ainda não há empresa cadastrada nesta seção/)).toHaveLength(3);
    expect(container.querySelectorAll('a[href^="/empresa/"]')).toHaveLength(0);
  });

  it('só inclui o perfil da rota declarada e não cria ranking de transportadoras', () => {
    const { container } = render(<MemoryRouter><CategoriaCuritibaPage categoriaSlug="transportes" /></MemoryRouter>);
    const profileLinks = [...container.querySelectorAll('a[href^="/empresa/"]')];
    expect(new Set(profileLinks.map((link) => link.getAttribute('href')))).toEqual(new Set(['/empresa/motofrete-sao-paulo-curitiba']));
    expect(screen.getByText(/Não é uma oferta de frete local geral em Curitiba/)).toBeInTheDocument();
  });
});

describe('cadastro multissetorial e categorias', () => {
  it.each([AnuncieAquiPage, CadastrarEmpresaPage])('mantém preços existentes e leva o contexto ao WhatsApp sem enviar', (Page) => {
    const { container } = render(<MemoryRouter initialEntries={['/?categoria=mudancas&cidade=curitiba']}><Page /></MemoryRouter>);
    for (const preco of ['R$ 19', 'R$ 49', 'R$ 99', 'R$ 199']) expect(screen.getAllByText(preco).length).toBeGreaterThan(0);
    const links = [...container.querySelectorAll<HTMLAnchorElement>('a[href^="https://wa.me/"]')];
    links.forEach((link) => expect(new URL(link.href).searchParams.get('text')).toContain('Categoria: Mudanças. Cidade de atendimento: Curitiba.'));
    expect(container.textContent).not.toMatch(/3\.200|buscas\/mês|taxa de conversão altíssima/);
  });

  it('não repete contexto de categoria desconhecida em links de cadastro', () => {
    const { container } = render(<MemoryRouter initialEntries={['/?categoria=inventada&cidade=curitiba']}><CadastrarEmpresaPage /></MemoryRouter>);
    const link = container.querySelector<HTMLAnchorElement>('a[href^="https://wa.me/"]')!;
    expect(new URL(link.href).searchParams.get('text')).toContain('Categoria: [informe seu ramo]');
    expect(new URL(link.href).searchParams.get('text')).not.toContain('inventada');
  });

  it.each([
    ['construcao', 'Construção, toldos e coberturas'],
    ['madeireira', 'Madeireira'],
    ['assistencia-tecnica', 'Assistência técnica'],
    ['cozinhas-industriais', 'Cozinhas industriais'],
  ] as const)('não rotula %s como Encanamento', (categoria, rotulo) => {
    render(<MemoryRouter><CompanyCard empresa={{ ...logistica, tipoServico: [categoria] }} /></MemoryRouter>);
    expect(screen.getByText(rotulo)).toBeInTheDocument();
    expect(screen.queryByText('Encanamento')).toBeNull();
  });
});


describe('faixa e aliases canônicos', () => {
  it('não apresenta todos os cadastros como plantão e usa perfis canônicos', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: true, media: query, onchange: null, addListener: () => {}, removeListener: () => {},
      addEventListener: () => {}, removeEventListener: () => {}, dispatchEvent: () => false,
    }));
    const { container } = render(<MemoryRouter><EmergencyBanner /></MemoryRouter>);
    expect(screen.getByText('Empresas no guia')).toBeInTheDocument();
    expect(screen.queryByText('Plantão 24h')).toBeNull();
    expect(container.querySelectorAll('a[href^="/perfil/"]')).toHaveLength(0);
    expect(container.querySelectorAll('a[href^="/empresa/"]')).toHaveLength(empresas.length * 2);
    expect(screen.getByRole('link', { name: 'Ver plantões' })).toHaveAttribute('href', '/busca?24h=true');
  });

  it('mantém o redirect histórico e encaminha /perfil ao endereço canônico', () => {
    const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
    expect(config.redirects).toContainEqual({ source: '/curitiba/cic', destination: '/curitiba/cidade-industrial', permanent: true });
    expect(config.redirects).toContainEqual({ source: '/perfil/:slug', destination: '/empresa/:slug', permanent: true });
    expect(readFileSync('public/_redirects', 'utf8')).toMatch(/\/perfil\/:slug\s+\/empresa\/:slug\s+301!/);
  });
});
