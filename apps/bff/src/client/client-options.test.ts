import { expect, test } from 'vitest';
import { clientOptionsFromEnv, DEFAULT_ORIGIN, REQUEST_TIMEOUT_MS } from './client-options';

test('usa o host oficial e o timeout de 4 segundos', () => {
  const options = clientOptionsFromEnv({});
  expect(options.origin).toBe(DEFAULT_ORIGIN);
  expect(options.allowedHost).toBe('rickandmortyapi.com');
  expect(options.timeoutMs).toBe(REQUEST_TIMEOUT_MS);
  expect(options.fetch).toBe(globalThis.fetch);
});

test('aceita origem e fetch injectados', () => {
  const fetchImpl = globalThis.fetch;
  const options = clientOptionsFromEnv({ RICK_AND_MORTY_API_ORIGIN: 'https://example.test' }, fetchImpl);
  expect(options.allowedHost).toBe('example.test');
  expect(options.fetch).toBe(fetchImpl);
});

test('origem inválida falha antes de pedir', () => {
  expect(() => clientOptionsFromEnv({ RICK_AND_MORTY_API_ORIGIN: 'não é url' })).toThrow();
});
