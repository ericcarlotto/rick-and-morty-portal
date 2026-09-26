import { Module, type DynamicModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { clientOptionsFromEnv } from './client/client-options';
import { RickAndMortyClient } from './client/rick-and-morty-client';
import { CACHE_TTL_MS } from './domain/cache';
import { HealthController } from './http/health.controller';
import { EpisodesController } from './http/episodes.controller';
import { readThrottleLimit } from './http/throttle-limit';
import { CachedEpisodeSource } from './use-cases/cached-source';
import { EPISODE_SOURCE, type EpisodeSource } from './use-cases/episode-source';
import { MemoryCache } from './use-cases/memory-cache';

@Module({})
export class AppModule {
  static register(input: { env: NodeJS.ProcessEnv; source?: EpisodeSource }): DynamicModule {
    return {
      module: AppModule,
      imports: [throttle(input.env)],
      controllers: [HealthController, EpisodesController],
      providers: [sourceProvider(input), { provide: APP_GUARD, useClass: ThrottlerGuard }],
    };
  }
}

function throttle(env: NodeJS.ProcessEnv): DynamicModule {
  return ThrottlerModule.forRoot({
    throttlers: [{ ttl: 60_000, limit: readThrottleLimit(env) }],
  });
}

function sourceProvider(input: { env: NodeJS.ProcessEnv; source?: EpisodeSource }) {
  if (input.source) return { provide: EPISODE_SOURCE, useValue: input.source };
  return { provide: EPISODE_SOURCE, useFactory: () => liveSource(input.env) };
}

function liveSource(env: NodeJS.ProcessEnv): EpisodeSource {
  const client = new RickAndMortyClient(clientOptionsFromEnv(env));
  const cache = new MemoryCache({ ttlMs: CACHE_TTL_MS, now: Date.now });
  return new CachedEpisodeSource(client, cache);
}
