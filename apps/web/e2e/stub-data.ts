import type { Cast, EpisodeSummary } from '@rick/contract';

const pilotEpisode: EpisodeSummary = { id: 1, name: 'Pilot', code: 'S01E01' };
const lawnEpisode: EpisodeSummary = { id: 2, name: 'Lawnmower Dog', code: 'S01E02' };
const anatomyEpisode: EpisodeSummary = { id: 3, name: 'Anatomy Park', code: 'S01E03' };

export const episodes: EpisodeSummary[] = [pilotEpisode, lawnEpisode, anatomyEpisode];

const pilot: Cast = {
  episode: pilotEpisode,
  previousEpisode: null,
  nextEpisode: lawnEpisode,
  index: ['J', 'S'],
  characters: [
    { id: 5, name: 'Jerry Smith', species: 'Human', status: 'Vivo', origin: 'Earth', letter: 'J' },
    { id: 3, name: 'Summer Smith', species: 'Human', status: 'Vivo', origin: 'Earth', letter: 'S' },
  ],
  census: { byStatus: [{ label: 'Vivo', count: 2 }], bySpecies: [{ label: 'Human', count: 2 }] },
};

const lawn: Cast = {
  episode: lawnEpisode,
  previousEpisode: pilotEpisode,
  nextEpisode: anatomyEpisode,
  index: ['A', 'B', 'M', 'R'],
  characters: [
    { id: 7, name: 'Abradolf Lincler', species: 'Human', status: 'Morto', origin: 'Earth', letter: 'A' },
    { id: 9, name: 'Birdperson', species: 'Alien', status: 'Desconhecido', origin: 'Bird World', letter: 'B' },
    { id: 2, name: 'Morty Smith', species: 'Human', status: 'Vivo', origin: 'Earth', letter: 'M' },
    { id: 1, name: 'Rick Sanchez', species: 'Human', status: 'Vivo', origin: 'Earth', letter: 'R' },
  ],
  census: {
    byStatus: [
      { label: 'Morto', count: 1 },
      { label: 'Desconhecido', count: 1 },
      { label: 'Vivo', count: 2 },
    ],
    bySpecies: [
      { label: 'Human', count: 3 },
      { label: 'Alien', count: 1 },
    ],
  },
};

const anatomy: Cast = {
  episode: anatomyEpisode,
  previousEpisode: lawnEpisode,
  nextEpisode: null,
  index: ['A'],
  characters: [{ id: 11, name: 'Annie', species: 'Human', status: 'Vivo', origin: 'Earth', letter: 'A' }],
  census: { byStatus: [{ label: 'Vivo', count: 1 }], bySpecies: [{ label: 'Human', count: 1 }] },
};

const casts: Record<number, Cast> = { 1: pilot, 2: lawn, 3: anatomy };

export function castById(id: number): Cast | undefined {
  return casts[id];
}
