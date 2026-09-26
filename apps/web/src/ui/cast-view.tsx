import type { Cast } from '@rick/contract';
import { groupByLetter } from '../cast/group-by-letter';
import { CastGroups } from './cast-groups';
import { CensusPanel } from './census-panel';
import { LetterIndex } from './letter-index';
import { Neighbors } from './neighbors';

export function CastView({ cast }: { cast: Cast }) {
  const groups = groupByLetter({ index: cast.index, characters: cast.characters });
  return (
    <main className="screen cast">
      <div className="cast-body">
        <LetterIndex letters={cast.index} />
        <CastColumn cast={cast} groups={groups} />
      </div>
    </main>
  );
}

function CastColumn({ cast, groups }: { cast: Cast; groups: ReturnType<typeof groupByLetter> }) {
  return (
    <div className="cast-main">
      <div className="screen-head">
        <a className="back" href="/">Catálogo</a>
        <p className="code">{cast.episode.code}</p>
        <h1 className="chosen">{cast.episode.name}</h1>
        <Neighbors previousEpisode={cast.previousEpisode} nextEpisode={cast.nextEpisode} />
      </div>
      <CensusPanel census={cast.census} />
      <CastGroups groups={groups} episodeId={cast.episode.id} />
    </div>
  );
}
