# Security policy

## Supported versions

This starter is published as-is. Security fixes land on `main` and are
released as new tags. We backport critical fixes to the most recent
minor release on a best-effort basis.

| Version               | Supported          |
| --------------------- | ------------------ |
| `main`                | :white_check_mark: |
| latest tagged release | :white_check_mark: |
| anything older        | :x:                |

## Reporting a vulnerability

**Please do not open public GitHub issues for security reports.**

If you believe you have found a security vulnerability in this starter or
in the way it composes Payload / Next.js / MongoDB, email us at:

> **security@digitalvantage.pl**

Include:

- A description of the issue and the impact (what an attacker can do).
- Reproduction steps or a proof-of-concept.
- The commit SHA or release tag you tested against.
- Your name / handle if you'd like to be credited.

We will acknowledge receipt within **2 working days** (Europe/Warsaw) and
follow up with a remediation timeline. If the issue is in an upstream
dependency (Payload, Next.js, MongoDB driver, …) we will help coordinate
a report with the upstream maintainers.

## Out of scope

The following are **not** considered vulnerabilities in this starter:

- Issues that require an attacker to already have admin credentials.
- Configuration mistakes in your own deployment (e.g. weak `PAYLOAD_SECRET`,
  exposed `.env`, public MongoDB without auth) — fix your config.
- Best-practice findings without a concrete attack path (e.g. "this header
  could be set"). Open a regular issue or PR for those.

## Hardening checklist for production

This starter is a **starting point**, not a turn-key secure deployment.
Before going to production:

- [ ] Generate strong `PAYLOAD_SECRET`, `CRON_SECRET`, `PREVIEW_SECRET`
      (`openssl rand -base64 32` or longer).
- [ ] Run MongoDB with authentication enabled and TLS for any non-local
      connection.
- [ ] Restrict `cors` in `payload.config.ts` to your real production
      origins.
- [ ] Set `NEXT_PUBLIC_SERVER_URL` to the public URL — it drives
      OG tags, sitemap and live-preview validation.
- [ ] Put the app behind a reverse proxy that terminates TLS and adds
      security headers (`Strict-Transport-Security`, `Content-Security-Policy`,
      `X-Content-Type-Options`, `Referrer-Policy`).
- [ ] Enable rate limiting on `/api/*` and `/admin/*` (Coolify, Cloudflare,
      Vercel, Nginx — pick your layer).
- [ ] Persist `public/media/` to a managed volume or object storage
      (S3-compatible) — local disk is fine for prototypes only.
