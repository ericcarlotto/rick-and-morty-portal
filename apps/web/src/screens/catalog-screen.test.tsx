import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest';
import { CatalogScreen } from './catalog-screen';

const origin = 'http://127.0.0.1:4011';
const server = setupServer();

beforeAll(() => {
  process.env.BFF_ORIGIN = origin;
  server.listen({ onUnhandledRequest: 'error' });
});
afterEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
  delete process.env.BFF_ORIGIN;
});

test('o ecrã pede o catálogo filtrado ao BFF', async () => {
  let search = '';
  server.use(
    http.get(`${origin}/api/episodes`, ({ request }) => {
      search = new URL(request.url).search;
      return HttpResponse.json({ episodes: [{ id: 1, name: 'Pilot', code: 'S01E01' }] });
    }),
  );
  render(await CatalogScreen({ searchParams: Promise.resolve({ name: 'Pilot', code: 'S01E01' }) }));
  expect(screen.getByRole('link', { name: /Pilot/ })).toBeTruthy();
  expect(search).toContain('name=Pilot');
  expect(search).toContain('code=S01E01');
});

test('o ecrã mostra a falha do BFF', async () => {
  server.use(http.get(`${origin}/api/episodes`, () => HttpResponse.json({}, { status: 500 })));
  render(await CatalogScreen({ searchParams: Promise.resolve({}) }));
  expect(screen.getByRole('alert').textContent).toBe('Não foi possível ler o catálogo.');
});
