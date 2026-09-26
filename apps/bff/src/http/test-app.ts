import type { INestApplication } from '@nestjs/common';
import { createApp } from '../create-app';
import type { EpisodeSource } from '../use-cases/episode-source';

export function testEnv(extra: NodeJS.ProcessEnv = {}): NodeJS.ProcessEnv {
  return { CORS_ORIGIN: 'http://localhost:3000', THROTTLE_LIMIT: '30', ...extra };
}

export async function withApp(
  input: { source?: EpisodeSource; env?: NodeJS.ProcessEnv },
  run: (app: INestApplication) => Promise<void>,
): Promise<void> {
  const app = await createApp({ env: testEnv(input.env), source: input.source });
  try {
    await run(app);
  } finally {
    await app.close();
  }
}
