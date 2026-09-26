import type { CastCharacter } from '@rick/contract';
import { expect, test } from 'vitest';
import { groupByLetter } from './group-by-letter';

function character(input: { id: number; name: string; letter: string }): CastCharacter {
  return { ...input, species: 'Human', status: 'Vivo', origin: 'Earth' };
}

test('agrupa pela ordem do índice e não reordena o elenco', () => {
  const morty = character({ id: 2, name: 'Morty Smith', letter: 'M' });
  const rick = character({ id: 1, name: 'Rick Sanchez', letter: 'R' });
  const summer = character({ id: 3, name: 'Summer Smith', letter: 'S' });
  const groups = groupByLetter({
    index: ['R', 'M'],
    characters: [summer, morty, rick],
  });
  expect(groups.map((group) => group.letter)).toEqual(['R', 'M']);
  expect(groups[0]?.characters.map((item) => item.id)).toEqual([1]);
  expect(groups[1]?.characters.map((item) => item.id)).toEqual([2]);
});

test('índice vazio não cria grupos', () => {
  expect(groupByLetter({ index: [], characters: [] })).toEqual([]);
});
