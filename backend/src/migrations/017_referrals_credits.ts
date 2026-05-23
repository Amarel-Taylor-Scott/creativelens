import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE referrals (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      referrer_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      referred_id   UUID REFERENCES users(id) ON DELETE SET NULL,
      status        VARCHAR(20) NOT NULL DEFAULT 'pending',
      token         VARCHAR(100) NOT NULL UNIQUE,
      credited_at   TIMESTAMPTZ,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    COMMENT ON COLUMN referrals.status IS 'pending, completed, expired';

    CREATE INDEX idx_referrals_referrer_id ON referrals (referrer_id);
    CREATE INDEX idx_referrals_referred_id ON referrals (referred_id);
    CREATE INDEX idx_referrals_token ON referrals (token);
    CREATE INDEX idx_referrals_status ON referrals (status);

    CREATE TABLE credit_transfers (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      from_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      to_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      credits     INTEGER NOT NULL CHECK (credits > 0),
      status      VARCHAR(20) NOT NULL DEFAULT 'completed',
      token       VARCHAR(100) UNIQUE,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX idx_credit_transfers_from ON credit_transfers (from_id);
    CREATE INDEX idx_credit_transfers_to ON credit_transfers (to_id);

    CREATE TABLE promo_codes (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      code        VARCHAR(50) NOT NULL UNIQUE,
      type        VARCHAR(30) NOT NULL DEFAULT 'credits',
      credits     INTEGER NOT NULL DEFAULT 0,
      max_uses    INTEGER NOT NULL DEFAULT 1,
      used_count  INTEGER NOT NULL DEFAULT 0,
      expires_at  TIMESTAMPTZ,
      is_active   BOOLEAN NOT NULL DEFAULT true,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    COMMENT ON COLUMN promo_codes.type IS 'credits, discount, trial_extension';

    CREATE INDEX idx_promo_codes_code ON promo_codes (code);
    CREATE INDEX idx_promo_codes_is_active ON promo_codes (is_active);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE IF EXISTS promo_codes;
    DROP TABLE IF EXISTS credit_transfers;
    DROP TABLE IF EXISTS referrals;
  `);
}
