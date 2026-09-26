import { expect, test } from 'vitest';
import { statusClass } from './status-class';

test('cada estado tem a sua classe, junto do texto', () => {
  expect(statusClass('Vivo')).toBe('status-vivo');
  expect(statusClass('Morto')).toBe('status-morto');
  expect(statusClass('Desconhecido')).toBe('status-desconhecido');
});
