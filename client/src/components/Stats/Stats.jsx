import { useInView } from '../../hooks/useInView';
import { useCountUp } from '../../hooks/useCountUp';
import { stats } from '../../data/content';
import './Stats.css';

/** Renders a stat value, counting up when it has a `count` config. */
function StatValue({ value, count, start }) {
  const n = useCountUp({ from: count?.from ?? 0, to: count?.to ?? 0, start: start && Boolean(count) });
  if (!count) return <>{value}</>;
  const decimals = count.decimals ?? 0;
  const shown = decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString('en-IN');
  return <>{count.prefix}{shown}{count.suffix}</>;
}

/** "Package manifest": the headline numbers, right under the hero. */
export default function Stats() {
  const [ref, inView] = useInView({ threshold: 0.25 });

  return (
    <section className="manifest" aria-labelledby="manifest-title">
      <div className="wrap">
        <div ref={ref} className={`manifest-box ${inView ? 'in' : ''}`}>
          <div className="manifest-head">
            <p id="manifest-title" className="manifest-title mono">🧪 Pre-shipment test report</p>
            <p className="manifest-meta mono">{stats.length} / {stats.length} checks passed <span>✓</span></p>
          </div>

          <ul className="stats">
            {stats.map((s, i) => (
              <li key={s.label} className="stat" style={{ '--i': i }}>
                <div className="stat-top">
                  <span className="stat-icon" aria-hidden="true">{s.icon}</span>
                  <span className="stat-tag mono">TC-{String(i + 1).padStart(2, '0')}</span>
                </div>
                <b className={`stat-value ${s.count ? '' : 'text'}`}>
                  <StatValue value={s.value} count={s.count} start={inView} />
                </b>
                <span className="stat-label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
