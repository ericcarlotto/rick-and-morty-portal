import type { NextFunction, Request, Response } from 'express';

export function getOnly(...parts: unknown[]): void {
  const request = parts[0] as Request;
  const response = parts[1] as Response;
  const next = parts[2] as NextFunction;
  if (request.method === 'GET' || request.method === 'OPTIONS') {
    next();
    return;
  }
  response.status(405).json({ message: 'Só GET' });
}
