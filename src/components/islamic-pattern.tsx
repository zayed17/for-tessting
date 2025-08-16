export function IslamicPattern() {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <svg className="w-full h-full animate-pulse" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="islamic-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <g fill="currentColor" className="text-emerald-500">
              {/* Central star pattern */}
              <circle cx="60" cy="60" r="3" opacity="0.6" />

              {/* Eight-pointed star */}
              <path
                d="M60 30 L70 45 L85 40 L75 55 L90 60 L75 65 L85 80 L70 75 L60 90 L50 75 L35 80 L45 65 L30 60 L45 55 L35 40 L50 45 Z"
                opacity="0.4"
              />

              {/* Corner decorative elements */}
              <path d="M30 30 L40 35 L35 45 L25 40 Z" opacity="0.3" />
              <path d="M90 30 L100 35 L95 45 L85 40 Z" opacity="0.3" />
              <path d="M30 90 L40 85 L35 75 L25 80 Z" opacity="0.3" />
              <path d="M90 90 L100 85 L95 75 L85 80 Z" opacity="0.3" />

              {/* Connecting lines */}
              <line x1="60" y1="15" x2="60" y2="25" stroke="currentColor" strokeWidth="1" opacity="0.2" />
              <line x1="60" y1="95" x2="60" y2="105" stroke="currentColor" strokeWidth="1" opacity="0.2" />
              <line x1="15" y1="60" x2="25" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.2" />
              <line x1="95" y1="60" x2="105" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.2" />
            </g>
          </pattern>

          <pattern id="islamic-pattern-secondary" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <g fill="currentColor" className="text-emerald-400">
              <circle cx="40" cy="40" r="1.5" opacity="0.3" />
              <path d="M40 25 L47 32 L40 39 L33 32 Z" opacity="0.2" />
            </g>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
        <rect width="100%" height="100%" fill="url(#islamic-pattern-secondary)" transform="rotate(45 200 200)" />
      </svg>
    </div>
  )
}
