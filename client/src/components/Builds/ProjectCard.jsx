import Reveal from '../common/Reveal';

export default function ProjectCard({ kicker, title, body, badge }) {
  return (
    <Reveal className="card">
      <div className="k">{kicker}</div>
      <h3>{title}</h3>
      <p>{body}</p>
      {badge && <span className="badge">{badge}</span>}
    </Reveal>
  );
}
