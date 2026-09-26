import type { CastCharacter, CharacterStatus } from '@rick/contract';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { CharacterCard } from './character-card';

function character(status: CharacterStatus): CastCharacter {
  return { id: 2, name: 'Morty Smith', species: 'Human', status, origin: 'Earth', letter: 'M' };
}

test('o link tem o estado no nome acessível', () => {
  render(<CharacterCard character={character('Vivo')} episodeId={1} />);
  const link = screen.getByRole('link', { name: /Morty Smith/ });
  expect(link.getAttribute('href')).toBe('/episodes/1/characters/2');
  expect(link.textContent).toContain('Vivo');
  expect(screen.getByText('Estado: Vivo').className).toContain('status-vivo');
});

test('Morto e Desconhecido também ficam no nome', () => {
  const { rerender } = render(<CharacterCard character={character('Morto')} episodeId={1} />);
  expect(screen.getByRole('link', { name: /Morto/ })).toBeTruthy();
  rerender(<CharacterCard character={character('Desconhecido')} episodeId={1} />);
  expect(screen.getByRole('link', { name: /Desconhecido/ })).toBeTruthy();
});
