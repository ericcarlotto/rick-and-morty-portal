import type { EpisodeCatalog } from '@rick/contract';
import { parseCatalog } from '../catalog/parse-catalog';
import type { CatalogQuery } from '../catalog/query';
import { catalogPath } from '../catalog/query';
import { getJson } from './get-json';

export async function readCatalog(input: { query: CatalogQuery; origin?: string }): Promise<EpisodeCatalog> {
  const json = await getJson({ path: catalogPath(input.query), origin: input.origin });
  return parseCatalog(json);
}
