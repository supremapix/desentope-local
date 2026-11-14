import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BairroPage from '@/pages/BairroPage';
import { bairrosRMC, fichasBairrosRMC, slugLocal } from '@/data/bairros-rmc';
import { getIndexableRoutes } from '@/data/routes-indexaveis';
import { getEmpresasPorCidade } from '@/data/empresas';
import { hiringTopics } from '@/data/local-guides';
import { servicos } from '@/data/servicos';

afterEach(cleanup);
function page(path: string) { return render(<MemoryRouter initialEntries={[path]}><Routes><Route path="/curitiba/:bairro" element={<BairroPage />} /><Route path="/rmc/:bairro" element={<BairroPage />} /><Route path="/rmc/:cidade/:localidade" element={<BairroPage />} /></Routes></MemoryRouter>); }

describe('guias locais e bairros metropolitanos', () => {
  it('mantém fontes, nomes únicos, rotas e serviços reais', () => {
    const routes = getIndexableRoutes();
    expect(bairrosRMC).toHaveLength(8);
    expect(bairrosRMC.reduce((n,c) => n + c.bairros.length, 0)).toBe(158);
    for (const c of bairrosRMC) { expect(c.fonte).toMatch(/^https:\/\//); expect(new Set(c.bairros).size).toBe(c.bairros.length); }
    for (const f of fichasBairrosRMC) { expect(routes).toContain(`/rmc/${f.cidade}/${f.slug}`); expect(bairrosRMC.find(c => c.slug === f.cidade)!.bairros.map(slugLocal)).toContain(f.slug); }
    hiringTopics.forEach(t => expect(servicos.some(s => s.slug === t.slug)).toBe(true));
  });
  it.each(fichasBairrosRMC)('publica ficha de $nome em $cidade sem criar filial ou contato', (f) => {
    const {container} = page(`/rmc/${f.cidade}/${f.slug}`);
    expect(screen.getByRole('heading', {level:1})).toHaveTextContent(f.nome);
    expect(container.textContent).toContain(f.orientacao);
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', `https://www.servicosnobairro.com.br/rmc/${f.cidade}/${f.slug}`);
    expect(container.querySelectorAll('details')).toHaveLength(6);
    const schemas = [...document.querySelectorAll('script[data-seo-jsonld]')].map(s=>JSON.parse(s.textContent!));
    expect(schemas.map(s=>s['@type'])).toEqual(['BreadcrumbList','CollectionPage','FAQPage']);
    expect(schemas[1].mainEntity.numberOfItems).toBe(getEmpresasPorCidade(f.cidade).length);
    expect(JSON.stringify(schemas)).not.toMatch(/AggregateOffer|AggregateRating|"price"|"servicePhone"/);
    expect(document.querySelector('meta[name="geo.position"]')).toBeNull();
  });
  it('filtra bairros por acento e restaura os resultados em buscas sucessivas', () => {
    page('/rmc/piraquara');
    const input = screen.getByRole('searchbox', {name:'Filtrar bairros de Piraquara'});
    fireEvent.change(input, {target:{value:'guarituba'}});
    expect(screen.getByRole('heading',{name:'Guarituba Redondo'})).toBeInTheDocument();
    fireEvent.change(input, {target:{value:'nao existe'}});
    expect(screen.getByRole('status')).toHaveTextContent('Nome não localizado');
    fireEvent.change(input, {target:{value:'holandes'}});
    expect(screen.getByRole('heading',{name:'Holandês'})).toBeInTheDocument();
    fireEvent.change(input, {target:{value:''}});
    expect(screen.getByRole('heading',{name:'Jardim dos Estados'})).toBeInTheDocument();
  });
  it('não indexa um bairro inventado nem reaproveita a cidade como página válida', () => {
    page('/rmc/piraquara/inventado');
    expect(screen.getByRole('heading', {level:1})).toHaveTextContent('Localidade não encontrada');
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content','noindex, follow');
  });
});
