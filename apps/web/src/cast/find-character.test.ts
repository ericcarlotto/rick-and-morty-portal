import type { CastCharacter } from '@rick/contract';
import { expect, test } from 'vitest';
import { findCharacter, positiveId } from './find-character';

const morty: CastCharacter = {
  id: 2,
  name: 'Morty Smith',
  species: 'Human',
  status: 'Vivo',
  origin: 'Earth',
  letter: 'M',
};

test('aceita inteiro positivo', () => {
  expect(positiveId('2')).toBe(2);
  expect(positiveId('0')).toBeNull();
  expect(positiveId('1a')).toBeNull();
});

test('encontra a personagem pelo id', () => {
  expect(findCharacter({ characters: [morty], id: 2 })).toBe(morty);
  expect(findCharacter({ characters: [morty], id: 9 })).toBeNull();
});
