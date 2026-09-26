import type { CastCharacter } from '@rick/contract';
import { expect, test } from 'vitest';
import { censusBySpecies, censusByStatus } from './census';

const morty: CastCharacter = { id: 2, name: 'Morty', species: 'Human', status: 'Vivo', origin: 'Earth', letter: 'M' };
const rick: CastCharacter = { id: 1, name: 'Rick', species: 'Human', status: 'Morto', origin: 'Earth', letter: 'R' };
const bird: CastCharacter = { id: 3, name: 'Birdperson', species: 'Alien', status: 'Vivo', origin: 'Bird World', letter: 'B' };

test('conta por estado', () => {
  expect(censusByStatus([morty, rick, bird])).toEqual([
    { label: 'Morto', count: 1 },
    { label: 'Vivo', count: 2 },
  ]);
});

test('conta por espécie', () => {
  expect(censusBySpecies([morty, rick, bird])).toEqual([
    { label: 'Alien', count: 1 },
    { label: 'Human', count: 2 },
  ]);
});
