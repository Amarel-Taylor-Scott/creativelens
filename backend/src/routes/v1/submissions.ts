import { Router, Request, Response } from 'express';
import { z } from 'zod';

const router = Router();

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const MAX_NICHE_TAGS = 23;

const submissionSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(2000).optional(),
  prompt: z.string().optional(),
  negative_prompt: z.string().optional(),
  ai_model: z.string().max(100).optional(),
  niche_tags: z.array(z.string()).max(MAX_NICHE_TAGS).default([]),
});

// POST /api/v1/submissions
router.post('/', async (req: Request, res: Response) => {
  try {
    const body = submissionSchema.parse(req.body);

    // TODO: Handle file upload via multer
    // TODO: Validate file size <= 15MB
    // TODO: Validate niche_tags exist in niches table
    // TODO: Insert submission with status 'pending'

    res.status(201).json({
      success: true,
      data: {
        message: 'Submission received and pending review',
        submission: {
          ...body,
          status: 'pending',
          file_size_limit: `${MAX_FILE_SIZE / (1024 * 1024)}MB`,
          max_niche_tags: MAX_NICHE_TAGS,
        },
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: err.errors });
    }
    console.error('Submission create error:', err);
    res.status(500).json({ success: false, error: 'Failed to create submission' });
  }
});

// GET /api/v1/submissions (user's own submissions)
router.get('/', async (req: Request, res: Response) => {
  try {
    const status = req.query.status as string | undefined;

    // TODO: Requires auth - fetch submissions for current user
    // let q = db('submissions').where({ user_id });
    // if (status) q = q.where({ status });

    res.json({
      success: true,
      data: { submissions: [] },
    });
  } catch (err) {
    console.error('Submissions list error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch submissions' });
  }
});

// GET /api/v1/submissions/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // TODO: Fetch submission (only if owned by current user or admin)
    res.json({
      success: true,
      data: { id, status: 'pending' },
    });
  } catch (err) {
    console.error('Submission detail error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch submission' });
  }
});

export default router;
