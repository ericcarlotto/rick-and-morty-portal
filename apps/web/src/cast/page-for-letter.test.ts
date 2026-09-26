import { expect, test } from 'vitest';
import { countForLetter, lettersWithin } from './page-for-letter';

const characters = Array.from({ length: 16 }, (_, index) => ({
  letter: index < 15 ? 'A' : 'Z',
}));

test('a letra entra na janela de quinze mais cinco', () => {
  expect(countForLetter(characters, 'A')).toBe(15);
  expect(countForLetter(characters, 'Z')).toBe(20);
  expect(countForLetter(characters, 'Q')).toBe(15);
  expect(lettersWithin(characters, 15)).toEqual(['A']);
  expect(lettersWithin(characters, 16)).toEqual(['A', 'Z']);
});
