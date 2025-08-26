import { defineVitestProject } from '@nuxt/test-utils/config';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      await defineVitestProject({
        test: {
          root: './',
          environment: 'happy-dom',
          include: [
            'layers/**/unit/**/*.spec.ts',
          ],
        },
      }),
    ],
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
  },
});
