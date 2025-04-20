import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    environment: 'happy-dom',
    exclude: [
      '**/node_modules',
      '**/e2e',
      '**/.assemblyscript',
    ],
  },
});
