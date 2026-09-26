import type { EpisodeSummary } from '@rick/contract';
import type { RemoteEpisode } from './episode-source';

export function toSummary(episode: RemoteEpisode): EpisodeSummary {
  return { id: episode.id, name: episode.name, code: episode.code };
}
