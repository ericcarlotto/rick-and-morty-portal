export const EPISODE_SOURCE = Symbol('EPISODE_SOURCE');

export type RemoteEpisode = {
  id: number;
  name: string;
  code: string;
  characterUrls: string[];
};

export type RemoteCharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  origin: string;
};

export interface EpisodeSource {
  listEpisodes(): Promise<RemoteEpisode[]>;
  getCharacters(ids: number[]): Promise<RemoteCharacter[]>;
}
