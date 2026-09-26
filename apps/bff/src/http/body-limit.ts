export const BODY_LIMIT = '2mb';

type ParserError = { type?: string; status?: number };

type JsonResponse = {
  status: (code: number) => { json: (body: { message: string }) => void };
};

export function parserErrorWithoutStack(...parts: unknown[]): void {
  const error = parts[0] as ParserError;
  const response = parts[2] as JsonResponse;
  const next = parts[3] as (error?: unknown) => void;
  if (error?.type === 'entity.too.large' || error?.status === 413) {
    response.status(413).json({ message: 'Corpo grande demais' });
    return;
  }
  next(error);
}

Object.defineProperty(parserErrorWithoutStack, 'length', { value: 4 });
