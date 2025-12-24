/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          400: '#10b981',
          500: '#34d399',
          600: '#059669',
        },
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'fade-in': 'fade-in 1s ease-in',
        'slide-up': 'slide-up 0.8s ease-out',
        'floating': 'floating 3s ease-in-out infinite',
        'typing': 'typing 1s steps(40) infinite',
        'glow': 'glow 2s linear infinite',
        'shine': 'shine 3s infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'floating': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'typing': {
          '0%': { borderColor: 'transparent' },
          '50%': { borderColor: '#10b981' },
          '100%': { borderColor: 'transparent' },
        },
        'glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'shine': {
          '0%': { transform: 'translateX(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(100%) rotate(45deg)' },
        },
      },
      backgroundSize: {
        'gradient': '200% auto',
      },
    },
  },
  plugins: [],
}
