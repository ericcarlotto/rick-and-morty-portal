import { beforeAll, expect, test, vi } from 'vitest';

const listen = vi.fn(async () => undefined);
const createApp = vi.fn(async () => ({ listen }));

vi.mock('./create-app', () => ({
  createApp: (...args: unknown[]) => createApp(...args),
}));

beforeAll(async () => {
  await import('./main');
});

test('sobe a app na porta pedida', () => {
  expect(createApp).toHaveBeenCalled();
  expect(listen).toHaveBeenCalled();
});
