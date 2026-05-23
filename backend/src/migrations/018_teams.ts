import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE teams (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name        VARCHAR(200) NOT NULL,
      slug        VARCHAR(200) NOT NULL UNIQUE,
      owner_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      plan_tier   VARCHAR(20) NOT NULL DEFAULT 'agency',
      max_seats   INTEGER NOT NULL DEFAULT 10,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX idx_teams_slug ON teams (slug);
    CREATE INDEX idx_teams_owner_id ON teams (owner_id);

    CREATE TYPE team_role AS ENUM ('owner', 'admin', 'member', 'viewer');

    CREATE TABLE team_members (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      team_id     UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
      user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      role        team_role NOT NULL DEFAULT 'member',
      joined_at   TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT team_members_unique UNIQUE (team_id, user_id)
    );

    CREATE INDEX idx_team_members_team_id ON team_members (team_id);
    CREATE INDEX idx_team_members_user_id ON team_members (user_id);

    CREATE TYPE invite_status AS ENUM ('pending', 'accepted', 'expired', 'revoked');

    CREATE TABLE team_invites (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      team_id     UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
      email       VARCHAR(255) NOT NULL,
      token       VARCHAR(100) NOT NULL UNIQUE,
      status      invite_status NOT NULL DEFAULT 'pending',
      invited_by  UUID REFERENCES users(id) ON DELETE SET NULL,
      accepted_at TIMESTAMPTZ,
      expires_at  TIMESTAMPTZ NOT NULL DEFAULT (CURRENT_TIMESTAMP + INTERVAL '7 days'),
      created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX idx_team_invites_team_id ON team_invites (team_id);
    CREATE INDEX idx_team_invites_email ON team_invites (email);
    CREATE INDEX idx_team_invites_token ON team_invites (token);
    CREATE INDEX idx_team_invites_status ON team_invites (status);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE IF EXISTS team_invites;
    DROP TABLE IF EXISTS team_members;
    DROP TABLE IF EXISTS teams;
    DROP TYPE IF EXISTS invite_status;
    DROP TYPE IF EXISTS team_role;
  `);
}
