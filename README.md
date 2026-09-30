# Portfolio

Personal site and blog. Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4,
Drizzle ORM on Neon serverless, Better Auth for the admin area.

## Getting started

```bash
pnpm install
cp .env.example .env
pnpm db:migrate      # create tables
pnpm db:seed:admin   # create the admin user (once)
pnpm dev
```

The site runs at http://localhost:3000, the admin area at http://localhost:3000/admin.

## Environment

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon serverless connection string |
| `BETTER_AUTH_SECRET` | Signing secret for sessions |
| `BETTER_AUTH_URL` / `NEXT_PUBLIC_BETTER_AUTH_URL` | Auth base URL |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata and the sitemap |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Only read by `pnpm db:seed:admin` |

`.env.local` overrides `.env`. Keep `DATABASE_URL` in one of them only, since an empty
value in `.env.local` shadows the real one.

## Writing a post

Sign in at `/admin`, then **New post**. Content is Markdown with GFM (tables, task lists)
and syntax-highlighted code fences. The excerpt and reading time are derived from the body
when left empty, and the slug follows the title until you edit it yourself.

Saving a post revalidates the home page, the blog index and every post route, so publishing
takes effect immediately without a redeploy.

## Structure

```
app/
  (site)/            public pages, shared header and footer
  admin/
    login/           public
    (protected)/     requires a session with the admin role
      actions.ts     server actions for create, update, delete
  api/auth/[...all]  Better Auth handler
  sitemap.ts         generated from published posts
  robots.ts
components/
  ui/                presentational primitives
  layout/            header, footer, theme
  home/              one component per home page section
  blog/              post card, markdown renderer, tag filter
  admin/             editor, post table, login form
lib/
  db/                drizzle client, post schema, auth schema
  posts.ts           every post query lives here
  auth.ts            Better Auth instance
  auth-client.ts     client-side sign in / sign out
  session.ts         session and role guards
  resume.ts          home page content, kept out of components
  validation.ts      zod schemas for form input
  blog.ts            slug, excerpt and reading time helpers
  format.ts          date formatting
  site.ts            site config and navigation
```

## Why post content lives in Postgres

Titles, bodies, tags, status and publish dates are queryable and relational, so drafts are
a column and tag filtering is one indexed query. Object storage is the right home for images
and PDFs; if you outgrow `public/`, put a `lib/storage/` adapter behind it rather than
changing how posts are stored.

## Caching

| Route | Strategy |
| --- | --- |
| `/` | ISR, revalidates every 60s |
| `/blog/[slug]` | Prerendered per published slug, 60s, new slugs render on demand |
| `/blog` | Rendered per request because it reads `searchParams` for the tag filter |
| `/admin/*` | Dynamic, per session |

A database outage degrades the public pages to empty states rather than 500s, so the
résumé content on the home page stays readable.

## Scripts

```bash
pnpm dev             # dev server
pnpm build           # production build
pnpm lint            # eslint
pnpm typecheck       # tsc --noEmit
pnpm db:generate     # generate a migration from schema changes
pnpm db:migrate      # apply pending migrations
pnpm db:push         # push schema directly (dev, interactive)
pnpm db:studio       # browse the database
```

## Deploying

Set the same environment variables in the host, run `pnpm db:migrate` against the
production database, then deploy. On Vercel the Neon URL goes in project settings.
Generate a real `BETTER_AUTH_SECRET` before going live.
