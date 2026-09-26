export const INITIAL_COUNT = 15;
export const SCROLL_STEP = 5;

export function countUntil(index: number): number {
  if (index < INITIAL_COUNT) return INITIAL_COUNT;
  const extra = index - INITIAL_COUNT + 1;
  return INITIAL_COUNT + Math.ceil(extra / SCROLL_STEP) * SCROLL_STEP;
}

export function takeCount<T>(items: T[], count: number): T[] {
  return items.slice(0, count);
}
