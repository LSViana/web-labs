import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      assemblyscript: __dirname,
    },
  },
});
