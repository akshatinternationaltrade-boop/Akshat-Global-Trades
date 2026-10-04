import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSublineInSvg?: boolean;
}

/**
 * Exact vector reproduction of the official Akshat Global Trades logo
 * preserving exact proportions, white + red (#F50008) geometry, concave base arc,
 * lowercase "kshat" typography, and flanked "GLOBAL TRADES" rule lines.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  className = '',
  showSublineInSvg = true,
}) => {
  const dimensions = {
    sm: 'h-9 w-auto',
    md: 'h-11 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-24 w-auto',
  }[size];

  return (
    <div className={`inline-flex items-center select-none shrink-0 ${className}`}>
      <svg
        viewBox={showSublineInSvg ? '85 88 610 262' : '85 88 610 202'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={dimensions}
        role="img"
        aria-label="Akshat Global Trades"
      >
        {/* Official Geometric 'A' Symbol - Left White Wing with Concave Arc Base */}
        <path
          d="M191 102 L96 281 Q132 263 167 257 L220 157 Z"
          fill="#FFFFFF"
        />

        {/* Official Geometric 'A' Symbol - Right Red Triangle with Concave Arc Base */}
        <path
          d="M229 177 L185 256 Q230 262 275 281 Z"
          fill="#F50008"
        />

        {/* "kshat" Lowercase Geometric Sans-Serif Typography */}
        <text
          x="278"
          y="260"
          fill="#FFFFFF"
          fontFamily="'Instrument Sans', 'Plus Jakarta Sans', sans-serif"
          fontSize="162"
          fontWeight="400"
          letterSpacing="-1.5"
        >
          kshat
        </text>

        {showSublineInSvg && (
          <g>
            {/* Left Horizontal White Line */}
            <line
              x1="112"
              y1="322"
              x2="263"
              y2="322"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="square"
            />

            {/* "GLOBAL TRADES" Center Sub-Logotype */}
            <text
              x="395"
              y="332"
              fill="#FFFFFF"
              fontFamily="'Plus Jakarta Sans', sans-serif"
              fontSize="31"
              fontWeight="400"
              textAnchor="middle"
              letterSpacing="2.2"
            >
              GLOBAL TRADES
            </text>

            {/* Right Horizontal White Line */}
            <line
              x1="528"
              y1="322"
              x2="679"
              y2="322"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="square"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
