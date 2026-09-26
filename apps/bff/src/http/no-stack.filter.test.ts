import { ArgumentsHost, BadRequestException, HttpException } from '@nestjs/common';
import { expect, test } from 'vitest';
import { EpisodeNotFound } from '../use-cases/episode-not-found';
import { NoStackFilter } from './no-stack.filter';

test('erro interno não leva stack', () => {
  const sent = capture(new Error('segredo'));
  expect(sent).toEqual({ status: 500, body: { message: 'Erro interno' } });
});

test('traduz 404, 400, 429 e texto solto', () => {
  expect(capture(new EpisodeNotFound(3)).status).toBe(404);
  expect(capture(new BadRequestException('Id inválido')).body).toEqual({ message: 'Id inválido' });
  expect(capture(new HttpException('cru', 418)).body).toEqual({ message: 'cru' });
  expect(capture(new HttpException('Too Many Requests', 429)).body).toEqual({ message: 'Pedidos demais' });
  expect(capture(new BadRequestException(['a'])).body).toEqual({ message: 'Pedido inválido' });
  expect(capture(new NullBody(null)).body).toEqual({ message: 'Pedido inválido' });
  expect(capture(new NullBody(1)).body).toEqual({ message: 'Pedido inválido' });
});

class NullBody extends HttpException {
  constructor(private readonly payload: unknown) {
    super('x', 422);
  }

  override getResponse(): string | object {
    return this.payload as object;
  }
}

function capture(exception: unknown): { status?: number; body?: { message: string } } {
  const sent: { status?: number; body?: { message: string } } = {};
  const response = {
    status(code: number) {
      sent.status = code;
      return { json(body: { message: string }) { sent.body = body; } };
    },
  };
  const host = { switchToHttp: () => ({ getResponse: () => response }) } as ArgumentsHost;
  new NoStackFilter().catch(exception, host);
  return sent;
}
