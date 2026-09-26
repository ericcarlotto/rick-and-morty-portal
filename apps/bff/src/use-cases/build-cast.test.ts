import { parseCast } from '@rick/contract';
import { expect, test } from 'vitest';
import { buildCast } from './build-cast';
import { EpisodeNotFound } from './episode-not-found';
import type { EpisodeSource, RemoteCharacter, RemoteEpisode } from './episode-source';

const episodes: RemoteEpisode[] = [
  {
    id: 1,
    name: 'Pilot',
    code: 'S01E01',
    characterUrls: ['https://rickandmortyapi.com/api/character/2', 'não', 'https://rickandmortyapi.com/api/character/1'],
  },
  { id: 2, name: 'Lawnmower Dog', code: 'S01E02', characterUrls: [] },
];

const characters: RemoteCharacter[] = [
  { id: 2, name: 'Morty', status: 'Alive', species: 'Human', origin: 'Earth' },
  { id: 1, name: 'morty', status: 'Dead', species: 'Alien', origin: 'unknown' },
];

test('ordena, conta, indexa e liga o episódio vizinho', async () => {
  const cast = await buildCast({ source: sourceOf(episodes, characters), episodeId: 1 });
  expect(cast.characters.map((item) => item.id)).toEqual([1, 2]);
  expect(cast.index).toEqual(['M']);
  expect(cast.census.byStatus).toEqual([
    { label: 'Morto', count: 1 },
    { label: 'Vivo', count: 1 },
  ]);
  expect(cast.previousEpisode).toBeNull();
  expect(cast.nextEpisode).toEqual({ id: 2, name: 'Lawnmower Dog', code: 'S01E02' });
  expect(parseCast(cast)).toEqual(cast);
});

test('episódio sem personagens não chama o cliente', async () => {
  const source = sourceOf(episodes, characters);
  const cast = await buildCast({ source, episodeId: 2 });
  expect(cast.characters).toEqual([]);
  expect(cast.previousEpisode?.id).toBe(1);
  expect(source.calls).toBe(0);
});

test('id que não está no catálogo', async () => {
  await expect(buildCast({ source: sourceOf(episodes, []), episodeId: 9 })).rejects.toBeInstanceOf(EpisodeNotFound);
});

function sourceOf(list: RemoteEpisode[], people: RemoteCharacter[]): EpisodeSource & { calls: number } {
  const state = { calls: 0 };
  return {
    get calls() {
      return state.calls;
    },
    listEpisodes: async () => list,
    getCharacters: async () => {
      state.calls += 1;
      return people;
    },
  };
}
