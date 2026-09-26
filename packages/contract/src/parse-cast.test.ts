import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from 'vitest';
import { parseCast } from './parse-cast';

const fixturePath = join(dirname(fileURLToPath(import.meta.url)), '../fixture/cast.json');

test('o fixture do elenco cabe no contrato', () => {
  const fixture = JSON.parse(readFileSync(fixturePath, 'utf8')) as unknown;
  expect(parseCast(fixture)).toEqual(fixture);
});

test('rejeita elenco sem episódio', () => {
  expect(() => parseCast({ episode: null })).toThrow('Contrato inválido');
});
