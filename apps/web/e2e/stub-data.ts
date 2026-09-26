import type { Cast, EpisodeSummary } from '@rick/contract';

const pilotEpisode: EpisodeSummary = { id: 1, name: 'Pilot', code: 'S01E01' };
const lawnEpisode: EpisodeSummary = { id: 2, name: 'Lawnmower Dog', code: 'S01E02' };
const anatomyEpisode: EpisodeSummary = { id: 3, name: 'Anatomy Park', code: 'S01E03' };

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

const archiveIds = Array.from({ length: 19 }, (_, index) => index + 4);

export const episodes: EpisodeSummary[] = [pilotEpisode, lawnEpisode, anatomyEpisode, ...archiveIds.map(archiveEpisode)];

const casts: Record<number, Cast> = { 1: pilot, 2: lawn, 3: anatomy, 4: archiveCast() };

export function castById(id: number): Cast | undefined {
  return casts[id];
}

function archiveEpisode(id: number): EpisodeSummary {
  return { id, name: `Arquivo ${id}`, code: `S02E${String(id).padStart(2, '0')}` };
}

function archiveCast(): Cast {
  return {
    episode: archiveEpisode(4),
    previousEpisode: anatomyEpisode,
    nextEpisode: null,
    index: ['A', 'Z'],
    characters: Array.from({ length: 16 }, (_, index) => characterAt(index)),
    census: { byStatus: [{ label: 'Vivo', count: 16 }], bySpecies: [{ label: 'Human', count: 16 }] },
  };
}

function characterAt(index: number): Cast['characters'][number] {
  const early = index < 15;
  return {
    id: 100 + index,
    name: early ? `Alpha ${index}` : 'Zeta',
    species: 'Human',
    status: 'Vivo',
    origin: 'Earth',
    letter: early ? 'A' : 'Z',
  };
}
