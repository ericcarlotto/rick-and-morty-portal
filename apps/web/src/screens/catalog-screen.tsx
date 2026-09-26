import { loadCatalog } from '../load/catalog-model';
import type { RawSearch } from '../catalog/query';
import { CatalogView } from '../ui/catalog-view';

export async function CatalogScreen(props: { searchParams: Promise<RawSearch> }) {
  const model = await loadCatalog({ searchParams: props.searchParams });
  return <CatalogView model={model} />;
}
