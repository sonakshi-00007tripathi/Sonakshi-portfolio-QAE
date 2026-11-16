import JourneyStop from './JourneyStop';
import { journey } from '../../data/content';
import './Journey.css';

export default function Journey() {
  return (
    <section id="track">
      <div className="wrap">
        <p className="eyebrow">Shipment tracking</p>
        <h2 className="h2">Track your package.</h2>
        <p className="lede">From Satna, Madhya Pradesh, to your doorstep. Every stop added something to the box.</p>

        <ol className="tl">
          {journey.map((stop) => <JourneyStop key={stop.chip} stop={stop} />)}
        </ol>
      </div>
    </section>
  );
}
