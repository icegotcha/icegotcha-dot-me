# Project Agent Guide

## Project context

Personal portfolio built with Next.js App Router, React, TypeScript, Tailwind CSS, and pnpm. Read the current source before changing behavior; this guide records conventions and constraints rather than an inventory of implementations.

- Routes and the shared layout live in `src/app/`.
- Editable content lives in `src/content/`, separated by page; shared domain types live in `src/types/`.
- Components follow Atomic Design under `src/components/`. Vendor UI primitives are exempt.
- Shared styles and design tokens live in `src/styles/`.
- See [README.md](README.md) for setup and environment configuration, and [the content guide](docs/editing-content.md) for manual editing.

## Commands

```bash
pnpm dev              # development server
pnpm build            # production build
pnpm start            # production server
pnpm typecheck        # TypeScript checks
pnpm lint             # ESLint
pnpm format:check     # formatting checks
pnpm test:unit        # Node regression tests
pnpm test:api         # API tests with mocked providers
pnpm storybook        # component development
pnpm build-storybook  # static Storybook build
pnpm test:storybook   # browser component tests
```

## Data and content

- Design data structures and APIs for people to create, understand, and maintain. Use clear names, minimal nesting, and only necessary properties.
- Avoid duplicate data and derive values automatically where practical. Prefer straightforward structures over unnecessary abstractions.
- Keep editable content separate from presentation logic. Do not require authors to supply implementation details.
- Use verified information in production. Do not invent project claims, responsibilities, technologies, links, or screenshots. Keep synthetic examples in stories and tests.
- Keep editing instructions in documentation; avoid repetitive field comments.

## Code conventions

- Make the smallest coherent change that addresses the request. Avoid unrelated dependency changes and cleanup.
- Preserve behavior during refactors, including public interfaces, validation, errors, accessibility, and animation behavior, unless the user requests a change.
- Prefer descriptive names, early returns, and explicit branches. Avoid deeply nested conditions and nested ternaries.
- Use named function declarations for components and helpers, explicit component props, and return types for top-level functions.
- Use type-only imports where appropriate. Keep types local unless they describe shared domain contracts; infer types from validation schemas when possible.
- Treat untrusted input as unknown and validate it. Do not bypass type errors with unchecked assertions or `any`.
- Follow existing formatting. Comment only on constraints or reasons that the code does not explain.

## Components and presentation

- Use a folder per component with an `index.tsx` entry point. Import directly from that folder; avoid aggregate barrels for unrelated components.
- Add colocated stories when useful. Use Controls for content variations and separate stories for distinct behavior, layout, or regression coverage.
- Reuse the existing styling system, shared components, and font constants. Keep font loading outside the shared component dependency graph so Storybook can build without fetching fonts.
- Preserve original artwork and its transparency. Adjust layout rather than redrawing existing assets; use the existing optimization workflow for derivatives.
- Use responsive positioning for illustrated scenes and verify placement in the browser.
- Preserve semantic controls, keyboard access, focus handling, accessible labels, and reduced-motion support.

## React and runtime behavior

- Default to Server Components. Add client boundaries only where browser APIs, hooks, or interaction require them; keep secrets and provider code on the server.
- Keep rendering pure and hooks unconditional. Store only rendering state; derive other values and use refs for pending work.
- Handle user actions in event handlers. Use effects for external synchronization and clean up listeners, timers, subscriptions, and animation frames.
- Memoize only when cost or identity stability matters. Preserve identities that control subscriptions and effect lifetimes.
- Keep continuous animation outside React state, reuse shared animation sources, and pause unnecessary work when inactive.
- Defer optional scripts and dependencies until needed. Parallelize independent work while preserving required sequencing.

## Validation and external services

- Validate API input on the server. Preserve validation order, accepted inputs, limits, and response shapes during refactors.
- Bound request parsing and external requests by size and time. Handle malformed input, provider failures, and unavailable content with appropriate errors or existing fallbacks.
- Preserve URL validation, source restrictions, redirect rules, and safe Markdown rendering. Do not broaden external access as a convenience fix.
- Verify anti-abuse checks before sending contact email. Keep development test exceptions isolated from production verification.
- Follow the documented environment setup. Never print or commit secrets or expose server credentials to the client. Keep diagnostics development-only and logs sanitized.
- Automated tests must mock providers and use synthetic data. Real integration tests must use documented test credentials and recipients; do not send to real inboxes without authorization.
- Do not introduce simulated delivery or bypass verification unless explicitly requested.

## Verification

- Run typecheck, lint, and formatting checks for code changes. Run API tests for API/schema changes and build Storybook for component integration changes.
- Add regression tests for meaningful behavior changes and risky refactors; avoid tests that merely mirror the implementation.
- Verify affected interactions in regular Chromium with synthetic data. Compare desktop/mobile screenshots for visual changes and check keyboard access and reduced motion when affected.
- Report blocked checks explicitly. Do not suppress diagnostics or describe unrun checks as passed.

## Working practices

- Do not commit without an explicit request. The default branch is `main`; use `feature/` or `fix/` for ordinary work.
- Keep generated or machine-local AI tooling files and copied skill folders outside the repository.
- If parallel local agents are used, isolate them in git worktrees with `orchestrator/` branches.
- Give a brief conceptual summary after edits, including relevant verification and limitations.
- Ask before destructive changes when intent is unclear.
- Keep this guide concise and current. Record lasting principles and non-obvious constraints; leave implementation inventories, dimensions, timings, and feature walkthroughs in source or dedicated documentation.
- Keep `CLAUDE.md` and `OPENAI.md` pointing here rather than duplicating rules.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
