export type CharacterStatus = 'Vivo' | 'Morto' | 'Desconhecido';

export type EpisodeSummary = {
  id: number;
  name: string;
  code: string;
};

export type CastCharacter = {
  id: number;
  name: string;
  species: string;
  status: CharacterStatus;
  origin: string;
  letter: string;
};

export type CensusCount = {
  label: string;
  count: number;
};

export type Cast = {
  episode: EpisodeSummary;
  previousEpisode: EpisodeSummary | null;
  nextEpisode: EpisodeSummary | null;
  index: string[];
  characters: CastCharacter[];
  census: {
    byStatus: CensusCount[];
    bySpecies: CensusCount[];
  };
};

export type EpisodeCatalog = {
  episodes: EpisodeSummary[];
};

export type Health = {
  status: 'ok';
};
