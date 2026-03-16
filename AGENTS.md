AGENTS
======

This file orients agentic contributors (automated agents, code-writing assistants) to the repository: how to build, lint, test (including running a single test), and the code-style and repository conventions to follow.

1) Build / dev / preview
- Install: `npm ci` (preferred for CI) or `npm install` for local development
- Develop: `npm run dev` — starts Nuxt dev server
- Build: `npm run build` — builds production assets (Nuxt)
- Preview: `npm run preview` — preview the built app

2) Test commands
- Unit tests (Vitest): `npm run test:unit` — runs all unit tests via Vitest
- E2E tests (Playwright): `npm run test:e2e` — runs Playwright tests
- E2E headed: `npm run test:e2e:headed` — runs Playwright in headed mode
- Single vitest test file: `npx vitest run path/to/my.spec.ts` or `npm run test:unit -- path/to/my.spec.ts`
- Single vitest test name: `npx vitest -t "my test name"` — runs tests matching the title
- Run a single test using the configuration in `vitest.config.ts`: `npx vitest run --config=vitest.config.ts path/to/test.spec.ts`

Notes: the repository uses `vitest.config.ts` with a Nuxt project wrapper (`@nuxt/test-utils`) and `happy-dom` test environment for unit tests. CI uses `npm ci` then `npm run test:unit` (see `.github/workflows/vitest.yml`).

3) Lint / typecheck
- ESLint: configured via `eslint.config.mjs`. Run with `npx eslint .` or integrate into editor
- Typecheck: `npm run typecheck` runs `vue-tsc --noEmit`
- Prettier: no top-level Prettier config detected — prefer the project's TypeScript/ESLint formatting rules. If you add Prettier, keep it consistent with ESLint rules.

4) Quick commands summary
- Install deps: `npm ci`
- Dev server: `npm run dev`
- Build: `npm run build`
- Run unit tests: `npm run test:unit`
- Run single unit test file: `npx vitest run path/to/test.spec.ts`
- Run single test by name: `npx vitest -t "test name"`
- Run e2e tests: `npm run test:e2e`
- Typecheck: `npm run typecheck`

5) Code Style Guidelines (for agents)

Purpose: keep changes consistent, predictable, and reviewable. Follow these rules when generating or editing code.

- Formatting
  - Use 2-space indentation.
  - Use semicolons; ESLint enforces semicolons via `@stylistic/semi: ['error','always']`.
  - Line length: prefer wrapping at ~100 columns; follow existing file style.

- TypeScript / types
  - Prefer explicit return types on exported functions, composables, and utilities.
  - Use `unknown` instead of `any` where possible; prefer narrow types.
  - Use `readonly` for arrays/tuples where mutation isn't intended.
  - Keep interfaces/symbols exported from a module minimal — only export what consumers need.

- Vue / components
  - Single-file components: keep templates concise; extract complex logic into composables or modules in `layers/**`.
  - File names: use kebab-case for `.vue` file names (existing codebase pattern).
  - Component names: use multi-word PascalCase for component definitions where the `vue/multi-word-component-names` rule applies; `index` is allowed as exception.

- Imports
  - Use absolute or root-relative imports allowed by Nuxt (prefer `~/` or `@/` where appropriate) to avoid long relative paths.
  - Sort imports using the repository's ESLint plugin `simple-import-sort`; group external packages first, then internal aliases, then styles/assets.
  - Keep import statements grouped and separated by a blank line between logical groups.

- Naming
  - Functions: camelCase, verbs for actions (e.g., `fetchUser`, `formatDuration`).
  - Variables: camelCase for local variables, UPPER_SNAKE_CASE for module-level constants only when truly constant.
  - Types / Interfaces: PascalCase, prefix interfaces optionally with `I` only when existing code uses it. Prefer `FooOptions`/`FooState` over `I*`.
  - Files: follow the existing tree — TS files use kebab-case or camelCase to match adjacent files.

- Error handling
  - Avoid swallowing errors silently. Always either handle the error or rethrow with additional context.
  - Use `try/catch` in async functions where failure can be recovered; otherwise let errors propagate to a caller that can handle/display them.
  - For user-facing errors, prefer typed error objects and localization keys instead of raw strings.

- Tests
  - Unit tests live under `layers/**/unit/**/*.spec.ts` per `vitest.config.ts` include pattern.
  - Use `happy-dom` environment assumptions (DOM APIs are available through the virtual DOM implementation).
  - Tests should be deterministic: avoid reliance on wall-clock time, random seeds, or external network by default. Use mocks or fixtures.

- Commit messages
  - Keep concise imperative style: `add`, `fix`, `update`, `refactor` — e.g., `fix: ensure timer resets on stop`.

6) ESLint / repo-specific rules
- ESLint config: `eslint.config.mjs` extends Nuxt's config and adds:
  - `@stylistic` plugin rules: indent 2, semicolons required
  - `simple-import-sort` for import ordering
  - `tailwindcss/no-custom-classname` whitelist for classes matching `wl-...`
  - Vue rules: `vue/max-attributes-per-line` and `vue/multi-word-component-names` (index allowed)
  - The config ignores `submodules/**` for TypeScript rules

7) Cursor / Copilot rules
- Cursor rules: this repository does not include a `.cursor` or `.cursorrules` directory at the repository root. If you add Cursor rules, reference them here and keep language consistent with repository conventions.
- Copilot instructions: no `.github/copilot-instructions.md` file is present. If you add one, ensure it includes repository-specific guidance for AI assistants (how to run tests, where to commit, and sensitive files to avoid).

8) Security & secrets
- Never commit secrets or private keys. If a secret is required for local testing, use `.env` and add `.env` to `.gitignore` (this repo currently has a `.env` file; do not commit secrets into it).

9) Agent behavior and safe defaults
- Always run `npm run typecheck` after making TypeScript changes.
- Run `npx eslint` and `npm run test:unit` locally before creating PRs.
- When touching existing code, preserve existing style and patterns; prefer small, targeted changes.
- If uncertain, open a draft PR and request a human reviewer.

10) Where tests and components live
- Unit tests: `layers/**/unit/**/*.spec.ts` (config-driven)
- E2E tests: `tests/e2e/**` and Playwright config at `playwright.config.ts`.

11) Additional notes for agents
- Project uses Nuxt 4, TypeScript, Tailwind, Vitest and Playwright — be mindful of framework-specific APIs.
- For code generation: prefer composables under `layers/*/` to keep domain logic separate from pages.

If you have suggestions for specific additions to this file (tooling commands, CI steps, or style rules) propose them as a short list and I will update the file.
