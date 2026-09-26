import { isAllowedApiUrl } from '../domain/allowed-url';
import type { ClientOptions } from './client-options';

export async function fetchJson(options: ClientOptions, url: string): Promise<unknown> {
  if (!isAllowedApiUrl({ url, allowedHost: options.allowedHost })) {
    throw new Error('Host recusado');
  }
  const response = await options.fetch(url, { signal: AbortSignal.timeout(options.timeoutMs) });
  if (!response.ok) throw new Error('Falha na API externa');
  return response.json();
}
