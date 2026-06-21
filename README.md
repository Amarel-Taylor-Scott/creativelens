# CreativeLens

Creative-intelligence platform for marketing teams: generate, score, and
organize AI image content by niche — prompt studio, gallery, remixes, and team
boards.

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

## License

MIT — see [LICENSE](LICENSE).
