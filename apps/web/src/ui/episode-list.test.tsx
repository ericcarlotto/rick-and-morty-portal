import type { EpisodeSummary } from '@rick/contract';
import { act, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { EpisodeList } from './episode-list';

function episodes(count: number): EpisodeSummary[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Arquivo ${index + 1}`,
    code: `S02E${index + 1}`,
  }));
}

test('mostra quinze episódios e o scroll acrescenta cinco', () => {
  let emit: (visible: boolean) => void = () => {};
  class Observer {
    constructor(callback: (entries: { isIntersecting: boolean }[]) => void) {
      emit = (visible) => callback([{ isIntersecting: visible }]);
    }
    observe() {
      emit(false);
    }
    disconnect() {}
  }
  vi.stubGlobal('IntersectionObserver', Observer);
  render(<EpisodeList episodes={episodes(25)} />);
  expect(screen.getByRole('link', { name: /Arquivo 1$/ })).toBeTruthy();
  expect(screen.getByRole('link', { name: /Arquivo 15$/ })).toBeTruthy();
  expect(screen.queryByRole('link', { name: /Arquivo 16$/ })).toBeNull();
  expect(screen.queryByRole('navigation', { name: 'Páginas' })).toBeNull();
  act(() => {
    emit(true);
  });
  expect(screen.getByRole('link', { name: /Arquivo 20$/ })).toBeTruthy();
  expect(screen.getByRole('link', { name: /Arquivo 1$/ })).toBeTruthy();
  expect(screen.queryByRole('link', { name: /Arquivo 21$/ })).toBeNull();
  vi.unstubAllGlobals();
});
