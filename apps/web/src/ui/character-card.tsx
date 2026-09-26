import type { CastCharacter } from '@rick/contract';
import { statusClass } from './status-class';

export function CharacterCard({ character, episodeId }: { character: CastCharacter; episodeId: number }) {
  return (
    <a className="character-row" href={`/episodes/${episodeId}/characters/${character.id}`}>
      <span className="character-name">{character.name}</span>
      <span className="character-meta character-species">Espécie: {character.species}</span>
      <span className={statusClass(character.status)}>Estado: {character.status}</span>
      <span className="character-meta character-origin">Origem: {character.origin}</span>
    </a>
  );
}
