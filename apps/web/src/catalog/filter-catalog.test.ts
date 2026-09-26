import type { EpisodeSummary } from '@rick/contract';
import { expect, test } from 'vitest';
import { filterCatalog } from './filter-catalog';

const episodes: EpisodeSummary[] = [
  { id: 1, name: 'Pilot', code: 'S01E01' },
  { id: 2, name: 'Lawnmower Dog', code: 'S01E02' },
  { id: 12, name: 'A Rickle in Time', code: 'S02E01' },
];

test('filtra nome, código e temporada enquanto os campos mudam', () => {
  expect(ids({ name: ' dog ' })).toEqual([2]);
  expect(ids({ code: 's01e01' })).toEqual([1]);
  expect(ids({ season: '2' })).toEqual([12]);
  expect(ids({ season: ' 2 ' })).toEqual([12]);
  expect(ids({ season: 'abc' })).toEqual([]);
  expect(ids({ name: 'pilot', season: '2' })).toEqual([]);
  expect(ids({})).toEqual([1, 2, 12]);
});

function ids(query: { name?: string; code?: string; season?: string }): number[] {
  return filterCatalog({ episodes, query }).map((episode) => episode.id);
}
