import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
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
    externalVue: false,
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
