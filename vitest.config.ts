import { defineConfig } from 'vitest/config'
import vuePlugin from '@vitejs/plugin-vue'

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
