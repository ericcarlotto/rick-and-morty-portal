'use client';

import type { Cast, CastCharacter } from '@rick/contract';
import { useEffect, useState } from 'react';
import { filterByName } from '../cast/filter-by-name';
import { groupByLetter } from '../cast/group-by-letter';
import { countForLetter, lettersWithin } from '../cast/page-for-letter';
import { scrollToLetterHash } from '../cast/scroll-to-letter';
import { CastGroups } from './cast-groups';
import { CensusPanel } from './census-panel';
import { LetterIndex } from './letter-index';
import { NameFilter } from './name-filter';
import { Neighbors } from './neighbors';
import { PagedFrame } from './paged-frame';
import { takeCount } from './page-size';
import { useWindow } from './use-page';

export function CastView({ cast }: { cast: Cast }) {
  const [name, setName] = useState('');
  const matched = filterByName({ characters: cast.characters, name });
  const list = useWindow(matched.length, name);
  useEffect(() => {
    scrollToLetterHash();
  }, [list.shown]);
  return (
    <main className="screen cast">
      <div className="cast-body">
        <LetterIndex
          letters={lettersWithin(matched, matched.length)}
          onChoose={(letter) => list.reveal(countForLetter(matched, letter))}
        />
        <CastColumn cast={cast} matched={matched} list={list} name={name} onName={setName} />
      </div>
    </main>
  );
}

function CastColumn(props: {
  cast: Cast;
  matched: CastCharacter[];
  list: ReturnType<typeof useWindow>;
  name: string;
  onName: (name: string) => void;
}) {
  const visible = takeCount(props.matched, props.list.shown);
  const groups = groupByLetter({ index: lettersWithin(props.matched, props.list.shown), characters: visible });
  return (
    <div className="cast-main">
      <CastHead cast={props.cast} />
      <CensusPanel census={props.cast.census} />
      <NameFilter name={props.name} onName={props.onName} />
      <CastMatches cast={props.cast} groups={groups} list={props.list} empty={props.matched.length === 0} />
    </div>
  );
}

function CastMatches(props: {
  cast: Cast;
  groups: ReturnType<typeof groupByLetter>;
  list: ReturnType<typeof useWindow>;
  empty: boolean;
}) {
  if (props.empty) return <p className="lede">Nenhuma personagem encontrada.</p>;
  return (
    <PagedFrame done={props.list.done} token={props.list.shown} onReach={props.list.grow}>
      <CastGroups groups={props.groups} episodeId={props.cast.episode.id} />
    </PagedFrame>
  );
}

function CastHead({ cast }: { cast: Cast }) {
  return (
    <div className="screen-head">
      <a className="back" href="/">Catálogo</a>
      <p className="code">{cast.episode.code}</p>
      <h1 className="chosen">{cast.episode.name}</h1>
      <Neighbors previousEpisode={cast.previousEpisode} nextEpisode={cast.nextEpisode} />
    </div>
  );
}
