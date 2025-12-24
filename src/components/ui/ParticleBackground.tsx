import { useMemo } from 'react';
import { PARTICLES } from '../../constants/theme';
import type { ParticlePosition } from '../../types';

export function ParticleBackground() {
  const particlePositions = useMemo<ParticlePosition[]>(
    () =>
      Array.from({ length: PARTICLES.count }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * PARTICLES.maxDelay,
        duration: PARTICLES.minDuration + Math.random() * (PARTICLES.maxDuration - PARTICLES.minDuration),
      })),
    []
  );

  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      {particlePositions.map((particle, i) => (
        <div
          key={i}
          className="absolute h-4 w-4 bg-emerald-400 rounded-full animate-ping"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

