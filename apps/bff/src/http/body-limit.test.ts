import { expect, test, vi } from 'vitest';
import { BODY_LIMIT, parserErrorWithoutStack } from './body-limit';

test('limite de corpo é 2mb', () => {
  expect(BODY_LIMIT).toBe('2mb');
});

test('corpo grande responde sem stack', () => {
  const json = vi.fn();
  const status = vi.fn(() => ({ json }));
  parserErrorWithoutStack({ type: 'entity.too.large' }, {}, { status }, vi.fn());
  parserErrorWithoutStack({ status: 413 }, {}, { status }, vi.fn());
  expect(json).toHaveBeenCalledWith({ message: 'Corpo grande demais' });
});

test('outro erro do parser segue', () => {
  const next = vi.fn();
  parserErrorWithoutStack({ type: 'entity.parse.failed' }, {}, { status: vi.fn() }, next);
  expect(next).toHaveBeenCalledOnce();
});
