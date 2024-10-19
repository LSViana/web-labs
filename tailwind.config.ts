import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Partial<Config> = {
  theme: {
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
      mono: ['Roboto\\ Mono', 'monospace']
    },
    extend: {
      colors: {
        primary: colors.sky,
        secondary: colors.gray,
        danger: colors.red,
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
