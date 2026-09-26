import { expect, test } from 'vitest';
import { textQuery } from './text-query';

test('ignora vazio e valor que não é texto', () => {
  expect(textQuery('  ')).toBeUndefined();
  expect(textQuery(['Pilot'])).toBeUndefined();
});

test('devolve o texto limpo', () => {
  expect(textQuery(' Pilot ')).toBe('Pilot');
});
