import { useCallback, useEffect, useRef, useState } from 'react';
import Polaroid from '../common/Polaroid';
import { useSpeechUnlock } from '../../hooks/useSpeechUnlock';
import { confetti } from '../../utils/confetti';
import { gate } from '../../data/content';
import './Gate.css';

const MicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 10a7 7 0 0 0 14 0M12 17v5" />
  </svg>
);

/** Full-screen "package arrived" intro. Opens by voice ("Alexa, hire Sonakshi") or a button. */
export default function Gate() {
  const openedRef = useRef(false);
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);

  const open = useCallback((celebrate) => {
    if (openedRef.current) return;
    openedRef.current = true;
    setOpening(true);
    document.body.classList.remove('locked');
    if (celebrate) confetti(50);
    setTimeout(() => setGone(true), 1000);
  }, []);

  const unlockByVoice = useCallback(() => open(true), [open]);
  const { supported, listening, status, level, mode, toggle } = useSpeechUnlock(unlockByVoice);

  useEffect(() => {
    document.body.classList.add('locked');
    const onKey = (e) => { if (e.key === 'Escape') open(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (gone) return null;

  return (
    <div className={`gate ${opening ? 'open' : ''}`} role="dialog" aria-label="Welcome">
      <div className="gate-inner wrap">
        <div>
          <div className="stamp">QUALITY CHECKED · QAE-1</div>
          <h1 className="gate-title">Hey Amazon,</h1>
          <p className="gate-sub">
            a package with your name on it just arrived. 📦 It passed QA before it left the warehouse.<br />
            <span className="hand">Fragile: contains a lot of ambition (and 0 known defects).</span>
          </p>
          <p className="gate-ask">Say <mark>“Alexa, hire Sonakshi”</mark> to open it.</p>
          <div className="gate-btns">
            <button
              type="button"
              className={`btn mic-btn ${listening ? 'listening' : ''}`}
              onClick={toggle}
              disabled={!supported}
              title={supported ? '' : 'Voice unlock works in Chrome'}
            >
              <MicIcon />
              <span>{!supported ? 'Voice not supported here' : listening ? 'Listening… (tap to stop)' : 'Tap & say it'}</span>
              {listening && mode === 'local' && (
                <span className="mic-meter" aria-hidden="true"><i style={{ transform: `scaleX(${level})` }} /></span>
              )}
            </button>
            <button type="button" className="btn ghost" onClick={() => open(true)}>Just open the box →</button>
          </div>
          <p className="mic-status mono" aria-live="polite">{status}</p>
        </div>

        <div className="gate-photo">
          <div className="bubble">{gate.bubble}</div>
          <Polaroid {...gate.photo} rot={4} eager />
        </div>
      </div>
      <div className="tear" aria-hidden="true">
        ✂ - - - - - - - - - - TEAR HERE - - - - - - - - - - ✂ - - - - - - - - - - TEAR HERE - - - - - - - - - - ✂
      </div>
    </div>
  );
}
