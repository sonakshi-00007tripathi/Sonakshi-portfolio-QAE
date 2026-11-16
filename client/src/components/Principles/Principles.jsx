import Reveal from '../common/Reveal';
import { principles } from '../../data/content';
import './Principles.css';

export default function Principles() {
  return (
    <section id="principles">
      <div className="wrap">
        <p className="eyebrow">Amazon Leadership Principles</p>
        <h2 className="h2">You have 16 principles.<br />I brought <span className="hl">receipts</span>.</h2>
        <p className="lede">Not claims. Proof, one principle at a time.</p>

        <div className="receipts">
          {principles.map((p, i) => (
            <Reveal key={p.lp} className={`receipt ${p.special ? 'special' : ''}`}>
              <div className="rno"><span>LP · {p.lp}</span><span>#{String(i + 1).padStart(2, '0')}</span></div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <div className="proof"><span>{p.proof[0]}</span><b>{p.proof[1]}</b></div>
            </Reveal>
          ))}
        </div>
        <p className="foot-note">{principles.length} of 16 receipts shown. The other {16 - principles.length}? I'll earn those as your QAE. 😉</p>
      </div>
    </section>
  );
}
