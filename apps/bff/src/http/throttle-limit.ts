export const DEFAULT_THROTTLE_LIMIT = 30;

export function readThrottleLimit(env: NodeJS.ProcessEnv): number {
  const raw = env.THROTTLE_LIMIT;
  if (!raw) return DEFAULT_THROTTLE_LIMIT;
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed < 1) return DEFAULT_THROTTLE_LIMIT;
  return parsed;
}
