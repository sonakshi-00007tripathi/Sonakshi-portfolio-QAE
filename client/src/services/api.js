/**
 * Thin client for the Express API.
 * In dev, VITE_API_URL is empty and Vite proxies /api → localhost:5000.
 * In production, set VITE_API_URL to the Railway URL.
 * Every caller must handle failure: the site works fully without the API.
 */
const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const TIMEOUT_MS = 8000;

async function request(path, { method = 'GET', body } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${BASE}/api${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data.error || `Request failed (${res.status})`);
      err.status = res.status;
      err.fields = data.fields;
      throw err;
    }
    return data;
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  getStats: () => request('/stats'),
  confirmDelivery: () => request('/stats/deliveries', { method: 'POST' }),
  sendMessage: (payload) => request('/messages', { method: 'POST', body: payload }),
};
