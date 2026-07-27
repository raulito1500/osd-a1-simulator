/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'oklch(88.3% 0.021 293.0)',
          100: 'oklch(85.8% 0.051 293.0)',
          200: 'oklch(81.5% 0.099 293.0)',
          300: 'oklch(75.3% 0.163 293.0)',
          400: 'oklch(64.2% 0.223 293.0)',
          500: 'oklch(54.1% 0.247 293.0)',
          600: 'oklch(44.7% 0.243 293.0)',
          700: 'oklch(36.9% 0.213 293.0)',
          800: 'oklch(28.9% 0.175 293.0)',
          900: 'oklch(23.4% 0.140 293.0)',
          950: 'oklch(13.4% 0.099 293.0)',
        },
        paper: {
          DEFAULT: '#fffbf0',
          edge: '#efe7cf',
          rule: '#efe9da',
          text: '#3a3327',
        },
      },
      fontFamily: {
        'roboto-mono': ['Roboto Mono', 'monospace'],
      },
      fontSize: {
        'xs': '11px',
      },
    },

  },
  plugins: [],
}
