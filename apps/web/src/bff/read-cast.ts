import { parseCast, type Cast } from '@rick/contract';
import { getJson } from './get-json';

export function castPath(episodeId: number): string {
  return `/api/episodes/${episodeId}/cast`;
}

export async function readCast(input: { episodeId: number; origin?: string }): Promise<Cast> {
  const json = await getJson({ path: castPath(input.episodeId), origin: input.origin });
  return parseCast(json);
}
