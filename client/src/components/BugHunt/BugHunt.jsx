import { useEffect, useState } from 'react';
import Reveal from '../common/Reveal';
import { confetti } from '../../utils/confetti';
import { bugHunt } from '../../data/content';
import './BugHunt.css';

const BY_ID = Object.fromEntries(bugHunt.bugs.map((b) => [b.id, b]));
const TOTAL = bugHunt.bugs.length;

/** A clickable area that hides a planted bug. */
function BugSpot({ id, className = '', children, found, onFind }) {
  const n = found.indexOf(id) + 1;
  return (
    <button
      type="button"
      className={`spot ${n ? 'found' : ''} ${className}`}
      onClick={() => onFind(id)}
      aria-pressed={Boolean(n)}
      aria-label={n ? `Bug ${n} found: ${BY_ID[id].title}` : undefined}
    >
      {children}
      {n > 0 && <span className="pin" aria-hidden="true">{n}</span>}
    </button>
  );
}

/**
 * "Find the bugs": a tiny checkout with planted defects.
 * Clicking a buggy spot files a bug report; clicking something that works
 * counts as a false alarm (precision matters in QA too).
 */
export default function BugHunt() {
  const [found, setFound] = useState([]);       // bug ids, in the order they were found
  const [falseAlarms, setFalseAlarms] = useState(0);
  const [toast, setToast] = useState('');

  const isFound = (id) => found.includes(id);

  const report = (id) => {
    if (isFound(id)) return;
    setToast(`🐞 Filed: ${BY_ID[id].title}`);
    setFound((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  // Celebrate once, when the last bug is filed.
  useEffect(() => { if (found.length === TOTAL) confetti(45); }, [found.length]);

  const notABug = (what) => {
    setFalseAlarms((n) => n + 1);
    setToast(`✓ ${what} works as expected. Not a bug.`);
  };

  const revealAll = () => setFound(bugHunt.bugs.map((b) => b.id));
  const reset = () => { setFound([]); setFalseAlarms(0); setToast(''); };


  const done = found.length === TOTAL;
  const pct = Math.round((found.length / TOTAL) * 100);

  return (
    <section id="bughunt">
      <div className="wrap">
        <p className="eyebrow">Interactive · try me</p>
        <h2 className="h2">Before you read my résumé, <span className="hl">test me.</span></h2>
        <p className="lede">{bugHunt.intro}</p>

        <div className="hunt">
          <Reveal className="shop">
            <div className="shop-bar mono">
              <span className="env">STAGING</span>
              <BugSpot id="url" found={found} onFind={report} className="url-spot">
                <span>demo-store/checkout?card=4111111111111111&amp;build=427</span>
              </BugSpot>
            </div>

            <div className="shop-item">
              <BugSpot id="image" found={found} onFind={report} className="img-spot">
                <span className="broken" aria-hidden="true">🖼️</span>
                <small className="mono">alt=""</small>
              </BugSpot>
              <div className="item-info">
                <BugSpot id="title" found={found} onFind={report} className="txt-spot">
                  <strong className="item-title">Sonakshi Tripathi · Quality Assurance Enginer</strong>
                </BugSpot>
                <p className="seller">Ships from Bangalore · Sold by LPU × GoComet</p>
                <button type="button" className="plain stars" onClick={() => notABug('The rating')}>
                  ★★★★★ <span>(0 post-release defects)</span>
                </button>
                <button type="button" className="plain qty mono" onClick={() => notABug('The quantity selector')}>Qty: 1 ▾</button>
                <BugSpot id="date" found={found} onFind={report} className="txt-spot">
                  <span className="arrive">Arriving <b>31 Feb</b> · FREE delivery</span>
                </BugSpot>
              </div>
            </div>

            <div className="summary">
              <BugSpot id="items" found={found} onFind={report} className="row-spot">
                <span>Items (2):</span><span>₹499.00</span>
              </BugSpot>
              <button type="button" className="plain row" onClick={() => notABug('Delivery pricing')}>
                <span>Delivery:</span><span className="free">FREE</span>
              </button>
              <BugSpot id="coupon" found={found} onFind={report} className="row-spot stack">
                <span className="row"><span>Coupon DAY1:</span><span className="neg">−₹50.00</span></span>
                <span className="row"><span>Coupon DAY1:</span><span className="neg">−₹50.00</span></span>
              </BugSpot>
              <BugSpot id="total" found={found} onFind={report} className="row-spot total">
                <span>Order total:</span><span>₹398.99999999999994</span>
              </BugSpot>
              <button type="button" className="place" onClick={() => notABug('The "Place your order" button')}>
                Place your order
              </button>
            </div>
          </Reveal>

          <Reveal className="tracker">
            <div className="tracker-head">
              <p className="mono">🐞 Bug tracker</p>
              <p className="mono score"><b>{found.length}</b> / {TOTAL} found</p>
            </div>
            <div className="meter" aria-hidden="true"><i style={{ width: `${pct}%` }} /></div>
            <p className="mono alarms">
              False alarms: {falseAlarms}
              {falseAlarms > 0 && <span> · good QAs check before they file</span>}
            </p>

            <p className="toast" aria-live="polite">{toast}</p>

            {found.length === 0 ? (
              <p className="empty hand">No bugs filed yet. Start clicking on anything suspicious ←</p>
            ) : (
              <ol className="tickets">
                {found.map((id, i) => {
                  const b = BY_ID[id];
                  return (
                    <li key={id} className="ticket">
                      <div className="t-head mono">
                        <span>BUG-{String(i + 1).padStart(2, '0')}</span>
                        <span className={`sev sev-${b.sev.toLowerCase()}`}>{b.sev}</span>
                        <span className="area">{b.area}</span>
                      </div>
                      <h3>{b.title}</h3>
                      <p><b>Expected:</b> {b.expected}</p>
                      <p><b>Actual:</b> {b.actual}</p>
                    </li>
                  );
                })}
              </ol>
            )}

            {done && <p className="win">{bugHunt.allFound}</p>}

            <div className="tracker-btns">
              {!done && <button type="button" className="btn ghost sm" onClick={revealAll}>Show all bugs</button>}
              {found.length > 0 && <button type="button" className="btn ghost sm" onClick={reset}>Reset</button>}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
