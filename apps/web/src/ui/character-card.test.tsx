import type { CastCharacter } from '@rick/contract';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { CharacterCard } from './character-card';

const morty: CastCharacter = {
  id: 2,
  name: 'Morty Smith',
  species: 'Human',
  status: 'Vivo',
  origin: 'Earth',
  letter: 'M',
};

test('mostra nome, espécie, estado e origem', () => {
  render(<CharacterCard character={morty} episodeId={1} />);
  expect(screen.getByText('Morty Smith')).toBeTruthy();
  expect(screen.getByText('Espécie: Human')).toBeTruthy();
  expect(screen.getByText('Estado: Vivo')).toBeTruthy();
  expect(screen.getByText('Origem: Earth')).toBeTruthy();
});
