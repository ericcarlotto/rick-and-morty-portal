import type { RemoteCharacter, RemoteEpisode } from '../use-cases/episode-source';
import { asPositiveInt, asRecord, asString, asStringList } from './json-guards';

export function mapEpisode(value: unknown): RemoteEpisode {
  const record = asRecord(value);
  return {
    id: asPositiveInt(record.id),
    name: asString(record.name),
    code: asString(record.episode),
    characterUrls: asStringList(record.characters),
  };
}

export function mapEpisodePage(value: unknown): { episodes: RemoteEpisode[]; next: string | null } {
  const record = asRecord(value);
  const info = asRecord(record.info);
  if (!Array.isArray(record.results)) throw new Error('Resposta inválida');
  return {
    episodes: record.results.map(mapEpisode),
    next: typeof info.next === 'string' ? info.next : null,
  };
}

export function mapCharacter(value: unknown): RemoteCharacter {
  const record = asRecord(value);
  const origin = asRecord(record.origin);
  return {
    id: asPositiveInt(record.id),
    name: asString(record.name),
    status: asString(record.status),
    species: asString(record.species),
    origin: asString(origin.name),
  };
}

export function mapCharacterList(value: unknown): RemoteCharacter[] {
  if (Array.isArray(value)) return value.map(mapCharacter);
  return [mapCharacter(value)];
}
