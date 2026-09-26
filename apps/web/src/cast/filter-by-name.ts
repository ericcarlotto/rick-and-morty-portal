import type { CastCharacter } from '@rick/contract';

export function filterByName(input: { characters: CastCharacter[]; name: string }): CastCharacter[] {
  const query = input.name.trim().toLocaleLowerCase();
  if (!query) return input.characters;
  return input.characters.filter((character) => character.name.toLocaleLowerCase().includes(query));
}
