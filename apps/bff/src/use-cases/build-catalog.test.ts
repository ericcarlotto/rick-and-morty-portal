import { expect, test } from 'vitest';
import { buildCatalog } from './build-catalog';
import type { EpisodeSource, RemoteEpisode } from './episode-source';

const episodes: RemoteEpisode[] = [
  { id: 1, name: 'Pilot', code: 'S01E01', characterUrls: [] },
  { id: 2, name: 'Lawnmower Dog', code: 'S01E02', characterUrls: [] },
];

const source: EpisodeSource = {
  listEpisodes: async () => episodes,
  getCharacters: async () => [],
};

test('filtra o catálogo em memória pelo código', async () => {
  const catalog = await buildCatalog({ source, code: 's01e02' });
  expect(catalog.episodes).toEqual([{ id: 2, name: 'Lawnmower Dog', code: 'S01E02' }]);
});
