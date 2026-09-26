import { expect, test } from 'vitest';
import nextConfig from './next.config';

test('a web compila o contrato partilhado', () => {
  expect(nextConfig.transpilePackages).toEqual(['@rick/contract']);
});
