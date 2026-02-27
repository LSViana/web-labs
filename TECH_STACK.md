# Tech Stack Summary (Quick)

Generated: 2026-02-27

Note: This is a quick scan of the repository code (package.json and project files). Results may be incomplete — see the repository code search for more files: https://github.com/LSViana/web-labs/search?q=package.json&type=code

## Projects detected:

### 1) Repository root (web-labs)
- **Framework / Language:** Nuxt (Nuxt 4) / Vue (likely Vue 3) with TypeScript
- **Package manager / toolchain:** npm / node
- **CSS:** Tailwind CSS, Sass
- **Testing:** Vitest (unit), Playwright (e2e)
- **Other notable deps/tools:** @supabase/supabase-js, protobuf / gRPC dev deps
- **Notes:** package.json contains nuxt scripts (dev/build/generate/preview) and nuxt prepare postinstall.

### 2) submodules/react-labs/nextjs
- **Framework / Language:** Next.js (13) / React 18 with TypeScript
- **Package manager / toolchain:** npm / node
- **CSS:** Tailwind CSS, Sass, PostCSS
- **Linting:** ESLint with Airbnb and Next configs
- **Notes:** package.json lists next, react, react-dom, typescript and eslint-related deps.

### 3) .assemblyscript
- **Framework / Language:** AssemblyScript (WebAssembly target)
- **Tooling:** assemblyscript (asc) build scripts
- **Testing:** Vitest
- **Notes:** scripts include asc build targets (debug/release) and serve.

## Caveats:
- This is a quick summary derived from repository package.json files and other visible manifests. There may be other projects or stacks not captured by this scan.
- For a detailed summary (dependency names and versions, Dockerfiles, build commands), run a full scan of package.json, pyproject.toml, requirements.txt, Dockerfile and other manifest files.

File added by GitHub Copilot Chat Assistant.
