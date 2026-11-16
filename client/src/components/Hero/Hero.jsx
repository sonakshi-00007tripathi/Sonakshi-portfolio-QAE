import Reveal from '../common/Reveal';
import Polaroid from '../common/Polaroid';
import { hero, profile } from '../../data/content';
import './Hero.css';

export default function Hero() {
  return (
    <header id="top" className="hero wrap">
      <Reveal>
        <p className="eyebrow">Order #QAE-1-2027 · <span className="status-dot">● all checks passed</span></p>
        <h1 className="hero-title">Hi, I'm <span className="hl">{profile.firstName}</span>.</h1>
        <p className="hero-p">I break software on purpose, so your customers never meet it broken.</p>
        <p className="hero-p2">
          QA Engineer Intern at <b>GoComet</b> (B2B logistics SaaS), sole QA owner for 4 production products · CS undergrad at LPU, class of 2027 · the first girl in my family to leave home to study. Applying for <b>Quality Assurance Engineer I</b> at Amazon.
        </p>
        <div className="hero-btns">
          <a className="btn orange" href="#track">Track my journey ↓</a>
          <a className="btn ghost" href="#bughunt">Try to out-test me 🐞</a>
        </div>
      </Reveal>

      <Reveal className="hero-photos">
        {hero.photos.map((p) => <Polaroid key={p.src} {...p} eager />)}
        <div className="sticker">{hero.sticker}</div>
      </Reveal>
    </header>
  );
}
