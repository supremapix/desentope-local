import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { empresas } from '@/data/empresas';
import EmpresaPage from '@/pages/EmpresaPage';
afterEach(cleanup);
describe('Engeum cadastro', () => {
  it('cadastro único com contatos confirmados', () => {
    const registros = empresas.filter(e => e.slug === 'engeum-engenharia');
    expect(registros).toHaveLength(1);
    expect(registros[0].whatsapp).toBe('5541996646761');
    expect(registros[0].avaliacoes).toEqual([]);
    expect(registros[0].tipoServico).toEqual(['construcao']);
  });
  it('apresenta contato sem prometer emergência, avaliações ou orçamento grátis', () => {
    render(<MemoryRouter><EmpresaPage slugOverride="engeum-engenharia" /></MemoryRouter>);
    expect(screen.getByRole('heading', {level:1})).toHaveTextContent('Engeum Engenharia');
    expect(screen.getByRole('link', {name:'LIGAR PARA A EMPRESA'})).toHaveAttribute('href','tel:41996646761');
    expect(screen.getByRole('link', {name:'EMAIL'})).toHaveAttribute('href','mailto:contato@engeumengenharia.com.br');
    expect(screen.queryByText('LIGAR EMERGÊNCIA')).not.toBeInTheDocument();
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).not.toContain('Nota 0');
  });
});
