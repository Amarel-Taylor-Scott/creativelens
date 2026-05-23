import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE boards (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name        VARCHAR(200) NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX idx_boards_user_id ON boards (user_id);

    CREATE TABLE board_items (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      board_id    UUID NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
      image_id    UUID NOT NULL REFERENCES images(id) ON DELETE CASCADE,
      sort_order  INTEGER NOT NULL DEFAULT 0,
      item_data   JSONB DEFAULT '{}',
      created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT board_items_unique UNIQUE (board_id, image_id)
    );

    COMMENT ON COLUMN board_items.item_data IS 'Optional per-item metadata like notes or custom labels';

    CREATE INDEX idx_board_items_board_id ON board_items (board_id);
    CREATE INDEX idx_board_items_image_id ON board_items (image_id);
    CREATE INDEX idx_board_items_sort_order ON board_items (sort_order);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE IF EXISTS board_items;
    DROP TABLE IF EXISTS boards;
  `);
}
