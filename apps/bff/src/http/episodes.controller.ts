import { BadRequestException, Controller, Get, Inject, Param, Query } from '@nestjs/common';
import type { Cast, EpisodeCatalog } from '@rick/contract';
import { positiveEpisodeId } from '../domain/positive-id';
import { buildCast } from '../use-cases/build-cast';
import { buildCatalog } from '../use-cases/build-catalog';
import { EPISODE_SOURCE, type EpisodeSource } from '../use-cases/episode-source';
import { textQuery } from '../use-cases/text-query';

@Controller('api/episodes')
export class EpisodesController {
  constructor(@Inject(EPISODE_SOURCE) private readonly source: EpisodeSource) {}

  @Get()
  catalog(@Query() query: Record<string, unknown>): Promise<EpisodeCatalog> {
    return buildCatalog({
      source: this.source,
      name: textQuery(query.name),
      code: textQuery(query.code),
      season: textQuery(query.season),
    });
  }

  @Get(':id/cast')
  cast(@Param('id') raw: string): Promise<Cast> {
    const episodeId = positiveEpisodeId(raw);
    if (episodeId === null) throw new BadRequestException('Id inválido');
    return buildCast({ source: this.source, episodeId });
  }
}
