import { isDbReady } from '../config/db.js';

/** Short-circuits DB-backed routes with 503 when MongoDB isn't connected. */
export function requireDb(req, res, next) {
  if (!isDbReady()) {
    return res.status(503).json({ error: 'Database unavailable. Please try again later.' });
  }
  next();
}
