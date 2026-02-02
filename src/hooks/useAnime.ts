import { useEffect, useRef } from 'react';

// Type definitions for animejs parameters (without targets)
interface AnimeParams {
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  scale?: number | [number, number];
  opacity?: number | [number, number];
  rotate?: number | string;
  duration?: number;
  delay?: any;
  easing?: string | ((anim: unknown, p: number) => number);
  direction?: 'normal' | 'reverse' | 'alternate';
  loop?: boolean;
  autoplay?: boolean;
  round?: number;
  update?: (anim: unknown) => void;
  begin?: () => void;
  end?: () => void;
  complete?: () => void;
  text?: string | (() => string);
  value?: number | string;
  strokeDashoffset?: number | [number, number];
  textShadow?: string | (() => string);
  [key: string]: any;
}

// Type for targets
type AnimeTargets = string | Element | Element[] | NodeListOf<Element> | object;

/**
 * Helper function to create stagger delay callback
 */
function staggerDelay(amount: number, start = 0) {
  return (_el: any, i: number) => start + i * amount;
}

/**
 * Hook for running Anime.js animations on mount
 */
export function useAnime(targets: AnimeTargets, params: AnimeParams, deps: React.DependencyList = []) {
  const animationRef = useRef<any>(null);

  useEffect(() => {
    // Import animejs dynamically to avoid build issues
    import('animejs').then(({ animate }) => {
      // Clean up previous animation
      if (animationRef.current) {
        animationRef.current.pause();
      }

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        // Skip animation, just set final values
        if (targets) {
          const targetsList = typeof targets === 'string'
            ? document.querySelectorAll(targets)
            : targets;

          if (Array.isArray(targetsList)) {
            targetsList.forEach((target: any) => {
              if (target && params.translateX !== undefined) {
                const tx = Array.isArray(params.translateX) ? params.translateX[1] : params.translateX;
                (target as HTMLElement).style.transform = `translateX(${tx})`;
              }
              if (params.opacity !== undefined) {
                const op = Array.isArray(params.opacity) ? params.opacity[1] : params.opacity;
                (target as HTMLElement).style.opacity = op.toString();
              }
            });
          }
        }
        return;
      }

      // Create new animation with correct API: animate(targets, parameters)
      animationRef.current = animate(targets, {
        ...params,
        autoplay: params.autoplay ?? true,
      });
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targets, ...deps]);

  return animationRef;
}

/**
 * Staggered animation for lists/grids
 */
export function useStaggerAnimation(
  selector: string,
  params: AnimeParams,
  staggerAmount: number = 100,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    import('animejs').then(({ animate }) => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        // Just show elements without animation
        const targets = document.querySelectorAll(selector);
        targets.forEach((target: Element) => {
          (target as HTMLElement).style.opacity = '1';
          (target as HTMLElement).style.transform = 'translateY(0)';
        });
        return;
      }

      animate(selector, {
        ...params,
        delay: staggerDelay(staggerAmount),
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, staggerAmount, ...deps]);
}

/**
 * Text scramble/typing effect
 */
export function useTextScramble(
  selector: string,
  texts: string[],
  duration: number = 2000,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const element = document.querySelector(selector) as HTMLElement;
    if (!element) return;

    let index = 0;
    let timeoutId: number | null = null;

    const scramble = () => {
      import('animejs').then(({ animate }) => {
        const text = texts[index];
        const letters = text.split('');

        // Clear element
        element.textContent = '';

        // Create spans for each letter
        letters.forEach((letter) => {
          const span = document.createElement('span');
          span.textContent = letter;
          span.style.opacity = '0';
          span.className = 'inline-block';
          element.appendChild(span);
        });

        // Animate letters in
        animate(`${selector} span`, {
          opacity: [0, 1],
          translateY: [-20, 0],
          scale: [0.5, 1],
          easing: 'easeOutExpo',
          duration: 500,
          delay: staggerDelay(30),
          complete: () => {
            // Move to next text after delay
            timeoutId = window.setTimeout(() => {
              index = (index + 1) % texts.length;
              scramble();
            }, duration);
          }
        });
      });
    };

    scramble();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      element.textContent = texts[0];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, texts.length, duration, ...deps]);
}

/**
 * Counter animation for statistics
 */
export function useCounterAnimation(
  selector: string,
  endValue: number,
  duration: number = 2000,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const element = document.querySelector(selector) as HTMLElement;
    if (!element) return;

    import('animejs').then(({ animate }) => {
      const obj = { value: 0 };

      animate(obj, {
        value: endValue,
        round: 1,
        easing: 'easeOutExpo',
        duration,
        update: () => {
          element.textContent = Math.round(obj.value).toString();
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, endValue, duration, ...deps]);
}

/**
 * Morphing shape animation
 */
export function useMorphAnimation(
  selector: string,
  params: AnimeParams,
  deps: React.DependencyList = []
) {
  useAnime(selector, params, deps);
}

/**
 * Timeline animation for experience/education
 */
export function useTimelineAnimation(
  selector: string,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const items = document.querySelectorAll(`${selector} > div`);
    if (items.length === 0) return;

    import('animejs').then(({ animate }) => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        // Just show all items without animation
        items.forEach((item: Element) => {
          (item as HTMLElement).style.opacity = '1';
          (item as HTMLElement).style.transform = 'translateY(0)';
        });
        return;
      }

      // Animate timeline items
      animate(items, {
        opacity: [0, 1],
        translateY: [50, 0],
        scale: [0.95, 1],
        easing: 'easeOutExpo',
        duration: 800,
        delay: staggerDelay(150),
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, ...deps]);
}

/**
 * Floating animation for background elements
 */
export function useFloatAnimation(
  selector: string,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    import('animejs').then(({ animate }) => {
      const targets = document.querySelectorAll(selector);

      targets.forEach((target) => {
        animate(target, {
          translateY: () => (Math.random() - 0.5) * 50,
          translateX: () => (Math.random() - 0.5) * 50,
          scale: [0.8, 1, 0.8],
          opacity: [0.3, 0.6, 0.3],
          duration: () => Math.random() * 3000 + 5000,
          direction: 'alternate',
          loop: true,
          easing: 'easeInOutSine',
        });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, ...deps]);
}

/**
 * Scroll-triggered path animation for SVG
 */
export function usePathAnimation(
  pathSelector: string,
  duration: number = 2000,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    import('animejs').then(({ animate }) => {
      const path = document.querySelector(pathSelector) as SVGPathElement;
      if (!path) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        path.style.strokeDasharray = '';
        return;
      }

      const length = path.getTotalLength();

      // Set initial state
      path.style.strokeDasharray = length.toString();
      path.style.strokeDashoffset = length.toString();

      // Animate path drawing
      animate(path, {
        strokeDashoffset: [length, 0],
        easing: 'easeInOutQuad',
        duration,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathSelector, duration, ...deps]);
}

/**
 * Magnetic button effect
 */
export function useMagneticButton(
  selector: string,
  strength: number = 0.3,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLElement>(selector);

    const cleanups: Array<() => void> = [];

    buttons.forEach((button) => {
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = button.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left - rect.width / 2;
        const y = mouseEvent.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      };

      const handleMouseLeave = () => {
        button.style.transform = '';
      };

      button.addEventListener('mousemove', handleMouseMove);
      button.addEventListener('mouseleave', handleMouseLeave);

      cleanups.push(() => {
        button.removeEventListener('mousemove', handleMouseMove);
        button.removeEventListener('mouseleave', handleMouseLeave);
      });
    });

    return () => {
      cleanups.forEach(cleanup => cleanup());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, strength, ...deps]);
}

/**
 * Wave animation for text
 */
export function useWaveAnimation(
  selector: string,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    import('animejs').then(({ animate }) => {
      animate(`${selector} span`, {
        translateY: [
          { value: -5, duration: 300 },
          { value: 5, duration: 300 },
          { value: -5, duration: 300 },
          { value: 5, duration: 300 },
          { value: 0, duration: 300 },
        ],
        easing: 'easeInOutSine',
        delay: staggerDelay(100),
        loop: true,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, ...deps]);
}

/**
 * Glitch text effect
 */
export function useGlitchText(
  selector: string,
  text: string,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const element = document.querySelector(selector) as HTMLElement;
    if (!element) return;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const textLen = text.length;
    let iteration = 0;
    let timeoutId: number | null = null;

    const glitch = () => {
      import('animejs').then(({ animate }) => {
        iteration = 0;

        animate(element, {
          text: () => {
            let output = '';

            for (let i = 0; i < textLen; i++) {
              if (i < iteration) {
                output += text[i];
              } else if (i === iteration) {
                output += characters[Math.floor(Math.random() * characters.length)];
              } else {
                output += text[i];
              }
            }

            if (iteration >= textLen + 1) {
              return text;
            }

            return output;
          },
          duration: 30,
          easing: 'linear',
          complete: () => {
            iteration = textLen + 1;
            timeoutId = window.setTimeout(() => glitch(), 50);
          },
        });
      });
    };

    timeoutId = window.setTimeout(glitch, 2000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, text, ...deps]);
}

/**
 * Continuous rotation animation
 */
export function useRotateAnimation(
  selector: string,
  duration: number = 10000,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    import('animejs').then(({ animate }) => {
      animate(selector, {
        rotate: '1turn',
        duration,
        loop: true,
        easing: 'linear',
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, duration, ...deps]);
}

/**
 * Bounce animation with scaling
 */
export function useBounceAnimation(
  selector: string,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    import('animejs').then(({ animate }) => {
      animate(selector, {
        translateY: [
          { value: -10, duration: 300 },
          { value: 10, duration: 300 },
          { value: -5, duration: 150 },
          { value: 5, duration: 150 },
          { value: 0, duration: 300 },
        ],
        scale: [
          { value: 1, duration: 300 },
          { value: 1.1, duration: 150 },
          { value: 1, duration: 150 },
        ],
        easing: 'easeInOutQuad',
        loop: true,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, ...deps]);
}

/**
 * Shimmer effect on hover
 */
export function useShimmerEffect(
  selector: string,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(selector);

    const cleanups: Array<() => void> = [];

    elements.forEach((element) => {
      let animationRef: any = null;

      const handleMouseEnter = () => {
        import('animejs').then(({ animate }) => {
          const target = element.querySelector('[data-shimmer]') || element;
          animationRef = animate(target, {
            translateX: ['100%', '-200%'],
            easing: 'linear',
            duration: 1500,
            loop: true,
          });
        });
      };

      const handleMouseLeave = () => {
        if (animationRef) {
          animationRef.pause();
        }
      };

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      cleanups.push(() => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    });

    return () => {
      cleanups.forEach(cleanup => cleanup());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, ...deps]);
}

/**
 * Spotlight effect following mouse
 */
export function useSpotlightEffect(
  containerSelector: string,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const cards = container.querySelectorAll('[data-spotlight]');
      const rect = container.getBoundingClientRect();
      const mouseX = mouseEvent.clientX - rect.left;

      cards.forEach((card: Element) => {
        const htmlCard = card as HTMLElement;
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2 - rect.left;
        const distance = Math.abs(mouseX - cardCenter);
        const maxDistance = rect.width / 2;

        const intensity = Math.max(0, 1 - distance / maxDistance);

        // Update CSS variable for spotlight
        htmlCard.style.setProperty('--spotlight-intensity', intensity.toString());
      });
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerSelector, ...deps]);
}

/**
 * Hero text reveal animation
 */
export function useHeroReveal(
  selectors: {
    name: string;
    title: string;
    description: string;
    cta: string;
  },
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Just show all elements without animation
      Object.values(selectors).forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el: Element) => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'translateY(0)';
        });
      });
      return;
    }

    import('animejs').then(({ animate }) => {
      // Animate all elements with stagger
      const allSelectors = [selectors.name, selectors.title, selectors.description, selectors.cta];
      animate(allSelectors.flatMap(s => document.querySelectorAll(s)), {
        translateY: [50, 0],
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 800,
        easing: 'easeOutExpo',
        delay: staggerDelay(150),
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectors.name, selectors.title, selectors.description, selectors.cta, ...deps]);
}

/**
 * Card 3D tilt effect
 */
export function useCardTilt(
  selector: string,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(selector);

    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = card.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 10; // Max 10deg rotation
        const rotateY = ((x - centerX) / centerX) * -10; // Max -10deg rotation

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05)`;
      };

      const handleMouseLeave = () => {
        card.style.transform = '';
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      cleanups.push(() => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    });

    return () => {
      cleanups.forEach(cleanup => cleanup());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, ...deps]);
}

/**
 * Text splitting for letter-by-letter animation
 */
export function useTextSplit(
  selector: string,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const element = document.querySelector(selector) as HTMLElement;
    if (!element) return;

    const text = element.textContent || '';
    const letters = text.split('');

    // Clear element
    element.innerHTML = '';

    // Create spans for each letter
    letters.forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter === ' ' ? '\u00A0' : letter;
      span.className = 'inline-block opacity-0';
      span.style.animationDelay = `${index * 50}ms`;
      element.appendChild(span);
    });

    // Trigger animations
    setTimeout(() => {
      Array.from(element.children).forEach((span) => {
        span.classList.add('animate-letter-in');
      });
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, ...deps]);
}

/**
 * Parallax effect on scroll
 */
export function useParallax(
  selectors: Record<string, string>,
  speed: number = 0.5,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      Object.values(selectors).forEach((selector) => {
        const elements = document.querySelectorAll(selector);

        elements.forEach((element: Element) => {
          const htmlElement = element as HTMLElement;
          const offset = parseFloat(htmlElement.getAttribute('data-speed') || '0');
          const yPos = -(scrollY * (speed + parseFloat(offset.toString())));
          htmlElement.style.transform = `translateY(${yPos}px)`;
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Object.keys(selectors).join(','), speed, ...deps]);
}

/**
 * Magnetic effect that pulls elements towards cursor
 */
export function useMagneticPull(
  selector: string,
  pullStrength: number = 0.3,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(selector);

    const cleanups: Array<() => void> = [];

    elements.forEach((element) => {
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (mouseEvent.clientX - centerX) / rect.width;
        const deltaY = (mouseEvent.clientY - centerY) / rect.height;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < 1) {
          const force = (1 - distance) * pullStrength;

          element.style.transform = `translate(${deltaX * force * 50}px, ${deltaY * force * 50}px)`;
        }
      };

      const handleMouseLeave = () => {
        element.style.transform = '';
      };

      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);

      // Make element focusable for keyboard users
      if (!element.getAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
      }

      cleanups.push(() => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    });

    return () => {
      cleanups.forEach(cleanup => cleanup());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, pullStrength, ...deps]);
}

/**
 * Reveal animation with staggered children
 */
export function useRevealAnimation(
  selector: string,
  staggerAmount: number = 100,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    import('animejs').then(({ animate }) => {
      if (!signal.aborted) {
        animate(selector, {
          opacity: [0, 1],
          translateY: [30, 0],
          easing: 'easeOutExpo',
          delay: staggerDelay(staggerAmount),
        });
      }
    });

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, staggerAmount, ...deps]);
}

/**
 * Spring physics animation
 */
export function useSpringAnimation(
  selector: string,
  _stiffness: number = 100,
  _damping: number = 10,
  _mass: number = 1,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    import('animejs').then(({ animate }) => {
      if (!signal.aborted) {
        animate(selector, {
          translateY: [100, 0],
          autoplay: true,
          easing: 'spring(1, 80, 10, 1)',
        });
      }
    });

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, _stiffness, _damping, _mass, ...deps]);
}

/**
 * Text path following animation
 */
export function useTextPathAnimation(
  textSelector: string,
  pathSelector: string,
  duration: number = 2000,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    import('animejs').then(({ animate }) => {
      if (signal.aborted) return;

      const textPath = document.querySelector(textSelector) as SVGTextPathElement;
      const path = document.querySelector(pathSelector) as SVGPathElement;

      if (!textPath || !path) return;

      const length = path.getTotalLength();

      // Set initial state
      path.style.strokeDasharray = length.toString();
      path.style.strokeDashoffset = length.toString();

      // Animate path drawing
      animate(path, {
        strokeDashoffset: [length, 0],
        duration,
        easing: 'easeInOutQuad',
      });
    });

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textSelector, pathSelector, duration, ...deps]);
}
