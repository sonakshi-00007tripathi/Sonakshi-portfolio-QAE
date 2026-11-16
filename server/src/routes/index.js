import { Router } from 'express';
import { isDbReady } from '../config/db.js';
import statsRoutes from './statsRoutes.js';
import messageRoutes from './messageRoutes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', db: isDbReady() ? 'connected' : 'disconnected', uptime: Math.round(process.uptime()) });
});

router.use('/stats', statsRoutes);
router.use('/messages', messageRoutes);

export default router;
