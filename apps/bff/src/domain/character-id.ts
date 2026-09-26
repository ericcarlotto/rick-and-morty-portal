export function characterIdFromUrl(url: string): number | null {
  const parsed = readUrl(url);
  if (!parsed) return null;
  return idFromPath(parsed.pathname);
}

export function characterIds(urls: string[]): number[] {
  const ids: number[] = [];
  for (const url of urls) {
    const id = characterIdFromUrl(url);
    if (id !== null) ids.push(id);
  }
  return ids;
}

function readUrl(url: string): URL | null {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

function idFromPath(pathname: string): number | null {
  const match = pathname.match(/\/character\/(\d+)$/);
  if (!match?.[1]) return null;
  const id = Number(match[1]);
  if (id < 1) return null;
  return id;
}
