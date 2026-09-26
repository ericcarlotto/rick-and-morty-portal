import { expect, test } from 'vitest';
import { isAllowedApiUrl, nextPageUrl } from './allowed-url';

const host = 'rickandmortyapi.com';
const next = 'https://rickandmortyapi.com/api/episode?page=2';

test('aceita https no host configurado', () => {
  expect(isAllowedApiUrl({ url: next, allowedHost: host })).toBe(true);
});

test('recusa http, outro host e texto que não é url', () => {
  expect(isAllowedApiUrl({ url: 'http://rickandmortyapi.com/api/episode', allowedHost: host })).toBe(false);
  expect(isAllowedApiUrl({ url: 'https://evil.test/api/episode', allowedHost: host })).toBe(false);
  expect(isAllowedApiUrl({ url: 'não é url', allowedHost: host })).toBe(false);
});

test('página seguinte para no host errado, sem next, ou após 8 páginas', () => {
  expect(nextPageUrl({ next: null, allowedHost: host, pagesAlreadyFetched: 1 })).toBeNull();
  expect(nextPageUrl({ next: 'https://evil.test/x', allowedHost: host, pagesAlreadyFetched: 1 })).toBeNull();
  expect(nextPageUrl({ next, allowedHost: host, pagesAlreadyFetched: 8 })).toBeNull();
  expect(nextPageUrl({ next, allowedHost: host, pagesAlreadyFetched: 7 })).toBe(next);
});
