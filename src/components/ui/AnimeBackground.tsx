import { useEffect, useRef } from 'react';

// Helper function to generate random numbers
const random = (min: number, max: number) => Math.random() * (max - min) + min;

/**
 * Enhanced animated background with Anime.js
 * Features: floating particles, connections, mouse interaction, and beautiful effects
 */
export function AnimeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<any[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Create canvas for connections
    const canvas = document.createElement('canvas');
    canvas.className = 'absolute inset-0 pointer-events-none';
    canvasRef.current = canvas;
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const particleCount = prefersReducedMotion ? 20 : 50;
    const particleSizeRange = [30, 80];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full';

      const size = random(particleSizeRange[0], particleSizeRange[1]);
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${random(0, 100)}%`;
      particle.style.top = `${random(0, 100)}%`;
      particle.style.background = 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(16, 185, 129, 0) 70%)';
      particle.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.3)';

      container.appendChild(particle);
    }

    if (!prefersReducedMotion) {
      // Import animejs and animate particles
      import('animejs').then(({ animate }) => {
        const particles = Array.from(container.children).filter(
          (child): child is HTMLDivElement => child instanceof HTMLDivElement
        );

        // Animate each particle with complex motion
        particles.forEach((particle) => {
          const animation = animate(particle, {
            translateX: () => random(-100, 100),
            translateY: () => random(-100, 100),
            scale: [
              { value: 0.8, duration: 2000 },
              { value: 1.2, duration: 2000 },
            ],
            rotate: 360,
            opacity: [
              { value: 0.2, duration: 1000 },
              { value: 0.6, duration: 1000 },
            ],
            duration: () => random(5000, 10000),
            delay: random(0, 2000),
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine',
          });

          animationRef.current.push(animation);
        });

        // Draw connections between nearby particles
        const getParticlePositions = () => {
          const positions: Array<{ x: number; y: number }> = [];
          particles.forEach((particle) => {
            const rect = particle.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            positions.push({
              x: ((rect.left + rect.width / 2 - containerRect.left) / containerRect.width) * 100,
              y: ((rect.top + rect.height / 2 - containerRect.top) / containerRect.height) * 100,
            });
          });
          return positions;
        };

        const drawConnections = () => {
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
            ctx.lineWidth = 1;

            const positions = getParticlePositions();

            for (let i = 0; i < positions.length; i++) {
              for (let j = i + 1; j < positions.length; j++) {
                const dx = (positions[i].x - positions[j].x) * canvas.width / 100;
                const dy = (positions[i].y - positions[j].y) * canvas.height / 100;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                  ctx.beginPath();
                  ctx.moveTo(
                    (positions[i].x * canvas.width) / 100,
                    (positions[i].y * canvas.height) / 100
                  );
                  ctx.lineTo(
                    (positions[j].x * canvas.width) / 100,
                    (positions[j].y * canvas.height) / 100
                  );
                  ctx.stroke();
                }
              }
            }

            requestAnimationFrame(drawConnections);
          }
        };

        drawConnections();

        // Mouse interaction effect
        const handleMouseMove = (e: MouseEvent) => {
          const rect = container.getBoundingClientRect();
          const mouseX = (e.clientX - rect.left) / rect.width;
          const mouseY = (e.clientY - rect.top) / rect.height;

          const positions = getParticlePositions();

          particles.forEach((particle, index) => {
            const dx = mouseX - positions[index].x / 100;
            const dy = mouseY - positions[index].y / 100;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 0.15) {
              const force = (0.15 - distance) * 50;
              const angle = Math.atan2(dy, dx);

              animate(particle, {
                translateX: `-=${Math.cos(angle) * force}%`,
                translateY: `-=${Math.sin(angle) * force}%`,
                scale: 1.3,
                duration: 300,
                easing: 'easeOutQuad',
              });
            }
          });
        };

        container.addEventListener('mousemove', handleMouseMove);
      });
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (canvasRef.current) {
        canvasRef.current.remove();
      }
      Array.from(container.children).forEach((child) => child.remove());
      animationRef.current.forEach((anim) => anim?.pause?.());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none -z-10"
      aria-hidden="true"
    />
  );
}
