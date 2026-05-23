import { Router, Request, Response } from 'express';
import { z } from 'zod';

const router = Router();

const nicheQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(50),
  category: z.string().optional(),
  search: z.string().optional(),
  trending: z.coerce.boolean().optional(),
});

// GET /api/v1/niches
router.get('/', async (req: Request, res: Response) => {
  try {
    const query = nicheQuerySchema.parse(req.query);

    // TODO: Build query with Knex
    // let q = db('niches')
    //   .join('categories', 'niches.category_id', 'categories.id')
    //   .select('niches.*', 'categories.name as category_name', 'categories.slug as category_slug');
    //
    // if (query.category) q = q.where('categories.slug', query.category);
    // if (query.trending) q = q.where('niches.is_trending', true);
    // if (query.search) q = q.whereILike('niches.name', `%${query.search}%`);

    res.json({
      success: true,
      data: {
        niches: [],
        pagination: {
          page: query.page,
          limit: query.limit,
          total: 0,
          total_pages: 0,
        },
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Invalid query', details: err.errors });
    }
    console.error('Niches list error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch niches' });
  }
});

// GET /api/v1/niches/:slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    // TODO: Fetch niche with images
    // const niche = await db('niches')
    //   .join('categories', 'niches.category_id', 'categories.id')
    //   .where('niches.slug', slug)
    //   .first();

    res.json({
      success: true,
      data: { slug, images: [], image_count: 0 },
    });
  } catch (err) {
    console.error('Niche detail error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch niche' });
  }
});

// POST /api/v1/niches/:slug/subscribe
router.post('/:slug/subscribe', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    // TODO: Toggle subscription
    // Requires auth middleware to get user_id
    // const niche = await db('niches').where({ slug }).first();
    // const existing = await db('niche_subscriptions').where({ user_id, niche_id: niche.id }).first();
    // if (existing) { await db('niche_subscriptions').where({ id: existing.id }).delete(); }
    // else { await db('niche_subscriptions').insert({ user_id, niche_id: niche.id }); }

    res.json({
      success: true,
      data: { slug, subscribed: true },
    });
  } catch (err) {
    console.error('Niche subscribe error:', err);
    res.status(500).json({ success: false, error: 'Failed to toggle subscription' });
  }
});

export default router;
