import { Message } from '../models/Message.js';
import { validateMessage } from '../utils/validateMessage.js';

/** POST /api/messages: store a note left on the package. */
export async function createMessage(req, res, next) {
  try {
    const { data, errors } = validateMessage(req.body);
    if (errors) return res.status(400).json({ error: 'Validation failed.', fields: errors });

    const saved = await Message.create(data);
    res.status(201).json({ ok: true, id: saved._id });
  } catch (err) {
    next(err);
  }
}

/** GET /api/messages: admin only, newest first. */
export async function listMessages(req, res, next) {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 200);
    const messages = await Message.find().sort({ createdAt: -1 }).limit(limit).lean();
    res.json({ count: messages.length, messages });
  } catch (err) {
    next(err);
  }
}
