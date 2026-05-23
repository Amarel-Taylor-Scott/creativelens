import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE shared_sets (
      id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      share_id        VARCHAR(20) NOT NULL UNIQUE,
      is_public       BOOLEAN NOT NULL DEFAULT true,
      analysis_data   JSONB NOT NULL DEFAULT '{}',
      views           INTEGER NOT NULL DEFAULT 0,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    COMMENT ON TABLE shared_sets IS 'Shareable analysis result pages with unique short URLs';
    COMMENT ON COLUMN shared_sets.share_id IS 'Short unique identifier for public sharing links';
    COMMENT ON COLUMN shared_sets.analysis_data IS 'Snapshot of analysis results including image URL, prompts, scores';

    CREATE INDEX idx_shared_sets_user_id ON shared_sets (user_id);
    CREATE INDEX idx_shared_sets_share_id ON shared_sets (share_id);
    CREATE INDEX idx_shared_sets_is_public ON shared_sets (is_public);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS shared_sets;`);
}
