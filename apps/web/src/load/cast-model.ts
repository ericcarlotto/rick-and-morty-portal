import type { Cast } from '@rick/contract';
import { readCast } from '../bff/read-cast';
import { positiveId } from '../cast/find-character';

export type CastModel = { kind: 'invalid' } | { kind: 'error' } | { kind: 'ready'; cast: Cast };

export async function loadCast(input: {
  params: Promise<{ id: string }>;
  origin?: string;
}): Promise<CastModel> {
  const params = await input.params;
  const episodeId = positiveId(params.id);
  if (episodeId === null) return { kind: 'invalid' };
  return readCastModel({ episodeId, origin: input.origin });
}

async function readCastModel(input: { episodeId: number; origin?: string }): Promise<CastModel> {
  try {
    return { kind: 'ready', cast: await readCast(input) };
  } catch {
    return { kind: 'error' };
  }
}
