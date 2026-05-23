import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE api_keys (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      key_hash      VARCHAR(255) NOT NULL,
      key_prefix    VARCHAR(20) NOT NULL,
      name          VARCHAR(100) NOT NULL DEFAULT 'Default',
      rate_limit    INTEGER NOT NULL DEFAULT 100,
      is_active     BOOLEAN NOT NULL DEFAULT true,
      last_used_at  TIMESTAMPTZ,
      expires_at    TIMESTAMPTZ,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    COMMENT ON COLUMN api_keys.key_prefix IS 'Format: cl_live_* for production, cl_test_* for testing';
    COMMENT ON COLUMN api_keys.rate_limit IS 'Max requests per 15-minute window. Free: 100, Pro: 1000, Agency: 5000';

    CREATE INDEX idx_api_keys_user_id ON api_keys (user_id);
    CREATE INDEX idx_api_keys_key_prefix ON api_keys (key_prefix);
    CREATE INDEX idx_api_keys_is_active ON api_keys (is_active);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS api_keys;`);
}
