import { useEffect, useRef, useState } from 'react';
import ScootyRider from './ScootyRider';
import './DeliveryRoad.css';

/**
 * Sticky "road" under the navbar. Page scroll progress drives the scooty
 * from Satna to Amazon; it faces backwards when scrolling up.
 */
export default function DeliveryRoad() {
  const roadRef = useRef(null);
  const riderRef = useRef(null);
  const doneRef = useRef(null);
  const fromRef = useRef(null);
  const toRef = useRef(null);
  const [delivered, setDelivered] = useState(false);

  useEffect(() => {
    const road = roadRef.current;
    const rider = riderRef.current;
    let lastY = window.scrollY;
    let stopTimer;
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

      const from = fromRef.current;
      const to = toRef.current;
      const labelsOnTop = from.offsetTop < 30; // on phones the labels sit in the top corners
      const start = labelsOnTop ? 6 : from.offsetLeft + from.offsetWidth + 4;
      const end = Math.max(start, (labelsOnTop ? road.clientWidth - 6 : to.offsetLeft - 4) - rider.offsetWidth);
      const x = start + (end - start) * p;

      rider.style.transform = `translateX(${x}px)`;
      doneRef.current.style.width = `${x + 50}px`;

      if (window.scrollY !== lastY) {
        rider.classList.toggle('back', window.scrollY < lastY);
        rider.classList.add('moving');
        clearTimeout(stopTimer);
        stopTimer = setTimeout(() => rider.classList.remove('moving'), 180);
      }
      lastY = window.scrollY;
      setDelivered(p > 0.985);
    };

    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(stopTimer);
    };
  }, []);

  return (
    <div ref={roadRef} className={`road ${delivered ? 'delivered' : ''}`} aria-hidden="true">
      <span ref={fromRef} className="road-lbl road-from">📍 Satna (M.P.)</span>
      <span ref={toRef} className="road-lbl road-to">{delivered ? 'Delivered ✓' : 'Amazon QAE 🏁'}</span>
      <div className="asphalt"><div ref={doneRef} className="asphalt-done" /></div>
      <div ref={riderRef} className="rider">
        <div className="flip"><ScootyRider /></div>
      </div>
    </div>
  );
}
