import withNuxt from './.nuxt/eslint.config.mjs'

import tailwindCssPlugin from 'eslint-plugin-tailwindcss'
import stylisticPlugin from '@stylistic/eslint-plugin'
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort'

// To debug this configuration file, run: `npx @eslint/config-inspector`.
export default withNuxt([
  ...tailwindCssPlugin.configs['flat/recommended'],

  // Adds a set of default rules to format the code.
  {
    plugins: {
      '@stylistic': stylisticPlugin
    }
  },

  // Configures the sort order of imports.
  {
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    }
  },

  // TypeScript,
  {
    rules: {
      // Disabled to allow defining one event per line with repeated types on components
      // like `WlButton`, which then allows for proper code completion in the IDE.
      '@typescript-eslint/unified-signatures': 'off'
    }
  },

  // TailwindCSS
  {
    rules: {
      'tailwindcss/no-custom-classname': [
        'error',
        {
          whitelist: ['wl\\-[-\\w]+']
        }
      ]
    }
  }
])
  .override('nuxt/typescript/rules', {
    // Ignores the submodules (like the React project).
    ignores: ['submodules/**']
  })
