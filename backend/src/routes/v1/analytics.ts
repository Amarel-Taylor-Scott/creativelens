import { Router, Request, Response } from 'express';
import { z } from 'zod';

const router = Router();

const pageviewSchema = z.object({
  page: z.string().max(500),
  referrer: z.string().optional(),
  session_id: z.string().max(100).optional(),
});

// POST /api/v1/analytics/pageview - Track a page view (public)
router.post('/pageview', async (req: Request, res: Response) => {
  try {
    const body = pageviewSchema.parse(req.body);

    // TODO: Insert into database
    // await db('page_views').insert({
    //   page: body.page,
    //   referrer: body.referrer,
    //   user_agent: req.headers['user-agent'],
    //   session_id: body.session_id,
    //   user_id: req.user?.id || null,
    // });

    res.status(201).json({ success: true });
  } catch (err) {
    // Silently accept - analytics should not break the user experience
    res.status(201).json({ success: true });
  }
});

// GET /api/v1/analytics/summary - Admin analytics summary
router.get('/summary', async (_req: Request, res: Response) => {
  try {
    // TODO: Requires admin auth
    // const totalViews = await db('page_views').count('* as count').first();
    // const todayViews = await db('page_views')
    //   .where('created_at', '>=', db.raw("CURRENT_DATE"))
    //   .count('* as count').first();
    // const topPages = await db('page_views')
    //   .select('page')
    //   .count('* as views')
    //   .groupBy('page')
    //   .orderBy('views', 'desc')
    //   .limit(20);
    // const userCount = await db('users').count('* as count').first();
    // const imageCount = await db('images').where('status', 'active').count('* as count').first();

    res.json({
      success: true,
      data: {
        total_page_views: 0,
        today_page_views: 0,
        top_pages: [],
        total_users: 0,
        total_images: 0,
        total_niches: 86,
        total_categories: 9,
        subscribers: {
          free: 0,
          pro: 0,
          agency: 0,
        },
      },
    });
  } catch (err) {
    console.error('Analytics summary error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch analytics' });
  }
});

export default router;
