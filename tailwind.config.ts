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
      }
    }
  }
}
