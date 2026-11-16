import { Fragment, useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView';

/** [line, delay before the next line in ms]: an illustrative run of the validation engine. */
const LINES = [
  [<><span className="t-or">$</span> npm run validate -- --doc=bill-of-entry</>, 500],
  [<><span className="t-dim">› v1 (browser) ....</span> 3 rec / 2.6 min <span className="t-bad">✗ slow</span></>, 700],
  [<><span className="t-dim">› dive deep: capturing app network calls...</span> <span className="t-ok">✓</span></>, 700],
  [<span className="t-cy">› v2: API-first, no browser</span>, 500],
  [<><span className="t-dim">› fetching reports ..........</span> 6,000+ <span className="t-ok">✓</span></>, 650],
  [<><span className="t-dim">› comparing field by field ..</span> 5 sections <span className="t-ok">✓</span></>, 650],
  [<><span className="t-dim">› resolving column aliases ...</span> <span className="t-ok">✓</span></>, 550],
  [<><span className="t-dim">› classifying discrepancies ..</span> 5 error types <span className="t-ok">✓</span></>, 650],
  ['', 200],
  [<span className="t-dim">  ─────────────────────────────</span>, 80],
  [<><span className="t-dim">  before  </span><span className="t-bad">~1 week, by hand</span></>, 120],
  [<><span className="t-dim">  after   </span><span className="t-ok">~5 min per batch</span></>, 120],
  [<><span className="t-dim">  output  </span>console table + CSV</>, 120],
  [<span className="t-dim">  ─────────────────────────────</span>, 400],
  [<><span className="t-ok">✔ done.</span> report.csv written · <span className="t-or">adopted team-wide</span></>, 300],
];

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Terminal() {
  const [ref, inView] = useInView({ threshold: 0.35 });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduceMotion()) { setShown(LINES.length); return undefined; }
    let i = 0;
    let timer;
    const next = () => {
      i += 1;
      setShown(i);
      if (i < LINES.length) timer = setTimeout(next, LINES[i - 1][1]);
    };
    next();
    return () => clearTimeout(timer);
  }, [inView]);

  return (
    <div ref={ref} className="term">
      <div className="term-bar"><i /><i /><i /><span>validation-engine · demo run</span></div>
      <pre>
        {LINES.slice(0, shown).map(([line], i) => <Fragment key={i}>{line}{'\n'}</Fragment>)}
        <span className="caret" />
      </pre>
    </div>
  );
}
