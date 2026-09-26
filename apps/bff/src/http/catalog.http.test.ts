import request from 'supertest';
import { expect, test } from 'vitest';
import type { EpisodeSource, RemoteEpisode } from '../use-cases/episode-source';
import { withApp } from './test-app';

const episodes: RemoteEpisode[] = [
  { id: 1, name: 'Pilot', code: 'S01E01', characterUrls: [] },
  { id: 2, name: 'Lawnmower Dog', code: 'S01E02', characterUrls: [] },
  { id: 12, name: 'A Rickle in Time', code: 'S02E01', characterUrls: [] },
];

const source: EpisodeSource = {
  listEpisodes: async () => episodes,
  getCharacters: async () => [],
};

test('catálogo e filtro por código', async () => {
  await withApp({ source }, async (app) => {
    const all = await request(app.getHttpServer()).get('/api/episodes');
    const filtered = await request(app.getHttpServer()).get('/api/episodes').query({ code: 's01e02' });
    expect(all.status).toBe(200);
    expect(all.body.episodes).toHaveLength(3);
    expect(filtered.body.episodes).toEqual([{ id: 2, name: 'Lawnmower Dog', code: 'S01E02' }]);
    const season = await request(app.getHttpServer()).get('/api/episodes').query({ season: '2' });
    expect(season.body.episodes).toEqual([{ id: 12, name: 'A Rickle in Time', code: 'S02E01' }]);
  });
});
