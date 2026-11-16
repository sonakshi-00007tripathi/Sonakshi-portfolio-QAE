import Reveal from '../common/Reveal';
import { skills } from '../../data/content';
import './Skills.css';

/** Items ending in "*" are highlighted as strongest skills. */
export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <p className="eyebrow">Product details</p>
        <h2 className="h2">What's in the box.</h2>
        <Reveal className="spec">
          {skills.map(({ group, items }) => (
            <div key={group} className="spec-row">
              <div>{group}</div>
              <div>
                {items.map((item) => {
                  const hot = item.endsWith('*');
                  const label = hot ? item.slice(0, -1) : item;
                  return <span key={label} className={`pill ${hot ? 'hot' : ''}`}>{label}</span>;
                })}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
