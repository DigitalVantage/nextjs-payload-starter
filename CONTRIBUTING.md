# Contributing

Thanks for your interest in `nextjs-payload-starter`. This document explains how to get a local copy running, what we expect from contributions, and the conventions used in this repo.

## Code of conduct

Be excellent to each other. Personal attacks, harassment or discrimination of any kind are unacceptable. Maintainers may close issues and PRs at their discretion.

## Quick start (development)

```bash
git clone https://github.com/DigitalVantage/nextjs-payload-starter.git
cd nextjs-payload-starter
pnpm install --ignore-workspace
docker compose up -d mongo
cp .env.example .env
# fill in PAYLOAD_SECRET / CRON_SECRET / PREVIEW_SECRET
pnpm dev
```

**Requirements**: Node.js ≥ 22, pnpm ≥ 9, Docker (for MongoDB).

## Reporting bugs

Open an issue with:

- **Steps to reproduce** (numbered, copy-pasteable).
- **Expected** vs. **actual** behavior.
- **Versions**: Node, pnpm, OS, browser if relevant.
- **Logs / screenshots** if you have them.

Bug reports without repro steps will get closed.

## Proposing changes

Before writing code on anything bigger than a typo or a one-line fix, please **open an issue first** to discuss the approach. We want to avoid PRs that take days of work and then get rejected because the design didn't match where the project is heading.

For small, obvious fixes (typos, broken links, dependency bumps) — just open the PR.

## Branching

- `main` — always deployable.
- Feature branches: `feat/<short-description>`.
- Fixes: `fix/<short-description>`.
- Chores: `chore/<short-description>`.

## Commit conventions

This repo follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): short imperative description

Optional body explaining WHY, wrapped at 72 chars.
```

**Types**: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`, `perf`, `build`, `ci`.

**Rules of thumb**:

- One logical change per commit. Refactors and features are always separate commits.
- Each commit should leave the tree green (`pnpm lint && pnpm test`).
- Subject ≤ 72 chars, no trailing period, imperative mood.
- No `WIP` / `fixup!` / `squash!` in the final history — `git rebase` before opening a PR.

## Pull request checklist

Before requesting review, make sure:

- [ ] `pnpm lint` passes
- [ ] `pnpm test:int` passes
- [ ] `pnpm build` succeeds
- [ ] Payload types are regenerated if you touched a collection or global (`pnpm generate:types`)
- [ ] Admin import map is regenerated if you added a custom admin component (`pnpm generate:importmap`)
- [ ] You added or updated tests where it makes sense
- [ ] You updated the README / CHANGELOG if user-visible behavior changed

PR description should include:

- **What** the change does (one sentence).
- **Why** it's needed (link the issue if there is one).
- **How to test** it.
- Screenshots/GIFs for UI changes.

## Code style

- **TypeScript strict mode** is on; don't `any` your way out of a real type problem.
- **Prettier** + **ESLint** are the source of truth — `pnpm lint:fix` before committing.
- **Tailwind**: use `cn()` from `@/utilities/ui` to merge classes; don't hand-roll `clsx + twMerge`.
- **Components**: prefer composition over giant prop bags. If a component takes more than ~6 props, ask whether it should be split.
- **Payload collections**: keep field config files small; extract `access`, `hooks`, `endpoints` into siblings.

## Adding new dependencies

- Justify the dependency in the PR description.
- Prefer additions to `dependencies` only when the package ships runtime code; otherwise put it in `devDependencies`.
- For UI primitives, prefer `@radix-ui/react-*` over a 5th headless library.
- Check the bundle size impact for client-side packages with `pnpm dlx bundlephobia <name>`.

## License of contributions

By submitting a PR you agree that your contribution is licensed under the [MIT license](LICENSE) of this project.
