import type { RawSearch } from '../src/catalog/query';
import { CatalogScreen } from '../src/screens/catalog-screen';

export const revalidate = 60;

export default function Page(props: { searchParams: Promise<RawSearch> }) {
  return <CatalogScreen searchParams={props.searchParams} />;
}
