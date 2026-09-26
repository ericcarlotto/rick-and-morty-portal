import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import type { INestApplication } from '@nestjs/common';
import { json } from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { BODY_LIMIT, parserErrorWithoutStack } from './http/body-limit';
import { readCorsOrigin } from './http/cors-origin';
import { getOnly } from './http/get-only';
import { NoStackFilter } from './http/no-stack.filter';
import type { EpisodeSource } from './use-cases/episode-source';

export async function createApp(input: {
  env: NodeJS.ProcessEnv;
  source?: EpisodeSource;
}): Promise<INestApplication> {
  const origin = readCorsOrigin(input.env);
  const app = await NestFactory.create(AppModule.register(input), {
    logger: false,
    bodyParser: false,
  });
  wire(app, origin);
  await app.init();
  return app;
}

function allowOrigin(allowed: string) {
  return (requestOrigin: string | undefined, callback: (error: null, ok: string | false) => void) => {
    if (!requestOrigin || requestOrigin === allowed) {
      callback(null, allowed);
      return;
    }
    callback(null, false);
  };
}

function wire(app: INestApplication, origin: string): void {
  app.use(json({ limit: BODY_LIMIT }));
  app.use(parserErrorWithoutStack);
  app.use(helmet());
  app.enableCors({ origin: allowOrigin(origin), methods: ['GET', 'OPTIONS'] });
  app.use(getOnly);
  app.useGlobalFilters(new NoStackFilter());
}
