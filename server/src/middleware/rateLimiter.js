import rateLimit from 'express-rate-limit';

const base = {
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again in a few minutes.' },
};

/** Generous limit for read endpoints. */
export const readLimiter = rateLimit({ ...base, windowMs: 60 * 1000, limit: 60 });

/** Tight limit for anything that writes to the database. */
export const writeLimiter = rateLimit({ ...base, windowMs: 15 * 60 * 1000, limit: 10 });
