import { Router } from 'express';
import { createMessage, listMessages } from '../controllers/messageController.js';
import { requireDb } from '../middleware/requireDb.js';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { readLimiter, writeLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', writeLimiter, requireDb, createMessage);
router.get('/', readLimiter, requireAdmin, requireDb, listMessages);

export default router;
