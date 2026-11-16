/** Cartoon scooty carrying the "QAE" package, ridden by Sonakshi (helmet selfie as the head). */
export default function ScootyRider() {
  const ink = '#18202E';
  return (
    <svg viewBox="0 -24 170 136" aria-hidden="true">
      <defs>
        <clipPath id="faceClip"><circle cx="78" cy="16" r="37" /></clipPath>
        <linearGradient id="beam" x1="0" x2="1">
          <stop offset="0" stopColor="#FFE27A" stopOpacity=".9" />
          <stop offset="1" stopColor="#FFE27A" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="scootyBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFB347" />
          <stop offset="1" stopColor="#F08A00" />
        </linearGradient>
      </defs>

      {/* ground shadow + headlight beam */}
      <ellipse cx="78" cy="108" rx="58" ry="4" fill="rgba(0,0,0,.18)" />
      <polygon className="beam" points="140,56 170,42 170,76" fill="url(#beam)" />

      {/* speed lines + exhaust puffs (visible while moving) */}
      <g className="speed" stroke="#B9A27C" strokeWidth="3" strokeLinecap="round">
        <line x1="-14" y1="40" x2="0" y2="40" />
        <line x1="-20" y1="54" x2="-2" y2="54" />
        <line x1="-12" y1="68" x2="2" y2="68" />
      </g>
      <g className="puffs" fill="#CFC6B5">
        <circle cx="10" cy="96" r="4" />
        <circle cx="6" cy="92" r="3" style={{ animationDelay: '.15s' }} />
        <circle cx="12" cy="90" r="2.5" style={{ animationDelay: '.3s' }} />
      </g>

      {/* package strapped on the back */}
      <g>
        <rect x="6" y="30" width="38" height="36" rx="3" fill="#C8955A" stroke={ink} strokeWidth="2.5" />
        <path d="M6 42 H44" stroke="#A9773F" strokeWidth="2" />
        <rect x="21" y="30" width="8" height="36" fill="#F3D28B" />
        <rect x="6" y="30" width="38" height="36" rx="3" fill="none" stroke={ink} strokeWidth="2.5" />
        <rect x="10" y="49" width="20" height="12" rx="2" fill="#fff" stroke={ink} strokeWidth="1.5" />
        <text x="20" y="58" textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono,monospace" fontWeight="700" fill={ink}>QAE</text>
        <path d="M44 48 L54 64" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* scooty body */}
      <path d="M12 92 C6 74 18 66 36 66 L82 66 C92 66 94 76 89 84 L86 92 Z" fill="url(#scootyBody)" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M18 76 C30 72 60 72 86 74" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".85" />
      <circle cx="12" cy="80" r="3" fill="#D9463B" stroke={ink} strokeWidth="1.5" />
      <rect x="84" y="86" width="34" height="7" rx="3" fill={ink} />
      <path d="M114 93 C112 70 122 56 134 48 L140 54 C130 62 124 76 125 93 Z" fill="url(#scootyBody)" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M112 86 Q126 72 142 86" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />

      {/* handlebar, mirror, headlight, seat */}
      <line x1="136" y1="50" x2="128" y2="34" stroke={ink} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="120" y1="33" x2="138" y2="30" stroke={ink} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="130" y1="31" x2="134" y2="20" stroke={ink} strokeWidth="2" />
      <ellipse cx="135" cy="18" rx="4.5" ry="3" fill="#9FD3F0" stroke={ink} strokeWidth="1.5" />
      <circle cx="140" cy="57" r="4.5" fill="#FFE27A" stroke={ink} strokeWidth="2" />
      <path d="M38 66 Q38 58 46 58 L74 58 Q80 58 80 66 Z" fill={ink} />

      {/* rider */}
      <path d="M60 66 L88 70 L96 86" fill="none" stroke="#141418" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M90 84 L104 84 Q106 90 100 90 L90 90 Z" fill="#fff" stroke={ink} strokeWidth="2" />
      <path d="M58 68 Q54 46 70 44 L86 44 Q98 46 92 68 Z" fill="#1D1D22" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M70 46 L66 66" stroke="#3A3A44" strokeWidth="3.5" strokeLinecap="round" />
      <rect x="64" y="54" width="7" height="3.5" rx="1" fill="#D9463B" />
      <path d="M86 50 Q104 52 122 34" fill="none" stroke="#1D1D22" strokeWidth="8" strokeLinecap="round" />
      <circle cx="123" cy="33" r="4" fill="#C98D66" />
      <circle cx="78" cy="16" r="39.5" fill="#fff" stroke={ink} strokeWidth="3" />
      <image href="/assets/rider-face.jpg" x="41" y="-21" width="74" height="74" clipPath="url(#faceClip)" preserveAspectRatio="xMidYMid slice" />

      {/* wheels */}
      {[32, 128].map((cx) => (
        <g className="wheel" key={cx}>
          <circle cx={cx} cy="94" r="14" fill={ink} />
          <circle cx={cx} cy="94" r="8" fill="#FF9A1F" stroke={ink} strokeWidth="2" />
          <circle cx={cx} cy="94" r="2.5" fill={ink} />
          <path d={`M${cx} 86 V102 M${cx - 8} 94 H${cx + 8}`} stroke={ink} strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
}
