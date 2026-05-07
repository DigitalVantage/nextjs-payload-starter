# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-05-07

### Added

- Initial release of `nextjs-payload-starter`, forked from the official Payload `templates/website` and adapted for Digital Vantage.
- **Stack**: Next.js 16 (App Router, Turbopack, React 19.2), Payload CMS 3.84, MongoDB 7, Tailwind CSS 4, TypeScript 6.
- **Payload collections**: Pages, Posts, Media, Categories, Users + Header and Footer globals.
- **Payload plugins**: form-builder, nested-docs, redirects, search, SEO.
- **Live preview** for Pages and Posts with Mobile/Tablet/Desktop breakpoints.
- **Payload `localization`** for content (`pl` default, `en` fallback) — `Pages.title` is shipped as `localized: true` to demonstrate the feature.
- **`next-intl` 4** scaffolding for UI strings:
  - `src/i18n/config.ts` — locale list and default
  - `src/i18n/request.ts` — locale detection from cookie / `Accept-Language` / default
  - `src/i18n/messages/{pl,en}.json` — starter translation dictionaries
  - `NextIntlClientProvider` wired into the frontend layout
- **`docker-compose.yml`** with MongoDB 7 (healthcheck) + optional app container under the `full` profile.
- **`Dockerfile`** for Next.js standalone output, Coolify-ready.
- **GitHub Actions CI** (`.github/workflows/ci.yml`) — runs `lint`, `typecheck`, `format:check`, `test:int` and `build` on every PR and push to `main`, against an ephemeral MongoDB 7 service container.
- **Dependabot** (`.github/dependabot.yml`) — weekly grouped updates for npm (Payload, Next/React, Radix, Tailwind, lint/format, testing, types) and GitHub Actions.
- **Community files**: `SECURITY.md`, `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1), `CONTRIBUTING.md`, MIT `LICENSE`, GitHub PR template, structured Bug / Feature issue forms (`.github/ISSUE_TEMPLATE/*.yml`) with a contact-link routing card to `digitalvantage.pl`.
- **`.nvmrc`** pinning Node 22 for `nvm` / `fnm` / `volta` users.
- **Tests scaffolding**: Vitest 4 (integration) + Playwright 1.59 (e2e). E2E homepage spec asserts a non-empty title and `<h1>`, intentionally not the exact copy, so the test stays green when content changes.
- **Lint/format**: ESLint 9 + Prettier 3 + `eslint-config-next` (flat config). Zero ESLint warnings on the shipped tree.
- **Documentation**: README with quick start, project structure, i18n guide and Coolify deployment steps; CONTRIBUTING with PR checklist and Conventional Commits guide.
- **Quality scripts**: `pnpm validate` runs `lint && typecheck && format:check && test:int && build` (mirrors CI).

### Changed

- Replaced monorepo `workspace:*` references with concrete versions from npm so the project installs standalone.
- Dropped the experimental `folders` collection and `createFolderField` from Media (not yet exported in Payload 3.84.1).
- Removed `baseUrl` from `tsconfig.json` (deprecated in TypeScript 6).
- Switched `src/...` imports to the `@/...` alias for consistency.
- Modernized `docker-compose.yml`: Mongo 7 with healthcheck, `node:22-alpine` app container behind a `full` profile, `pnpm` instead of `yarn`.
- Flattened `useClickableCard` return shape (`card.ref` -> `cardRef`) to avoid the new `react-hooks/refs` rule false positive on destructured ref objects.
- Migrated ESLint config from `FlatCompat`-based shim to direct flat-config imports of `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.

### Documented

- Three intentional `setState` calls inside `useEffect` (theme/header SSR hydration patterns) carry per-line `eslint-disable-next-line react-hooks/set-state-in-effect` comments with **why** notes, keeping the rule active for new code.

[Unreleased]: https://github.com/DigitalVantage/nextjs-payload-starter/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/DigitalVantage/nextjs-payload-starter/releases/tag/v0.1.0
