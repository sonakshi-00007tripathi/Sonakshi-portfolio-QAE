import mongoose from 'mongoose';

/** Generic named counter, e.g. { key: 'deliveries', value: 42 }. */
const counterSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export const Counter = mongoose.model('Counter', counterSchema);
