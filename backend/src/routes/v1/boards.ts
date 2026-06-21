import { Router, Request, Response } from 'express';
import { z } from 'zod';

const router = Router();

const createBoardSchema = z.object({
  name: z.string().min(1).max(200),
});

const addItemSchema = z.object({
  image_id: z.string().uuid(),
  sort_order: z.number().min(0).optional(),
  item_data: z.record(z.unknown()).optional(),
});

// GET /api/v1/boards - List my boards
router.get('/', async (_req: Request, res: Response) => {
  try {
    // TODO: Requires auth
    // const userId = req.user.id;
    // const boards = await db('boards')
    //   .where({ user_id: userId })
    //   .select('boards.*')
    //   .orderBy('created_at', 'desc');
    // for (const board of boards) {
    //   board.item_count = await db('board_items').where({ board_id: board.id }).count('* as count').first();
    // }

    res.json({
      success: true,
      data: { boards: [] },
    });
  } catch (err) {
    console.error('List boards error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch boards' });
  }
});

// POST /api/v1/boards - Create a board
router.post('/', async (req: Request, res: Response) => {
  try {
    const body = createBoardSchema.parse(req.body);

    // TODO: Requires auth
    // const [board] = await db('boards').insert({
    //   user_id: req.user.id,
    //   name: body.name,
    // }).returning('*');

    res.status(201).json({
      success: true,
      data: { message: 'Board created', name: body.name },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: err.errors });
    }
    console.error('Create board error:', err);
    res.status(500).json({ success: false, error: 'Failed to create board' });
  }
});

// GET /api/v1/boards/:id - Get board with items
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // TODO: Fetch board with items
    // const board = await db('boards').where({ id }).first();
    // const items = await db('board_items')
    //   .join('images', 'board_items.image_id', 'images.id')
    //   .where('board_items.board_id', id)
    //   .orderBy('board_items.sort_order');

    res.json({
      success: true,
      data: { id, name: '', items: [] },
    });
  } catch (err) {
    console.error('Get board error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch board' });
  }
});

// DELETE /api/v1/boards/:id - Delete a board
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // TODO: Requires auth + ownership check
    // await db('boards').where({ id, user_id: req.user.id }).delete();

    res.json({
      success: true,
      data: { message: 'Board deleted', id },
    });
  } catch (err) {
    console.error('Delete board error:', err);
    res.status(500).json({ success: false, error: 'Failed to delete board' });
  }
});

// POST /api/v1/boards/:id/items - Add item to board
router.post('/:id/items', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = addItemSchema.parse(req.body);

    // TODO: Requires auth + ownership
    // const [item] = await db('board_items').insert({
    //   board_id: id,
    //   image_id: body.image_id,
    //   sort_order: body.sort_order || 0,
    //   item_data: body.item_data || {},
    // }).returning('*');

    res.status(201).json({
      success: true,
      data: { message: 'Item added to board', board_id: id, image_id: body.image_id },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: err.errors });
    }
    console.error('Add board item error:', err);
    res.status(500).json({ success: false, error: 'Failed to add item' });
  }
});

// DELETE /api/v1/boards/:id/items/:imageId - Remove item from board
router.delete('/:id/items/:imageId', async (req: Request, res: Response) => {
  try {
    const { id, imageId } = req.params;

    // TODO: Requires auth + ownership
    // await db('board_items').where({ board_id: id, image_id: imageId }).delete();

    res.json({
      success: true,
      data: { message: 'Item removed from board', board_id: id, image_id: imageId },
    });
  } catch (err) {
    console.error('Remove board item error:', err);
    res.status(500).json({ success: false, error: 'Failed to remove item' });
  }
});

export default router;
