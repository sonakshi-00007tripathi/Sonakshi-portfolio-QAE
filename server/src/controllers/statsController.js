import { Counter } from '../models/Counter.js';

const DELIVERIES = 'deliveries';

/** GET /api/stats: public counters shown on the site. */
export async function getStats(req, res, next) {
  try {
    const doc = await Counter.findOne({ key: DELIVERIES }).lean();
    res.json({ deliveries: doc?.value ?? 0 });
  } catch (err) {
    next(err);
  }
}

/** POST /api/stats/deliveries: a visitor clicked "Confirm delivery ✓". */
export async function confirmDelivery(req, res, next) {
  try {
    const doc = await Counter.findOneAndUpdate(
      { key: DELIVERIES },
      { $inc: { value: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();
    res.status(201).json({ deliveries: doc.value });
  } catch (err) {
    next(err);
  }
}
