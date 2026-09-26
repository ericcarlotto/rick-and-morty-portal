import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { CatalogView } from './catalog-view';

test('lista episódios e o filtro preenchido', () => {
  render(
    <CatalogView
      model={{
        query: { name: 'Pilot', code: 'S01', season: '1' },
        remote: { ok: true, value: { episodes: [{ id: 1, name: 'Pilot', code: 'S01E01' }] } },
      }}
    />,
  );
  expect(screen.getByRole('heading', { name: 'Catálogo de episódios' })).toBeTruthy();
  expect(screen.getByLabelText('Nome')).toHaveProperty('value', 'Pilot');
  expect(screen.getByLabelText('Código')).toHaveProperty('value', 'S01');
  expect(screen.getByLabelText('Temporada')).toHaveProperty('value', '1');
  expect(screen.getByRole('link', { name: /Pilot/ }).getAttribute('href')).toBe('/episodes/1');
  expect(screen.getByText('S01E01').className).toContain('code');
});

test('filtra ao escrever, sem botão', () => {
  render(
    <CatalogView
      model={{
        query: {},
        remote: {
          ok: true,
          value: {
            episodes: [
              { id: 1, name: 'Pilot', code: 'S01E01' },
              { id: 2, name: 'Lawnmower Dog', code: 'S01E02' },
            ],
          },
        },
      }}
    />,
  );
  expect(screen.queryByRole('button', { name: 'Filtrar' })).toBeNull();
  fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Lawn' } });
  expect(screen.queryByRole('link', { name: /Pilot/ })).toBeNull();
  expect(screen.getByRole('link', { name: /Lawnmower Dog/ })).toBeTruthy();
  fireEvent.change(screen.getByLabelText('Código'), { target: { value: 'S01E02' } });
  fireEvent.change(screen.getByLabelText('Temporada'), { target: { value: '2' } });
  expect(screen.getByText('Nenhum episódio encontrado.')).toBeTruthy();
});

test('mostra catálogo vazio e erro', () => {
  const { rerender } = render(
    <CatalogView model={{ query: {}, remote: { ok: true, value: { episodes: [] } } }} />,
  );
  expect(screen.getByText('Nenhum episódio encontrado.')).toBeTruthy();
  expect(screen.getByLabelText('Nome')).toHaveProperty('value', '');
  rerender(<CatalogView model={{ query: {}, remote: { ok: false } }} />);
  expect(screen.getByRole('alert').textContent).toBe('Não foi possível ler o catálogo.');
});
