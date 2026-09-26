import type { Cast } from '@rick/contract';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { CastScreenView } from './cast-screen-view';

const cast: Cast = {
  episode: { id: 2, name: 'Lawnmower Dog', code: 'S01E02' },
  previousEpisode: { id: 1, name: 'Pilot', code: 'S01E01' },
  nextEpisode: null,
  index: ['M'],
  characters: [
    { id: 2, name: 'Morty Smith', species: 'Human', status: 'Vivo', origin: 'Earth', letter: 'M' },
  ],
  census: {
    byStatus: [{ label: 'Vivo', count: 1 }],
    bySpecies: [{ label: 'Human', count: 1 }],
  },
};

test('mostra episódio escolhido, índice, vizinho e censo', () => {
  render(<CastScreenView model={{ kind: 'ready', cast }} />);
  expect(screen.getByRole('heading', { level: 1 }).className).toContain('chosen');
  expect(screen.getByRole('navigation', { name: 'Índice' })).toBeTruthy();
  expect(screen.getByRole('link', { name: 'M' }).className).toContain('index-letter');
  expect(screen.getByRole('link', { name: 'M' }).getAttribute('href')).toBe('#letra-M');
  expect(screen.getByRole('link', { name: 'Anterior: Pilot' })).toBeTruthy();
  expect(screen.getByText('Sem episódio seguinte')).toBeTruthy();
  expect(screen.getByRole('region', { name: 'Censo' })).toBeTruthy();
  expect(screen.getByText('Vivo: 1')).toBeTruthy();
  expect(screen.getByText('Human: 1')).toBeTruthy();
});

test('mostra erro e episódio inválido', () => {
  const { rerender } = render(<CastScreenView model={{ kind: 'error' }} />);
  expect(screen.getByRole('alert').textContent).toBe('Não foi possível ler o elenco.');
  rerender(<CastScreenView model={{ kind: 'invalid' }} />);
  expect(screen.getByText(/Episódio inválido/)).toBeTruthy();
});
