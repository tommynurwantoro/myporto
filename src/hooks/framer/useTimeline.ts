import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface UseTimelineOptions {
  containerRef?: React.RefObject<HTMLElement>;
  itemCount: number;
  offset?: [string, string];
}

interface UseTimelineReturn {
  progress: ReturnType<typeof useTransform>['get'];
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  containerRef: React.RefObject<HTMLElement>;
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
    offset,
  });

  // Map scroll progress to 0-1 range for each item
  const progress = useTransform(scrollYProgress, [0, 1], [0, itemCount]);

  return {
    progress,
    scrollYProgress,
    containerRef,
  };
}

export { useScroll, useTransform };