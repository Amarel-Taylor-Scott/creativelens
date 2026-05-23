import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE niches (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      category_id   UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
      name          VARCHAR(150) NOT NULL,
      slug          VARCHAR(150) NOT NULL UNIQUE,
      sub_niche     VARCHAR(150),
      description   TEXT,
      image_count   INTEGER NOT NULL DEFAULT 0,
      follower_count INTEGER NOT NULL DEFAULT 0,
      is_trending   BOOLEAN NOT NULL DEFAULT false,
      sort_order    INTEGER NOT NULL DEFAULT 0,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX idx_niches_category_id ON niches (category_id);
    CREATE INDEX idx_niches_slug ON niches (slug);
    CREATE INDEX idx_niches_sub_niche ON niches (sub_niche);
    CREATE INDEX idx_niches_is_trending ON niches (is_trending);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS niches;`);
}
