import type { NextFunction, Request, Response } from 'express';
import { expect, test, vi } from 'vitest';
import { getOnly } from './get-only';

test('deixa passar GET e OPTIONS', () => {
  const next = vi.fn();
  getOnly(method('GET'), response(), next);
  getOnly(method('OPTIONS'), response(), next);
  expect(next).toHaveBeenCalledTimes(2);
});

test('recusa os outros métodos', () => {
  const json = vi.fn();
  const status = vi.fn(() => ({ json }));
  getOnly(method('POST'), { status } as unknown as Response, vi.fn() as NextFunction);
  expect(status).toHaveBeenCalledWith(405);
  expect(json).toHaveBeenCalledWith({ message: 'Só GET' });
});

function method(name: string): Request {
  return { method: name } as Request;
}

function response(): Response {
  return {} as Response;
}
