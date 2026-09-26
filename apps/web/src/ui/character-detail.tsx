import type { CastCharacter } from '@rick/contract';
import { statusClass } from './status-class';

export function CharacterDetail({ character, episodeId }: { character: CastCharacter; episodeId: number }) {
  return (
    <article>
      <h1>{character.name}</h1>
      <p>Espécie: {character.species}</p>
      <p className={statusClass(character.status)}>Estado: {character.status}</p>
      <p>Origem: {character.origin}</p>
      <a href={`/episodes/${episodeId}`}>Voltar ao elenco</a>
    </article>
  );
}

export function MissingCharacter({ episodeId }: { episodeId: number }) {
  return (
    <p>
      Personagem não encontrada. <a href={`/episodes/${episodeId}`}>Voltar ao elenco</a>
    </p>
  );
}
