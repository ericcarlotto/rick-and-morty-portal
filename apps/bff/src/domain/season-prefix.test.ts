import { expect, test } from 'vitest';
import { seasonPrefix } from './season-prefix';

test('a temporada vira o prefixo do código', () => {
  expect(seasonPrefix(undefined)).toBe('');
  expect(seasonPrefix(' 2 ')).toBe('s02');
  expect(seasonPrefix('10')).toBe('s10');
  expect(seasonPrefix('abc')).toBe('s00');
});
