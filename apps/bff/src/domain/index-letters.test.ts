import { expect, test } from 'vitest';
import { indexLetters, letterOf } from './index-letters';

test('índice segue a ordem já ordenada, sem repetir letra', () => {
  expect(indexLetters([{ letter: 'B' }, { letter: 'M' }, { letter: 'M' }])).toEqual(['B', 'M']);
});

test('letra vazia vira interrogação', () => {
  expect(letterOf('  ')).toBe('?');
  expect(letterOf('morty')).toBe('M');
});
