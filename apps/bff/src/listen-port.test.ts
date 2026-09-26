import { expect, test } from 'vitest';
import { listenPort } from './listen-port';

test('porta por omissão e porta explícita', () => {
  expect(listenPort({})).toBe(3001);
  expect(listenPort({ PORT: '4010' })).toBe(4010);
});
