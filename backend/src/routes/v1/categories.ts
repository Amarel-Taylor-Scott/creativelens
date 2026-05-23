import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/v1/categories
router.get('/', async (_req: Request, res: Response) => {
  try {
    // TODO: Fetch from database
    // const categories = await db('categories')
    //   .orderBy('sort_order', 'asc');

    res.json({
      success: true,
      data: { categories: [] },
    });
  } catch (err) {
    console.error('Categories list error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch categories' });
  }
});

// GET /api/v1/categories/:slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    // TODO: Fetch category with its niches
    // const category = await db('categories').where({ slug }).first();
    // const niches = await db('niches').where({ category_id: category.id });

    res.json({
      success: true,
      data: { slug, niches: [] },
    });
  } catch (err) {
    console.error('Category detail error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch category' });
  }
});

export default router;
