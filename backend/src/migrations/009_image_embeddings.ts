import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE EXTENSION IF NOT EXISTS vector;

    CREATE TABLE image_embeddings (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      image_id    UUID NOT NULL UNIQUE REFERENCES images(id) ON DELETE CASCADE,
      embedding   vector(384) NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    COMMENT ON TABLE image_embeddings IS 'CLIP embeddings for semantic image search and similarity';
    COMMENT ON COLUMN image_embeddings.embedding IS 'CLIP ViT-B/32 384-dimensional embedding vector';

    CREATE INDEX idx_image_embeddings_image_id ON image_embeddings (image_id);
    CREATE INDEX idx_image_embeddings_vector ON image_embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS image_embeddings;`);
}
