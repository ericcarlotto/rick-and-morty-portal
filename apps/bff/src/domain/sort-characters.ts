import type { CastCharacter } from '@rick/contract';

export function sortCharacters(characters: CastCharacter[]): CastCharacter[] {
  return [...characters].sort(compareCharacters);
}

function compareCharacters(left: CastCharacter, right: CastCharacter): number {
  const byName = left.name.localeCompare(right.name, undefined, { sensitivity: 'base' });
  if (byName !== 0) return byName;
  return left.id - right.id;
}
