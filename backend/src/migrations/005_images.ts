import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TYPE image_status AS ENUM ('active', 'hidden', 'flagged', 'removed');

    CREATE TABLE images (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      niche_id      UUID NOT NULL REFERENCES niches(id) ON DELETE CASCADE,
      creator_id    UUID REFERENCES users(id) ON DELETE SET NULL,
      url           TEXT NOT NULL,
      thumbnail_url TEXT,
      title         VARCHAR(255) NOT NULL,
      prompt        TEXT,
      negative_prompt TEXT,
      ai_model      VARCHAR(100),
      sampler       VARCHAR(50),
      steps         INTEGER,
      cfg_scale     REAL,
      seed          BIGINT,
      width         INTEGER,
      height        INTEGER,
      creator       VARCHAR(100),
      status        image_status NOT NULL DEFAULT 'active',
      view_count    INTEGER NOT NULL DEFAULT 0,
      like_count    INTEGER NOT NULL DEFAULT 0,
      download_count INTEGER NOT NULL DEFAULT 0,
      metadata      JSONB DEFAULT '{}',
      created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX idx_images_niche_id ON images (niche_id);
    CREATE INDEX idx_images_creator_id ON images (creator_id);
    CREATE INDEX idx_images_ai_model ON images (ai_model);
    CREATE INDEX idx_images_status ON images (status);
    CREATE INDEX idx_images_created_at ON images (created_at DESC);
    CREATE INDEX idx_images_like_count ON images (like_count DESC);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE IF EXISTS images;
    DROP TYPE IF EXISTS image_status;
  `);
}
