import type { CatalogQuery } from '../catalog/query';

export function CatalogFilter({ query }: { query: CatalogQuery }) {
  return (
    <form action="/" method="get">
      <label>
        Nome
        <input name="name" defaultValue={query.name ?? ''} />
      </label>
      <label>
        Código
        <input name="code" defaultValue={query.code ?? ''} />
      </label>
      <button type="submit">Filtrar</button>
    </form>
  );
}
