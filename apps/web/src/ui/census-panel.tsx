import type { Cast, CensusCount } from '@rick/contract';

export function CensusPanel({ census }: { census: Cast['census'] }) {
  return (
    <section className="census" aria-label="Censo">
      <p className="eyebrow">Censo</p>
      <h2 className="sr-only">Por estado</h2>
      <CountList counts={census.byStatus} />
      <h2 className="sr-only">Por espécie</h2>
      <CountList counts={census.bySpecies} />
    </section>
  );
}

function CountList({ counts }: { counts: CensusCount[] }) {
  return (
    <ul>
      {counts.map((item) => (
        <li key={item.label} data-label={item.label}>
          {item.label}: {item.count}
        </li>
      ))}
    </ul>
  );
}
