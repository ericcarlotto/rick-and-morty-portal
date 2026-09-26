import type { Cast } from '@rick/contract';
import { groupByLetter } from '../cast/group-by-letter';
import { CastGroups } from './cast-groups';
import { CensusPanel } from './census-panel';
import { LetterIndex } from './letter-index';
import { Neighbors } from './neighbors';

export function CastView({ cast }: { cast: Cast }) {
  const groups = groupByLetter({ index: cast.index, characters: cast.characters });
  return (
    <main>
      <a href="/">Catálogo</a>
      <h1 className="chosen">{cast.episode.name}</h1>
      <p className="code">{cast.episode.code}</p>
      <Neighbors previousEpisode={cast.previousEpisode} nextEpisode={cast.nextEpisode} />
      <LetterIndex letters={cast.index} />
      <CastGroups groups={groups} episodeId={cast.episode.id} />
      <CensusPanel census={cast.census} />
    </main>
  );
}
