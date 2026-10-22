import React, { useMemo } from 'react';

interface Snowflake {
  id: number;
  left: number; // percentage 0-100
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  opacity: number;
  swayDuration: number;
}

export const FallingSnow: React.FC = () => {
  // Generate random snowflake parameters once
  const flakes: Snowflake[] = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 16, // 14px to 30px
      duration: 5 + Math.random() * 6, // 5s to 11s
      delay: -(Math.random() * 10), // start at varied positions
      opacity: 0.35 + Math.random() * 0.55,
      swayDuration: 3 + Math.random() * 3
    }));
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10vh) translateX(0);
          }
          50% {
            transform: translateY(50vh) translateX(15px);
          }
          100% {
            transform: translateY(110vh) translateX(-15px);
          }
        }
      `}</style>
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className="absolute select-none will-change-transform"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `snowfall ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))'
          }}
        >
          ❄️
        </span>
      ))}
    </div>
  );
};
