import type { Cast, CastCharacter } from '@rick/contract';
import { censusBySpecies, censusByStatus } from '../domain/census';
import { characterIds } from '../domain/character-id';
import { indexLetters } from '../domain/index-letters';
import { sortCharacters } from '../domain/sort-characters';
import { toCharacterView } from '../domain/to-character-view';
import { EpisodeNotFound } from './episode-not-found';
import type { EpisodeSource, RemoteEpisode } from './episode-source';
import { toSummary } from './to-summary';

export async function buildCast(input: { source: EpisodeSource; episodeId: number }): Promise<Cast> {
  const episodes = await input.source.listEpisodes();
  const episode = findEpisode(episodes, input.episodeId);
  const characters = sortCharacters(await loadViews(input.source, episode));
  return assembleCast({ episodes, episode, episodeId: input.episodeId, characters });
}

function findEpisode(episodes: RemoteEpisode[], episodeId: number): RemoteEpisode {
  const episode = episodes.find((item) => item.id === episodeId);
  if (!episode) throw new EpisodeNotFound(episodeId);
  return episode;
}

async function loadViews(source: EpisodeSource, episode: RemoteEpisode): Promise<CastCharacter[]> {
  const ids = characterIds(episode.characterUrls);
  if (ids.length === 0) return [];
  const remote = await source.getCharacters(ids);
  return remote.map((item) => toCharacterView(item));
}

function assembleCast(input: {
  episodes: RemoteEpisode[];
  episode: RemoteEpisode;
  episodeId: number;
  characters: CastCharacter[];
}): Cast {
  return {
    episode: toSummary(input.episode),
    previousEpisode: neighbor(input.episodes, input.episodeId - 1),
    nextEpisode: neighbor(input.episodes, input.episodeId + 1),
    index: indexLetters(input.characters),
    characters: input.characters,
    census: {
      byStatus: censusByStatus(input.characters),
      bySpecies: censusBySpecies(input.characters),
    },
  };
}

function neighbor(episodes: RemoteEpisode[], episodeId: number) {
  const episode = episodes.find((item) => item.id === episodeId);
  return episode ? toSummary(episode) : null;
}
