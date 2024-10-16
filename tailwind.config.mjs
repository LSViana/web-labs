import colors from 'tailwindcss/colors'

/**
 * @typedef {import('tailwindcss').Config} Config
 * @type {Partial<Config>}
 */
const config = {
  theme: {
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
      mono: ['Roboto\\ Mono', 'monospace']
    },
    extend: {
      colors: {
        primary: colors.sky,
        warning: colors.amber,
        muted: {
          DEFAULT: colors.slate[500],
          dark: colors.slate[300]
        }
      }
    }
  }
}

export default config
