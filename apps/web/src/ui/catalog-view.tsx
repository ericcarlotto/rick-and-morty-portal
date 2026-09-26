import type { EpisodeCatalog } from '@rick/contract';
import type { CatalogQuery } from '../catalog/query';
import { CatalogFilter } from './catalog-filter';
import { EpisodeList } from './episode-list';

export type Remote<T> = { ok: true; value: T } | { ok: false };

export type CatalogModel = { query: CatalogQuery; remote: Remote<EpisodeCatalog> };

export function CatalogView({ model }: { model: CatalogModel }) {
  return (
    <main>
      <h1>Catálogo de episódios</h1>
      <CatalogFilter query={model.query} />
      <CatalogBody remote={model.remote} />
    </main>
  );
}

function CatalogBody({ remote }: { remote: Remote<EpisodeCatalog> }) {
  if (!remote.ok) return <p role="alert">Não foi possível ler o catálogo.</p>;
  if (remote.value.episodes.length === 0) return <p>Nenhum episódio encontrado.</p>;
  return <EpisodeList episodes={remote.value.episodes} />;
}
