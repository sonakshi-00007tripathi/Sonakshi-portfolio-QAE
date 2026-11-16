import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env.js';
import apiRoutes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  // Railway / Vercel sit behind a proxy: trust it so rate limiting sees real client IPs.
  app.set('trust proxy', 1);
  app.disable('x-powered-by');

  app.use(helmet());
  app.use(
    cors({
      origin(origin, cb) {
        // Allow same-origin / curl (no Origin header) and the configured frontends only.
        if (!origin || env.clientOrigins.includes(origin)) return cb(null, true);
        return cb(null, false);
      },
      methods: ['GET', 'POST'],
    })
  );
  app.use(express.json({ limit: '10kb' }));

  app.get('/', (req, res) => res.json({ name: 'sonakshi-portfolio-api', status: 'ok', docs: '/api/health' }));
  app.use('/api', apiRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
