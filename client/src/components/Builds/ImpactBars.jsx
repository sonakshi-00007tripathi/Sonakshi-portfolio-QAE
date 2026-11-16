import { useInView } from '../../hooks/useInView';

/** Before/after bars that grow when scrolled into view. */
export default function ImpactBars({ title, rows }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  return (
    <div ref={ref} className="bars">
      <h4>{title}</h4>
      {rows.map((r) => (
        <div key={r.label} className={`bar ${r.fast ? 'fast' : ''}`}>
          <label><span>{r.label}</span><span>{r.value}</span></label>
          <div className="rail"><div className="fill" style={{ width: inView ? `${r.width}%` : 0 }} /></div>
        </div>
      ))}
    </div>
  );
}
