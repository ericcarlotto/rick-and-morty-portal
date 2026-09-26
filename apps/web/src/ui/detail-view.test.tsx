import type { CastCharacter } from '@rick/contract';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { DetailView } from './detail-view';

const morty: CastCharacter = {
  id: 2,
  name: 'Morty Smith',
  species: 'Human',
  status: 'Morto',
  origin: 'Earth',
  letter: 'M',
};

test('mostra o detalhe com estado no texto', () => {
  render(<DetailView model={{ kind: 'ready', episodeId: 1, character: morty }} />);
  expect(screen.getByRole('heading', { name: 'Morty Smith' })).toBeTruthy();
  expect(screen.getByText('Espécie: Human')).toBeTruthy();
  expect(screen.getByText('Estado: Morto').className).toContain('status-morto');
  expect(screen.getByText('Origem: Earth')).toBeTruthy();
  expect(screen.getByRole('link', { name: 'Voltar ao elenco' }).getAttribute('href')).toBe('/episodes/1');
});

test('mostra personagem em falta, inválida, episódio inválido e erro', () => {
  const { rerender } = render(<DetailView model={{ kind: 'missing', episodeId: 4 }} />);
  expect(screen.getByText(/Personagem não encontrada/)).toBeTruthy();
  rerender(<DetailView model={{ kind: 'invalid-character' }} />);
  expect(screen.getByText('Personagem inválida.')).toBeTruthy();
  rerender(<DetailView model={{ kind: 'invalid-episode' }} />);
  expect(screen.getByText('Episódio inválido.')).toBeTruthy();
  rerender(<DetailView model={{ kind: 'error' }} />);
  expect(screen.getByRole('alert').textContent).toBe('Não foi possível ler o elenco.');
});
