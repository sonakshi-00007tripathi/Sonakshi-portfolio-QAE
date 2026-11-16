const ICONS = ['📦', '🧡', '✨', '✅', '📦', '🎉'];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Drops `count` little celebration emoji from the top of the screen. */
export function confetti(count = 40) {
  if (prefersReducedMotion()) return;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'confetti';
    el.textContent = ICONS[i % ICONS.length];
    el.style.left = `${Math.random() * 100}vw`;
    el.style.setProperty('--r', `${Math.random() * 720 - 360}deg`);
    el.style.animationDuration = `${2.2 + Math.random() * 2}s`;
    el.style.animationDelay = `${Math.random() * 0.6}s`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5200);
  }
}
