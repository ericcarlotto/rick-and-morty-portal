import type { EpisodeSummary } from '@rick/contract';

export function EpisodeList({ episodes }: { episodes: EpisodeSummary[] }) {
  return (
    <ul>
      {episodes.map((episode) => (
        <li key={episode.id}>
          <a href={`/episodes/${episode.id}`}>
            {episode.name}
            <span className="code">{episode.code}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
