---
name: front-end
description: Use when implementing UI changes: components, pages, client state/composables, routes, styles, or frontend tests.
---

# Front-End

Overview
--------
Guidance and checklist for front-end work. Use this skill when making changes that affect the UI surface, client-side state, routing, styling, or frontend tests. Keep changes small, testable, and well-documented.

When to Use
-----------
- Use when adding or modifying components, layouts, pages, client composables/stores, or frontend test coverage.
- Use when integrating UI with new or changed API routes that the client depends on.
- Do NOT use for purely backend maintenance unrelated to the UI.

Core Patterns
-------------
- Prefer small composables for client state (e.g., `useXStore()`) over large class-based singletons.
- Extract complex logic from components into composables/services to keep templates concise.
- Surface loading, disabled and error states; make controls accessible and keyboard friendly.
- Use stable keys for lists (e.g., `:key="id"`) and avoid text-based keys.
- Centralize API calls and document request/response shapes; handle 4xx/5xx failures gracefully.
- Add unit tests for composables and key component logic; add E2E tests for cross-component flows.

How to Apply (Checklist)
-----------------------
1. Add/modify a composable for client state and centralize fetch/update logic.
2. Wire components to composables via props or imports; avoid deep prop drilling.
3. Add loading/error UI and accessibility attributes; disable actions during requests.
4. Add unit tests (Vitest + happy-dom) for the composable and critical component behavior.
5. Run `npm run typecheck`, `npx eslint .`, and `npm run test:unit` before merging.
6. If routes/pages changed, run E2E checks or manual QA of the full user flows.

Quick File Targets
------------------
- Components: `layers/*/components/**/*.vue`
- Pages: `layers/*/pages/**/*.vue`
- Client state/composables: `layers/*/utils/*.ts` or `layers/*/composables/*`
- API routes (when relevant): `server/api/**`
- Tests: `layers/**/tests/unit/**` and `tests/e2e/**`

Common Pitfalls
---------------
- Breaking imports by renaming/moving components without updating consumers.
- Using unstable list keys causing rendering issues.
- Not handling optimistic UI or failure rollbacks.

Verification
------------
- Run `npm run typecheck`, `npx eslint .`, `npm run test:unit`; run E2E or manual QA for multi-component flows.
- Smoke test key flows: create/edit/delete, keyboard navigation, responsive behavior.
