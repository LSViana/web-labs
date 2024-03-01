import { defineConfig } from 'vitest/config'
import vuePlugin from '@vitejs/plugin-vue'

// Sample change in main

export default defineConfig({
  plugins: [
    vuePlugin()
  ],
  test: {
    globals: true,
    environment: 'happy-dom'
  },
  resolve: {
    alias: {
      '~': '.'
    }
  }
})

// Testing GitButler. Here's some stuff.
