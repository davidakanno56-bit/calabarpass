/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Official Cross River State & Enterprise Palette
        stateBlue: {
          DEFAULT: '#0A2540', // Deep Trust Blue
          dark: '#061729',
          light: '#1E3A8A',
        },
        stateCyan: '#0284C7',   // Accent Sky Blue for QR & Links
        stateGreen: '#10B981',  // Escrow & Tax Success Green
        stateBg: '#F8FAFC',     // Clean Off-White Background
        calabar: {
          bg: "#0b0f17",
          card: "#121826",
          cardHover: "#182235",
          border: "#1e293b",
          gold: "#f59e0b",
          goldLight: "#fbbf24",
          goldDark: "#d97706",
          emerald: "#10b981",
          emeraldDark: "#059669",
          crimson: "#ef4444",
          purple: "#8b5cf6"
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.025em',
        snug: '-0.015em',
        normal: '-0.01em',
        wide: '0.025em',
        wider: '0.06em',
        widest: '0.12em',
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(245, 158, 11, 0.3)',
        'emerald-glow': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
