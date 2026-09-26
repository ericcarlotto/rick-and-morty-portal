import { expect, test } from 'vitest';
import { parseCatalog } from './parse-catalog';

const episode = { id: 1, name: 'Pilot', code: 'S01E01' };

test('lê o catálogo', () => {
  expect(parseCatalog({ episodes: [episode] })).toEqual({ episodes: [episode] });
});

test('recusa valor que não é objeto', () => {
  expect(() => parseCatalog(null)).toThrow('Contrato inválido');
  expect(() => parseCatalog(['Pilot'])).toThrow('Contrato inválido');
});

test('recusa episódios que não são lista', () => {
  expect(() => parseCatalog({ episodes: 'Pilot' })).toThrow('Contrato inválido');
});

test('recusa episódio incompleto', () => {
  expect(() => parseCatalog({ episodes: [null] })).toThrow('Contrato inválido');
  expect(() => parseCatalog({ episodes: [{ id: 0, name: 'Pilot', code: 'S01E01' }] })).toThrow(
    'Contrato inválido',
  );
  expect(() => parseCatalog({ episodes: [{ id: 1.5, name: 'Pilot', code: 'S01E01' }] })).toThrow(
    'Contrato inválido',
  );
  expect(() => parseCatalog({ episodes: [{ id: '1', name: 'Pilot', code: 'S01E01' }] })).toThrow(
    'Contrato inválido',
  );
  expect(() => parseCatalog({ episodes: [{ id: 1, name: '  ', code: 'S01E01' }] })).toThrow(
    'Contrato inválido',
  );
  expect(() => parseCatalog({ episodes: [{ id: 1, name: 'Pilot', code: 1 }] })).toThrow(
    'Contrato inválido',
  );
});
