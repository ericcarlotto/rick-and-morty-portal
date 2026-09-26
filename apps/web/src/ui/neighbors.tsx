import type { EpisodeSummary } from '@rick/contract';

export function Neighbors({ previousEpisode, nextEpisode }: {
  previousEpisode: EpisodeSummary | null;
  nextEpisode: EpisodeSummary | null;
}) {
  return (
    <nav aria-label="Episódios vizinhos">
      <NeighborLink link={{ label: 'Anterior', episode: previousEpisode, empty: 'Sem episódio anterior' }} />
      <NeighborLink link={{ label: 'Seguinte', episode: nextEpisode, empty: 'Sem episódio seguinte' }} />
    </nav>
  );
}

function NeighborLink({ link }: { link: { label: string; episode: EpisodeSummary | null; empty: string } }) {
  if (!link.episode) return <p>{link.empty}</p>;
  return (
    <a href={`/episodes/${link.episode.id}`}>
      {link.label}: {link.episode.name}
    </a>
  );
}
