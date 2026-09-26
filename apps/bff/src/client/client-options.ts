export const REQUEST_TIMEOUT_MS = 4_000;
export const DEFAULT_ORIGIN = 'https://rickandmortyapi.com';

export type ClientOptions = {
  origin: string;
  allowedHost: string;
  fetch: typeof fetch;
  timeoutMs: number;
};

export function clientOptionsFromEnv(env: NodeJS.ProcessEnv, fetchImpl?: typeof fetch): ClientOptions {
  const origin = env.RICK_AND_MORTY_API_ORIGIN ?? DEFAULT_ORIGIN;
  const allowedHost = new URL(origin).hostname;
  return {
    origin,
    allowedHost,
    fetch: fetchImpl ?? globalThis.fetch,
    timeoutMs: REQUEST_TIMEOUT_MS,
  };
}
