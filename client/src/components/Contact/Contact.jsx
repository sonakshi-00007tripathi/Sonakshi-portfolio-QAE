import { useEffect, useState } from 'react';
import Reveal from '../common/Reveal';
import Barcode from './Barcode';
import ContactForm from './ContactForm';
import { api } from '../../services/api';
import { confetti } from '../../utils/confetti';
import { profile, links } from '../../data/content';
import './Contact.css';

const CONFIRMED_KEY = 'delivery-confirmed';

const readConfirmed = () => {
  try { return localStorage.getItem(CONFIRMED_KEY) === '1'; } catch { return false; }
};

export default function Contact() {
  const [count, setCount] = useState(null);     // null = API unavailable / not loaded
  const [confirmed, setConfirmed] = useState(readConfirmed);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api.getStats().then((d) => setCount(d.deliveries)).catch(() => setCount(null));
  }, []);

  const confirmDelivery = async () => {
    confetti(60);
    if (confirmed) return;
    setBusy(true);
    try {
      const d = await api.confirmDelivery();
      setCount(d.deliveries);
      setConfirmed(true);
      try { localStorage.setItem(CONFIRMED_KEY, '1'); } catch { /* storage blocked */ }
    } catch {
      // API down: fall back to the original behaviour, opening an email draft.
      setTimeout(() => {
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Delivery confirmed: let's talk, Sonakshi!")}`;
      }, 900);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="contact">
      <div className="wrap">
        <p className="eyebrow center">Last stop</p>
        <h2 className="h2 center">Ready to ship. 📦</h2>
        <p className="lede center">Based in Bangalore. Open to Quality Assurance Engineer I (QAE-1) roles.</p>

        <Reveal className="label">
          <div className="label-top"><span>PRIORITY · HANDLE WITH CARE</span><span>1 OF 1</span></div>
          <div className="label-body">
            <div>
              <small>FROM</small>
              <div className="to">{profile.name}</div>
              <div className="addr">{profile.role}<br />{profile.education} · {profile.location}</div>
            </div>
            <div>
              <small>SHIP TO</small>
              <div className="to">{profile.target}</div>
              <div className="addr">QAE Hiring Team<br />Contents: 1 quality engineer, regression-tested ✓</div>
            </div>
          </div>
          <div className="links">
            <a href={`mailto:${profile.email}`}>✉ {profile.email}</a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href={links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href={links.leetcode} target="_blank" rel="noopener noreferrer">LeetCode ↗</a>
            <a href={links.youtube} target="_blank" rel="noopener noreferrer">YouTube ↗</a>
            <a href={profile.resume} download>Resume (PDF) ↓</a>
          </div>
          <div className="label-foot">
            <div>
              <Barcode />
              <div className="barcode-n">QAE·1·2027·SONAKSHI</div>
            </div>
            <div className="confirm">
              <button className="btn orange" type="button" onClick={confirmDelivery} disabled={busy}>
                {confirmed ? 'Delivered ✓' : 'Confirm delivery ✓'}
              </button>
              {count !== null && (
                <small className="mono deliv-count">
                  {confirmed ? `You're delivery #${count}. Thank you! 🧡` : `📦 Confirmed by ${count} visitor${count === 1 ? '' : 's'} so far`}
                </small>
              )}
            </div>
          </div>
        </Reveal>

        <ContactForm />
      </div>
    </section>
  );
}
