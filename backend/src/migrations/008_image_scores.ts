import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE image_scores (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      image_id      UUID NOT NULL REFERENCES images(id) ON DELETE CASCADE,
      dimension     VARCHAR(100) NOT NULL,
      sub_dimension VARCHAR(100),
      score         NUMERIC(5,2) NOT NULL,
      metadata      JSONB DEFAULT '{}',
      created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    COMMENT ON TABLE image_scores IS 'Extensible multi-dimensional scoring system for images';
    COMMENT ON COLUMN image_scores.dimension IS 'Top-level score category: aesthetic, technical, commercial, etc.';
    COMMENT ON COLUMN image_scores.sub_dimension IS 'Granular sub-category within a dimension';

    CREATE INDEX idx_image_scores_image_id ON image_scores (image_id);
    CREATE INDEX idx_image_scores_dimension ON image_scores (dimension);
    CREATE INDEX idx_image_scores_sub_dimension ON image_scores (sub_dimension);
    CREATE INDEX idx_image_scores_score ON image_scores (score DESC);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS image_scores;`);
}
