/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E8F5E8',
          100: '#C8E6C8',
          200: '#A5D6A5',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
        },
        green: {
          50: '#E8F5E8',
          100: '#C8E6C8',
          200: '#A5D6A5',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
        }
      },
      fontFamily: {
        'urdu': ['Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', 'serif'],
        'latin': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'urdu-sm': ['18px', '28px'],
        'urdu-base': ['20px', '32px'],
        'urdu-lg': ['24px', '36px'],
        'urdu-xl': ['28px', '40px'],
        'urdu-2xl': ['32px', '44px'],
      },
      boxShadow: {
        'key': '0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'key-pressed': '0 1px 2px rgba(0, 0, 0, 0.1)',
        'textarea': '0 4px 12px rgba(46, 125, 50, 0.15)',
      },
      animation: {
        'key-press': 'keyPress 100ms ease-out',
        'fade-in': 'fadeIn 300ms ease-out',
      },
      keyframes: {
        keyPress: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}