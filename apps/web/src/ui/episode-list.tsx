import type { EpisodeSummary } from '@rick/contract';

export function EpisodeList({ episodes }: { episodes: EpisodeSummary[] }) {
  return (
    <ul>
      {episodes.map((episode) => (
        <li key={episode.id}>
          <a className="episode-row" href={`/episodes/${episode.id}`}>
            <span className="code">{episode.code}</span>
            <span className="episode-name">{episode.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
