<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio

Next.js 16 App Router, React 19, Tailwind v4, Drizzle ORM on Neon, Better Auth.

## Where things live

- `app/(site)` — public pages. `app/admin/(protected)` — everything behind a session with
  `role = "admin"`; its layout calls `requireAdmin()`.
- All post SQL lives in `lib/posts.ts`. Components never import the db client directly.
- Home page copy lives in `lib/resume.ts`, not in the section components.
- Server actions for posts are in `app/admin/(protected)/actions.ts`.

## Conventions

- Mutations are server actions with `useActionState`, not route handlers. They call
  `revalidateBlog()` afterwards, which also invalidates slugs that were renamed or deleted.
- Form input is validated with zod in `lib/validation.ts` and returns field errors to the
  form. `readingTimeMinutes` and `excerpt` are derived server-side, so they are not form
  fields.
- The db client in `lib/db/index.ts` is a lazy proxy on purpose: a missing `DATABASE_URL`
  should surface where data is read, not break every route at import time.
- Public pages tolerate a database failure and render an empty state. Do not remove the
  `.catch()` on the blog queries without replacing it with something deliberate.
- Markdown is sanitized with `rehype-sanitize` before `rehype-highlight` runs, so author
  HTML is stripped while highlight's classes survive. Keep that order.

## Caching

`/` and `/blog/[slug]` are ISR at 60s, `/blog` is dynamic because of `searchParams`, and
`/admin` is per-session. After changing a caching decision, confirm it with
`cat .next/prerender-manifest.json` rather than trusting the route table alone.

## Schema changes

Edit `lib/db/schema.ts`, then `pnpm db:generate` and `pnpm db:migrate`. `drizzle.config.ts`
lists both schema files, so Better Auth tables are picked up automatically.

