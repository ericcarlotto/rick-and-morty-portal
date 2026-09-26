export function letterOf(name: string): string {
  const first = [...name.trim()][0];
  if (!first) return '?';
  return first.toLocaleUpperCase();
}

export function indexLetters(characters: { letter: string }[]): string[] {
  const letters: string[] = [];
  for (const character of characters) {
    if (!letters.includes(character.letter)) letters.push(character.letter);
  }
  return letters;
}
