<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Slow Life Blog

Editorial blog for **Slow Life**, a fashion brand built on slow living: celebrating the beauty of the simple, disconnecting from the city's pace and reconnecting with what matters — nature, friends and family. Clothes designed to feel comfortable and relaxed while living at your own rhythm. Stack: Next.js 16 (App Router, RSC), React 19, TypeScript strict, Tailwind v4, shadcn/ui on Base UI, Apollo Client, Auth.js v5 (`next-auth@beta`), GraphQL Codegen. UI copy, comments, and docs are in Spanish.

## Commands

- `npm run dev` — needs `.env.local` (copy `.env.example`, keep `GRAPHQL_API_URL` pointing at a running backend)
- `npm run typecheck` — `tsc --noEmit`; primary verification, **no test runner exists**
- `npm run lint` — ESLint (`src/gql/**` ignored)
- `npm run build` / `npm run start` — production
- `npm run codegen` / `codegen:watch` — regenerate types from GraphQL docs

## GraphQL codegen (run after any query/schema edit)

- Operations live in `src/graphql/` by domain: `blog.graphql` (public), `auth.graphql` (login/refresh/logout), `admin.graphql` (panel CRUD).
- Types are generated into `src/gql/` with the `client` preset **from the local SDL `schema.graphql`**, so codegen works with no backend up. Consume as `@/gql/graphql` TypedDocumentNodes.
- Editing any `.graphql` or `schema.graphql` without rerunning `npm run codegen` leaves imports/typecheck stale. Never hand-edit `src/gql/`.

## Data access

- RSC pages read via `src/lib/blog/api.ts` → `src/lib/apollo/server.ts` (`server-only`, `GRAPHQL_API_URL`, force-cache). Pages use `export const revalidate`; `api.ts` also passes `next.revalidate: 900`. Public pages degrade to empty lists when the backend is down.
- Login validates against the backend via the `login` mutation in `src/lib/auth/authenticate.ts`; tokens live in the Auth.js JWT session.
- **Known gap (see README + `api.md`):** `admin.graphql` ops require an `Authorization: Bearer <accessToken>` header, but the token is not yet injected into Apollo requests — don't assume it flows.

## Auth

- Auth.js config is at repo root `src/auth.ts` (JWT strategy, credentials provider); handler at `src/app/api/auth/[...nextauth]/route.ts`. Session/JWT types augmented in `src/types/next-auth.d.ts`.
- The route guard lives in `src/proxy.ts` — in Next 16 `proxy.ts` is the middleware-equivalent file. Do not rename it to `middleware.ts`.
- Sign-in needs the GraphQL backend running (`DEMO_ADMIN_*` creds are dev-only).

## Style / tokens

- Brand palette is CSS vars in `src/app/globals.css` under `@theme inline`: `ink, cream, sand, sage, forest, terra, linen, stone` — use as Tailwind classes (`text-ink`, `bg-sand`); never hardcode hex.
- Fonts: Fraunces (`font-display`/`--font-editorial`) and Manrope (`font-sans`/`--font-body`) via `next/font/google` in `src/app/layout.tsx`.
- Prettier: double quotes, semicolons, `prettier-plugin-tailwindcss`. Alias `@/*` → `src/*`.

## Verification

No test framework is configured. After changes run `npm run typecheck` then `npm run lint`; use `npm run build` for extra confidence.
