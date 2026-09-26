import { bffOrigin } from './origin';

export const REVALIDATE_SECONDS = 60;

type CachedRequest = RequestInit & { next?: { revalidate: number } };

export async function getJson(input: { path: string; origin?: string }): Promise<unknown> {
  const response = await fetch(bffUrl(input), cached());
  if (!response.ok) throw new Error('O BFF não respondeu');
  return response.json() as Promise<unknown>;
}

function bffUrl(input: { path: string; origin?: string }): string {
  const origin = input.origin ?? bffOrigin();
  return `${origin}${input.path}`;
}

function cached(): CachedRequest {
  return { next: { revalidate: REVALIDATE_SECONDS } };
}
