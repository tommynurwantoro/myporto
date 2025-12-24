import { useEffect, useRef, useState, type RefObject } from 'react';

export function useInView(
  options: IntersectionObserverInit = {}
): [RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Validate options
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px',
      ...options,
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element); // Stop observing once in view
        }
      },
      observerOptions
    );

    try {
      observer.observe(element);
    } catch (error) {
      console.error('Error observing element:', error);
    }

    return () => {
      if (element && observer) {
        try {
          observer.unobserve(element);
        } catch (error) {
          // Element may have been removed from DOM
        }
      }
    };
  }, [options.root, options.rootMargin, options.threshold]);

  return [ref, isInView] as const;
} 