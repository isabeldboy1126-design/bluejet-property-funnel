/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#2563EB',
          600: '#0052FF', // Bright royal blue action/accent
          700: '#1D4ED8',
          800: '#112552',
          900: '#0B1B3D', // Deep navy blue trust/base
          950: '#060D1E',
        },
        surface: {
          light: '#F8FAFC',
          card: '#FFFFFF',
          muted: '#F1F5F9',
          border: '#E2E8F0',
        },
        ink: {
          dark: '#0F172A',
          muted: '#475569',
          subtle: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 24px -2px rgba(18, 24, 22, 0.06), 0 2px 6px -1px rgba(18, 24, 22, 0.03)',
        'card-hover': '0 12px 36px -4px rgba(18, 24, 22, 0.1), 0 4px 12px -2px rgba(18, 24, 22, 0.05)',
      }
    },
  },
  plugins: [],
};
