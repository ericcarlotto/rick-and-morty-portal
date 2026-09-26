import type { CastCharacter } from '@rick/contract';
import { expect, test } from 'vitest';
import { filterByName } from './filter-by-name';

const characters: CastCharacter[] = [
  { id: 1, name: 'Rick Sanchez', species: 'Human', status: 'Vivo', origin: 'Earth', letter: 'R' },
  { id: 2, name: 'Morty Smith', species: 'Human', status: 'Vivo', origin: 'Earth', letter: 'M' },
];

test('filtra pelo nome sem distinguir maiúsculas', () => {
  expect(filterByName({ characters, name: '  mor ' }).map((item) => item.id)).toEqual([2]);
  expect(filterByName({ characters, name: '   ' })).toEqual(characters);
  expect(filterByName({ characters, name: 'zzz' })).toEqual([]);
});
