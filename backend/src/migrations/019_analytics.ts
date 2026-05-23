import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE page_views (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      page        VARCHAR(500) NOT NULL,
      referrer    TEXT,
      user_agent  TEXT,
      session_id  VARCHAR(100),
      user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX idx_page_views_page ON page_views (page);
    CREATE INDEX idx_page_views_session ON page_views (session_id);
    CREATE INDEX idx_page_views_created_at ON page_views (created_at DESC);

    CREATE TABLE analytics_events (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      event_type  VARCHAR(100) NOT NULL,
      event_data  JSONB DEFAULT '{}',
      session_id  VARCHAR(100),
      user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX idx_analytics_events_type ON analytics_events (event_type);
    CREATE INDEX idx_analytics_events_created_at ON analytics_events (created_at DESC);

    CREATE TABLE email_subscribers (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email       VARCHAR(255) NOT NULL UNIQUE,
      niche_id    UUID REFERENCES niches(id) ON DELETE SET NULL,
      is_active   BOOLEAN NOT NULL DEFAULT true,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX idx_email_subscribers_email ON email_subscribers (email);
    CREATE INDEX idx_email_subscribers_niche_id ON email_subscribers (niche_id);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE IF EXISTS email_subscribers;
    DROP TABLE IF EXISTS analytics_events;
    DROP TABLE IF EXISTS page_views;
  `);
}
