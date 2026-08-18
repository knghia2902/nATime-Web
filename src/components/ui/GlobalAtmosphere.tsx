'use client';

export default function GlobalAtmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none" aria-hidden="true">
      {/* ── Ambient Dark Slate Deep Light Blooms ── */}
      <div className="luminous-silk-1" />
      <div className="luminous-silk-2" />

      {/* ── Soft Ethereal Smoke Clouds & 3D Silk Ribbons ── */}
      <div className="silk-ribbon-layer">
        <svg
          className="silk-ribbon-svg w-full h-full object-cover"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="globalSmoke1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.38" />
              <stop offset="35%" stopColor="#cbd5e1" stopOpacity="0.22" />
              <stop offset="70%" stopColor="#64748b" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="globalSmoke2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="40%" stopColor="#94a3b8" stopOpacity="0.18" />
              <stop offset="80%" stopColor="#475569" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="globalHighlight" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.42" />
              <stop offset="50%" stopColor="#e2e8f0" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#64748b" stopOpacity="0" />
            </linearGradient>

            <filter id="globalBlurDeep" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="40" />
            </filter>
            <filter id="globalBlurMid" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="22" />
            </filter>
            <filter id="globalBlurSoft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
          </defs>

          {/* Background Ambient Cloud Swirls */}
          <path
            d="M800 -100 C1050 50, 1300 120, 1500 350 C1650 520, 1400 750, 1150 850 C950 930, 750 800, 850 600 C950 400, 600 200, 800 -100 Z"
            fill="url(#globalSmoke1)"
            filter="url(#globalBlurDeep)"
            opacity="0.8"
          />

          {/* Primary Flowing Silk Ribbon (Top Right Arch) */}
          <path
            d="M920 -50 C1100 80, 1280 220, 1360 420 C1420 580, 1300 720, 1180 820 C1120 700, 1260 520, 1200 380 C1130 220, 980 120, 860 20 Z"
            fill="url(#globalSmoke1)"
            filter="url(#globalBlurMid)"
          />
          <path
            d="M940 -40 C1110 90, 1260 230, 1340 410 C1380 500, 1320 600, 1240 680 C1200 580, 1280 460, 1240 360 C1190 240, 1060 140, 940 -40 Z"
            fill="url(#globalHighlight)"
            filter="url(#globalBlurSoft)"
            opacity="0.85"
          />

          {/* Secondary Silk Ribbon (Right Edge S-Curve) */}
          <path
            d="M1250 150 C1400 300, 1480 480, 1380 680 C1300 840, 1050 880, 920 850 C1080 820, 1220 720, 1280 580 C1350 420, 1260 280, 1160 200 Z"
            fill="url(#globalSmoke2)"
            filter="url(#globalBlurMid)"
            opacity="0.8"
          />
          <path
            d="M1270 200 C1380 340, 1420 480, 1350 640 C1300 520, 1340 400, 1260 300 C1220 250, 1180 220, 1270 200 Z"
            fill="#ffffff"
            filter="url(#globalBlurSoft)"
            opacity="0.35"
          />

          {/* Tertiary Subtle Silk Ribbons across Top Center */}
          <path
            d="M400 -80 C600 40, 850 60, 1100 -20 C950 80, 700 80, 480 20 Z"
            fill="url(#globalSmoke1)"
            filter="url(#globalBlurMid)"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* ── Central Luminous Dot Matrix Constellation ── */}
      <div className="dot-matrix absolute inset-0 opacity-45" />
    </div>
  );
}
