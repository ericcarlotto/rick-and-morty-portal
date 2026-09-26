import { expect, test } from 'vitest';
import { catalogPath, catalogQuery } from './query';

test('chave ausente fica sem filtro', () => {
  expect(catalogQuery({})).toEqual({ name: undefined, code: undefined });
});

test('aceita nome e código, e ignora vazio', () => {
  expect(catalogQuery({ name: ' Pilot ', code: '' })).toEqual({ name: 'Pilot', code: undefined });
});

test('usa o primeiro valor quando a query repete a chave', () => {
  expect(catalogQuery({ name: ['Rick', 'Morty'], code: ['S01'] })).toEqual({
    name: 'Rick',
    code: 'S01',
  });
});

test('omite a query quando não há filtro', () => {
  expect(catalogPath({})).toBe('/api/episodes');
});

test('envia nome e código ao BFF', () => {
  expect(catalogPath({ name: 'Pilot', code: 'S01E01' })).toBe('/api/episodes?name=Pilot&code=S01E01');
});

test('envia só o código', () => {
  expect(catalogPath({ code: 'S01' })).toBe('/api/episodes?code=S01');
});
