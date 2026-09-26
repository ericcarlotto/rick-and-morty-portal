import { expect, test, vi } from 'vitest';
import type { ClientOptions } from './client-options';
import { collectCharacters, collectEpisodes } from './collect';
import { RickAndMortyClient } from './rick-and-morty-client';

const person = { id: 1, name: 'Rick', status: 'Alive', species: 'Human', origin: { name: 'Earth' } };

test('um id volta objeto e vários voltam lista, em lotes de 20', async () => {
  const urls: string[] = [];
  const options = optionsWith(async (url) => {
    urls.push(url);
    const many = url.endsWith('/1');
    return json(many ? person : [person, { ...person, id: 2, name: 'Morty' }]);
  });
  const client = new RickAndMortyClient(options);
  expect(await client.getCharacters([1])).toHaveLength(1);
  expect(await client.getCharacters(Array.from({ length: 21 }, (_item, index) => index + 1))).toHaveLength(4);
  expect(urls.some((url) => url.endsWith('/1'))).toBe(true);
  expect(urls.some((url) => url.includes('/21'))).toBe(true);
});

test('não pede personagem quando a lista é vazia', async () => {
  const fetchImpl = vi.fn();
  expect(await collectCharacters(optionsWith(fetchImpl), [])).toEqual([]);
  expect(fetchImpl).not.toHaveBeenCalled();
});

test('recusa host antes de pedir e para após 8 páginas', async () => {
  const fetchImpl = vi.fn(async () => json({ info: { next: 'https://evil.test/x' }, results: [] }));
  await expect(collectEpisodes({ ...optionsWith(fetchImpl), allowedHost: 'evil.test' })).rejects.toThrow('Host recusado');
  expect(fetchImpl).not.toHaveBeenCalled();
  const pages = vi.fn(async () => json({ info: { next: 'https://rickandmortyapi.com/api/episode?page=2' }, results: [] }));
  const episodes = await new RickAndMortyClient(optionsWith(pages)).listEpisodes();
  expect(episodes).toEqual([]);
  expect(pages).toHaveBeenCalledTimes(8);
});

test('falha da API externa e timeout não seguem', async () => {
  await expect(collectEpisodes(optionsWith(async () => json({}, 500)))).rejects.toThrow('Falha na API externa');
  const hanging: typeof fetch = (_url, init) =>
    new Promise((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () => reject(new Error('timeout')));
    });
  await expect(collectCharacters({ ...optionsWith(hanging), timeoutMs: 20 }, [1])).rejects.toThrow('timeout');
});

function optionsWith(fetchImpl: typeof fetch): ClientOptions {
  return {
    origin: 'https://rickandmortyapi.com',
    allowedHost: 'rickandmortyapi.com',
    fetch: fetchImpl,
    timeoutMs: 4_000,
  };
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status });
}
