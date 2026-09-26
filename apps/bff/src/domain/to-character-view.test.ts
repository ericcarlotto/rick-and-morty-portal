import { expect, test } from 'vitest';
import { toCharacterView } from './to-character-view';

test('traduz o estado e marca a letra', () => {
  expect(toCharacterView({ id: 1, name: 'rick', status: 'Dead', species: 'Human', origin: 'Earth' })).toEqual({
    id: 1,
    name: 'rick',
    species: 'Human',
    status: 'Morto',
    origin: 'Earth',
    letter: 'R',
  });
});

test('estado desconhecido quando a API manda outro texto', () => {
  const view = toCharacterView({ id: 2, name: 'A', status: 'Alive', species: 'Alien', origin: 'X' });
  const other = toCharacterView({ id: 3, name: 'B', status: 'weird', species: 'Alien', origin: 'X' });
  expect(view.status).toBe('Vivo');
  expect(other.status).toBe('Desconhecido');
});
