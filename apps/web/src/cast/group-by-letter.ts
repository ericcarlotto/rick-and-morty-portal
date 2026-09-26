import type { CastCharacter } from '@rick/contract';

export type LetterGroup = { letter: string; characters: CastCharacter[] };

export function groupByLetter(input: { index: string[]; characters: CastCharacter[] }): LetterGroup[] {
  return input.index.map((letter) => ({
    letter,
    characters: input.characters.filter((character) => character.letter === letter),
  }));
}
