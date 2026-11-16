import Polaroid from '../common/Polaroid';
import { life } from '../../data/content';
import './Life.css';

const TILTS = [-3, 3, -2];

export default function Life() {
  return (
    <section id="life">
      <div className="wrap">
        <p className="eyebrow">Off the clock</p>
        <h2 className="h2">I love exploring new things.</h2>
        <p className="lede">New places, new stages, new tech stacks. Same energy.</p>
        <div className="life">
          {life.map((photo, i) => <Polaroid key={photo.src} {...photo} rot={TILTS[i % TILTS.length]} reveal />)}
        </div>
      </div>
    </section>
  );
}
