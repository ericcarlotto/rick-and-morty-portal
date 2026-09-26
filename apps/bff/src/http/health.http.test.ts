import request from 'supertest';
import { expect, test } from 'vitest';
import { withApp } from './test-app';

test('health responde ok e helmet', async () => {
  await withApp({}, async (app) => {
    const response = await request(app.getHttpServer()).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
    expect(response.headers['x-content-type-options']).toBe('nosniff');
  });
});

test('cors reflete só a origem permitida', async () => {
  await withApp({}, async (app) => {
    const allowed = await request(app.getHttpServer()).get('/api/health').set('Origin', 'http://localhost:3000');
    const blocked = await request(app.getHttpServer()).get('/api/health').set('Origin', 'https://evil.test');
    expect(allowed.headers['access-control-allow-origin']).toBe('http://localhost:3000');
    expect(blocked.headers['access-control-allow-origin']).toBeUndefined();
  });
});

test('recusa cors com asterisco', async () => {
  await expect(withApp({ env: { CORS_ORIGIN: '*' } }, async () => undefined)).rejects.toThrow('CORS_ORIGIN inválido');
});
