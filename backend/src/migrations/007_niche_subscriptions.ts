import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE niche_subscriptions (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      niche_id    UUID NOT NULL REFERENCES niches(id) ON DELETE CASCADE,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT niche_subscriptions_unique UNIQUE (user_id, niche_id)
    );

    CREATE INDEX idx_niche_subscriptions_user_id ON niche_subscriptions (user_id);
    CREATE INDEX idx_niche_subscriptions_niche_id ON niche_subscriptions (niche_id);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS niche_subscriptions;`);
}
