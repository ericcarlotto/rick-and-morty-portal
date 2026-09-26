import { expect, test } from 'vitest';
import { mapCharacterList, mapEpisodePage } from './map-remote';

const episode = { id: 1, name: 'Pilot', episode: 'S01E01', characters: ['https://example.test/a'] };
const person = { id: 2, name: 'Morty', status: 'Alive', species: 'Human', origin: { name: 'Earth' } };

test('lê uma página e um personagem objeto', () => {
  expect(mapEpisodePage({ info: { next: null }, results: [episode] }).episodes[0]?.code).toBe('S01E01');
  expect(mapCharacterList(person)).toEqual([
    { id: 2, name: 'Morty', status: 'Alive', species: 'Human', origin: 'Earth' },
  ]);
});

test('lê lista de personagens e a página seguinte', () => {
  const page = mapEpisodePage({ info: { next: 'https://example.test/p2' }, results: [episode] });
  expect(page.next).toBe('https://example.test/p2');
  expect(mapCharacterList([person, { ...person, id: 3, name: 'Rick' }])).toHaveLength(2);
});

test('rejeita nome vazio ou que não é texto', () => {
  const base = { id: 1, status: 'Alive', species: 'Human', origin: { name: 'Earth' } };
  expect(() => mapCharacterList({ ...base, name: 1 })).toThrow('Resposta inválida');
  expect(() => mapCharacterList({ ...base, name: ' ' })).toThrow('Resposta inválida');
});

test('rejeita lista de urls que não são texto', () => {
  const page = { info: { next: null }, results: [{ id: 1, name: 'Pilot', episode: 'S01E01', characters: [1] }] };
  expect(() => mapEpisodePage(page)).toThrow('Resposta inválida');
});

test('rejeita corpo que não é página nem personagem', () => {
  expect(() => mapEpisodePage(null)).toThrow('Resposta inválida');
  expect(() => mapEpisodePage({ info: {}, results: 'x' })).toThrow('Resposta inválida');
  expect(() => mapCharacterList({ id: 0, name: '', status: 'Alive', species: 'Human', origin: { name: 'Earth' } })).toThrow(
    'Resposta inválida',
  );
});
