/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.75rem',
      },
      'max-width': {
        DEFAULT: '100%',
        sm: '640px',
        md: '500px',
        lg: '800px',
        xl: '800px',
      },
    },
    extend: {
      colors: {
        background: 'oklch(var(--background) / <alpha-value>)',
        foreground: 'oklch(var(--foreground) / <alpha-value>)',
        border: 'oklch(var(--border) / <alpha-value>)',
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground) / <alpha-value>)',
        },
        red: 'oklch(var(--red) / <alpha-value>)',
        green: 'oklch(var(--green) / <alpha-value>)',
        yellow: 'oklch(var(--yellow) / <alpha-value>)',
        blue: 'oklch(var(--blue) / <alpha-value>)',
        magenta: 'oklch(var(--magenta) / <alpha-value>)',
        cyan: 'oklch(var(--cyan) / <alpha-value>)',
        white: 'oklch(var(--white) / <alpha-value>)',
        black: 'oklch(var(--black) / <alpha-value>)',
      },
      backgroundImage: {
        pepe: 'linear-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
