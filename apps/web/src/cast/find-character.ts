import type { CastCharacter } from '@rick/contract';

export function positiveId(value: string): number | null {
  if (!/^[1-9]\d*$/.test(value)) return null;
  return Number(value);
}

export function findCharacter(input: { characters: CastCharacter[]; id: number }): CastCharacter | null {
  return input.characters.find((character) => character.id === input.id) ?? null;
}
