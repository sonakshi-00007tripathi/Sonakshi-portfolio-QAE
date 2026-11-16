import Reveal from '../common/Reveal';
import { whyQae } from '../../data/content';
import './WhyQae.css';

export default function WhyQae() {
  const [lead, punch] = whyQae.quote;
  return (
    <section id="why">
      <div className="wrap">
        <p className="eyebrow">{whyQae.eyebrow}</p>
        <Reveal as="p" className="quote">"{lead}<em>{punch}</em>"</Reveal>
        <div className="why-grid">
          {whyQae.points.map((pt) => (
            <Reveal key={pt.title}><h3>{pt.title}</h3><p>{pt.body}</p></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
