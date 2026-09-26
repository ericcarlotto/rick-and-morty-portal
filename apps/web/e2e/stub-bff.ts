import { createServer, type ServerResponse } from 'node:http';
import { stubBody } from './stub-routes';

const port = Number(process.env.STUB_PORT ?? 4011);

createServer((request, response) => {
  writeJson(response, stubBody(request));
}).listen(port);

function writeJson(response: ServerResponse, body: unknown): void {
  const status = body === undefined ? 404 : 200;
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body ?? { message: 'não encontrado' }));
}
