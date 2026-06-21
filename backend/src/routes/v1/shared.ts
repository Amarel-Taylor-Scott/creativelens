import { Router, Request, Response } from 'express';
import { z } from 'zod';

const router = Router();

function generateShareId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const createShareSchema = z.object({
  analysis_data: z.object({
    image_url: z.string().url().optional(),
    detected_prompt: z.string().optional(),
    detected_style: z.array(z.string()).optional(),
    detected_model: z.string().optional(),
    scores: z.record(z.number()).optional(),
    suggested_niches: z.array(z.string()).optional(),
  }),
  is_public: z.boolean().default(true),
});

// POST /api/v1/shared - Create a shared analysis page
router.post('/', async (req: Request, res: Response) => {
  try {
    const body = createShareSchema.parse(req.body);
    const shareId = generateShareId();

    // TODO: Requires auth
    // const [shared] = await db('shared_sets').insert({
    //   user_id: req.user.id,
    //   share_id: shareId,
    //   is_public: body.is_public,
    //   analysis_data: body.analysis_data,
    // }).returning('*');

    res.status(201).json({
      success: true,
      data: {
        share_id: shareId,
        url: `/p/${shareId}`,
        is_public: body.is_public,
        message: 'Share link created',
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: err.errors });
    }
    console.error('Create share error:', err);
    res.status(500).json({ success: false, error: 'Failed to create share' });
  }
});

// GET /api/v1/shared/:shareId - View a shared analysis (public)
router.get('/:shareId', async (req: Request, res: Response) => {
  try {
    const { shareId } = req.params;

    // TODO: Fetch from database and increment views
    // const shared = await db('shared_sets')
    //   .where({ share_id: shareId, is_public: true })
    //   .first();
    // if (!shared) return res.status(404).json({ success: false, error: 'Share not found' });
    // await db('shared_sets').where({ id: shared.id }).increment('views', 1);

    res.json({
      success: true,
      data: {
        share_id: shareId,
        analysis_data: {},
        views: 0,
        created_at: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error('Get share error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch share' });
  }
});

export default router;
