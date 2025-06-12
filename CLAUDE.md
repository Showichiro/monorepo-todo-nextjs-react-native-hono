# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a monorepo containing a todo application with three main applications and shared packages:

- **apps/backend**: Hono API server (port 3100) built with TypeScript and Node.js
- **apps/web**: Next.js web application with Tailwind CSS
- **apps/native**: React Native app using Expo Router
- **packages/core**: Shared core logic and types
- **packages/utils**: Shared utility functions

The monorepo uses pnpm workspaces with Turbo for build orchestration and Biome for linting/formatting.

## Common Commands

### Development
- `pnpm dev` - Start all apps in development mode
- `pnpm --filter backend dev` - Run backend dev server only
- `pnpm --filter web dev` - Run Next.js dev server only  
- `pnpm --filter native dev` - Run Expo dev server only

### Build and Type Checking
- `pnpm build` - Build all apps and packages
- `pnpm check-types` - Type check all packages

### Code Quality
- `pnpm lint` - Lint all code with Biome
- `pnpm format` - Format all code with Biome

### Individual App Commands
- Backend: `pnpm --filter backend start` (production server)
- Native: `pnpm --filter native android|ios` (run on device)
- Packages: `pnpm --filter @monorepo-todo/core build` (build individual package)

## Workspace Dependencies

Apps depend on shared packages using `workspace:*` protocol:
- `@monorepo-todo/core` - Core shared logic
- `@monorepo-todo/utils` - Utility functions

When modifying shared packages, run the build command to update dependents.
