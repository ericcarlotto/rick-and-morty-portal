import type { EpisodeSummary } from '@rick/contract';
import { expect, test } from 'vitest';
import { filterEpisodes } from './filter-episodes';

const episodes: EpisodeSummary[] = [
  { id: 1, name: 'Pilot', code: 'S01E01' },
  { id: 2, name: 'Lawnmower Dog', code: 'S01E02' },
];

test('sem filtro devolve o catálogo', () => {
  expect(filterEpisodes({ episodes })).toEqual(episodes);
});

test('filtra por nome ou código, sem distinguir maiúsculas', () => {
  expect(filterEpisodes({ episodes, name: 'dog' }).map((item) => item.id)).toEqual([2]);
  expect(filterEpisodes({ episodes, code: 's01e01' }).map((item) => item.id)).toEqual([1]);
  expect(filterEpisodes({ episodes, name: 'pilot', code: 'S01E02' })).toEqual([]);
});
