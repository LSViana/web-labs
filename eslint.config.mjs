import withNuxt from './.nuxt/eslint.config.mjs'

import tailwindCssPlugin from 'eslint-plugin-tailwindcss'
import stylistic from '@stylistic/eslint-plugin'

// To debug this configuration file, run: `npx @eslint/config-inspector`.
export default withNuxt([
  ...tailwindCssPlugin.configs['flat/recommended'],
  {
    plugins: {
      '@stylistic': stylistic,
    }
  }
])
  .override('nuxt/typescript/rules', {
    // Ignores the submodules (like the React project).
    ignores: [ 'submodules/**' ]
  })
