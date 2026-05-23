import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const router = Router();

const PLAN_RATE_LIMITS: Record<string, number> = {
  free: 100,
  pro: 1000,
  agency: 5000,
};

const createKeySchema = z.object({
  name: z.string().min(1).max(100).default('Default'),
});

function generateApiKey(environment: 'live' | 'test' = 'live'): string {
  const id = uuidv4().replace(/-/g, '');
  return `cl_${environment}_${id}`;
}

// GET /api/v1/api-keys
router.get('/', async (_req: Request, res: Response) => {
  try {
    // TODO: Requires auth - fetch keys for current user
    // const keys = await db('api_keys')
    //   .where({ user_id })
    //   .select('id', 'key_prefix', 'name', 'rate_limit', 'is_active', 'last_used_at', 'created_at');

    res.json({
      success: true,
      data: { keys: [] },
    });
  } catch (err) {
    console.error('API keys list error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch API keys' });
  }
});

// POST /api/v1/api-keys
router.post('/', async (req: Request, res: Response) => {
  try {
    const body = createKeySchema.parse(req.body);
    const key = generateApiKey('live');
    const prefix = key.slice(0, 16);
    const userPlan = 'free'; // TODO: get from auth

    // TODO: Hash key and store
    // const key_hash = await bcrypt.hash(key, 10);
    // await db('api_keys').insert({
    //   user_id, key_hash, key_prefix: prefix,
    //   name: body.name, rate_limit: PLAN_RATE_LIMITS[userPlan],
    // });

    res.status(201).json({
      success: true,
      data: {
        key,
        prefix,
        name: body.name,
        rate_limit: PLAN_RATE_LIMITS[userPlan],
        message: 'Store this key securely. It will not be shown again.',
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: err.errors });
    }
    console.error('API key create error:', err);
    res.status(500).json({ success: false, error: 'Failed to create API key' });
  }
});

// DELETE /api/v1/api-keys/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // TODO: Requires auth - soft delete (set is_active to false)
    // await db('api_keys').where({ id, user_id }).update({ is_active: false });

    res.json({
      success: true,
      data: { message: 'API key revoked', id },
    });
  } catch (err) {
    console.error('API key delete error:', err);
    res.status(500).json({ success: false, error: 'Failed to revoke API key' });
  }
});

export default router;
