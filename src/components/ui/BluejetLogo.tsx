import React, { useState } from 'react';

interface BluejetLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const BluejetLogo: React.FC<BluejetLogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Bluejet Monogram B with Modern Architectural High-Rises */}
      {!imgError ? (
        <img
          src="/bluejet-emblem.png"
          alt="Bluejet Properties"
          onError={() => setImgError(true)}
          className={`${sizeClasses[size]} object-contain shrink-0`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} rounded-lg bg-[#0052FF] flex items-center justify-center p-1 shadow-subtle shrink-0 relative overflow-hidden`}
        >
          {/* Scalable Vector Emblem of the Bluejet Skyscraper "B" */}
          <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d="M6 3C6 2.44772 6.44772 2 7 2H20C24.4183 2 28 5.58172 28 10C28 12.6322 26.7275 14.969 24.757 16.4173C27.8767 17.8596 30 21.0373 30 24.75C30 29.8586 25.8586 34 20.75 34H7C6.44772 34 6 33.5523 6 33V3Z"
              fill="#0052FF"
            />
            {/* White Towers */}
            <path d="M10 32V14L15 9V32H10Z" fill="white" />
            <path d="M17 32V6L24 11V32H17Z" fill="white" fillOpacity="0.95" />
            <path d="M25 32V18L28 21V32H25Z" fill="white" fillOpacity="0.9" />
            {/* Windows */}
            <rect x="12" y="18" width="1.5" height="2" fill="#0052FF" />
            <rect x="12" y="23" width="1.5" height="2" fill="#0052FF" />
            <rect x="12" y="28" width="1.5" height="2" fill="#0052FF" />
            <rect x="19" y="12" width="2" height="2" fill="#0052FF" />
            <rect x="19" y="17" width="2" height="2" fill="#0052FF" />
            <rect x="19" y="22" width="2" height="2" fill="#0052FF" />
            <rect x="19" y="27" width="2" height="2" fill="#0052FF" />
          </svg>
        </div>
      )}

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="font-extrabold text-[#0052FF] tracking-tight text-sm sm:text-base">
            BLUEJET
          </span>
          <span className="font-semibold text-[#0B1B3D] text-[9px] sm:text-[10px] tracking-widest uppercase">
            PROPERTIES
          </span>
        </div>
      )}
    </div>
  );
};
