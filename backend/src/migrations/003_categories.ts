import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE categories (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name          VARCHAR(100) NOT NULL UNIQUE,
      slug          VARCHAR(100) NOT NULL UNIQUE,
      description   TEXT,
      icon          VARCHAR(10),
      color         VARCHAR(7),
      sort_order    INTEGER NOT NULL DEFAULT 0,
      image_count   INTEGER NOT NULL DEFAULT 0,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX idx_categories_slug ON categories (slug);
    CREATE INDEX idx_categories_sort_order ON categories (sort_order);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS categories;`);
}
