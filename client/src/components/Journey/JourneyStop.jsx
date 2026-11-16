import Reveal from '../common/Reveal';
import Polaroid from '../common/Polaroid';

/** One "tracking event" on the journey timeline. */
export default function JourneyStop({ stop }) {
  const { chip, place, title, body, note, youtube, eta, pending, media, mediaLayout, gallery } = stop;

  return (
    <Reveal as="li" className={`stop ${pending ? 'pending' : ''}`}>
      <div className="dot">{pending ? '📦' : '✓'}</div>

      <div className="stop-text">
        <div className="stop-meta mono"><span className="chip">{chip}</span><span>{place}</span></div>
        <h3>{title}</h3>
        {body.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
        {note && <p className="note">{note}</p>}
        {youtube && (
          <a className="yt" href={youtube.href} target="_blank" rel="noopener noreferrer">
            <span className="play">▶</span>
            <span><b>{youtube.handle}</b><small>Watch the college journey →</small></span>
          </a>
        )}
        {eta && <span className="eta">{eta}</span>}
      </div>

      {media ? (
        <div className={`media ${mediaLayout === 'duo' ? 'duo' : ''}`}>
          {media.map((photo) => <Polaroid key={photo.src} {...photo} />)}
        </div>
      ) : <div />}

      {gallery && (
        <div className="gallery">
          <p className="gallery-title hand">{gallery.title}</p>
          {gallery.photos.map((photo) => <Polaroid key={photo.src} {...photo} />)}
        </div>
      )}
    </Reveal>
  );
}
