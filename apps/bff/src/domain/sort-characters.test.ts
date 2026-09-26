import type { CastCharacter } from '@rick/contract';
import { expect, test } from 'vitest';
import { sortCharacters } from './sort-characters';

function person(input: { id: number; name: string }): CastCharacter {
  return { ...input, species: 'Human', status: 'Vivo', origin: 'Earth', letter: 'R' };
}

test('ordena sem distinguir maiúsculas e empata pelo id', () => {
  const sorted = sortCharacters([
    person({ id: 2, name: 'Rick' }),
    person({ id: 8, name: 'Beth' }),
    person({ id: 1, name: 'rick' }),
  ]);
  expect(sorted.map((item) => item.id)).toEqual([8, 1, 2]);
});
