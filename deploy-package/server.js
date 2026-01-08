const { createServer } = require('http');
const { parse } = require('url');
const path = require('path');

const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

console.log('Starting Next.js server in standalone mode...');
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', port);

// Standalone mode check
const standaloneServer = path.join(__dirname, '.next', 'standalone', 'server.js');
const fs = require('fs');

if (fs.existsSync(standaloneServer)) {
  console.log('Using standalone server');
  process.env.HOSTNAME = hostname;
  process.env.PORT = port.toString();
  require(standaloneServer);
} else {
  console.log('Using custom server');
  const next = require('next');
  const dev = process.env.NODE_ENV !== 'production';
  const app = next({ dev });
  const handle = app.getRequestHandler();

  app.prepare()
    .then(() => {
      createServer(async (req, res) => {
        try {
          const parsedUrl = parse(req.url, true);
          await handle(req, res, parsedUrl);
        } catch (err) {
          console.error('Error:', err);
          res.statusCode = 500;
          res.end('Internal server error');
        }
      })
      .listen(port, hostname, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
      });
    })
    .catch((err) => {
      console.error('Failed to start:', err);
      process.exit(1);
    });
}