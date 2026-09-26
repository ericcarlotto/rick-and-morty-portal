import { expect, test, vi } from 'vitest';
import { CACHE_TTL_MS } from '../domain/cache';
import { CachedEpisodeSource } from './cached-source';
import { MemoryCache } from './memory-cache';
import type { EpisodeSource, RemoteEpisode } from './episode-source';

const episode: RemoteEpisode = { id: 1, name: 'Pilot', code: 'S01E01', characterUrls: [] };

test('reutiliza catálogo e elenco dentro do prazo', async () => {
  let now = 0;
  const inner = fake();
  const source = new CachedEpisodeSource(inner, new MemoryCache({ ttlMs: CACHE_TTL_MS, now: () => now }));
  await source.listEpisodes();
  await source.listEpisodes();
  await source.getCharacters([2, 1]);
  await source.getCharacters([1, 2]);
  expect(inner.listEpisodes).toHaveBeenCalledTimes(1);
  expect(inner.getCharacters).toHaveBeenCalledTimes(1);
  now = CACHE_TTL_MS;
  await source.listEpisodes();
  expect(inner.listEpisodes).toHaveBeenCalledTimes(2);
});

function fake(): EpisodeSource & { listEpisodes: ReturnType<typeof vi.fn>; getCharacters: ReturnType<typeof vi.fn> } {
  return {
    listEpisodes: vi.fn(async () => [episode]),
    getCharacters: vi.fn(async () => []),
  };
}
