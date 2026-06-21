import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

const createTeamSchema = z.object({
  name: z.string().min(1).max(200),
});

const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(['admin', 'member', 'viewer']).default('member'),
});

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// POST /api/v1/teams - Create a team
router.post('/', async (req: Request, res: Response) => {
  try {
    const body = createTeamSchema.parse(req.body);
    const slug = slugify(body.name);

    // TODO: Requires auth + Agency plan
    // const [team] = await db('teams').insert({
    //   name: body.name,
    //   slug,
    //   owner_id: req.user.id,
    //   plan_tier: 'agency',
    //   max_seats: 10,
    // }).returning('*');
    // await db('team_members').insert({
    //   team_id: team.id,
    //   user_id: req.user.id,
    //   role: 'owner',
    // });

    res.status(201).json({
      success: true,
      data: { message: 'Team created', name: body.name, slug },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: err.errors });
    }
    console.error('Create team error:', err);
    res.status(500).json({ success: false, error: 'Failed to create team' });
  }
});

// GET /api/v1/teams/:id - Get team details
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // TODO: Requires auth + team membership
    // const team = await db('teams').where({ id }).first();
    // const members = await db('team_members')
    //   .join('users', 'team_members.user_id', 'users.id')
    //   .where('team_members.team_id', id)
    //   .select('users.email', 'users.display_name', 'team_members.role', 'team_members.joined_at');
    // const invites = await db('team_invites')
    //   .where({ team_id: id, status: 'pending' });

    res.json({
      success: true,
      data: {
        id,
        name: '',
        slug: '',
        plan_tier: 'agency',
        max_seats: 10,
        members: [],
        pending_invites: [],
      },
    });
  } catch (err) {
    console.error('Get team error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch team' });
  }
});

// POST /api/v1/teams/:id/invite - Invite a member
router.post('/:id/invite', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = inviteSchema.parse(req.body);
    const token = uuidv4().replace(/-/g, '');

    // TODO: Requires auth + team admin/owner
    // const memberCount = await db('team_members').where({ team_id: id }).count('* as count').first();
    // const team = await db('teams').where({ id }).first();
    // if (memberCount.count >= team.max_seats) throw new Error('Team is full');
    //
    // await db('team_invites').insert({
    //   team_id: id,
    //   email: body.email,
    //   token,
    //   invited_by: req.user.id,
    // });
    // TODO: Send invitation email

    res.status(201).json({
      success: true,
      data: {
        message: 'Invitation sent',
        email: body.email,
        role: body.role,
        token,
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: err.errors });
    }
    console.error('Invite team member error:', err);
    res.status(500).json({ success: false, error: 'Failed to send invitation' });
  }
});

// DELETE /api/v1/teams/:id/members/:userId - Remove a team member
router.delete('/:id/members/:userId', async (req: Request, res: Response) => {
  try {
    const { id, userId } = req.params;

    // TODO: Requires auth + team admin/owner
    // await db('team_members').where({ team_id: id, user_id: userId }).delete();

    res.json({
      success: true,
      data: { message: 'Member removed', team_id: id, user_id: userId },
    });
  } catch (err) {
    console.error('Remove team member error:', err);
    res.status(500).json({ success: false, error: 'Failed to remove member' });
  }
});

export default router;
