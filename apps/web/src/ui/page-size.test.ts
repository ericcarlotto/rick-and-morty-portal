import { expect, test } from 'vitest';
import { countUntil, takeCount } from './page-size';

test('abre em quinze e cresce de cinco em cinco', () => {
  expect(countUntil(0)).toBe(15);
  expect(countUntil(14)).toBe(15);
  expect(countUntil(15)).toBe(20);
  expect(countUntil(20)).toBe(25);
  expect(takeCount([1, 2, 3], 2)).toEqual([1, 2]);
});
