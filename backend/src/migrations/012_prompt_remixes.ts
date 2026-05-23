import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE prompt_remixes (
      id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      image_id        UUID NOT NULL REFERENCES images(id) ON DELETE CASCADE,
      remix_type      VARCHAR(50) NOT NULL,
      remixed_prompt  TEXT NOT NULL,
      predicted_score INTEGER CHECK (predicted_score >= 0 AND predicted_score <= 100),
      created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    COMMENT ON TABLE prompt_remixes IS 'AI-generated prompt variations and remixes for existing images';
    COMMENT ON COLUMN prompt_remixes.remix_type IS 'Type of remix: enhance, simplify, style-transfer, niche-adapt, etc.';
    COMMENT ON COLUMN prompt_remixes.predicted_score IS 'Predicted quality score 0-100 for the remixed prompt';

    CREATE INDEX idx_prompt_remixes_image_id ON prompt_remixes (image_id);
    CREATE INDEX idx_prompt_remixes_remix_type ON prompt_remixes (remix_type);
    CREATE INDEX idx_prompt_remixes_predicted_score ON prompt_remixes (predicted_score DESC);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS prompt_remixes;`);
}
