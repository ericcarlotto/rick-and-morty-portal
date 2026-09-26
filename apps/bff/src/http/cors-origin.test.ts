import { expect, test } from 'vitest';
import { DEFAULT_CORS_ORIGIN, readCorsOrigin } from './cors-origin';

test('origem por omissão e origem explícita', () => {
  expect(readCorsOrigin({})).toBe(DEFAULT_CORS_ORIGIN);
  expect(readCorsOrigin({ CORS_ORIGIN: ' http://localhost:3001 ' })).toBe('http://localhost:3001');
});

test('recusa asterisco e vazio', () => {
  expect(() => readCorsOrigin({ CORS_ORIGIN: '*' })).toThrow('CORS_ORIGIN inválido');
  expect(() => readCorsOrigin({ CORS_ORIGIN: '   ' })).toThrow('CORS_ORIGIN inválido');
});
