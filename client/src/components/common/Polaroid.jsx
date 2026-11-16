import Reveal from './Reveal';

/**
 * Taped instant-photo frame.
 * @param {object} props
 * @param {string} props.src      image path (from /public)
 * @param {string} props.alt      accessible description
 * @param {import('react').ReactNode} props.caption handwritten caption
 * @param {number} [props.rot]    tilt in degrees
 * @param {boolean} [props.land]  landscape (4:3) instead of portrait (3:4)
 * @param {boolean} [props.reveal] fade in on scroll
 * @param {boolean} [props.eager] load immediately (above the fold)
 */
export default function Polaroid({ src, alt, caption, rot, land, reveal, eager, className = '', style }) {
  const classes = ['polaroid', land && 'land', className].filter(Boolean).join(' ');
  const css = { ...(rot !== undefined ? { '--rot': `${rot}deg` } : {}), ...style };
  const content = (
    <>
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      <figcaption>{caption}</figcaption>
    </>
  );
  return reveal ? (
    <Reveal as="figure" className={classes} style={css}>{content}</Reveal>
  ) : (
    <figure className={classes} style={css}>{content}</figure>
  );
}
