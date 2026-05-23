import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE extension_sessions (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token       VARCHAR(255) NOT NULL UNIQUE,
      is_active   BOOLEAN NOT NULL DEFAULT true,
      last_used   TIMESTAMPTZ,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX idx_extension_sessions_user_id ON extension_sessions (user_id);
    CREATE INDEX idx_extension_sessions_token ON extension_sessions (token);

    CREATE TABLE extension_image_cache (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      image_url   TEXT NOT NULL UNIQUE,
      analysis    JSONB NOT NULL DEFAULT '{}',
      expires_at  TIMESTAMPTZ NOT NULL DEFAULT (CURRENT_TIMESTAMP + INTERVAL '7 days'),
      created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    COMMENT ON TABLE extension_image_cache IS 'Cached image analyses for the Chrome extension to avoid re-processing';

    CREATE INDEX idx_extension_cache_url ON extension_image_cache (image_url);
    CREATE INDEX idx_extension_cache_expires ON extension_image_cache (expires_at);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE IF EXISTS extension_image_cache;
    DROP TABLE IF EXISTS extension_sessions;
  `);
}
