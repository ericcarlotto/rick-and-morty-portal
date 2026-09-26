'use client';

import type { EpisodeSummary } from '@rick/contract';
import { useState } from 'react';
import { filterCatalog } from '../catalog/filter-catalog';
import type { CatalogQuery } from '../catalog/query';
import { CatalogFilter } from './catalog-filter';
import { EpisodeList } from './episode-list';

export function CatalogReady({ episodes, query }: { episodes: EpisodeSummary[]; query: CatalogQuery }) {
  const [draft, setDraft] = useState(query);
  const matched = filterCatalog({ episodes, query: draft });
  return (
    <>
      <CatalogHead query={draft} onQuery={setDraft} />
      <CatalogResult episodes={matched} resetKey={draftKey(draft)} />
    </>
  );
}

function CatalogHead({ query, onQuery }: { query: CatalogQuery; onQuery: (query: CatalogQuery) => void }) {
  return (
    <div className="screen-head">
      <p className="eyebrow">Catálogo</p>
      <div className="screen-head-row">
        <h1>Catálogo de episódios</h1>
        <CatalogFilter query={query} onQuery={onQuery} />
      </div>
      <p className="lede">Escolhe um episódio. O elenco vem por ordem alfabética, com censo e índice.</p>
    </div>
  );
}

function CatalogResult({ episodes, resetKey }: { episodes: EpisodeSummary[]; resetKey: string }) {
  if (episodes.length === 0) return <p className="notice">Nenhum episódio encontrado.</p>;
  return <EpisodeList episodes={episodes} resetKey={resetKey} />;
}

function draftKey(query: CatalogQuery): string {
  return `${query.name ?? ''}|${query.code ?? ''}|${query.season ?? ''}`;
}
