import { expect, test } from 'vitest';
import CatalogPage, { revalidate as catalogRevalidate } from './page';
import CastPage, { revalidate as castRevalidate } from './episodes/[id]/page';
import DetailPage, { revalidate as detailRevalidate } from './episodes/[id]/characters/[characterId]/page';
import { CatalogScreen } from '../src/screens/catalog-screen';
import { CastScreen } from '../src/screens/cast-screen';
import { DetailScreen } from '../src/screens/detail-screen';

test('as páginas revalidam aos 60 segundos', () => {
  expect(catalogRevalidate).toBe(60);
  expect(castRevalidate).toBe(60);
  expect(detailRevalidate).toBe(60);
});

test('a página do catálogo monta o ecrã', () => {
  const searchParams = Promise.resolve({});
  const page = CatalogPage({ searchParams });
  expect(page.type).toBe(CatalogScreen);
  expect(page.props.searchParams).toBe(searchParams);
});

test('a página do elenco monta o ecrã', () => {
  const params = Promise.resolve({ id: '2' });
  const page = CastPage({ params });
  expect(page.type).toBe(CastScreen);
  expect(page.props.params).toBe(params);
});

test('a página da personagem monta o ecrã', () => {
  const params = Promise.resolve({ id: '2', characterId: '1' });
  const page = DetailPage({ params });
  expect(page.type).toBe(DetailScreen);
  expect(page.props.params).toBe(params);
});
