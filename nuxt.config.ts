// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
  ],
  components: {
    dirs: [],
  },
  imports: {
    autoImport: false,
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
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    viewTransition: true,
  },
  compatibilityDate: '2024-08-04',
  typescript: {
    typeCheck: true,
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  tailwindcss: {
    cssPath: '~/assets/styles/tailwind.scss',
  },
});
