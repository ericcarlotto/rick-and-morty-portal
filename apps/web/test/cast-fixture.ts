import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Cast } from '@rick/contract';

export function castFixture(): Cast {
  const path = join(process.cwd(), 'packages/contract/fixture/cast.json');
  return JSON.parse(readFileSync(path, 'utf8')) as Cast;
}
