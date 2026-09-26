import type { IncomingMessage } from 'node:http';
import type { EpisodeSummary } from '@rick/contract';
import { castById, episodes } from './stub-data';

export function stubBody(request: IncomingMessage): unknown {
  const url = new URL(request.url ?? '/', 'http://127.0.0.1');
  if (url.pathname === '/api/health') return { status: 'ok' };
  if (url.pathname === '/api/episodes') return { episodes: filterEpisodes(url) };
  return castBody(url.pathname);
}

function filterEpisodes(url: URL): EpisodeSummary[] {
  const name = fold(url.searchParams.get('name'));
  const code = fold(url.searchParams.get('code'));
  return episodes.filter((episode) => keep({ episode, name, code }));
}

function keep(input: { episode: EpisodeSummary; name: string; code: string }): boolean {
  if (input.name && !input.episode.name.toLocaleLowerCase().includes(input.name)) return false;
  if (input.code && !input.episode.code.toLocaleLowerCase().includes(input.code)) return false;
  return true;
}

function fold(value: string | null): string {
  return value?.trim().toLocaleLowerCase() ?? '';
}

function castBody(pathname: string): unknown {
  const match = /^\/api\/episodes\/(\d+)\/cast$/.exec(pathname);
  if (!match) return undefined;
  return castById(Number(match[1]));
}
