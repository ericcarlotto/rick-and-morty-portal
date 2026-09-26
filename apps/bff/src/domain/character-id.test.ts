import { expect, test } from 'vitest';
import { characterIdFromUrl, characterIds } from './character-id';

test('lê o id positivo no fim do caminho', () => {
  expect(characterIdFromUrl('https://rickandmortyapi.com/api/character/2')).toBe(2);
});

test('ignora url inválida, caminho errado e id zero', () => {
  expect(characterIdFromUrl('não é url')).toBeNull();
  expect(characterIdFromUrl('https://rickandmortyapi.com/api/episode/1')).toBeNull();
  expect(characterIdFromUrl('https://rickandmortyapi.com/api/character/0')).toBeNull();
});

test('fica só com os ids válidos', () => {
  expect(characterIds(['https://rickandmortyapi.com/api/character/4', 'não'])).toEqual([4]);
});
