import { countUntil, takeCount } from '../ui/page-size';

export function countForLetter(characters: { letter: string }[], letter: string): number {
  const index = characters.findIndex((character) => character.letter === letter);
  if (index < 0) return countUntil(0);
  return countUntil(index);
}

export function lettersWithin(characters: { letter: string }[], count: number): string[] {
  return takeCount(characters, count).reduce<string[]>(collectLetter, []);
}

function collectLetter(letters: string[], character: { letter: string }): string[] {
  if (letters.includes(character.letter)) return letters;
  return [...letters, character.letter];
}
