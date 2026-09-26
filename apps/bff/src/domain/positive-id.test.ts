import { expect, test } from 'vitest';
import { positiveEpisodeId } from './positive-id';

test('aceita inteiro positivo', () => {
  expect(positiveEpisodeId('12')).toBe(12);
});

test('recusa zero, sinal, decimal, texto e número inseguro', () => {
  expect(positiveEpisodeId('0')).toBeNull();
  expect(positiveEpisodeId('-1')).toBeNull();
  expect(positiveEpisodeId('1.5')).toBeNull();
  expect(positiveEpisodeId('abc')).toBeNull();
  expect(positiveEpisodeId('9'.repeat(20))).toBeNull();
});
