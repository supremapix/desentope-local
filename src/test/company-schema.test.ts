import { describe, expect, it } from 'vitest';
import { empresas } from '@/data/empresas';
import { buildLocalBusinessSchema } from '@/hooks/useSEO';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const allDays = [...weekdays, 'Saturday', 'Sunday'];
const coords = { lat: -25.4284, lng: -49.2733 };
const empresaBase: Parameters<typeof buildLocalBusinessSchema>[0] = {
  nome: 'Empresa de teste',
  slug: 'empresa-de-teste',
  descricao: 'Descrição da empresa',
  telefone: '(41) 1234-5678',
  notaMedia: 0,
  totalAvaliacoes: 0,
  servicosOferecidos: ['encanador-residencial'],
  formasPagamento: ['PIX', 'Dinheiro'],
  atende24h: false,
};

describe('buildLocalBusinessSchema', () => {
  it('preserva os serviços sem transformar preços médios ou ausentes em preços da empresa', () => {
    const schema = buildLocalBusinessSchema(empresaBase, coords, 'Centro', [
      { nome: 'Serviço com média', precoMedio: 'R$ 250 a R$ 500' },
      { nome: 'Serviço sem preço' },
      { nome: 'Serviço sob consulta', precoMedio: 'Sob consulta' },
    ]);

    expect(schema.hasOfferCatalog?.itemListElement).toEqual([
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Serviço com média' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Serviço sem preço' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Serviço sob consulta' } },
    ]);
    expect(schema.paymentAccepted).toBe('PIX, Dinheiro');
  });

  it.each<[string, string[]]>([
    ['Segunda a Sexta', weekdays],
    ['Segunda a sexta', weekdays],
    ['Segunda a Sábado', [...weekdays, 'Saturday']],
    ['Segunda a Domingo', allDays],
    ['Segunda a Domingo (24 horas)', allDays],
    ['Sábado', ['Saturday']],
    ['Domingo', ['Sunday']],
  ])('mapeia o rótulo cadastrado %s sem trocar os horários', (dia, dayOfWeek) => {
    const schema = buildLocalBusinessSchema({
      ...empresaBase,
      horarios: [{ dia, abertura: '08:30', fechamento: '18:00' }],
    }, coords, 'Centro');

    expect(schema.openingHoursSpecification).toEqual([{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek,
      opens: '08:30',
      closes: '18:00',
    }]);
  });

  it('preserva períodos distintos e não trata plantão indefinido como funcionamento todos os dias', () => {
    const schema = buildLocalBusinessSchema({
      ...empresaBase,
      atende24h: true,
      horarios: [
        { dia: 'Segunda a Sexta', abertura: '08:00', fechamento: '18:00' },
        { dia: 'Sábado', abertura: '08:00', fechamento: '12:00' },
        { dia: 'Domingo', abertura: '', fechamento: '', fechado: true },
        { dia: 'Plantão emergencial (comércio)', abertura: '00:00', fechamento: '23:59' },
      ],
    }, coords, 'Centro');

    expect(schema.openingHoursSpecification).toEqual([
      { '@type': 'OpeningHoursSpecification', dayOfWeek: weekdays, opens: '08:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '08:00', closes: '12:00' },
    ]);
  });

  it.each([false, true])('omite horários ausentes, mesmo com atende24h=%s', atende24h => {
    const schema = buildLocalBusinessSchema({ ...empresaBase, atende24h }, coords, 'Centro');
    expect(schema).not.toHaveProperty('openingHoursSpecification');
  });

  it.each([
    { dia: 'Plantão emergencial (comércio)', abertura: '00:00', fechamento: '23:59' },
    { dia: 'constructor', abertura: '08:00', fechamento: '18:00' },
    { dia: 'Segunda a Sexta (sob agendamento)', abertura: '08:00', fechamento: '18:00' },
    { dia: 'Domingo', abertura: '08:00', fechamento: '18:00', fechado: true },
    { dia: 'Segunda a Sexta', abertura: '', fechamento: '' },
    { dia: 'Segunda a Sexta', abertura: '24:00', fechamento: '18:00' },
    { dia: 'Segunda a Sexta', abertura: '08:00', fechamento: '18:60' },
  ])('omite dias ou horários que não podem ser publicados com segurança: %j', horario => {
    const schema = buildLocalBusinessSchema({ ...empresaBase, horarios: [horario] }, coords, 'Centro');
    expect(schema).not.toHaveProperty('openingHoursSpecification');
  });

  it('preserva o horário 24 horas quando está explicitamente cadastrado', () => {
    const schema = buildLocalBusinessSchema({
      ...empresaBase,
      horarios: [{ dia: 'Segunda a Domingo (24 horas)', abertura: '00:00', fechamento: '23:59' }],
    }, coords, 'Centro');
    expect(schema.openingHoursSpecification).toEqual([{
      '@type': 'OpeningHoursSpecification', dayOfWeek: allDays, opens: '00:00', closes: '23:59',
    }]);
  });

  it('cobre todos os rótulos reais atuais sem alterar dados de perfil ou pagamentos', () => {
    const daysByLabel: Record<string, string[]> = {
      'Segunda a Sexta': weekdays,
      'Segunda a sexta': weekdays,
      'Segunda a Sábado': [...weekdays, 'Saturday'],
      'Segunda a Domingo': allDays,
      'Segunda a Domingo (24 horas)': allDays,
      'Sábado': ['Saturday'],
      'Domingo': ['Sunday'],
    };
    const originalData = JSON.stringify(empresas);

    for (const empresa of empresas) {
      for (const horario of empresa.horarios) {
        expect([...Object.keys(daysByLabel), 'Plantão emergencial (comércio)']).toContain(horario.dia);
      }
      const schema = buildLocalBusinessSchema(empresa, coords, 'Centro');
      const expectedHours = empresa.horarios
        .filter(horario => !horario.fechado && daysByLabel[horario.dia])
        .map(horario => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: daysByLabel[horario.dia],
          opens: horario.abertura,
          closes: horario.fechamento,
        }));

      expect(schema.openingHoursSpecification).toEqual(expectedHours.length ? expectedHours : undefined);
      expect(schema.name).toBe(empresa.nome);
      expect(schema.description).toBe(empresa.descricao);
      expect(schema.telephone).toBe(empresa.telefone);
      expect(schema.paymentAccepted).toBe(empresa.formasPagamento.join(', '));
    }
    expect(JSON.stringify(empresas)).toBe(originalData);
  });
});
