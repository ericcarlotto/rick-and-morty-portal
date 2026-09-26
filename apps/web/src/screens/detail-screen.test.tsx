import { cleanup, render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest';
import { castFixture } from '../../test/cast-fixture';
import { DetailScreen } from './detail-screen';

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

test('mostra a personagem do elenco', async () => {
  server.use(http.get(`${origin}/api/episodes/1/cast`, () => HttpResponse.json(fixture)));
  render(await DetailScreen({ params: Promise.resolve({ id: '1', characterId: '2' }) }));
  expect(screen.getByRole('heading', { name: 'Morty Smith' })).toBeTruthy();
  expect(screen.getByText('Estado: Vivo')).toBeTruthy();
});

test('avisa quando a personagem não está no elenco', async () => {
  server.use(http.get(`${origin}/api/episodes/1/cast`, () => HttpResponse.json(fixture)));
  render(await DetailScreen({ params: Promise.resolve({ id: '1', characterId: '9' }) }));
  expect(screen.getByText(/Personagem não encontrada/)).toBeTruthy();
});

test('recusa ids inválidos e falha do BFF', async () => {
  render(await DetailScreen({ params: Promise.resolve({ id: '0', characterId: '2' }) }));
  expect(screen.getByText('Episódio inválido.')).toBeTruthy();
  cleanup();
  render(await DetailScreen({ params: Promise.resolve({ id: '1', characterId: 'x' }) }));
  expect(screen.getByText('Personagem inválida.')).toBeTruthy();
  cleanup();
  server.use(http.get(`${origin}/api/episodes/1/cast`, () => HttpResponse.json({}, { status: 500 })));
  render(await DetailScreen({ params: Promise.resolve({ id: '1', characterId: '2' }) }));
  expect(screen.getByRole('alert')).toBeTruthy();
});
