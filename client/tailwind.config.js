/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
        stateCyan: {
          DEFAULT: '#0284C7', // Accent Sky Blue for QR & Links
          light: '#38BDF8',
          dark: '#0369A1',
        },
        stateGreen: {
          DEFAULT: '#10B981', // Escrow & Tax Success Green
          emerald: '#059669', // Cross River Forest Canopy
          light: '#34D399',
          dark: '#047857',
        },
        stateGold: {
          DEFAULT: '#F59E0B', // Royal Cultural Gold
          light: '#FBBF24',
          dark: '#D97706',
        },
        stateBg: {
          light: '#F8FAFC',   // Clean Off-White Background
          cardLight: '#FFFFFF',
          cardSubtle: '#F1F5F9',
          borderLight: '#E2E8F0',
          textMainLight: '#0F172A',
          textMutedLight: '#64748B',
        },
        calabar: {
          bg: "#090d16",
          card: "#111827",
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
        'cyan-glow': '0 0 25px -5px rgba(2, 132, 199, 0.3)',
        'card-light': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
