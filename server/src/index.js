import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import { createApp } from './app.js';

async function start() {
  await connectDB(); // the API still boots without a DB; DB routes answer 503
  const app = createApp();

  const server = app.listen(env.port, '0.0.0.0', () => {
    console.log(`🚚 API ready on http://localhost:${env.port} (${env.nodeEnv})`);
    console.log(`   CORS origins: ${env.clientOrigins.join(', ') || '(none)'}`);
  });

  const shutdown = (signal) => {
    console.log(`\n${signal} received, shutting down…`);
    server.close(() => process.exit(0));
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

start();
