export const DEFAULT_CORS_ORIGIN = 'http://localhost:3000';

export function readCorsOrigin(env: NodeJS.ProcessEnv): string {
  const origin = (env.CORS_ORIGIN ?? DEFAULT_CORS_ORIGIN).trim();
  if (origin === '*' || origin === '') throw new Error('CORS_ORIGIN inválido');
  return origin;
}
