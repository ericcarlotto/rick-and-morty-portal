const DEFAULT_ORIGIN = 'http://127.0.0.1:3001';

type OriginEnv = { BFF_ORIGIN?: string };

export function bffOrigin(env?: OriginEnv): string {
  const value = readOrigin(env ?? fromProcess());
  return value ? value.replace(/\/+$/, '') : DEFAULT_ORIGIN;
}

function fromProcess(): OriginEnv {
  return { BFF_ORIGIN: process.env.BFF_ORIGIN };
}

function readOrigin(env: OriginEnv): string {
  const raw = env.BFF_ORIGIN;
  return typeof raw === 'string' ? raw.trim() : '';
}
