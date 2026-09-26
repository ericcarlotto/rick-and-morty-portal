import { expect, test } from 'vitest';
import { CHARACTER_BATCH, chunkIds } from './chunk-ids';

test('parte em lotes de 20', () => {
  const ids = Array.from({ length: 21 }, (_unused, index) => index + 1);
  const chunks = chunkIds(ids, CHARACTER_BATCH);
  expect(chunks).toHaveLength(2);
  expect(chunks[0]).toHaveLength(20);
  expect(chunks[1]).toEqual([21]);
});

test('recusa lote vazio', () => {
  expect(() => chunkIds([1], 0)).toThrow('Lote inválido');
});
