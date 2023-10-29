import colors from 'tailwindcss/colors'

import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
      mono: ['Roboto\\ Mono', 'monospace']
    },
    extend: {
      colors: {
        primary: colors.sky,
        muted: {
          DEFAULT: colors.slate[500],
          dark: colors.slate[300]
        }
      },
      keyframes: {
        bolt: {
          from: { transform: 'translateX(-270px)' },
          to: { transform: 'translateX(0)' }
        }
      },
      animation: {
        bolt: 'bolt 1s linear infinite'
      }
    }
  }
}
