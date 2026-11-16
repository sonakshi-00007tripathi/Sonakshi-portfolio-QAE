import Reveal from '../common/Reveal';
import Terminal from './Terminal';
import ImpactBars from './ImpactBars';
import ProjectCard from './ProjectCard';
import { featureProject, projects, links } from '../../data/content';
import './Builds.css';

export default function Builds() {
  const f = featureProject;
  return (
    <section id="build">
      <div className="wrap">
        <p className="eyebrow">What I've shipped</p>
        <h2 className="h2">I don't just find bugs. <span className="hl">I build the tools that find them.</span></h2>
        <p className="lede">My best work so far: a test pipeline that took a week of manual checking and turned it into a coffee break.</p>

        <div className="feature">
          <Reveal>
            {f.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            <h3>{f.title}</h3>
            <p className="lede feature-summary">{f.summary}</p>
            <ul>{f.points.map((point, i) => <li key={i}>{point}</li>)}</ul>
            <ImpactBars {...f.bars} />
          </Reveal>
          <Reveal>
            <Terminal />
          </Reveal>
        </div>

        <div className="cards">
          {projects.map((p) => <ProjectCard key={p.title} {...p} />)}
        </div>

        <p className="github-cta">
          <a className="btn ghost" href={links.github} target="_blank" rel="noopener noreferrer">See my code on GitHub →</a>
        </p>
      </div>
    </section>
  );
}
