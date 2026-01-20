/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'void-black': '#000000',
        'neon-cyan': '#00f3ff',
        'deep-violet': '#7b2cbf',
        'glass-white': 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'], // Using mono for headers as requested for "Space Grotesk" usually fits tech vibe
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out forwards',
        'pulse-slow': 'pulse 3s infinite',
        'glitch': 'glitch 1s linear infinite',
      },
      keyframes: {
        glitch: {
          '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
          '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
          '62%': { transform: 'translate(0,0) skew(5deg)' },
        },
      },
    },
  },
  plugins: [],
}
