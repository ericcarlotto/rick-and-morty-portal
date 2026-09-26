import type { EpisodeSummary } from '@rick/contract';
import type { CatalogQuery } from './query';

export function filterCatalog(input: { episodes: EpisodeSummary[]; query: CatalogQuery }): EpisodeSummary[] {
  return input.episodes.filter((episode) => keepEpisode({ episode, query: input.query }));
}

function keepEpisode(input: { episode: EpisodeSummary; query: CatalogQuery }): boolean {
  if (!includesText({ value: input.query.name, text: input.episode.name })) return false;
  if (!includesText({ value: input.query.code, text: input.episode.code })) return false;
  return startsWithSeason({ code: input.episode.code, season: input.query.season });
}

function includesText(input: { value: string | undefined; text: string }): boolean {
  const query = input.value?.trim().toLocaleLowerCase() ?? '';
  if (!query) return true;
  return input.text.toLocaleLowerCase().includes(query);
}

function startsWithSeason(input: { code: string; season: string | undefined }): boolean {
  const mark = seasonMark(input.season);
  if (!mark) return true;
  return input.code.toLocaleLowerCase().startsWith(mark);
}

function seasonMark(season: string | undefined): string {
  const text = season?.trim() ?? '';
  if (text === '') return '';
  if (!/^\d{1,2}$/.test(text)) return 's00';
  return `s${text.padStart(2, '0')}`;
}
