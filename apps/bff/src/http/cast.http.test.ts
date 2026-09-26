import { parseCast } from '@rick/contract';
import request from 'supertest';
import { expect, test } from 'vitest';
import type { EpisodeSource, RemoteCharacter, RemoteEpisode } from '../use-cases/episode-source';
import { withApp } from './test-app';

const episodes: RemoteEpisode[] = [
  { id: 1, name: 'Pilot', code: 'S01E01', characterUrls: ['https://rickandmortyapi.com/api/character/1'] },
];
const characters: RemoteCharacter[] = [
  { id: 1, name: 'Rick', status: 'Alive', species: 'Human', origin: 'Earth' },
];
const source: EpisodeSource = {
  listEpisodes: async () => episodes,
  getCharacters: async () => characters,
};

test('elenco cabe no contrato', async () => {
  await withApp({ source }, async (app) => {
    const response = await request(app.getHttpServer()).get('/api/episodes/1/cast');
    expect(response.status).toBe(200);
    expect(parseCast(response.body)).toEqual(response.body);
    expect(response.body.characters[0].status).toBe('Vivo');
  });
});

test('id inválido e episódio em falta', async () => {
  await withApp({ source }, async (app) => {
    const invalid = await request(app.getHttpServer()).get('/api/episodes/0/cast');
    const missing = await request(app.getHttpServer()).get('/api/episodes/9/cast');
    expect(invalid.status).toBe(400);
    expect(invalid.body).toEqual({ message: 'Id inválido' });
    expect(missing.status).toBe(404);
    expect(JSON.stringify(invalid.body)).not.toContain('stack');
  });
});

test('erro interno não devolve stack', async () => {
  const broken: EpisodeSource = {
    listEpisodes: async () => {
      throw new Error('segredo');
    },
    getCharacters: async () => [],
  };
  await withApp({ source: broken }, async (app) => {
    const response = await request(app.getHttpServer()).get('/api/episodes/1/cast');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Erro interno' });
    expect(JSON.stringify(response.body)).not.toContain('segredo');
  });
});
