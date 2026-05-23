.PHONY: dev build up down restart logs migrate seed reset clean

# Development
dev:
	docker-compose up

dev-build:
	docker-compose up --build

dev-backend:
	cd backend && npm run dev

dev-frontend:
	cd frontend && npm run dev

# Docker
build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

restart:
	docker-compose restart

logs:
	docker-compose logs -f

logs-backend:
	docker-compose logs -f backend

logs-frontend:
	docker-compose logs -f frontend

# Database
migrate:
	cd backend && npx knex migrate:latest --knexfile knexfile.ts

migrate-rollback:
	cd backend && npx knex migrate:rollback --knexfile knexfile.ts

seed:
	cd backend && npx knex seed:run --knexfile knexfile.ts

reset:
	cd backend && npx knex migrate:rollback --all --knexfile knexfile.ts && npx knex migrate:latest --knexfile knexfile.ts && npx knex seed:run --knexfile knexfile.ts

# Setup
install:
	cd backend && npm install
	cd frontend && npm install

setup: install migrate seed
	@echo "CreativeLens setup complete"

# Cleanup
clean:
	docker-compose down -v
	rm -rf backend/node_modules frontend/node_modules
