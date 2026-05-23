import { Router, Request, Response } from 'express';
import { z } from 'zod';

const router = Router();

const profileUpdateSchema = z.object({
  username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_-]+$/).optional(),
  bio: z.string().max(500).optional(),
  avatar_url: z.string().url().optional(),
  banner_url: z.string().url().optional(),
  twitter_handle: z.string().max(100).optional(),
  website_url: z.string().url().optional(),
  is_public: z.boolean().optional(),
});

const bannerPinsSchema = z.object({
  pins: z.array(z.object({
    image_id: z.string().uuid(),
    position: z.number().min(0).max(2),
  })).max(3),
});

// GET /api/v1/profiles/:username - Public profile view
router.get('/:username', async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    // TODO: Fetch from database
    // const profile = await db('user_profiles')
    //   .join('users', 'user_profiles.user_id', 'users.id')
    //   .where('user_profiles.username', username)
    //   .where('user_profiles.is_public', true)
    //   .first();
    // const bannerPins = await db('profile_banner_pins')
    //   .join('images', 'profile_banner_pins.image_id', 'images.id')
    //   .where('profile_banner_pins.user_id', profile.user_id)
    //   .orderBy('position');
    // const images = await db('images')
    //   .where({ creator_id: profile.user_id, status: 'active' })
    //   .orderBy('created_at', 'desc')
    //   .limit(50);

    res.json({
      success: true,
      data: {
        username,
        bio: '',
        avatar_url: null,
        banner_url: null,
        twitter_handle: null,
        website_url: null,
        plan: 'free',
        banner_pins: [],
        images: [],
        stats: {
          image_count: 0,
          like_count: 0,
          view_count: 0,
        },
      },
    });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch profile' });
  }
});

// PUT /api/v1/profiles - Update own profile
router.put('/', async (req: Request, res: Response) => {
  try {
    const body = profileUpdateSchema.parse(req.body);

    // TODO: Requires auth
    // const userId = req.user.id;
    // await db('user_profiles')
    //   .where({ user_id: userId })
    //   .update({ ...body, updated_at: db.fn.now() });

    res.json({
      success: true,
      data: { message: 'Profile updated', ...body },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: err.errors });
    }
    console.error('Update profile error:', err);
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
});

// POST /api/v1/profiles/banner-pins - Set banner pins (up to 3)
router.post('/banner-pins', async (req: Request, res: Response) => {
  try {
    const body = bannerPinsSchema.parse(req.body);

    // TODO: Requires auth
    // const userId = req.user.id;
    // await db('profile_banner_pins').where({ user_id: userId }).delete();
    // for (const pin of body.pins) {
    //   await db('profile_banner_pins').insert({
    //     user_id: userId,
    //     image_id: pin.image_id,
    //     position: pin.position,
    //   });
    // }

    res.json({
      success: true,
      data: { message: 'Banner pins updated', pins: body.pins },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: err.errors });
    }
    console.error('Banner pins error:', err);
    res.status(500).json({ success: false, error: 'Failed to update banner pins' });
  }
});

export default router;
