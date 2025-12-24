/**
 * Theme constants for consistent styling across the application
 */

export const COLORS = {
  primary: {
    emerald: '#10b981',
    emeraldDark: '#059669',
    emeraldLight: '#34d399',
  },
  secondary: {
    blue: '#3b82f6',
    purple: '#8b5cf6',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },
} as const;

export const SPACING = {
  section: {
    mobile: 'py-16',
    desktop: 'md:py-32',
  },
  container: {
    padding: 'px-6',
    maxWidth: 'max-w-6xl',
  },
} as const;

export const ANIMATIONS = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '1000ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

export const PARTICLES = {
  count: 20,
  minDelay: 0,
  maxDelay: 4,
  minDuration: 3,
  maxDuration: 5,
} as const;

export const PROJECTS = {
  autoRotateInterval: 5000,
  transitionDuration: 500,
} as const;

