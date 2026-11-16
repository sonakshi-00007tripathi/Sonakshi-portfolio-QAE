import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { jdTrace } from '../../data/content';
import './JdTrace.css';

const STEP_MS = 170;
const rows = jdTrace.rows;
const passCount = rows.filter((r) => r.status !== 'gap').length;
const gapCount = rows.length - passCount;
const coverage = Math.round((passCount / rows.length) * 100);
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Requirements traceability matrix: every line of the job description
 * mapped to evidence. "Runs" like a test suite the first time it scrolls into view.
 */
export default function JdTrace() {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const [checked, setChecked] = useState(0);   // how many rows have a result so far
  const [running, setRunning] = useState(false);
  const timer = useRef();

  const run = useCallback(() => {
    clearTimeout(timer.current);
    if (reduceMotion()) { setChecked(rows.length); return; }
    setRunning(true);
    setChecked(0);
    let i = 0;
    const tick = () => {
      i += 1;
      setChecked(i);
      if (i < rows.length) timer.current = setTimeout(tick, STEP_MS);
      else setRunning(false);
    };
    timer.current = setTimeout(tick, 300);
  }, []);

  useEffect(() => { if (inView) run(); }, [inView, run]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const done = checked === rows.length;

  return (
    <section id="fit">
      <div className="wrap">
        <p className="eyebrow">Requirements traceability</p>
        <h2 className="h2">Your job description, <span className="hl">traced.</span></h2>
        <p className="lede">QA engineers map every requirement to a test. So I mapped every line of your QAE-1 job description to evidence from my work.</p>

        <div ref={ref} className="rtm">
          <div className="rtm-bar mono">
            <span className="rtm-file">rtm_amazon_qae1.csv</span>
            <span className="rtm-role">{jdTrace.role}</span>
            <button type="button" className="btn orange sm" onClick={run} disabled={running}>
              {running ? 'Running…' : done ? '↻ Re-run check' : '▶ Run check'}
            </button>
          </div>

          <div className="rtm-head mono" aria-hidden="true">
            <span>ID</span><span>Requirement (from the JD)</span><span>Evidence</span><span>Result</span>
          </div>

          <ol className="rtm-rows">
            {rows.map((r, i) => {
              const state = i < checked ? (r.status === 'gap' ? 'gap' : 'pass') : 'pending';
              return (
                <li key={r.req} className={`rtm-row ${state}`}>
                  <span className="rid mono">REQ-{String(i + 1).padStart(2, '0')}</span>
                  <p className="req">“{r.req}”</p>
                  <p className="proof">
                    {r.proof}
                    {r.link && <> <a href={r.link}>proof ↓</a></>}
                  </p>
                  <span className={`res mono ${state}`}>
                    {state === 'pass' ? '✓ PASS' : state === 'gap' ? '◐ GAP' : '· · ·'}
                  </span>
                </li>
              );
            })}
          </ol>

          <div className={`rtm-sum mono ${done ? 'show' : ''}`} aria-live="polite">
            {done && (
              <>
                <span className="ok">{passCount} / {rows.length} met</span>
                <span className="warn">{gapCount} known gap, reported honestly</span>
                <span>coverage {coverage}%</span>
                <span className="verdict">verdict: ready for interview ✓</span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
