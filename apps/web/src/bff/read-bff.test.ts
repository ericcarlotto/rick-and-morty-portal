import { parseCast } from '@rick/contract';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest';
import { castFixture } from '../../test/cast-fixture';
import { readCast } from './read-cast';
import { readCatalog } from './read-catalog';

const origin = 'http://127.0.0.1:4011';
const fixture = castFixture();
const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('lê o catálogo no BFF', async () => {
  server.use(catalogHandler([{ id: 1, name: 'Pilot', code: 'S01E01' }]));
  const catalog = await readCatalog({ query: { name: 'Pilot' }, origin });
  expect(catalog.episodes[0]?.code).toBe('S01E01');
});

test('valida o elenco com o contrato', async () => {
  server.use(http.get(`${origin}/api/episodes/1/cast`, () => HttpResponse.json(fixture)));
  const cast = await readCast({ episodeId: 1, origin });
  expect(cast).toEqual(parseCast(fixture));
});

test('recusa corpo que não cumpre o contrato', async () => {
  server.use(http.get(`${origin}/api/episodes/1/cast`, () => HttpResponse.json({ episode: null })));
  await expect(readCast({ episodeId: 1, origin })).rejects.toThrow('Contrato inválido');
});

test('falha quando o BFF não responde', async () => {
  server.use(catalogHandler([], 500));
  await expect(readCatalog({ query: {}, origin })).rejects.toThrow('O BFF não respondeu');
});

function catalogHandler(episodes: unknown[], status = 200) {
  return http.get(`${origin}/api/episodes`, () => HttpResponse.json({ episodes }, { status }));
}
