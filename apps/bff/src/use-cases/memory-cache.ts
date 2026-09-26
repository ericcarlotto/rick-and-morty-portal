import { freshValue } from '../domain/cache';

type Clock = { ttlMs: number; now: () => number };

export class MemoryCache {
  private readonly slots = new Map<string, { value: unknown; storedAt: number }>();

  constructor(private readonly clock: Clock) {}

  read<T>(key: string): T | undefined {
    const entry = this.slots.get(key) as { value: T; storedAt: number } | undefined;
    return freshValue({ entry, now: this.clock.now(), ttlMs: this.clock.ttlMs });
  }

  write<T>(key: string, value: T): void {
    this.slots.set(key, { value, storedAt: this.clock.now() });
  }
}
