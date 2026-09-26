import { expect, test } from 'vitest';
import { DEFAULT_THROTTLE_LIMIT, readThrottleLimit } from './throttle-limit';

test('limite por omissão, válido e inválido', () => {
  expect(readThrottleLimit({})).toBe(DEFAULT_THROTTLE_LIMIT);
  expect(readThrottleLimit({ THROTTLE_LIMIT: '12' })).toBe(12);
  expect(readThrottleLimit({ THROTTLE_LIMIT: '0' })).toBe(DEFAULT_THROTTLE_LIMIT);
  expect(readThrottleLimit({ THROTTLE_LIMIT: 'x' })).toBe(DEFAULT_THROTTLE_LIMIT);
});
