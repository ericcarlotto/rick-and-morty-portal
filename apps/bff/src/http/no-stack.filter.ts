import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import type { Response } from 'express';
import { EpisodeNotFound } from '../use-cases/episode-not-found';

@Catch()
export class NoStackFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const status = statusOf(exception);
    response.status(status).json({ message: publicMessage(exception, status) });
  }
}

function statusOf(exception: unknown): number {
  if (exception instanceof EpisodeNotFound) return 404;
  if (exception instanceof HttpException) return exception.getStatus();
  return 500;
}

function publicMessage(exception: unknown, status: number): string {
  const fixed = fixedStatusMessage(status);
  if (fixed) return fixed;
  return detailMessage(exception);
}

function detailMessage(exception: unknown): string {
  if (exception instanceof EpisodeNotFound) return exception.message;
  return textFrom(exception as HttpException);
}

function fixedStatusMessage(status: number): string | undefined {
  if (status === 500) return 'Erro interno';
  if (status === 429) return 'Pedidos demais';
  return undefined;
}

function textFrom(exception: HttpException): string {
  const body = exception.getResponse();
  if (typeof body === 'string') return body;
  return readMessage(body) ?? 'Pedido inválido';
}

function readMessage(body: unknown): string | undefined {
  if (typeof body !== 'object' || body === null) return undefined;
  const message = (body as { message?: unknown }).message;
  return typeof message === 'string' ? message : undefined;
}
