/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#07090e',
          900: '#0b0e14',
          850: '#10141d',
          800: '#161c27',
          750: '#1d2534',
          700: '#263143',
          600: '#38465e'
        },
        trade: {
          green: '#00f090',
          greenDark: '#059669',
          greenBg: 'rgba(0, 240, 144, 0.1)',
          red: '#ff3b57',
          redDark: '#dc2626',
          redBg: 'rgba(255, 59, 87, 0.1)',
          cyan: '#00d2ff',
          amber: '#fbbf24'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}

