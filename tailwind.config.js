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
          50: '#F2F7F4',
          100: '#E1EFE7',
          200: '#C3DFCE',
          300: '#9AC9AE',
          400: '#68AC85',
          500: '#439063',
          600: '#2E734B',
          700: '#235C3C',
          800: '#1B472F',
          900: '#133E2B',
          950: '#092116',
        },
        surface: {
          light: '#FAF9F5',
          card: '#FFFFFF',
          muted: '#F4F3ED',
          border: '#E8E7DF',
        },
        ink: {
          dark: '#121816',
          muted: '#525E58',
          subtle: '#88958F',
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
