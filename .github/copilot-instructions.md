# Copilot Instructions — sgk-commanders (monorepo)

**Purpose:** Quick, actionable guidance to help an AI coding agent become productive in this repository.

## Big picture

- Monorepo layout: top-level `package.json` uses npm workspaces. Primary workspaces live under `apps/*` and `packages/*`.
- Frontends:
  - `apps/web` — **Next.js (App Router)**. Main UI lives in `app/` (server components by default). Styling via **Tailwind CSS**, components use CVA (`class-variance-authority`) and the `cn(...)` helper in `lib/utils.ts`.
  - `apps/mobile` — **Expo / React Native**: file-based routing (`app/`), EAS/dev clients, native config files and `supabase` integration under `apps/mobile/supabase`.
- Shared code: `packages/shared` (published/imported as `sgk-commanders-shared`) contains Supabase wrappers, DB access helpers, and types used across apps.
- Data & infra: Supabase is the primary DB/backend. Local development can run a local Supabase instance (`apps/mobile` contains a `supabase` CLI config and functions). Migrations are now managed with the Supabase CLI and stored under `apps/mobile/supabase/migrations/` (Drizzle deprecated).

## Quick start & common commands

- Root (install all workspaces): `npm install` (npm workspaces). After this, run app-specific scripts.
- Web dev: `cd apps/web && npm run dev` (http://localhost:3000)
- Mobile dev: `cd apps/mobile && npm run start` (uses `expo start`)
- Start local Supabase (for local dev): `cd apps/mobile && npm run start-supabase` (runs `npx supabase start`)
- Drizzle migrations (generate / migrate): `cd apps/mobile && npm run generate-migrations` / `npm run migrate`
- Linting: `cd apps/web && npm run lint` and `cd apps/mobile && npm run lint`

## Project-specific conventions & patterns (do not change lightly)

- App Router server/client split: prefer server components by default. Add `"use client"` only when hooks or browser APIs are needed.
- CVA & component pattern: UI components export their variant helpers and component (e.g., `buttonVariants` + `Button`) and use `cn(buttonVariants(...), className)` when composing classes. See `apps/web/components/ui/button.tsx` (pattern repeated across `components/ui/*`).
- Class names: always use the `cn(...)` helper in `apps/web/lib/utils.ts` to compose Tailwind classes (it wraps `clsx` + `tailwind-merge`).
- API / DB access:
  - Server-side Supabase helper: `apps/web/lib/supabase.ts` exposes `createServerSupabase()` (uses `SUPABASE_SERVICE_ROLE_KEY` — **server-only**). Use it inside API routes (see `app/api/users/route.ts`).
  - Shared Supabase helpers live in `packages/shared/src/supabase/*` and are re-exported from `packages/shared/src/index.ts`.
  - Frontend data flow example: `UsersContext` (in `apps/web/components/users/UsersContext.tsx`) uses `supabase.users.getUsers()` for reads and proxies create/patch/delete through `/api/users` endpoints (optimistic updates are used—follow that pattern if adding similar features).
- Environment variables:
  - Web requires `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (client) and `SUPABASE_SERVICE_ROLE_KEY` (server-only) — put them in `apps/web/.env.local`.
  - `packages/shared/src/supabase/instance.ts` exposes `setUpSupabase(...)` to override the default local client for tests or local runs.

## Integration points and external services

- Supabase functions: `apps/mobile/supabase/functions/*` (edge runtime functions) — pay attention to runtime (Deno-style imports, environment access) when editing.
- Realtime & subscriptions: shared realtime helpers under `packages/shared/src/supabase/realtime.ts` (used by apps that need Postgres change channels).
- DB migrations and schema: `apps/mobile/drizzle/` contains `.sql` migration files used alongside `drizzle-kit`.

## Developer workflows / debugging notes

- To reproduce API issues locally: start Supabase locally (`npm run start-supabase`), ensure `apps/web/.env.local` points to the local Supabase URL/keys, then `cd apps/web && npm run dev` and exercise the route (ex: `GET /api/users`).
- Server logs: Next dev server prints API route errors to console (`app/api/*` routes use console.error on failures). Use these logs for initial debugging.
- No CI detected: there are currently no GitHub Actions or CI files in the repo. If you add CI, run per-app build steps (e.g., `cd apps/web && npm run build`) and consider adding a workspace-level lint step.

## Files & locations to read first (examples)

- Web app: `apps/web/app/` (App Router), `apps/web/lib/supabase.ts`, `apps/web/lib/utils.ts`, `apps/web/components/ui/*`
- Mobile: `apps/mobile/app`, `apps/mobile/supabase/`, `apps/mobile/drizzle/`
- Shared: `packages/shared/src/supabase/*` (instance, helpers, types)

---

Notes:

- There is already app-scoped guidance in `apps/web/.github/copilot-instructions.md` that contains helpful web-specific details — prefer that file for web-only edits; this repo-level file is for cross-cutting, monorepo-level instructions.
- If you'd like, I can merge or align the web-level guidance into this top-level file and add more concrete examples (e.g., common refactors, PR checklist, or API contract expectations). What should I expand or clarify next? ✅
