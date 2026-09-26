import type { Cast, CastCharacter, CensusCount, CharacterStatus, EpisodeSummary } from './types';
import { intOf, recordOf, stringList, textOf } from './parse-guards';

const STATUSES: CharacterStatus[] = ['Vivo', 'Morto', 'Desconhecido'];

export function parseCast(value: unknown): Cast {
  const record = recordOf(value);
  return {
    episode: parseSummary(record.episode),
    previousEpisode: parseNeighbor(record.previousEpisode),
    nextEpisode: parseNeighbor(record.nextEpisode),
    index: stringList(record.index),
    characters: parseCharacters(record.characters),
    census: parseCensus(record.census),
  };
}

function parseNeighbor(value: unknown): EpisodeSummary | null {
  if (value === null) return null;
  return parseSummary(value);
}

function parseSummary(value: unknown): EpisodeSummary {
  const record = recordOf(value);
  return { id: intOf(record.id), name: textOf(record.name), code: textOf(record.code) };
}

function parseCharacters(value: unknown): CastCharacter[] {
  if (!Array.isArray(value)) throw new Error('Contrato inválido');
  return value.map(parseCharacter);
}

function parseCharacter(value: unknown): CastCharacter {
  const record = recordOf(value);
  return {
    id: intOf(record.id),
    name: textOf(record.name),
    species: textOf(record.species),
    status: parseStatus(record.status),
    origin: textOf(record.origin),
    letter: textOf(record.letter),
  };
}

function parseStatus(value: unknown): CharacterStatus {
  if (typeof value !== 'string' || !STATUSES.includes(value as CharacterStatus)) {
    throw new Error('Contrato inválido');
  }
  return value as CharacterStatus;
}

function parseCensus(value: unknown): Cast['census'] {
  const record = recordOf(value);
  return { byStatus: parseCounts(record.byStatus), bySpecies: parseCounts(record.bySpecies) };
}

function parseCounts(value: unknown): CensusCount[] {
  if (!Array.isArray(value)) throw new Error('Contrato inválido');
  return value.map(parseCount);
}

function parseCount(value: unknown): CensusCount {
  const record = recordOf(value);
  return { label: textOf(record.label), count: countOf(record.count) };
}

function countOf(value: unknown): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 0) {
    throw new Error('Contrato inválido');
  }
  return value;
}
