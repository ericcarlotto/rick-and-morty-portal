import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { CatalogView } from './catalog-view';

test('lista episódios e o filtro preenchido', () => {
  render(
    <CatalogView
      model={{
        query: { name: 'Pilot', code: 'S01' },
        remote: { ok: true, value: { episodes: [{ id: 1, name: 'Pilot', code: 'S01E01' }] } },
      }}
    />,
  );
  expect(screen.getByRole('heading', { name: 'Catálogo de episódios' })).toBeTruthy();
  expect(screen.getByLabelText('Nome')).toHaveProperty('value', 'Pilot');
  expect(screen.getByLabelText('Código')).toHaveProperty('value', 'S01');
  expect(screen.getByRole('link', { name: /Pilot/ }).getAttribute('href')).toBe('/episodes/1');
  expect(screen.getByText('S01E01').className).toContain('code');
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
