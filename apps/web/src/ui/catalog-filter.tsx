'use client';

import type { CatalogQuery } from '../catalog/query';

export function CatalogFilter({ query, onQuery }: { query: CatalogQuery; onQuery: (query: CatalogQuery) => void }) {
  return (
    <div className="catalog-filter">
      <label>
        Nome
        <input value={query.name ?? ''} onChange={(event) => onQuery({ ...query, name: event.target.value })} />
      </label>
      <label>
        Código
        <input value={query.code ?? ''} onChange={(event) => onQuery({ ...query, code: event.target.value })} />
      </label>
      <SeasonField season={query.season} onSeason={(season) => onQuery({ ...query, season })} />
    </div>
  );
}

const seasons = ['1', '2', '3', '4', '5'];

function SeasonField({ season, onSeason }: { season: string | undefined; onSeason: (season: string) => void }) {
  return (
    <label>
      Temporada
      <select value={season ?? ''} onChange={(event) => onSeason(event.target.value)}>
        <option value="">Todas</option>
        {seasons.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </label>
  );
}
