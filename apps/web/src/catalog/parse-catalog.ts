import type { EpisodeCatalog, EpisodeSummary } from '@rick/contract';

export function parseCatalog(value: unknown): EpisodeCatalog {
  const record = asRecord(value);
  return { episodes: asEpisodes(record.episodes) };
}

function asRecord(value: unknown): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error('Contrato inválido');
  }
  return value as Record<string, unknown>;
}

function asEpisodes(value: unknown): EpisodeSummary[] {
  if (!Array.isArray(value)) throw new Error('Contrato inválido');
  return value.map(asEpisode);
}

function asEpisode(value: unknown): EpisodeSummary {
  const item = asRecord(value);
  return { id: positive(item.id), name: text(item.name), code: text(item.code) };
}

function positive(value: unknown): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value <= 0) {
    throw new Error('Contrato inválido');
  }
  return value;
}

function text(value: unknown): string {
  if (typeof value !== 'string' || value.trim() === '') throw new Error('Contrato inválido');
  return value;
}
