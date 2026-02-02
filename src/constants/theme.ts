/**
 * Design System Constants for Tommy Portfolio
 * Modern glassmorphism dark theme with emerald accent
 */

export const COLORS = {
  // Semantic colors
  background: {
    primary: '#0F172A', // slate-950 - Main background
    secondary: '#1E293B', // slate-900 - Cards/sections
    tertiary: '#334155', // slate-800 - Elevated elements
  },

  surface: {
    glass: 'rgba(30, 41, 59, 0.7)', // Glassmorphism background
    glassHover: 'rgba(30, 41, 59, 0.85)',
    border: 'rgba(255, 255, 255, 0.1)',
    borderHover: 'rgba(16, 185, 129, 0.3)',
  },

  // Brand accent
  accent: {
    primary: '#10B981', // emerald-500
    secondary: '#34D399', // emerald-400
    dark: '#059669', // emerald-600
    light: '#6EE7B7', // emerald-300
  },

  // Text colors
  text: {
    primary: '#F8FAFC', // slate-50 - Headings
    secondary: '#E2E8F0', // slate-200 - Body text
    muted: '#94A3B8', // slate-400 - Secondary text
    disabled: '#64748B', // slate-500
  },

  // Functional colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

export const TYPOGRAPHY = {
  fonts: {
    heading: "'Archivo', sans-serif",
    body: "'Space Grotesk', sans-serif",
  },

  sizes: {
    display: 'text-5xl md:text-7xl', // Hero title
    h1: 'text-4xl md:text-5xl', // Page titles
    h2: 'text-3xl md:text-4xl', // Section titles
    h3: 'text-2xl md:text-3xl', // Card titles
    h4: 'text-xl md:text-2xl', // Subtitles
    body: 'text-base md:text-lg', // Body text
    small: 'text-sm', // Small text
    xs: 'text-xs', // Extra small
  },

  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  lineHeights: {
    tight: 'leading-tight', // 1.25
    normal: 'leading-normal', // 1.5
    relaxed: 'leading-relaxed', // 1.625
  },
} as const;

export const SPACING = {
  // Base spacing scale (8px base)
  xs: '0.5rem', // 8px
  sm: '0.75rem', // 12px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  '2xl': '3rem', // 48px
  '3xl': '4rem', // 64px
  '4xl': '6rem', // 96px

  // Section spacing
  section: {
    mobile: 'py-16', // 64px vertical
    desktop: 'md:py-24', // 96px vertical
  },

  // Container
  container: {
    padding: 'px-4 md:px-6',
    maxWidth: 'max-w-7xl',
    narrow: 'max-w-3xl',
  },

  // Gap between elements
  gap: {
    xs: 'gap-2',
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  },
} as const;

export const ANIMATIONS = {
  duration: {
    instant: '100ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },

  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-out
    in: 'cubic-bezier(0.4, 0, 1, 1)', // ease-in
    inout: 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-in-out
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Scroll reveal classes
  reveal: {
    fade: 'reveal-fade',
    slideUp: 'reveal-slide-up',
    slideLeft: 'reveal-slide-left',
    slideRight: 'reveal-slide-right',
    scale: 'reveal-scale',
  },
} as const;

export const EFFECTS = {
  // Glassmorphism
  glass: {
    base: 'backdrop-blur-md bg-surface-glass border border-surface-border',
    hover: 'hover:bg-surface-glassHover hover:border-surface-borderHover',
  },

  // Shadows
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    glow: '0 0 20px rgba(16, 185, 129, 0.3)',
  },

  // Transitions
  transition: {
    default: 'transition-all duration-200 ease-out',
    fast: 'transition-all duration-150 ease-out',
    slow: 'transition-all duration-300 ease-out',
    colors: 'transition-colors duration-200 ease-out',
    transform: 'transition-transform duration-200 ease-out',
  },

  // Focus states
  focus: {
    default: 'focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary',
    inset: 'focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-inset',
  },
} as const;

export const LAYOUT = {
  // Container sizes
  container: {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
  },

  // Grid columns
  grid: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    },
  },

  // Z-index scale
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modalBackdrop: 40,
    modal: 50,
    tooltip: 60,
  },
} as const;

// Component-specific constants
export const COMPONENTS = {
  // Button
  button: {
    padding: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
    rounded: 'rounded-lg',
  },

  // Card
  card: {
    padding: 'p-6',
    rounded: 'rounded-xl',
    gap: 'space-y-4',
  },

  // Input
  input: {
    padding: 'px-4 py-2',
    rounded: 'rounded-lg',
    border: 'border border-surface-border',
    focus: 'focus:border-accent-primary',
  },

  // Modal
  modal: {
    padding: 'p-6',
    rounded: 'rounded-2xl',
    maxWidth: 'max-w-2xl',
  },
} as const;

// Accessibility constants
export const A11Y = {
  // Touch target size (minimum 44x44px)
  touchTarget: 'min-w-[44px] min-h-[44px]',

  // Skip links
  skipLink: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100]',

  // Reduced motion
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
} as const;

// Legacy constants for backwards compatibility
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
