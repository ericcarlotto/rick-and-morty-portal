import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest';
import { castFixture } from '../../test/cast-fixture';
import { CastScreen } from './cast-screen';

const origin = 'http://127.0.0.1:4011';
const fixture = castFixture();
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

test('o ecrã lê o elenco do episódio', async () => {
  server.use(http.get(`${origin}/api/episodes/1/cast`, () => HttpResponse.json(fixture)));
  render(await CastScreen({ params: Promise.resolve({ id: '1' }) }));
  expect(screen.getByRole('heading', { name: 'Pilot' })).toBeTruthy();
  expect(screen.getByText('Morty Smith')).toBeTruthy();
});

test('id inválido não pede o elenco', async () => {
  render(await CastScreen({ params: Promise.resolve({ id: '0' }) }));
  expect(screen.getByText(/Episódio inválido/)).toBeTruthy();
});

test('mostra erro quando o elenco falha', async () => {
  server.use(http.get(`${origin}/api/episodes/4/cast`, () => HttpResponse.json({}, { status: 500 })));
  render(await CastScreen({ params: Promise.resolve({ id: '4' }) }));
  expect(screen.getByRole('alert')).toBeTruthy();
});
