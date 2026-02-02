import { useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface UseTimelineOptions {
  containerRef?: React.RefObject<HTMLElement | null>;
  itemCount: number;
  offset?: Readonly<['start end', 'end start']>;
}

interface UseTimelineReturn {
  progress: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  containerRef: React.RefObject<HTMLElement | null>;
}

export function useTimeline({
  containerRef: externalRef,
  itemCount,
  offset = ['start end', 'end start'],
}: UseTimelineOptions): UseTimelineReturn {
  const internalRef = useRef<HTMLElement>(null);
  const containerRef = externalRef || internalRef;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset as any,
  });

  // Map scroll progress to 0-itemCount range
  const progress = useTransform(scrollYProgress, [0, 1], [0, itemCount]);

  return {
    progress,
    scrollYProgress,
    containerRef,
  };
}

export { useScroll, useTransform };