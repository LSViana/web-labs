- 2024-08-04: The `tailwind.config.mjs` file causes warnings to be logged by the dev. server. Renaming it to `tailwind.config.mjs` fixes the issue (more information [here](https://github.com/remix-run/remix/discussions/9461#discussioncomment-9565804)).

- 2024-08-04: Override `whatwg-url` to `^14.0.0` to fix errors when running `npm run dev` caused by `@supabase/supabase-js` (more information [here](https://github.com/supabase/supabase-js/issues/914#issuecomment-1817819840)).

- 2024-08-04: Use `"dev": "NODE_OPTIONS='--trace-warnings' nuxt dev"` in the `package.json` file to investigate errors when running the dev. server.

- 2024-08-04: Made the `grpc` features optional and lazy load the packages so they don't cause overhead in the dev. server.
