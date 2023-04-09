import colors from 'tailwindcss/colors'

import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
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
