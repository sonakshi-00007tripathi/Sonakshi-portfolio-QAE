const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = { name: 80, email: 120, message: 2000 };

/**
 * Validates and normalises a contact note.
 * Returns { data } on success or { errors } (field → message) on failure.
 */
export function validateMessage(body = {}) {
  const clean = (v) => (typeof v === 'string' ? v.trim() : '');
  const data = {
    name: clean(body.name),
    email: clean(body.email).toLowerCase(),
    message: clean(body.message),
  };

  const errors = {};
  if (!data.name) errors.name = 'Name is required.';
  if (!EMAIL_RE.test(data.email)) errors.email = 'A valid email is required.';
  if (data.message.length < 5) errors.message = 'Message should be at least 5 characters.';

  for (const [field, max] of Object.entries(LIMITS)) {
    if (data[field].length > max) errors[field] = `Keep it under ${max} characters.`;
  }

  // Honeypot: real users never see or fill the "company" field.
  if (clean(body.company)) errors.spam = 'Rejected.';

  return Object.keys(errors).length ? { errors } : { data };
}
