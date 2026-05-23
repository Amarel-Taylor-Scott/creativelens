import { Router, Request, Response } from 'express';
import { z } from 'zod';

const router = Router();

const analyzeSchema = z.object({
  image_url: z.string().url(),
  page_url: z.string().url().optional(),
});

// POST /api/v1/extension/analyze - Analyze image (token auth)
router.post('/analyze', async (req: Request, res: Response) => {
  try {
    const body = analyzeSchema.parse(req.body);

    // TODO: Validate extension session token from header
    // const token = req.headers['x-extension-token'];
    // const session = await db('extension_sessions')
    //   .where({ token, is_active: true })
    //   .first();
    // if (!session) return res.status(401).json({ success: false, error: 'Invalid extension token' });
    //
    // // Check cache first
    // const cached = await db('extension_image_cache')
    //   .where({ image_url: body.image_url })
    //   .where('expires_at', '>', db.fn.now())
    //   .first();
    // if (cached) return res.json({ success: true, data: cached.analysis });
    //
    // // Run analysis via AI service
    // const analysis = await analyzeImageUrl(body.image_url);
    //
    // // Cache result
    // await db('extension_image_cache').insert({
    //   image_url: body.image_url,
    //   analysis,
    // }).onConflict('image_url').merge();

    res.json({
      success: true,
      data: {
        image_url: body.image_url,
        analysis: {
          detected_prompt: 'Extension analysis pending - connect AI service',
          detected_style: [],
          detected_model: null,
          confidence: 0,
          suggested_niches: [],
        },
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: err.errors });
    }
    console.error('Extension analyze error:', err);
    res.status(500).json({ success: false, error: 'Failed to analyze image' });
  }
});

// GET /api/v1/extension/cache/:imageUrl - Get cached analysis
router.get('/cache/:imageUrl', async (req: Request, res: Response) => {
  try {
    const imageUrl = decodeURIComponent(req.params.imageUrl);

    // TODO: Check cache
    // const cached = await db('extension_image_cache')
    //   .where({ image_url: imageUrl })
    //   .where('expires_at', '>', db.fn.now())
    //   .first();

    res.json({
      success: true,
      data: {
        cached: false,
        image_url: imageUrl,
        analysis: null,
      },
    });
  } catch (err) {
    console.error('Extension cache lookup error:', err);
    res.status(500).json({ success: false, error: 'Failed to check cache' });
  }
});

export default router;
