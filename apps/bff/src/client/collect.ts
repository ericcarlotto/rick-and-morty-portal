import { nextPageUrl } from '../domain/allowed-url';
import type { RemoteCharacter, RemoteEpisode } from '../use-cases/episode-source';
import { CHARACTER_BATCH, chunkIds } from './chunk-ids';
import type { ClientOptions } from './client-options';
import { fetchJson } from './fetch-json';
import { mapCharacterList, mapEpisodePage } from './map-remote';

export async function collectEpisodes(options: ClientOptions): Promise<RemoteEpisode[]> {
  const episodes: RemoteEpisode[] = [];
  let next: string | null = `${options.origin}/api/episode`;
  let pages = 0;
  while (next) {
    const page = mapEpisodePage(await fetchJson(options, next));
    episodes.push(...page.episodes);
    pages += 1;
    next = nextPageUrl({ next: page.next, allowedHost: options.allowedHost, pagesAlreadyFetched: pages });
  }
  return episodes;
}

export async function collectCharacters(options: ClientOptions, ids: number[]): Promise<RemoteCharacter[]> {
  if (ids.length === 0) return [];
  const found: RemoteCharacter[] = [];
  for (const group of chunkIds(ids, CHARACTER_BATCH)) {
    const url = `${options.origin}/api/character/${group.join(',')}`;
    found.push(...mapCharacterList(await fetchJson(options, url)));
  }
  return found;
}
