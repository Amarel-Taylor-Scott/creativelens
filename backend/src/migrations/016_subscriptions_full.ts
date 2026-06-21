import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE subscriptions (
      id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id                 UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      tier                    VARCHAR(20) NOT NULL DEFAULT 'free',
      stripe_customer_id      VARCHAR(100),
      stripe_subscription_id  VARCHAR(100),
      stripe_price_id         VARCHAR(100),
      current_period_start    TIMESTAMPTZ,
      current_period_end      TIMESTAMPTZ,
      cancel_at_period_end    BOOLEAN NOT NULL DEFAULT false,
      fraud_score             NUMERIC(3,2) DEFAULT 0,
      created_at              TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at              TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    COMMENT ON COLUMN subscriptions.fraud_score IS 'Risk score 0-1 for subscription fraud detection';

    CREATE INDEX idx_subscriptions_user_id ON subscriptions (user_id);
    CREATE INDEX idx_subscriptions_tier ON subscriptions (tier);
    CREATE INDEX idx_subscriptions_stripe_customer_id ON subscriptions (stripe_customer_id);

    ALTER TABLE niche_subscriptions ADD COLUMN IF NOT EXISTS plan_type VARCHAR(20) DEFAULT 'free';
    ALTER TABLE niche_subscriptions ADD COLUMN IF NOT EXISTS stripe_session_id VARCHAR(100);
    ALTER TABLE niche_subscriptions ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE niche_subscriptions DROP COLUMN IF EXISTS plan_type;
    ALTER TABLE niche_subscriptions DROP COLUMN IF EXISTS stripe_session_id;
    ALTER TABLE niche_subscriptions DROP COLUMN IF EXISTS status;
    DROP TABLE IF EXISTS subscriptions;
  `);
}
