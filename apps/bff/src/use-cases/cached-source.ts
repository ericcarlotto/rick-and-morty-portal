import { MemoryCache } from './memory-cache';
import type { EpisodeSource, RemoteCharacter, RemoteEpisode } from './episode-source';

export class CachedEpisodeSource implements EpisodeSource {
  constructor(
    private readonly inner: EpisodeSource,
    private readonly cache: MemoryCache,
  ) {}

  listEpisodes(): Promise<RemoteEpisode[]> {
    return this.remember('episodes', () => this.inner.listEpisodes());
  }

  getCharacters(ids: number[]): Promise<RemoteCharacter[]> {
    return this.remember(characterKey(ids), () => this.inner.getCharacters(ids));
  }

  private remember<T>(key: string, load: () => Promise<T>): Promise<T> {
    const hit = this.cache.read<T>(key);
    if (hit) return Promise.resolve(hit);
    return load().then((value) => {
      this.cache.write(key, value);
      return value;
    });
  }
}

function characterKey(ids: number[]): string {
  const ordered = [...ids].sort((left, right) => left - right);
  return `characters:${ordered.join(',')}`;
}
