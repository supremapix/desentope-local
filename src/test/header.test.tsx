import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';

afterEach(cleanup);

const mobileLinks = [
  ['Bairros de Curitiba', '/curitiba/centro'],
  ['Buscar Serviços', '/busca'],
  ['Dúvidas Frequentes (FAQ)', '/faq'],
  ['Para Empresas e Anunciantes', '/anuncie-aqui'],
  ['Cadastrar Empresa no Guia', '/cadastrar-empresa'],
] as const;

function NavigationControls({ destination }: { destination: string }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <button onClick={() => navigate(destination)}>Navegar por fora do menu</button>
      <output aria-label="Rota atual">{location.pathname}{location.search}{location.hash}</output>
    </>
  );
}

function renderHeader(initialPath = '/', destination = '/busca') {
  return render(
    <MemoryRouter initialEntries={[initialPath]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Header />
      <NavigationControls destination={destination} />
    </MemoryRouter>,
  );
}

describe('menu móvel acessível', () => {
  it('sincroniza nome, estado e alvo persistente ao abrir, fechar e reabrir', () => {
    renderHeader();
    const toggle = screen.getByRole('button', { name: 'Abrir menu de navegação' });
    const menuId = toggle.getAttribute('aria-controls');
    expect(menuId).toBeTruthy();
    const menu = document.getElementById(menuId!);

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(menu).not.toBeVisible();
    expect(screen.queryByRole('navigation', { name: 'Navegação móvel' })).toBeNull();

    for (let cycle = 0; cycle < 2; cycle += 1) {
      fireEvent.click(toggle);
      expect(toggle).toHaveAccessibleName('Fechar menu de navegação');
      expect(toggle).toHaveAttribute('aria-expanded', 'true');
      expect(toggle).toHaveAttribute('aria-controls', menuId);
      expect(screen.getByRole('navigation', { name: 'Navegação móvel' })).toBe(menu);
      expect(menu).toBeVisible();

      mobileLinks.forEach(([name, href]) => {
        expect(within(menu!).getByRole('link', { name })).toHaveAttribute('href', href);
      });

      fireEvent.click(toggle);
      expect(toggle).toHaveAccessibleName('Abrir menu de navegação');
      expect(toggle).toHaveAttribute('aria-expanded', 'false');
      expect(document.getElementById(menuId!)).toBe(menu);
      expect(menu).not.toBeVisible();
    }
  });

  it('fecha com Escape a partir de um link e devolve o foco ao botão', () => {
    renderHeader();
    const toggle = screen.getByRole('button', { name: 'Abrir menu de navegação' });
    fireEvent.click(toggle);
    const menu = screen.getByRole('navigation', { name: 'Navegação móvel' });
    const link = within(menu).getByRole('link', { name: 'Bairros de Curitiba' });
    link.focus();
    expect(link).toHaveFocus();

    fireEvent.keyDown(link, { key: 'ArrowDown' });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(link).toHaveFocus();

    fireEvent.keyDown(link, { key: 'Escape' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveAccessibleName('Abrir menu de navegação');
    expect(menu).not.toBeVisible();
    expect(toggle).toHaveFocus();

    const externalButton = screen.getByRole('button', { name: 'Navegar por fora do menu' });
    externalButton.focus();
    fireEvent.keyDown(externalButton, { key: 'Escape' });
    expect(externalButton).toHaveFocus();
  });

  it.each(mobileLinks)('fecha ao clicar em %s mesmo já estando no destino', (name, path) => {
    renderHeader(path);
    const toggle = screen.getByRole('button', { name: 'Abrir menu de navegação' });
    fireEvent.click(toggle);
    const menu = screen.getByRole('navigation', { name: 'Navegação móvel' });
    fireEvent.click(within(menu).getByRole('link', { name }));

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(menu).not.toBeVisible();
    expect(screen.getByRole('status', { name: 'Rota atual' })).toHaveTextContent(path);
  });

  it.each(['/busca', '/?categoria=mudancas', '/#servicos'])('fecha ao navegar para %s por outro controle', (destination) => {
    renderHeader('/', destination);
    const toggle = screen.getByRole('button', { name: 'Abrir menu de navegação' });
    fireEvent.click(toggle);
    fireEvent.click(screen.getByRole('button', { name: 'Navegar por fora do menu' }));

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('navigation', { name: 'Navegação móvel' })).toBeNull();
    expect(screen.getByRole('status', { name: 'Rota atual' })).toHaveTextContent(destination);
  });
});
