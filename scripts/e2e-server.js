import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';

const rootDir = process.cwd();
const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 4173);

const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.webmanifest', 'application/manifest+json; charset=utf-8'],
]);

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url || '/', `http://${request.headers.host || host}`);
    const requestPath = decodeURIComponent(requestUrl.pathname);
    const relativePath = requestPath === '/' ? 'index.html' : requestPath.slice(1);
    const filePath = path.resolve(rootDir, relativePath);

    if (!isInsideRoot(filePath)) {
      sendText(response, 403, 'Forbidden');
      return;
    }

    const fileStats = await stat(filePath);
    if (!fileStats.isFile()) {
      sendText(response, 404, 'Not found');
      return;
    }

    response.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Type': mimeTypes.get(path.extname(filePath)) || 'application/octet-stream',
    });
    createReadStream(filePath).pipe(response);
  } catch (error) {
    if (error?.code === 'ENOENT') {
      sendText(response, 404, 'Not found');
      return;
    }

    console.error(error);
    sendText(response, 500, 'Internal server error');
  }
});

server.listen(port, host, () => {
  console.log(`E2E static server listening on http://${host}:${port}`);
});

function isInsideRoot(filePath) {
  const relativePath = path.relative(rootDir, filePath);
  return Boolean(relativePath) && !relativePath.startsWith('..') && !path.isAbsolute(relativePath);
}

function sendText(response, statusCode, message) {
  response.writeHead(statusCode, {
    'Content-Type': 'text/plain; charset=utf-8',
  });
  response.end(message);
}
