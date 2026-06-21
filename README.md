# CreativeLens

[![CI](https://github.com/Amarel-Taylor-Scott/creativelens/actions/workflows/ci.yml/badge.svg)](https://github.com/Amarel-Taylor-Scott/creativelens/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node 22+](https://img.shields.io/badge/node-22+-green.svg)](https://nodejs.org/)

Creative-intelligence platform for marketing teams: generate, score, and
organize AI image content by niche — prompt studio, gallery, remixes, and team
boards.

> CI builds the backend (`tsc`) and frontend (SvelteKit/Vite). Runtime paths
> (migrations, seeds, image scoring) require Postgres and are not run in CI.

## Features

- **Prompt studio** — generate and remix prompts for AI image content.
- **Gallery & scoring** — image submissions with marketing/quality scores and
  embeddings for similarity search.
- **Niches** — curated categories/niches with subscriptions and per-niche extras.
- **Teams & boards** — shared sets, boards, and user profiles for collaboration.
- **Analytics** — usage and performance stats.
- **Browser extension** hooks for in-context capture.

## Stack

| Layer | Tech |
|---|---|
| Backend | Node + Express, Knex migrations on PostgreSQL, TypeScript |
| Frontend | SvelteKit (Vite, `adapter-node`), TypeScript |
| Infra | Docker Compose (Postgres + Caddy) |

## Develop

```bash
cp .env.example .env          # fill in your values
docker-compose up             # postgres + backend + frontend + caddy
# or run services individually:
npm run dev:backend           # cd backend && npm run dev
npm run dev:frontend          # cd frontend && npm run dev  (http://localhost:3000)

# database
npm run migrate               # knex migrate:latest
npm run seed                  # seed categories/niches
```

## Tests

```bash
npm test   # backend + frontend test suites
```

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for setup
(backend and frontend are independent npm projects), the build/test bar, and the
PR process, and note our [Code of Conduct](CODE_OF_CONDUCT.md). Report security
issues privately per [SECURITY.md](SECURITY.md). Release history is in
[CHANGELOG.md](CHANGELOG.md).

## License

[MIT](LICENSE) © Amarel Taylor Scott
