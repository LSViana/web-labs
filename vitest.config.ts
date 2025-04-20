import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    root: './',
    environment: 'happy-dom',
    coverage: {
      include: [
        'layers/pomodoro',
        'layers/worklog-tracker',
      ],
      exclude: [
        '**/*.config.ts',
        '**/*.vue',
        '**/server',
      ],
    },
    include: [
      'layers/**/unit/**/*.spec.ts',
    ],
  },
});
