import type { EpisodeSummary } from '@rick/contract';

export function filterEpisodes(input: {
  episodes: EpisodeSummary[];
  name?: string;
  code?: string;
}): EpisodeSummary[] {
  const name = fold(input.name);
  const code = fold(input.code);
  return input.episodes.filter((episode) => keepEpisode({ episode, name, code }));
}

function fold(value: string | undefined): string {
  return value?.trim().toLocaleLowerCase() ?? '';
}

function keepEpisode(input: { episode: EpisodeSummary; name: string; code: string }): boolean {
  if (input.name && !input.episode.name.toLocaleLowerCase().includes(input.name)) return false;
  if (input.code && !input.episode.code.toLocaleLowerCase().includes(input.code)) return false;
  return true;
}
