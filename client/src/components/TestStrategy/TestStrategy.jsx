import { useState } from 'react';
import Reveal from '../common/Reveal';
import { testStrategy } from '../../data/content';
import './TestStrategy.css';

/** "Name a feature, I'll show you how I'd test it": tabbed test strategies. */
export default function TestStrategy() {
  const [activeId, setActiveId] = useState(testStrategy[0].id);
  const active = testStrategy.find((f) => f.id === activeId);
  const caseCount = active.layers.reduce((n, l) => n + l.cases.length, 0);

  return (
    <section id="strategy">
      <div className="wrap">
        <p className="eyebrow">Test strategy · how I think</p>
        <h2 className="h2">Name a feature. <span className="hl">I'll show you how I'd test it.</span></h2>
        <p className="lede">Test plans and strategies are the heart of the QAE role. Here's what mine look like for three everyday e-commerce features. Pick one.</p>

        <div className="strat-tabs" role="tablist" aria-label="Feature to test">
          {testStrategy.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              id={`tab-${f.id}`}
              aria-selected={f.id === activeId}
              aria-controls="strategy-panel"
              className={`strat-tab ${f.id === activeId ? 'on' : ''}`}
              onClick={() => setActiveId(f.id)}
            >
              {f.tab}
            </button>
          ))}
        </div>

        <Reveal>
          <div id="strategy-panel" role="tabpanel" aria-labelledby={`tab-${activeId}`} className="strat-panel" key={activeId}>
            <div className="strat-risk">
              <span className="mono">RISK</span>
              <p>{active.risk}</p>
              <span className="mono strat-count">{active.layers.length} layers · {caseCount} test ideas</span>
            </div>

            <div className="strat-grid">
              {active.layers.map((layer, i) => (
                <div key={layer.name} className="layer" style={{ '--i': i }}>
                  <h3><span className="mono">L{i + 1}</span>{layer.name}</h3>
                  <ul>{layer.cases.map((c) => <li key={c}>{c}</li>)}</ul>
                </div>
              ))}
            </div>

            <p className="strat-exit mono">
              <b>Exit criteria:</b> all P0 / P1 cases green in CI · no open Critical or High bugs · stakeholders sign off the test report.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
