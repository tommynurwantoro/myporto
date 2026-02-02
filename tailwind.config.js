/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic background colors
        background: {
          primary: '#0F172A', // slate-950
          secondary: '#1E293B', // slate-900
          tertiary: '#334155', // slate-800
        },

        // Text colors
        'text-primary': '#F8FAFC', // slate-50
        'text-secondary': '#E2E8F0', // slate-200
        'text-muted': '#94A3B8', // slate-400

        // Accent colors
        accent: {
          primary: '#10B981', // emerald-500
          secondary: '#34D399', // emerald-400
          dark: '#059669', // emerald-600
          light: '#6EE7B7', // emerald-300
        },

        // Surface colors (glassmorphism)
        surface: {
          glass: 'rgba(30, 41, 59, 0.7)',
          'glass-hover': 'rgba(30, 41, 59, 0.85)',
        },
      },

      fontFamily: {
        heading: ['Archivo', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
      },

      fontSize: {
        display: ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'h3': ['1.875rem', { lineHeight: '1.4' }],
        'h4': ['1.5rem', { lineHeight: '1.4' }],
      },

      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.6s ease-out',
        'slide-in-left': 'slide-in-left 0.6s ease-out',
        'scale-in': 'scale-in 0.5s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer-gradient': 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
      },

      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
