import { useState } from 'react';
import { api } from '../../services/api';
import { profile } from '../../data/content';

const EMPTY = { name: '', email: '', message: '', company: '' };

/** "Leave a note on the package": saved to MongoDB, falls back to email if the API is down. */
export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [state, setState] = useState({ status: 'idle', error: '', fields: {} });

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(`Hi Sonakshi, from ${form.name || 'a visitor'}`)}&body=${encodeURIComponent(form.message)}`;

  const submit = async (e) => {
    e.preventDefault();
    setState({ status: 'sending', error: '', fields: {} });
    try {
      await api.sendMessage(form);
      setState({ status: 'sent', error: '', fields: {} });
      setForm(EMPTY);
    } catch (err) {
      if (err.status === 400 && err.fields) {
        setState({ status: 'idle', error: 'Please fix the highlighted fields.', fields: err.fields });
      } else {
        setState({ status: 'error', error: '', fields: {}, reason: err.status === 503 ? 'db' : err.status === 429 ? 'rate' : 'network' });
      }
    }
  };

  if (state.status === 'sent') {
    return (
      <div className="note-form sent" role="status">
        <p className="hand">Note received. I'll get back to you soon! 📬</p>
      </div>
    );
  }

  return (
    <form className="note-form" onSubmit={submit} noValidate>
      <p className="note-title">✍️ Leave a note on the package</p>
      <div className="note-grid">
        <label>
          <span>Name</span>
          <input name="name" value={form.name} onChange={update} maxLength={80} required autoComplete="name" aria-invalid={!!state.fields.name} />
          {state.fields.name && <small className="err">{state.fields.name}</small>}
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" value={form.email} onChange={update} maxLength={120} required autoComplete="email" aria-invalid={!!state.fields.email} />
          {state.fields.email && <small className="err">{state.fields.email}</small>}
        </label>
        <label className="full">
          <span>Message</span>
          <textarea name="message" rows={4} value={form.message} onChange={update} maxLength={2000} required aria-invalid={!!state.fields.message} />
          {state.fields.message && <small className="err">{state.fields.message}</small>}
        </label>
        {/* honeypot: hidden from humans, bots fill it */}
        <input className="hp" name="company" value={form.company} onChange={update} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      </div>
      <div className="note-actions">
        <button className="btn" type="submit" disabled={state.status === 'sending'}>
          {state.status === 'sending' ? 'Sending…' : 'Send note →'}
        </button>
        {state.error && <span className="err">{state.error}</span>}
        {state.status === 'error' && (
          <span className="err">
            {state.reason === 'db' && 'Notes are taking a short break right now. '}
            {state.reason === 'rate' && "You've sent a few notes already. Thank you! "}
            {state.reason === 'network' && "Couldn't reach the server. "}
            <a href={mailtoHref}>Email me instead →</a>
          </span>
        )}
      </div>
    </form>
  );
}
