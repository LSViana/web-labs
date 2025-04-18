import stylisticPlugin from '@stylistic/eslint-plugin'
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import tailwindCssPlugin from 'eslint-plugin-tailwindcss'

import withNuxt from './.nuxt/eslint.config.mjs'

// To debug this configuration file, run: `npx @eslint/config-inspector`.
export default withNuxt([
  ...tailwindCssPlugin.configs['flat/recommended'],

  {
    name: 'custom/eslint/rules',
    plugins: {
      '@stylistic': stylisticPlugin,
    },
    rules: {
      '@stylistic/indent': ['error', 2],
    },
  },

  // Configures the sort order of imports.
  {
    name: 'custom/eslint-plugin/rules',
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  {
    name: 'custom/typescript/rules',
    rules: {
      // Disabled to allow defining one event per line with repeated types on components
      // like `WlButton`, which then allows for proper code completion in the IDE.
      '@typescript-eslint/unified-signatures': 'off',
    },
  },

  {
    name: 'custom/tailwindcss/rules',
    rules: {
      'tailwindcss/no-custom-classname': [
        'error',
        {
          whitelist: ['wl\\-[-\\w]+'],
        },
      ],
    },
  },

  {
    name: 'custom/vue/rules',
    files: ['**/*.vue'],
    rules: {
      'vue/max-attributes-per-line': [
        'warn',
        {
          singleline: {
            max: 3,
          },
          multiline: {
            max: 1,
          },
        },
      ],
    },
  },
])
  .override('nuxt/typescript/rules', {
    // Ignores the submodules (like the React project).
    ignores: ['submodules/**'],
  })
