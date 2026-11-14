import { afterEach, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { LocalRequestPlanner } from '@/components/LocalRequestPlanner';
afterEach(cleanup);
it('atualiza o rascunho em alterações repetidas sem enviar dados', () => {
  const {container}=render(<LocalRequestPlanner place="Atuba, Pinhais" />);
  const output=screen.getByLabelText('Rascunho para revisar e copiar') as HTMLTextAreaElement;
  expect(output.value).toContain('Atuba, Pinhais');
  fireEvent.change(screen.getByLabelText('Qual é o problema?'),{target:{value:'Vazamento de água'}});
  fireEvent.change(screen.getByLabelText('Tipo de imóvel'),{target:{value:'Comércio'}});
  fireEvent.change(screen.getByLabelText('Detalhes do problema e acesso (opcional)'),{target:{value:'Entrada lateral'}});
  expect(output.value).toContain('Entrada lateral');
  expect(output.value).toContain('Vazamento de água');
  fireEvent.change(screen.getByLabelText('Detalhes do problema e acesso (opcional)'),{target:{value:''}});
  expect(output.value).not.toContain('Entrada lateral');
  expect(container.querySelector('form')).toBeNull();
  expect(container.querySelector('a')).toHaveAttribute('href','#empresas-locais');
});
