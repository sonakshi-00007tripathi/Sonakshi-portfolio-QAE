import { navLinks, profile } from '../../data/content';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="wrap nav-in">
        <a className="logo" href="#top">sonakshi<b>.ship()</b></a>
        <div className="nav-links">
          {navLinks.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </div>
        <a className="btn nav-cta" href={profile.resume} download>Resume ↓</a>
      </div>
    </nav>
  );
}
