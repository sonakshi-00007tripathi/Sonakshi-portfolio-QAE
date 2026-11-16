import mongoose from 'mongoose';
import { env } from './env.js';

// Fail fast instead of silently queueing queries when the DB is down.
mongoose.set('bufferCommands', false);
mongoose.set('strictQuery', true);

export async function connectDB() {
  if (!env.mongoUri) {
    console.warn('⚠️  MONGODB_URI is not set. API is running without a database (DB routes return 503).');
    return false;
  }
  try {
    await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 8000 });
    console.log('✅ MongoDB connected');
    return true;
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    return false;
  }
}

export const isDbReady = () => mongoose.connection.readyState === 1;
