import request from 'supertest';
import { expect, test } from 'vitest';
import { withApp } from './test-app';

test('só GET', async () => {
  await withApp({}, async (app) => {
    const posted = await request(app.getHttpServer()).post('/api/health').send({ ok: true });
    const options = await request(app.getHttpServer()).options('/api/health');
    expect(posted.status).toBe(405);
    expect(posted.body).toEqual({ message: 'Só GET' });
    expect(options.status).not.toBe(405);
  });
});

test('corpo acima de 2mb', async () => {
  await withApp({}, async (app) => {
    const response = await request(app.getHttpServer())
      .post('/api/health')
      .set('Content-Type', 'application/json')
      .send(Buffer.alloc(2_097_153, 0x78));
    expect(response.status).toBe(413);
    expect(response.body).toEqual({ message: 'Corpo grande demais' });
  });
});

test('limite de pedidos', async () => {
  await withApp({ env: { THROTTLE_LIMIT: '2' } }, async (app) => {
    const server = app.getHttpServer();
    await request(server).get('/api/health');
    await request(server).get('/api/health');
    const blocked = await request(server).get('/api/health');
    expect(blocked.status).toBe(429);
    expect(blocked.body).toEqual({ message: 'Pedidos demais' });
  });
});
