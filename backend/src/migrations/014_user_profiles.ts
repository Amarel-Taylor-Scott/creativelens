import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE user_profiles (
      id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id         UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      username        VARCHAR(50) UNIQUE,
      bio             TEXT,
      avatar_url      TEXT,
      banner_url      TEXT,
      twitter_handle  VARCHAR(100),
      website_url     TEXT,
      is_public       BOOLEAN NOT NULL DEFAULT true,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    COMMENT ON TABLE user_profiles IS 'Extended public profile data for users';

    CREATE INDEX idx_user_profiles_user_id ON user_profiles (user_id);
    CREATE INDEX idx_user_profiles_username ON user_profiles (username);
    CREATE INDEX idx_user_profiles_is_public ON user_profiles (is_public);

    CREATE TABLE profile_banner_pins (
      id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      image_id  UUID NOT NULL REFERENCES images(id) ON DELETE CASCADE,
      position  INTEGER NOT NULL DEFAULT 0,

      CONSTRAINT banner_pins_unique UNIQUE (user_id, image_id),
      CONSTRAINT banner_pins_max_position CHECK (position >= 0 AND position <= 2)
    );

    COMMENT ON TABLE profile_banner_pins IS 'Up to 3 pinned showcase images on user profile banners';

    CREATE INDEX idx_banner_pins_user_id ON profile_banner_pins (user_id);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE IF EXISTS profile_banner_pins;
    DROP TABLE IF EXISTS user_profiles;
  `);
}
