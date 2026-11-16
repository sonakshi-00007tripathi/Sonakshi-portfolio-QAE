import { useMemo } from 'react';

/** Decorative, deterministic barcode generated from a seed string. */
export default function Barcode({ seed = 'SONAKSHI-QAE-2027', bars = 64 }) {
  const widths = useMemo(
    () => Array.from({ length: bars }, (_, i) => {
      const c = seed.charCodeAt(i % seed.length) * (i + 7);
      return { w: (c % 4) + 1, gap: c % 3 };
    }),
    [seed, bars]
  );
  return (
    <div className="barcode" aria-hidden="true">
      {widths.map((b, i) => <i key={i} style={{ width: b.w, marginRight: b.gap }} />)}
    </div>
  );
}
