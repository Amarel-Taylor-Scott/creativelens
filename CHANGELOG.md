# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Community health files: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`,
  `SECURITY.md`, issue/PR templates, and `CODEOWNERS`.

## [1.0.0] - 2026-06-21

### Added
- Creative-intelligence platform: prompt studio, gallery & scoring, niches,
  teams/boards, and analytics.
- Node + Express backend with Knex migrations on PostgreSQL (TypeScript);
  SvelteKit frontend (Vite, `adapter-node`, d3).
- Docker Compose stack (Postgres + Caddy).
- GitHub Actions CI (Node 22): backend `tsc` build + frontend SvelteKit/Vite
  build as separate jobs; committed per-subproject `package-lock.json`.

### Fixed
- Backend TypeScript build: `jsonwebtoken` v9 `expiresIn` typing for an
  env-string value (both auth routes).

[Unreleased]: https://github.com/Amarel-Taylor-Scott/creativelens/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Amarel-Taylor-Scott/creativelens/releases/tag/v1.0.0
