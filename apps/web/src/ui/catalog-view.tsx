import type { EpisodeCatalog } from '@rick/contract';
import type { CatalogQuery } from '../catalog/query';
import { CatalogFilter } from './catalog-filter';
import { EpisodeList } from './episode-list';

export type Remote<T> = { ok: true; value: T } | { ok: false };

export type CatalogModel = { query: CatalogQuery; remote: Remote<EpisodeCatalog> };

export function CatalogView({ model }: { model: CatalogModel }) {
  return (
    <main className="screen">
      <CatalogHead query={model.query} />
      <CatalogBody remote={model.remote} />
    </main>
  );
}

function CatalogHead({ query }: { query: CatalogQuery }) {
  return (
    <div className="screen-head">
      <p className="eyebrow">Catálogo</p>
      <div className="screen-head-row">
        <h1>Catálogo de episódios</h1>
        <CatalogFilter query={query} />
      </div>
      <p className="lede">Escolhe um episódio. O elenco vem por ordem alfabética, com censo e índice.</p>
    </div>
  );
}

function CatalogBody({ remote }: { remote: Remote<EpisodeCatalog> }) {
  if (!remote.ok) return <p className="notice" role="alert">Não foi possível ler o catálogo.</p>;
  if (remote.value.episodes.length === 0) return <p className="notice">Nenhum episódio encontrado.</p>;
  return <EpisodeList episodes={remote.value.episodes} />;
}
