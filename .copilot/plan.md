Plan: Check program, report issues, and cleanup CSS + TS/JS

Problem statement
- Repository is a Vite + React + TypeScript single-page portfolio site. The codebase has no tests and a few maintainability/runtime issues discovered during quick review (see 'Findings').

Goals
- Run a complete audit (build, lint, typecheck) and collect failures.
- Fix high-priority runtime bugs (component lifecycle, timers).
- Clean up CSS: remove unused rules, consolidate where appropriate, and align with Tailwind usage.
- Fix TypeScript/JavaScript lint/type errors and add scripts to make checks repeatable.

Approach
1. Local audit: install deps, run build, lint, and typecheck; record outputs.
2. Triage: classify issues as runtime bugs (high), type errors (medium), lint/style (low), or cosmetic CSS (low).
3. Implement fixes in small commits per category (each TODO below).
4. Verify by building, running dev server, and manual smoke tests across major pages.

Findings (initial)
- Runtime bug: src/App.tsx calls setTimeout(nextSlide, 5000) directly during render. This schedules a new timeout on every render and will leak timers and cause incorrect behavior. Replace with a useEffect-driven interval/timeout and proper cleanup.
- Styling: Project uses Tailwind (configured via tailwind.config.js) but also contains plain CSS files (src/App.css, src/index.css). Some styles are duplicate or can be migrated to Tailwind for consistency.
- Assets: Images are referenced with root-relative paths (e.g., 'acts/...', 'carousel/...'). Vite supports these but prefer placing static assets in public/ or importing them to ensure correct bundling and hashed filenames when needed.
- Tests: No test runner configured. Add test framework later (Jest/Playwright) if required.
- Lint/type: package.json exposes lint (eslint .) and typecheck. Run these to see specific failures.
- Vite config: base: './' set for GH Pages — keep this in mind when changing asset paths.

Todos (tracked)
- audit-run: Run initial audit
  - Run: npm install && npm run build && npm run lint && npm run typecheck
  - Output: failure log and file list
- fix-settimeout-bug: Fix carousel timer in src/App.tsx
  - Replace setTimeout in render with useEffect + setInterval or requestAnimationFrame pattern with cleanup
  - Add unit-level smoke checks (manual steps documented)
- lint-and-format: Run ESLint auto-fix and adjust rules
  - Run: npm run lint and apply --fix where safe
  - Add/adjust eslint rules only when necessary
- typecheck-fixes: Run npm run typecheck and fix TypeScript errors
  - Focus on strictness issues and missing types in components
- css-cleanup: Consolidate CSS and Tailwind usage
  - Identify unused selectors (via devtools or PurgeCSS/Tailwind content scan)
  - Migrate critical layout styles from src/App.css into Tailwind classes where appropriate
- build-verify: Build and preview after fixes (npm run build && npm run preview)

Risks and notes
- Migrating CSS to Tailwind may change visual output; include visual checks and snapshots if adding tests later.
- Some images may be referenced by external URLs or CDN query strings — verify URLs remain valid after asset moves.
- Tests are not in scope for the first pass; plan includes adding test infra later.

Verification checklist
- All scripts: npm run build, npm run lint (no errors), npm run typecheck (no errors)
- Dev server runs: npm run dev loads homepage and carousel works without increasing timers
- Visual sanity: spot-check hero images, modal behavior, and contact footer links

Files to inspect during implementation
- src/App.tsx (carousel timer bug, main layout)
- src/App.css and src/index.css (styling)
- tailwind.config.js and postcss.config.js (tooling)
- vite.config.ts (base path and optimizeDeps exclusions)
- .github/workflows/node.js.yml (CI expectations)

Next step (after approval)
- Run the audit commands and open a PR with the fixes in small commits.
