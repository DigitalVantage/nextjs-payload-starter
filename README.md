# nextjs-payload-starter

> Production-ready B2B starter — **Next.js 16** + **Payload CMS 3** + **MongoDB** + **Tailwind 4**, with PL/EN i18n and Coolify deployment notes baked in.
>
> Maintained by **[Digital Vantage](https://www.digitalvantage.pl)** — a Polish software house building custom web platforms, B2B portals and digital products.

[![CI](https://github.com/DigitalVantage/nextjs-payload-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/DigitalVantage/nextjs-payload-starter/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Payload](https://img.shields.io/badge/Payload-3-000000?logo=payloadcms)](https://payloadcms.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## What's inside

A pre-wired Payload CMS website template plus the bits you need on every B2B project but always end up bolting on by hand:

- **Payload CMS 3.x** with Pages, Posts, Media, Categories, Users collections + Header/Footer globals
- **Lexical rich-text** editor with toolbars and link/upload features
- **Plugins**: form-builder, nested-docs, redirects, search, SEO
- **Live preview** for Pages and Posts with Mobile/Tablet/Desktop breakpoints
- **i18n PL/EN** — Payload `localization` for content + `next-intl` scaffolding for UI strings
- **Tailwind 4** + shadcn-style component primitives (`@radix-ui` + `class-variance-authority`)
- **MongoDB** via `@payloadcms/db-mongodb`, ships with `docker-compose.yml`
- **Coolify-ready Dockerfile** (Next.js standalone output)
- **Tests**: Vitest (integration) + Playwright (e2e) configs
- **Lint/format**: ESLint 9 + Prettier with sane Next.js defaults
- **next-sitemap** for `sitemap.xml` and `robots.txt`

## Tech stack

| Layer       | Choice                                                |
| ----------- | ----------------------------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack, React 19.2)        |
| CMS         | Payload CMS 3.84+                                     |
| Database    | MongoDB 7 (`@payloadcms/db-mongodb`)                  |
| Styling     | Tailwind CSS 4 + Radix UI + `tw-animate-css`          |
| Forms       | `react-hook-form` + Payload form-builder plugin       |
| i18n        | `next-intl` 4 (UI) + Payload `localization` (content) |
| Testing     | Vitest 4 + Playwright 1.59                            |
| Lint/format | ESLint 9 (`eslint-config-next`) + Prettier 3          |

## Quick start

### 1. Clone and install

```bash
git clone https://github.com/DigitalVantage/nextjs-payload-starter.git
cd nextjs-payload-starter
pnpm install --ignore-workspace
```

### 2. Start MongoDB

```bash
docker compose up -d mongo
```

### 3. Configure environment

```bash
cp .env.example .env
# generate secrets
echo "PAYLOAD_SECRET=$(openssl rand -base64 32)" >> .env
echo "CRON_SECRET=$(openssl rand -hex 32)" >> .env
echo "PREVIEW_SECRET=$(openssl rand -hex 32)" >> .env
```

### 4. Run the dev server

```bash
pnpm dev
```

- Frontend: http://localhost:3000
- Admin panel: http://localhost:3000/admin

The first time you open `/admin`, Payload will ask you to create the first user.

## Project structure

```
nextjs-payload-starter/
├── src/
│   ├── app/
│   │   ├── (frontend)/        # public website routes (App Router)
│   │   └── (payload)/         # Payload admin + REST/GraphQL API
│   ├── collections/           # Pages, Posts, Media, Categories, Users
│   ├── blocks/                # CMS-driven content blocks (CallToAction, Hero, etc.)
│   ├── components/            # shared UI components
│   ├── heros/                 # hero variants (high/low impact, post)
│   ├── plugins/               # Payload plugin wiring
│   ├── i18n/                  # next-intl config + PL/EN messages
│   ├── providers/             # theme + headerTheme contexts
│   ├── utilities/             # helpers (formatDateTime, getURL, …)
│   └── payload.config.ts      # Payload CMS config — start here
├── tests/                     # Vitest int + Playwright e2e
├── docker-compose.yml         # MongoDB + optional app container
├── Dockerfile                 # production image (Next.js standalone)
├── next.config.ts             # Next + Payload + next-intl plugin
└── .env.example
```

## i18n

This starter ships with **two layers** of internationalization:

### Content (Payload `localization`)

Configured in `src/payload.config.ts`:

```ts
localization: {
  locales: [
    { code: 'pl', label: 'Polski' },
    { code: 'en', label: 'English' },
  ],
  defaultLocale: 'pl',
  fallback: true,
}
```

Mark any field with `localized: true` and Payload will store one value per locale and return the right one based on the `?locale=` query parameter (or `req.locale`). The admin UI gets a locale switcher automatically.

### UI strings (`next-intl`)

Lives in `src/i18n/`:

- `config.ts` — locale list and default
- `request.ts` — `getRequestConfig`: detects locale from `NEXT_LOCALE` cookie, then `Accept-Language`, then default
- `messages/pl.json`, `messages/en.json` — translation dictionaries

Use it in components:

```tsx
import { useTranslations } from 'next-intl'

export function CTA() {
  const t = useTranslations('common')
  return <button>{t('submit')}</button>
}
```

> **Next step (intentionally left to you):** route-prefixed locales (`/pl/...`, `/en/...`).
> The starter detects locale from cookie/header so SEO defaults to `defaultLocale`. If you need per-URL locales, move `src/app/(frontend)/*` under `[locale]/` and add `next-intl/middleware`. Skipped here because the right choice (path prefix vs. subdomain vs. domain-per-locale) depends on your setup.

## Deployment on Coolify

> 📖 **Full step-by-step deployment guide**: [**DigitalVantage/coolify-nextjs-payload-guide**](https://github.com/DigitalVantage/coolify-nextjs-payload-guide) — covers VPS install, Cloudflare DNS, MongoDB service, environment variables, persistent volumes, SSL, backups, troubleshooting and a production hardening checklist.
>
> The TL;DR below is enough for an experienced Coolify user.

The included `Dockerfile` is configured for Next.js [`output: 'standalone'`](https://nextjs.org/docs/pages/api-reference/next-config-js/output) — the smallest production image possible.

In Coolify:

1. **New Resource → Application → Public Repository** → paste this repo's URL.
2. Build pack: **Dockerfile**.
3. Required environment variables:
   - `DATABASE_URL` (point at a Coolify-hosted MongoDB or external Atlas)
   - `PAYLOAD_SECRET`
   - `NEXT_PUBLIC_SERVER_URL` (your public URL, e.g. `https://example.com`)
   - `CRON_SECRET`, `PREVIEW_SECRET`
4. Add a Persistent Volume mapped to `/app/public/media` if you want uploads to survive redeploys.
5. Set the port to `3000`.

For MongoDB, Coolify can spin up a database resource — copy its connection string into `DATABASE_URL`.

## Scripts

```bash
pnpm dev                # start Next.js dev server
pnpm build              # production build (also runs next-sitemap)
pnpm start              # serve production build

# Quality
pnpm validate           # lint + typecheck + format:check + test:int + build
pnpm lint               # ESLint
pnpm lint:fix           # ESLint --fix
pnpm typecheck          # tsc --noEmit
pnpm format             # prettier --write
pnpm format:check       # prettier --check

# Tests
pnpm test               # vitest + playwright
pnpm test:int           # vitest only
pnpm test:e2e           # playwright only

# Payload utilities
pnpm generate:types     # regenerate Payload TypeScript types
pnpm generate:importmap # regenerate admin component import map
```

## Contributing

Issues and PRs welcome.

- [CONTRIBUTING.md](CONTRIBUTING.md) — development setup, branching and commit conventions
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) — Contributor Covenant 2.1
- [SECURITY.md](SECURITY.md) — vulnerability reporting (`security@digitalvantage.pl`)

## License

[MIT](LICENSE) — Digital Vantage. Do whatever you want with it; we'd love to hear if you ship something cool on top.

## Maintainer

**Digital Vantage** — partnerstwo technologiczne dla firm B2B w Polsce.

- Website: <https://www.digitalvantage.pl>
- Email: kontakt@digitalvantage.pl
- GitHub: [@DigitalVantage](https://github.com/DigitalVantage)

If you need a partner to build, scale or maintain a Payload + Next.js platform — [get in touch](https://www.digitalvantage.pl).
