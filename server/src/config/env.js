import 'dotenv/config';

const toList = (value) =>
  (value || '')
    .split(',')
    .map((s) => s.trim().replace(/\/$/, ''))
    .filter(Boolean);

/** Single source of truth for configuration. Read once, validated here. */
export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || '',
  clientOrigins: toList(process.env.CLIENT_ORIGIN || 'http://localhost:5173'),
  adminToken: process.env.ADMIN_TOKEN || '',
});
