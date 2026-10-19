import type { Empresa } from '@/types';

const normalizarLocal = (local: string) => local.trim().toLowerCase().normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');

/** Mesmo ramo, serviço e cidade declarados. Não presume cobertura de um bairro ou trajeto. */
export function getEmpresasRelacionadas(empresa: Empresa, cadastros: Empresa[], limite = 3): Empresa[] {
  const cidades = new Set(empresa.cidadesAtendidas.map(normalizarLocal).filter(Boolean));
  return cadastros.filter((candidata) =>
    candidata.slug !== empresa.slug
    && candidata.tipoServico.some((categoria) => empresa.tipoServico.includes(categoria))
    && candidata.servicosOferecidos.some((servico) => empresa.servicosOferecidos.includes(servico))
    && candidata.cidadesAtendidas.some((cidade) => cidades.has(normalizarLocal(cidade))),
  ).slice(0, Math.max(0, limite));
}
