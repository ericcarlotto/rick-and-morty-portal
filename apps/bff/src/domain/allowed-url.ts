export const MAX_CATALOG_PAGES = 8;

export function isAllowedApiUrl(input: { url: string; allowedHost: string }): boolean {
  const parsed = readUrl(input.url);
  if (!parsed) return false;
  return parsed.protocol === 'https:' && parsed.hostname === input.allowedHost;
}

export function nextPageUrl(input: {
  next: string | null;
  allowedHost: string;
  pagesAlreadyFetched: number;
}): string | null {
  if (input.next === null) return null;
  if (input.pagesAlreadyFetched >= MAX_CATALOG_PAGES) return null;
  if (!isAllowedApiUrl({ url: input.next, allowedHost: input.allowedHost })) return null;
  return input.next;
}

function readUrl(url: string): URL | null {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}
