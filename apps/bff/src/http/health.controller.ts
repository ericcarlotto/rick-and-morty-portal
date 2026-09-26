import { Controller, Get } from '@nestjs/common';
import type { Health } from '@rick/contract';

@Controller('api')
export class HealthController {
  @Get('health')
  health(): Health {
    return { status: 'ok' };
  }
}
