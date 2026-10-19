import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { empresas } from '@/data/empresas';
import { getEmpresasRelacionadas } from '@/lib/empresas-relacionadas';
import EmpresaPage from '@/pages/EmpresaPage';

afterEach(cleanup);
const motofrete = empresas.find((empresa) => empresa.slug === 'motofrete-sao-paulo-curitiba')!;
const candidata = { ...motofrete, slug: 'outro-perfil' };

describe('perfis relacionados', () => {
  it('não recomenda hidráulica no perfil de motofrete', () => {
    expect(getEmpresasRelacionadas(motofrete, empresas)).toEqual([]);
  });
  it('exige ramo, serviço e cidade em comum, sem retornar o próprio perfil', () => {
    expect(getEmpresasRelacionadas(motofrete, [motofrete, candidata])).toEqual([candidata]);
    expect(getEmpresasRelacionadas(motofrete, [{ ...candidata, tipoServico: ['encanamento'] }])).toEqual([]);
    expect(getEmpresasRelacionadas(motofrete, [{ ...candidata, servicosOferecidos: ['encanador-residencial'] }])).toEqual([]);
    expect(getEmpresasRelacionadas(motofrete, [{ ...candidata, cidadesAtendidas: ['rio-de-janeiro'] }])).toEqual([]);
    expect(getEmpresasRelacionadas(motofrete, [{ ...candidata, cidadesAtendidas: [] }])).toEqual([]);
  });
  it('normaliza nomes de cidade sem ampliar cobertura', () => {
    const curitiba = { ...candidata, cidadesAtendidas: [' Curitiba '] };
    expect(getEmpresasRelacionadas(motofrete, [curitiba])).toEqual([curitiba]);
    expect(getEmpresasRelacionadas({ ...motofrete, cidadesAtendidas: ['sao-jose-dos-pinhais'] }, [{ ...candidata, cidadesAtendidas: ['São José dos Pinhais'] }])).toHaveLength(1);
  });
  it('limita os resultados e mantém perfis hidráulicos pertinentes', () => {
    expect(getEmpresasRelacionadas(motofrete, [candidata, { ...candidata, slug: 'terceiro-perfil' }], 1)).toHaveLength(1);
    expect(getEmpresasRelacionadas(motofrete, [candidata], 0)).toEqual([]);
    const hidraulica = empresas.find((empresa) => empresa.slug === 'agua-facil-desentupidora-encanador-24h')!;
    expect(getEmpresasRelacionadas(hidraulica, empresas).length).toBeGreaterThan(0);
    getEmpresasRelacionadas(hidraulica, empresas).forEach((empresa) => {
      expect(empresa.tipoServico.some((tipo) => hidraulica.tipoServico.includes(tipo))).toBe(true);
      expect(empresa.servicosOferecidos.some((servico) => hidraulica.servicosOferecidos.includes(servico))).toBe(true);
    });
  });
});

describe('vídeo e recomendações no perfil de Motofrete', () => {
  it('usa um link compacto para o vídeo cadastrado, sem iframe vazio ou afirmação hidráulica', () => {
    const { container } = render(<MemoryRouter><EmpresaPage slugOverride={motofrete.slug} /></MemoryRouter>);
    const video = screen.getByRole('link', { name: /Abrir vídeo no YouTube/ });
    expect(video).toHaveAttribute('href', `https://www.youtube.com/watch?v=${motofrete.youtubeVideoId}`);
    expect(video).toHaveAttribute('target', '_blank');
    expect(video).toHaveAttribute('rel', 'noopener noreferrer');
    expect(container.querySelector('iframe')).toBeNull();
    expect(screen.queryByText(/Veja como resolvemos problemas hidráulicos/)).toBeNull();
    expect(screen.queryByRole('heading', { name: /Outros perfis com serviços em comum|Empresas Similares/ })).toBeNull();
    expect(container.querySelector('a[href="/empresa/agua-facil-desentupidora-encanador-24h"]')).toBeNull();
    expect(screen.getByRole('link', { name: `WHATSAPP ${motofrete.telefone}` })).toHaveAttribute('href', expect.stringContaining(motofrete.whatsapp));
    expect(screen.queryByRole('link', { name: 'WHATSAPP (41) 98517-1966' })).toBeNull();
  });
  it('não cria link de vídeo para um perfil sem mídia cadastrada', () => {
    const empresa = empresas.find((item) => !item.youtubeVideoId && !item.videoUrl)!;
    render(<MemoryRouter><EmpresaPage slugOverride={empresa.slug} /></MemoryRouter>);
    expect(screen.queryByRole('link', { name: /Abrir vídeo no YouTube/ })).toBeNull();
  });
});
