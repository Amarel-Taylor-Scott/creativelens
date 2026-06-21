import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE niche_categories (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name          VARCHAR(150) NOT NULL,
      slug          VARCHAR(150) NOT NULL UNIQUE,
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX idx_niche_categories_slug ON niche_categories (slug);
    CREATE INDEX idx_niche_categories_display_order ON niche_categories (display_order);

    CREATE TABLE niche_subcategories (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      category_id UUID NOT NULL REFERENCES niche_categories(id) ON DELETE CASCADE,
      name        VARCHAR(150) NOT NULL,
      slug        VARCHAR(150) NOT NULL UNIQUE,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX idx_niche_subcategories_category_id ON niche_subcategories (category_id);
    CREATE INDEX idx_niche_subcategories_slug ON niche_subcategories (slug);

    CREATE TABLE niche_connections (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      niche_id_1  UUID NOT NULL REFERENCES niches(id) ON DELETE CASCADE,
      niche_id_2  UUID NOT NULL REFERENCES niches(id) ON DELETE CASCADE,
      strength    NUMERIC(3,2) NOT NULL DEFAULT 0.5 CHECK (strength >= 0 AND strength <= 1),
      created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT niche_connections_unique UNIQUE (niche_id_1, niche_id_2),
      CONSTRAINT niche_connections_no_self CHECK (niche_id_1 != niche_id_2)
    );

    CREATE INDEX idx_niche_connections_niche_1 ON niche_connections (niche_id_1);
    CREATE INDEX idx_niche_connections_niche_2 ON niche_connections (niche_id_2);

    CREATE TABLE niche_analytics (
      id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      niche_slug        VARCHAR(150) NOT NULL UNIQUE,
      top_styles        JSONB DEFAULT '[]',
      trending_prompts  JSONB DEFAULT '[]',
      engagement_score  NUMERIC(5,2) NOT NULL DEFAULT 0,
      updated_at        TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      created_at        TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    COMMENT ON TABLE niche_analytics IS 'Aggregated analytics data per niche including trends and engagement';

    CREATE INDEX idx_niche_analytics_niche_slug ON niche_analytics (niche_slug);
    CREATE INDEX idx_niche_analytics_engagement ON niche_analytics (engagement_score DESC);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE IF EXISTS niche_analytics;
    DROP TABLE IF EXISTS niche_connections;
    DROP TABLE IF EXISTS niche_subcategories;
    DROP TABLE IF EXISTS niche_categories;
  `);
}
