import type { CastCharacter, CensusCount } from '@rick/contract';

export function censusByStatus(characters: CastCharacter[]): CensusCount[] {
  return countBy(characters, (character) => character.status);
}

export function censusBySpecies(characters: CastCharacter[]): CensusCount[] {
  return countBy(characters, (character) => character.species);
}

function countBy(characters: CastCharacter[], labelOf: (character: CastCharacter) => string): CensusCount[] {
  const counts = new Map<string, number>();
  for (const character of characters) {
    const label = labelOf(character);
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((left, right) => left.label.localeCompare(right.label));
}
