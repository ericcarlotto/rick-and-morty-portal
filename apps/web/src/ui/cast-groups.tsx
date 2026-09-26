import type { LetterGroup } from '../cast/group-by-letter';
import { CharacterCard } from './character-card';

export function CastGroups({ groups, episodeId }: { groups: LetterGroup[]; episodeId: number }) {
  return (
    <div>
      {groups.map((group) => (
        <LetterSection key={group.letter} group={group} episodeId={episodeId} />
      ))}
    </div>
  );
}

function LetterSection({ group, episodeId }: { group: LetterGroup; episodeId: number }) {
  return (
    <section id={`letra-${group.letter}`} aria-label={`Letra ${group.letter}`}>
      <h2 className="index-letter">{group.letter}</h2>
      <ul>
        {group.characters.map((character) => (
          <li key={character.id}>
            <CharacterCard character={character} episodeId={episodeId} />
          </li>
        ))}
      </ul>
    </section>
  );
}
