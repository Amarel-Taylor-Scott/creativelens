import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE rich_tags (
      id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      image_id              UUID NOT NULL UNIQUE REFERENCES images(id) ON DELETE CASCADE,
      art_style             VARCHAR(100),
      scene                 VARCHAR(200),
      mood                  VARCHAR(100),
      subjects              JSONB DEFAULT '[]',
      composition           VARCHAR(100),
      gender                VARCHAR(50),
      style_tags            JSONB DEFAULT '[]',
      clothing_descriptions JSONB DEFAULT '[]',
      content_tags          JSONB DEFAULT '[]',
      created_at            TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at            TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    COMMENT ON TABLE rich_tags IS 'Detailed AI-extracted tags for each image covering style, scene, mood, subjects, and clothing';
    COMMENT ON COLUMN rich_tags.subjects IS 'JSON array of detected subjects in the image';
    COMMENT ON COLUMN rich_tags.style_tags IS 'JSON array of style descriptor strings';
    COMMENT ON COLUMN rich_tags.clothing_descriptions IS 'JSON array of clothing items detected';
    COMMENT ON COLUMN rich_tags.content_tags IS 'JSON array of general content descriptor tags';

    CREATE INDEX idx_rich_tags_image_id ON rich_tags (image_id);
    CREATE INDEX idx_rich_tags_art_style ON rich_tags (art_style);
    CREATE INDEX idx_rich_tags_mood ON rich_tags (mood);
    CREATE INDEX idx_rich_tags_subjects ON rich_tags USING GIN (subjects);
    CREATE INDEX idx_rich_tags_style_tags ON rich_tags USING GIN (style_tags);
    CREATE INDEX idx_rich_tags_content_tags ON rich_tags USING GIN (content_tags);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS rich_tags;`);
}
