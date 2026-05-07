<!--
Thanks for opening a PR! Please fill in the sections below so a maintainer can
review quickly. Anything missing makes the review longer.
-->

## Summary

<!-- One-sentence description of what this PR does. -->

## Why

<!-- Motivation. Link the issue if there is one (e.g. "Closes #42"). -->

## Changes

<!-- Bullet list of the actual changes. -->

-

## How to test

<!-- Steps a reviewer can run locally to validate the change. -->

-

## Screenshots / GIFs

<!-- Required for UI changes. -->

## Checklist

- [ ] `pnpm lint` passes
- [ ] `pnpm exec tsc --noEmit` passes
- [ ] `pnpm test:int` passes
- [ ] `pnpm build` succeeds
- [ ] Payload types regenerated with `pnpm generate:types` (if a collection or global was touched)
- [ ] Admin import map regenerated with `pnpm generate:importmap` (if a custom admin component was added)
- [ ] `CHANGELOG.md` entry added under `[Unreleased]` for user-visible changes
- [ ] Tests added/updated where it makes sense
