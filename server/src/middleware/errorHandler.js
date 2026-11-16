import { env } from '../config/env.js';

export function notFound(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON body.' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Request body too large.' });
  }
  const status = err.status || 500;
  if (status >= 500) console.error(err);
  res.status(status).json({
    error: status >= 500 ? 'Something went wrong on our side.' : err.message,
    ...(env.nodeEnv !== 'production' && status >= 500 ? { detail: err.message } : {}),
  });
}
