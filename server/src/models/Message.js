import mongoose from 'mongoose';

/** A note a visitor (hopefully a recruiter 👀) leaves on the package. */
const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
  },
  { timestamps: true }
);

export const Message = mongoose.model('Message', messageSchema);
