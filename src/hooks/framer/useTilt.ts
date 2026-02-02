import { useMotionValue, useTransform, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface UseTiltOptions {
  tiltRange?: number;
  perspective?: number;
  smoothing?: number;
}

interface UseTiltReturn {
  rotateX: motion.MotionValue<number>;
  rotateY: motion.MotionValue<number>;
  scale: motion.MotionValue<number>;
  ref: React.RefObject<HTMLDivElement>;
  reset: () => void;
}

export function useTilt({
  tiltRange = 8,
  perspective = 1000,
  smoothing = 0.1,
}: UseTiltOptions = {}): UseTiltReturn {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-1, 1], [tiltRange, -tiltRange]);
  const rotateY = useTransform(mouseX, [-1, 1], [-tiltRange, tiltRange]);
  const scale = useMotionValue(1);

  const reset = () => {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      targetX = (e.clientX - centerX) / (rect.width / 2);
      targetY = (e.clientY - centerY) / (rect.height / 2);

      const animate = () => {
        mouseX.set(mouseX.get() + (targetX - mouseX.get()) * smoothing);
        mouseY.set(mouseY.get() + (targetY - mouseY.get()) * smoothing);
        rafId = requestAnimationFrame(animate);
      };

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => {
      scale.set(1.05);
    };

    const handleMouseLeave = () => {
      cancelAnimationFrame(rafId);
      mouseX.set(0);
      mouseY.set(0);
      scale.set(1);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY, scale, smoothing]);

  return { rotateX, rotateY, scale, ref, reset };
}