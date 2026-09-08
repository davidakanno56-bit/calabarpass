/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
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
