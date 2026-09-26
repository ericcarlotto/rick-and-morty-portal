import { expect, test } from 'vitest';
import { bffOrigin } from './origin';

test('a origem por omissão é a porta do BFF', () => {
  expect(bffOrigin({})).toBe('http://127.0.0.1:3001');
});

test('lê BFF_ORIGIN e tira a barra final', () => {
  expect(bffOrigin({ BFF_ORIGIN: 'http://127.0.0.1:4011/' })).toBe('http://127.0.0.1:4011');
});

test('ignora origem em branco', () => {
  expect(bffOrigin({ BFF_ORIGIN: '   ' })).toBe('http://127.0.0.1:3001');
});

test('sem argumento usa o ambiente do processo', () => {
  const previous = process.env.BFF_ORIGIN;
  process.env.BFF_ORIGIN = 'http://bff.test';
  expect(bffOrigin()).toBe('http://bff.test');
  restoreOrigin(previous);
});

function restoreOrigin(previous: string | undefined): void {
  if (previous === undefined) {
    delete process.env.BFF_ORIGIN;
    return;
  }
  process.env.BFF_ORIGIN = previous;
}
