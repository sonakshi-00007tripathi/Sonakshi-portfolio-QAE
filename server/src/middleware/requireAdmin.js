import crypto from 'node:crypto';
import { env } from '../config/env.js';

const safeEqual = (a, b) => {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
};

/** Protects admin-only routes with the `x-admin-token` header. */
export function requireAdmin(req, res, next) {
  if (!env.adminToken) {
    return res.status(503).json({ error: 'Admin access is not configured.' });
  }
  const token = req.get('x-admin-token') || '';
  if (!safeEqual(token, env.adminToken)) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }
  next();
}
