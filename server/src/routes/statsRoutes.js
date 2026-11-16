import { Router } from 'express';
import { getStats, confirmDelivery } from '../controllers/statsController.js';
import { requireDb } from '../middleware/requireDb.js';
import { readLimiter, writeLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.get('/', readLimiter, requireDb, getStats);
router.post('/deliveries', writeLimiter, requireDb, confirmDelivery);

export default router;
