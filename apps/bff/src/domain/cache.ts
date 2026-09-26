export const CACHE_TTL_MS = 60_000;

export function freshValue<T>(input: {
  entry: { value: T; storedAt: number } | undefined;
  now: number;
  ttlMs: number;
}): T | undefined {
  if (!input.entry) return undefined;
  if (input.now - input.entry.storedAt >= input.ttlMs) return undefined;
  return input.entry.value;
}
