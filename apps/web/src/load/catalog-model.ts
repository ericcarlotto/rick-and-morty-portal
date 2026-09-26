import type { EpisodeCatalog } from '@rick/contract';
import { readCatalog } from '../bff/read-catalog';
import { catalogQuery, type RawSearch } from '../catalog/query';
import type { CatalogModel, Remote } from '../ui/catalog-view';

export async function loadCatalog(input: {
  searchParams: Promise<RawSearch>;
  origin?: string;
}): Promise<CatalogModel> {
  const query = catalogQuery(await input.searchParams);
  return { query, remote: await remoteCatalog({ origin: input.origin }) };
}

async function remoteCatalog(input: { origin?: string }): Promise<Remote<EpisodeCatalog>> {
  try {
    return { ok: true, value: await readCatalog({ query: {}, origin: input.origin }) };
  } catch {
    return { ok: false };
  }
}
