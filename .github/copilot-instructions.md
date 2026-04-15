# Copilot instructions for Hoogeman portfolio-site

Purpose
- Give Copilot sessions repository-specific guidance: build/test/lint commands, high-level architecture, and repo conventions.

Build / test / lint
- Install deps: npm install
- Dev server: npm run dev (starts Vite dev server)
- Build (production): npm run build (vite build) — outputs to dist/
- Preview built site locally: npm run preview
- Lint: npm run lint (runs eslint .)
- Type-check: npm run typecheck (tsc --noEmit -p tsconfig.app.json)
- Tests: No test runner or test scripts are configured in package.json. If tests are added, include a top-level "test" script; single-test commands depend on the chosen runner.

CI / Deployment notes
- GitHub Actions workflow: .github/workflows/node.js.yml
  - Runs on Node 22.x, installs deps, runs npm run build --if-present, uploads dist/ and deploys to GitHub Pages.
- Vite config sets base: './' to support GitHub Pages deploys.

High-level architecture
- Vite + React + TypeScript single-page app.
- Entry: src/main.tsx -> renders src/App.tsx.
- Styling: Tailwind CSS + PostCSS. Tailwind content globs: index.html and src/**/*.{js,ts,jsx,tsx} (see tailwind.config.js).
- Assets: Images referenced by relative paths (many under root paths like acts/, carousel/, references/). Built assets are emitted to dist/ on build.
- Notable dependencies: @supabase/supabase-js (client), lucide-react (icons). Vite optimizeDeps currently excludes 'lucide-react' (vite.config.ts).

Key repo conventions and gotchas
- Type-checking: Use npm run typecheck which targets tsconfig.app.json (project-level typecheck). Prefer adding new tsconfig targets if splitting packages.
- Linting: npm run lint runs ESLint over the repository root.
- Vite optimizeDeps: lucide-react is excluded from optimization — when adding icon libraries or other ESM packages, check optimizeDeps to avoid dev-time build issues.
- Asset naming for hero/carousel: three variants are used (filename, _md, _sm). Keep this pattern when adding responsive images.
- Base path: vite.config.ts sets base to './' for GH Pages — avoid absolute paths that break when served from the dist folder.
- CI uses npm run build --if-present: any custom build step should be provided under the "build" script so CI picks it up.
- No tests present: Pull requests should add a test script to integrate with CI if tests are required.

Files to check for future context
- package.json (scripts & deps)
- vite.config.ts (base, optimizeDeps)
- tailwind.config.js and postcss.config.js (styling pipeline)
- .github/workflows/node.js.yml (CI + pages deploy)

If an existing .github/copilot-instructions.md exists, prefer merging this content (do not overwrite without review).

--
Generated for: Hoogeman portfolio-site
