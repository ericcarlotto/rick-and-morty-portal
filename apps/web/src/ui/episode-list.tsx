'use client';

import type { EpisodeSummary } from '@rick/contract';
import { PagedFrame } from './paged-frame';
import { takeCount } from './page-size';
import { useWindow } from './use-page';

export function EpisodeList({ episodes, resetKey = '' }: { episodes: EpisodeSummary[]; resetKey?: string }) {
  const list = useWindow(episodes.length, resetKey);
  return (
    <PagedFrame done={list.done} token={list.shown} onReach={list.grow}>
      <ul>
        {takeCount(episodes, list.shown).map((episode) => (
          <EpisodeItem key={episode.id} episode={episode} />
        ))}
      </ul>
    </PagedFrame>
  );
}

function EpisodeItem({ episode }: { episode: EpisodeSummary }) {
  return (
    <li>
      <a className="episode-row" href={`/episodes/${episode.id}`}>
        <span className="code">{episode.code}</span>
        <span className="episode-name">{episode.name}</span>
      </a>
    </li>
  );
}
