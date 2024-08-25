- 2024-08-25: Rename `usePomodoro()` to `usePomodoroClock()` for clarity.

- 2024-08-11: The `usePomodoro()` composable must depend on dates because the browser may stop the tab process
  (including intervals), and counting the amount of elapsed seconds fails in that scenario.

- 2024-08-11: Use `"type": "module"` in `package.json` to
  fix [Vite's warning](https://vitejs.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated).

- 2024-08-10: Move to ESLint v9, drop `eslint-plugin-import`, and use flat configuration to keep up with the ecosystem
  updates.

- 2024-08-04: The `tailwind.config.mjs` file causes warnings to be logged by the dev. server. Renaming it
  to `tailwind.config.mjs` fixes the issue (more
  information [here](https://github.com/remix-run/remix/discussions/9461#discussioncomment-9565804)).

- 2024-08-04: Override `whatwg-url` to `^14.0.0` to fix errors when running `npm run dev` caused
  by `@supabase/supabase-js` (more
  information [here](https://github.com/supabase/supabase-js/issues/914#issuecomment-1817819840)).

- 2024-08-04: Use `"dev": "NODE_OPTIONS='--trace-warnings' nuxt dev"` in the `package.json` file to investigate errors
  when running the dev. server.

- 2024-08-04: Made the `grpc` features optional and lazy load the packages so they don't cause overhead in the dev.
  server.
