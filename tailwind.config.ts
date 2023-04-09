import colors from 'tailwindcss/colors'

import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
        muted: colors.slate[500]
      }
    }
  }
}
