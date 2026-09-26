import type { EpisodeSource, RemoteCharacter, RemoteEpisode } from '../use-cases/episode-source';
import type { ClientOptions } from './client-options';
import { collectCharacters, collectEpisodes } from './collect';

export class RickAndMortyClient implements EpisodeSource {
  constructor(private readonly options: ClientOptions) {}

  listEpisodes(): Promise<RemoteEpisode[]> {
    return collectEpisodes(this.options);
  }

  getCharacters(ids: number[]): Promise<RemoteCharacter[]> {
    return collectCharacters(this.options, ids);
  }
}
