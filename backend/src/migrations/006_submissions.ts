import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TYPE submission_status AS ENUM ('pending', 'approved', 'rejected');

    CREATE TABLE submissions (
      id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title           VARCHAR(255) NOT NULL,
      description     TEXT,
      file_url        TEXT NOT NULL,
      file_size       INTEGER NOT NULL,
      file_type       VARCHAR(50) NOT NULL,
      prompt          TEXT,
      negative_prompt TEXT,
      ai_model        VARCHAR(100),
      niche_tags      VARCHAR(100)[] NOT NULL DEFAULT '{}',
      status          submission_status NOT NULL DEFAULT 'pending',
      reviewer_id     UUID REFERENCES users(id),
      review_note     TEXT,
      reviewed_at     TIMESTAMPTZ,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT submissions_file_size_limit CHECK (file_size <= 15728640),
      CONSTRAINT submissions_max_niche_tags CHECK (array_length(niche_tags, 1) <= 23)
    );

    COMMENT ON COLUMN submissions.file_size IS 'Max 15MB (15728640 bytes)';
    COMMENT ON COLUMN submissions.niche_tags IS 'Up to 23 niche tag slugs per submission';

    CREATE INDEX idx_submissions_user_id ON submissions (user_id);
    CREATE INDEX idx_submissions_status ON submissions (status);
    CREATE INDEX idx_submissions_created_at ON submissions (created_at DESC);
    CREATE INDEX idx_submissions_niche_tags ON submissions USING GIN (niche_tags);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE IF EXISTS submissions;
    DROP TYPE IF EXISTS submission_status;
  `);
}
