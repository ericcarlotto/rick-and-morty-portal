export function listenPort(env: NodeJS.ProcessEnv): number {
  if (!env.PORT) return 3001;
  return Number(env.PORT);
}
