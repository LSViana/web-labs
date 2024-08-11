import checker from 'vite-plugin-checker'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
  ],
  typescript: {
    typeCheck: true,
  },
  imports: {
    autoImport: false,
  },
  components: {
    dirs: [],
  },
  tailwindcss: {
    cssPath: '~/assets/styles/tailwind.scss',
  },
  experimental: {
    viewTransition: true,
  },
  eslint: {
    config: {
      stylistic: false,
    },
  },
  vite: {
    plugins: [
      checker({
        overlay: {
          initialIsOpen: false
        }
      })
    ]
  },
  appConfig: {
    supabase: {
      url: process.env.SUPABASE_URL!,
      key: process.env.SUPABASE_KEY!,
    },
  },
  devServer: {
    host: '0.0.0.0',
  },
  compatibilityDate: '2024-08-04',
})
