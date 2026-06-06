# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> **Read the warning above first.** This repo uses **Next.js 16** with breaking changes from earlier versions. Consult `node_modules/next/dist/docs/` before writing Next.js code rather than relying on prior knowledge.

## Commands

```bash
yarn dev      # start dev server at http://localhost:3000
yarn build    # production build
yarn start    # serve production build
yarn lint     # eslint (Prettier runs as an eslint rule — lint failures include formatting)
yarn format   # prettier --write .
```

There is no test suite. Playwright is available as an MCP server (`.mcp.json`) for browser-driven verification. The server is approved locally via `enabledMcpjsonServers` in `.claude/settings.local.json`; tools load on session start, so restart Claude Code after enabling.

> **Do not download the `chrome-for-testing` browser.** The Playwright MCP is configured to use the already-installed `chromium` channel (`--browser chromium` in `.mcp.json`). If a tool call asks to install `chrome-for-testing`, do not run the install — stay on the existing channel.

## Architecture

Personal website. Stack: Next.js 16 **App Router**, React 19, Tailwind CSS v4, TypeScript.

- `src/app/` — App Router root (`layout.tsx`, `page.tsx`, `globals.css`).
- `src/components/` — reusable presentational components.
- Import alias `@/*` maps to `./src/*` (see `tsconfig.json`).

Notable conventions:

- **React Compiler is enabled** (`reactCompiler: true` in `next.config.ts`) — do not add manual `useMemo`/`useCallback` memoization.
- **Tailwind CSS v4** — configured through PostCSS and `@import 'tailwindcss'` in `globals.css`, not a JS config file.
