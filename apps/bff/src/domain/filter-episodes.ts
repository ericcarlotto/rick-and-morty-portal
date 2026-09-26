import type { EpisodeSummary } from '@rick/contract';
import { seasonPrefix } from './season-prefix';

export function filterEpisodes(input: {
  episodes: EpisodeSummary[];
  name?: string;
  code?: string;
  season?: string;
}): EpisodeSummary[] {
  const name = fold(input.name);
  const code = fold(input.code);
  const season = seasonPrefix(input.season);
  return input.episodes.filter((episode) => keepEpisode({ episode, name, code, season }));
}

function fold(value: string | undefined): string {
  return value?.trim().toLocaleLowerCase() ?? '';
}

function keepEpisode(input: { episode: EpisodeSummary; name: string; code: string; season: string }): boolean {
  if (!includesText({ value: input.name, text: input.episode.name })) return false;
  if (!includesText({ value: input.code, text: input.episode.code })) return false;
  return startsWithText({ value: input.season, text: input.episode.code });
}

function includesText(input: { value: string; text: string }): boolean {
  if (!input.value) return true;
  return input.text.toLocaleLowerCase().includes(input.value);
}

function startsWithText(input: { value: string; text: string }): boolean {
  if (!input.value) return true;
  return input.text.toLocaleLowerCase().startsWith(input.value);
}
