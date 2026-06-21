import { Router, Request, Response } from 'express';
import { z } from 'zod';

const router = Router();

const AVAILABLE_DIMENSIONS = [
  { dimension: 'aesthetic', sub_dimensions: ['composition', 'color_harmony', 'lighting', 'detail', 'creativity'] },
  { dimension: 'technical', sub_dimensions: ['resolution', 'sharpness', 'noise', 'artifacts', 'consistency'] },
  { dimension: 'commercial', sub_dimensions: ['brand_fit', 'market_appeal', 'uniqueness', 'trend_alignment'] },
  { dimension: 'prompt_fidelity', sub_dimensions: ['accuracy', 'completeness', 'style_match'] },
];

const scoreSchema = z.object({
  dimension: z.string().min(1).max(100),
  sub_dimension: z.string().max(100).optional(),
  score: z.number().min(0).max(100),
  metadata: z.record(z.unknown()).optional(),
});

// GET /api/v1/images/:id/scores - Get all scores for an image
router.get('/images/:id/scores', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // TODO: Fetch from database
    // const scores = await db('image_scores')
    //   .where({ image_id: id })
    //   .orderBy('dimension')
    //   .orderBy('sub_dimension');

    res.json({
      success: true,
      data: {
        image_id: id,
        scores: [],
        summary: {
          overall: 0,
          dimensions: {},
        },
      },
    });
  } catch (err) {
    console.error('Get scores error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch scores' });
  }
});

// POST /api/v1/images/:id/scores - Add a score to an image
router.post('/images/:id/scores', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = scoreSchema.parse(req.body);

    // TODO: Requires auth + admin/system
    // const [score] = await db('image_scores').insert({
    //   image_id: id,
    //   dimension: body.dimension,
    //   sub_dimension: body.sub_dimension,
    //   score: body.score,
    //   metadata: body.metadata || {},
    // }).returning('*');

    res.status(201).json({
      success: true,
      data: {
        image_id: id,
        dimension: body.dimension,
        sub_dimension: body.sub_dimension,
        score: body.score,
        message: 'Score added',
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: err.errors });
    }
    console.error('Add score error:', err);
    res.status(500).json({ success: false, error: 'Failed to add score' });
  }
});

// GET /api/v1/scores/dimensions - List available scoring dimensions
router.get('/dimensions', async (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: { dimensions: AVAILABLE_DIMENSIONS },
  });
});

export default router;
