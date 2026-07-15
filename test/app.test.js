const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const app = require('../src/app');

let server;
let baseUrl;

test.before(() => new Promise((resolve) => {
  server = http.createServer(app);
  server.listen(0, '127.0.0.1', () => {
    const { port } = server.address();
    baseUrl = `http://127.0.0.1:${port}`;
    resolve();
  });
}));

test.after(() => new Promise((resolve) => server.close(resolve)));

test('health endpoint returns ok', async () => {
  const response = await fetch(`${baseUrl}/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});

test('creates a task', async () => {
  const response = await fetch(`${baseUrl}/api/tasks`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ title: 'Configure CI/CD' })
  });
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), {
    id: 1,
    title: 'Configure CI/CD',
    completed: false
  });
});
