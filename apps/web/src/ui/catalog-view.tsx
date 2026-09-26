import type { EpisodeCatalog } from '@rick/contract';
import type { CatalogQuery } from '../catalog/query';
import { CatalogReady } from './catalog-ready';

export type Remote<T> = { ok: true; value: T } | { ok: false };

export type CatalogModel = { query: CatalogQuery; remote: Remote<EpisodeCatalog> };

export function CatalogView({ model }: { model: CatalogModel }) {
  if (!model.remote.ok) return <CatalogError />;
  return (
    <main className="screen">
      <CatalogReady episodes={model.remote.value.episodes} query={model.query} />
    </main>
  );
}

function CatalogError() {
  return (
    <main className="screen">
      <div className="screen-head">
        <p className="eyebrow">Catálogo</p>
        <h1>Catálogo de episódios</h1>
      </div>
      <p className="notice" role="alert">Não foi possível ler o catálogo.</p>
    </main>
  );
}
