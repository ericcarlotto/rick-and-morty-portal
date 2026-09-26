import type { Cast, CensusCount } from '@rick/contract';

export function CensusPanel({ census }: { census: Cast['census'] }) {
  return (
    <section aria-label="Censo">
      <h2>Por estado</h2>
      <CountList counts={census.byStatus} />
      <h2>Por espécie</h2>
      <CountList counts={census.bySpecies} />
    </section>
  );
}

function CountList({ counts }: { counts: CensusCount[] }) {
  return (
    <ul>
      {counts.map((item) => (
        <li key={item.label}>
          {item.label}: {item.count}
        </li>
      ))}
    </ul>
  );
}
