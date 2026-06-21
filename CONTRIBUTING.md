# Contributing to CreativeLens

Thanks for your interest in contributing! This guide covers setup, the quality
bar, and how to propose changes.

## Development setup

Requires **Node 22+**. The backend and frontend are independent npm projects
(not a workspaces monorepo); install each one separately.

```bash
git clone https://github.com/Amarel-Taylor-Scott/creativelens.git
cd creativelens
cp .env.example .env          # fill in your values

cd backend && npm install     # Express + Knex/Postgres API
cd ../frontend && npm install # SvelteKit app
```

The full stack (Postgres + Caddy) runs via Docker Compose from the repo root:

```bash
docker-compose up
npm run migrate               # knex migrate:latest
npm run seed                  # seed categories/niches
```

## Project layout

| Path | Stack |
|------|-------|
| `backend/` | Node + Express, Knex migrations on Postgres, TypeScript (`tsc` build) |
| `frontend/` | SvelteKit (Vite, `adapter-node`), TypeScript, d3 |
| `docker-compose.yml` | Postgres + backend + frontend + Caddy |

## Before you open a PR

Mirror CI (`.github/workflows/ci.yml`) — each subproject independently:

```bash
cd backend  && npm ci && npm run build        # tsc
cd backend  && npm test                        # jest
cd frontend && npm ci && npm run build         # SvelteKit / vite
cd frontend && npm run check                    # svelte-check (non-blocking)
```

- Keep TypeScript building cleanly in both subprojects.
- For `jsonwebtoken` v9, cast an env-string `expiresIn` as
  `jwt.SignOptions['expiresIn']`.
- Add/adjust tests for behavior you change; update `CHANGELOG.md` for
  user-facing changes.

## Pull request process

1. Fork and branch (`feat/...` or `fix/...`).
2. Make the change; keep it focused.
3. Build both subprojects and run the backend tests.
4. Open a PR using the template and describe how you verified it.

## Reporting

Use the issue templates for bugs/features. For security issues, see
[SECURITY.md](SECURITY.md). Never commit `.env`, secrets, or `node_modules`.
