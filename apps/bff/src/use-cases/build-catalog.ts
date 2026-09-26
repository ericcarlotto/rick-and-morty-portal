import type { EpisodeCatalog } from '@rick/contract';
import { filterEpisodes } from '../domain/filter-episodes';
import type { EpisodeSource } from './episode-source';
import { toSummary } from './to-summary';

export async function buildCatalog(input: {
  source: EpisodeSource;
  name?: string;
  code?: string;
}): Promise<EpisodeCatalog> {
  const episodes = await input.source.listEpisodes();
  return {
    episodes: filterEpisodes({
      episodes: episodes.map((episode) => toSummary(episode)),
      name: input.name,
      code: input.code,
    }),
  };
}
