import { useEffect, useRef, useState } from 'react';

/**
 * Returns [ref, inView]. `inView` flips to true the first time the element
 * scrolls into view (or every time, if once=false).
 */
export function useInView({ threshold = 0.12, rootMargin = '0px 0px -40px 0px', once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
