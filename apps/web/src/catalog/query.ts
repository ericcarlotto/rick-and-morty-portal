export type RawSearch = Record<string, string | string[] | undefined>;

export type CatalogQuery = { name?: string; code?: string };

export function catalogQuery(raw: RawSearch): CatalogQuery {
  return { name: oneText(raw.name), code: oneText(raw.code) };
}

export function catalogPath(query: CatalogQuery): string {
  const params = new URLSearchParams();
  if (query.name) params.set('name', query.name);
  if (query.code) params.set('code', query.code);
  const search = params.toString();
  return search ? `/api/episodes?${search}` : '/api/episodes';
}

function oneText(value: string | string[] | undefined): string | undefined {
  const text = Array.isArray(value) ? value[0] : value;
  const trimmed = text?.trim();
  return trimmed ? trimmed : undefined;
}
