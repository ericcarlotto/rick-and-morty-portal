import { expect, test } from 'vitest';
import { CACHE_TTL_MS, freshValue } from './cache';

test('guarda o valor dentro de 60 segundos', () => {
  const entry = { value: 'catalogo', storedAt: 1_000 };
  expect(freshValue({ entry, now: 1_000 + CACHE_TTL_MS - 1, ttlMs: CACHE_TTL_MS })).toBe('catalogo');
});

test('esquece o valor aos 60 segundos', () => {
  const entry = { value: 'elenco', storedAt: 1_000 };
  expect(freshValue({ entry, now: 1_000 + CACHE_TTL_MS, ttlMs: CACHE_TTL_MS })).toBeUndefined();
});

test('não tem valor quando a entrada falta', () => {
  expect(freshValue({ entry: undefined, now: 0, ttlMs: CACHE_TTL_MS })).toBeUndefined();
});
