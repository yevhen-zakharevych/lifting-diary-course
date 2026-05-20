# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## IMPORTANT: Documentation First

Before generating any code, **always** check the `/docs` directory for relevant documentation files and follow the guidance found there. If a docs file exists that covers the feature, pattern, or technology being implemented, it takes precedence over default assumptions.

- /docs/ui.md
- /docs/data-fetching.md

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint     # ESLint (Next.js config)
```

No test runner is configured yet.

## Stack

- **Next.js 16** with App Router (`src/app/`)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** (PostCSS plugin, no config file needed)

## Architecture

All routes live under `src/app/` using the App Router file conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, etc.). The root layout (`src/app/layout.tsx`) sets up Geist fonts and global styles via `globals.css`.

This is a lifting diary app currently at the initial scaffold stage — no domain logic, components, or data layer exist yet.
