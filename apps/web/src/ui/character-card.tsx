import type { CastCharacter } from '@rick/contract';
import { statusClass } from './status-class';

export function CharacterCard({ character, episodeId }: { character: CastCharacter; episodeId: number }) {
  return (
    <a href={`/episodes/${episodeId}/characters/${character.id}`}>
      <span>{character.name}</span>
      <span>Espécie: {character.species}</span>
      <span className={statusClass(character.status)}>Estado: {character.status}</span>
      <span>Origem: {character.origin}</span>
    </a>
  );
}
