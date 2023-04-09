import colors from 'tailwindcss/colors'

import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: colors.violet,
        muted: colors.slate[500]
      }
    }
  }
}
