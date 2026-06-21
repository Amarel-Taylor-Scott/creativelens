import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TYPE user_plan AS ENUM ('free', 'pro', 'agency');

    CREATE TABLE users (
      id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email           VARCHAR(255) NOT NULL UNIQUE,
      password_hash   VARCHAR(255) NOT NULL,
      display_name    VARCHAR(100),
      avatar_url      TEXT,
      plan            user_plan NOT NULL DEFAULT 'free',
      plan_expires_at TIMESTAMPTZ,
      is_creator      BOOLEAN NOT NULL DEFAULT false,
      is_admin        BOOLEAN NOT NULL DEFAULT false,
      api_calls_today INTEGER NOT NULL DEFAULT 0,
      api_calls_reset TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX idx_users_email ON users (email);
    CREATE INDEX idx_users_plan ON users (plan);
    CREATE INDEX idx_users_created_at ON users (created_at);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE IF EXISTS users;
    DROP TYPE IF EXISTS user_plan;
  `);
}
