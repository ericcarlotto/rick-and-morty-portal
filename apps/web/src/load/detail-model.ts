import type { Cast, CastCharacter } from '@rick/contract';
import { readCast } from '../bff/read-cast';
import { findCharacter, positiveId } from '../cast/find-character';

export type DetailModel =
  | { kind: 'invalid-episode' }
  | { kind: 'invalid-character' }
  | { kind: 'error' }
  | { kind: 'missing'; episodeId: number }
  | { kind: 'ready'; episodeId: number; character: CastCharacter };

export async function loadDetail(input: {
  params: Promise<{ id: string; characterId: string }>;
  origin?: string;
}): Promise<DetailModel> {
  const params = await input.params;
  const episodeId = positiveId(params.id);
  if (episodeId === null) return { kind: 'invalid-episode' };
  return loadDetailCast({ episodeId, characterId: params.characterId, origin: input.origin });
}

async function loadDetailCast(input: {
  episodeId: number;
  characterId: string;
  origin?: string;
}): Promise<DetailModel> {
  const characterId = positiveId(input.characterId);
  if (characterId === null) return { kind: 'invalid-character' };
  try {
    const cast = await readCast({ episodeId: input.episodeId, origin: input.origin });
    return foundCharacter({ cast, episodeId: input.episodeId, characterId });
  } catch {
    return { kind: 'error' };
  }
}

function foundCharacter(input: { cast: Cast; episodeId: number; characterId: number }): DetailModel {
  const character = findCharacter({ characters: input.cast.characters, id: input.characterId });
  if (!character) return { kind: 'missing', episodeId: input.episodeId };
  return { kind: 'ready', episodeId: input.episodeId, character };
}
