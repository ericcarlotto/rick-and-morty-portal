import type { Cast, CastCharacter } from '@rick/contract';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { CastView } from './cast-view';
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

test('mostra quinze personagens e a letra carrega o resto', () => {
  render(<CastView cast={longCast()} />);
  expect(screen.getAllByRole('link', { name: /Alpha/ })).toHaveLength(15);
  expect(screen.queryByRole('link', { name: /Zeta/ })).toBeNull();
  fireEvent.click(screen.getByRole('link', { name: 'Z' }));
  expect(screen.getByRole('heading', { name: 'Z' })).toBeTruthy();
  expect(screen.getByRole('link', { name: /Zeta/ })).toBeTruthy();
  expect(screen.getByRole('link', { name: /Alpha 0/ })).toBeTruthy();
});

test('filtra personagens a cada letra', () => {
  render(<CastView cast={longCast()} />);
  fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Zet' } });
  expect(screen.getByRole('link', { name: /Zeta/ })).toBeTruthy();
  expect(screen.queryByRole('link', { name: /Alpha 0/ })).toBeNull();
  fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'zzz' } });
  expect(screen.getByText('Nenhuma personagem encontrada.')).toBeTruthy();
});

test('mostra erro e episódio inválido', () => {
  const { rerender } = render(<CastScreenView model={{ kind: 'error' }} />);
  expect(screen.getByRole('alert').textContent).toBe('Não foi possível ler o elenco.');
  rerender(<CastScreenView model={{ kind: 'invalid' }} />);
  expect(screen.getByText(/Episódio inválido/)).toBeTruthy();
});

function longCast(): Cast {
  const characters: CastCharacter[] = Array.from({ length: 16 }, (_, index) => ({
    id: index + 1,
    name: index < 15 ? `Alpha ${index}` : 'Zeta',
    species: 'Human',
    status: 'Vivo',
    origin: 'Earth',
    letter: index < 15 ? 'A' : 'Z',
  }));
  return {
    episode: { id: 4, name: 'Arquivo', code: 'S02E01' },
    previousEpisode: null,
    nextEpisode: null,
    index: ['A', 'Z'],
    characters,
    census: { byStatus: [{ label: 'Vivo', count: 16 }], bySpecies: [{ label: 'Human', count: 16 }] },
  };
}
