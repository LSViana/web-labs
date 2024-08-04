// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  typescript: {
    typeCheck: true
  },
  imports: {
    autoImport: false
  },
  components: {
    dirs: []
  },
  tailwindcss: {
    cssPath: '~/assets/styles/tailwind.scss'
  },
  experimental: {
    viewTransition: true
  },
  appConfig: {
    supabase: {
      url: process.env.SUPABASE_URL!,
      key: process.env.SUPABASE_KEY!
    }
  },
  devServer: {
    host: '0.0.0.0'
  },
  compatibilityDate: '2024-08-04'
})
