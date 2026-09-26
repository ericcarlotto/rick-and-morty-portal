import type { IncomingMessage } from 'node:http';
import type { EpisodeSummary } from '@rick/contract';
import { filterCatalog } from '../src/catalog/filter-catalog';
import { castById, episodes } from './stub-data';

export function stubBody(request: IncomingMessage): unknown {
  const url = new URL(request.url ?? '/', 'http://127.0.0.1');
  if (url.pathname === '/api/health') return { status: 'ok' };
  if (url.pathname === '/api/episodes') return { episodes: listed(url) };
  return castBody(url.pathname);
}

function listed(url: URL): EpisodeSummary[] {
  return filterCatalog({
    episodes,
    query: { name: text(url, 'name'), code: text(url, 'code'), season: text(url, 'season') },
  });
}

function text(url: URL, key: string): string | undefined {
  const value = url.searchParams.get(key)?.trim();
  return value ? value : undefined;
}

function castBody(pathname: string): unknown {
  const match = /^\/api\/episodes\/(\d+)\/cast$/.exec(pathname);
  if (!match) return undefined;
  return castById(Number(match[1]));
}
